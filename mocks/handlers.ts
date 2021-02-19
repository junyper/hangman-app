import { rest } from 'msw';

export const handlers = [
  rest.get('/api/word', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          word: 'apple',
          definition: 'a fruit',
        },
      ]),
    );
  }),
];
