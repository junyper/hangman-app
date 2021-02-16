import { rest } from "msw";

export const handlers = [
  rest.get("https://random-words-api.vercel.app/word", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          word: "apple",
          definition: "a fruit",
        },
      ])
    );
  }),
];
