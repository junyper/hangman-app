import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.wordnik.com/v4/words.json/randomWord', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 0,
        word: 'apple',
      }),
    );
  }),
  rest.get('https://api.wordnik.com/v4/word.json/apple/definitions', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 'A5398300-5',
          partOfSpeech: 'noun',
          attributionText: 'from The American Heritage® Dictionary of the English Language, 5th Edition.',
          sourceDictionary: 'ahd-5',
          text:
            'the round fruit of a tree of the rose family, which typically has thin red or green skin and crisp flesh. Many varieties have been developed as dessert or cooking fruit or for making cider',
          sequence: '5',
          score: 0,
          labels: [],
          citations: [],
          word: 'apple',
          relatedWords: [],
          exampleUses: [],
          textProns: [],
          notes: [],
          attributionUrl: 'https://ahdictionary.com/',
          wordnikUrl: 'https://www.wordnik.com/words/apple',
        },
      ]),
    );
  }),
  rest.get('/api/word', (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          word: {
            name: 'apple',
            definition:
              'the round fruit of a tree of the rose family, which typically has thin red or green skin and crisp flesh. Many varieties have been developed as dessert or cooking fruit or for making cider',
          },
        },
      }),
    );
  }),
];
