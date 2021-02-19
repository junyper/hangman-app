import { rest } from 'msw';

export const handlers = [
  rest.get('/api/word', (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          word: {
            name: 'apple',
            definition: 'a fruit',
          },
        },
      }),
    );
  }),
];
