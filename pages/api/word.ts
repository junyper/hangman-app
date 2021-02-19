import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { ApolloServer, gql } from 'apollo-server-micro';
import { ValueOrPromise } from 'apollo-server-types';

export class WordnikAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.wordnik.com/v4';
  }

  willSendRequest(request: RequestOptions): ValueOrPromise<void> {
    request.params.set('api_key', 'u929mkliut6s5u6ewz0ykuqwutq4i34m3gffrlcjgti6u2td1');
  }

  async getRandomWord(): Promise<string> {
    const { word } = await this.get('/words.json/randomWord', {
      hasDictionaryDef: true,
      minDictionaryCount: 3,
      minCorpusCount: 3,
      includePartOfSpeech: ['noun', 'adjective', 'verb', 'adverb'].join(','),
      minLength: 5,
    });
    return word;
  }

  async getDefinition(word: string): Promise<string> {
    const definitions = (await this.get(`/word.json/${word}/definitions`)).filter(
      (definition) => typeof definition.text === 'string',
    );
    return definitions[0].text.replace(/(<([^>]+)>)/gi, '');
  }
}

const typeDefs = gql`
  type Query {
    word: Word!
  }
  type Word {
    name: String
    definition: String
  }
`;

const resolvers = {
  Query: {
    word: async (_parent, _args, { dataSources }) => {
      const word = await dataSources.wordnikAPI.getRandomWord();

      const [definition] = await Promise.all([dataSources.wordnikAPI.getDefinition(word)]);

      return {
        name: word,
        definition,
      };
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      wordnikAPI: new WordnikAPI(),
    };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/word' });
