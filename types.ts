export interface Word {
  name: string;
  definition: string;
}

export interface GameData {
  word: Word;
}

export interface WordAPIResponse {
  data?: GameData;
  errors?: Array<{ message: string }>;
}
