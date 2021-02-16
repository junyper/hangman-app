import React, { useState, useEffect } from 'react';

import './App.css';

const MAX_INCORRECT = 5;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const API_URL = 'https://random-words-api.vercel.app/word';
interface Game {
  word: string;
  definition: string;
  pronounciation?: string;
}

function App() {
  const [correct, setCorrect] = useState<string[]>([]);
  const [incorrect, setIncorrect] = useState<string[]>([]);
  const [game, setGame] = useState<Game | undefined>();

  const loadGameData = async () => {
    setGame(undefined)
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setGame(data[0]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadGameData();
  }, []);

  if (!game) return <div>Loading game data...</div>

  const { word, definition } = game;
  const alphabet = ALPHABET.split('');
  const characters = word.split('').map(char => char.toUpperCase());
  const letters = characters.map(char => {
    if (correct.includes(char) || incorrect.length >= MAX_INCORRECT) {
      return char;
    } else {
      return '_';
    }
  }).join(' ');

  const handleLetterClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const char = e.currentTarget.value;

    if (incorrect.length === MAX_INCORRECT) {
      return;
    } else if (characters.includes(char)) {
      setCorrect([...correct, char])
    } else {
      setIncorrect([...incorrect, char])
    }
  };

  const classNameForLetter = (letter: string) => {
    if (correct.includes(letter)) {
      return 'correct';
    } else if (incorrect.includes(letter)) {
      return 'incorrect';
    } else {
      return 'available';
    }
  };

  const showTheWord = () => {
    setCorrect([...characters]);
  };

  const resetGame = () => {
    setIncorrect([]);
    setCorrect([]);
    loadGameData();
  };

  return (
    <div>
      <p>
        Definition: {definition}
      </p>
      { letters.includes('_') && incorrect.length < MAX_INCORRECT?
        <span>Can you guess the word in <b>{MAX_INCORRECT - incorrect.length}</b> guesses?</span> :
        <span>The word is:</span>
      }
      <p className="Word">
        {letters}
      </p>
      <p>
      {
        alphabet.map(letter =>
          <input
            type="button"
            key={letter}
            onClick={handleLetterClick}
            value={letter}
            disabled={correct.includes(letter) || incorrect.includes(letter) || incorrect.length === MAX_INCORRECT}
            className={classNameForLetter(letter)}
          />
        )
      }
      </p>
      <button type="button" onClick={showTheWord}>Show the word</button>
      <button type="button" onClick={resetGame}>Try a new word</button>
    </div>
  );
}

export default App;
