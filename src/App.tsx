import React, { useState, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';

import './App.css';

const MAX_INCORRECT = 5;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
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

  const answer = useMemo(() => game ? game.word.split('').map(char => char.toUpperCase()) : [], [game]);

  const guessLetter = useCallback((letter: string) => {
    if (incorrect.length === MAX_INCORRECT || !ALPHABET.includes(letter)) {
      return;
    } else if (answer.includes(letter) && !correct.includes(letter)) {
      setCorrect([...correct, letter])
    } else if (!incorrect.includes(letter)) {
      setIncorrect([...incorrect, letter])
    }
  }, [setCorrect, setIncorrect, incorrect, correct, answer]);

  const loadGameData = useCallback(() => {
    setGame(undefined);
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setGame(data[0]))
      .catch(error => console.error(error));
  }, [setGame]);

  useEffect(() => { loadGameData(); }, [loadGameData]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      guessLetter(e.key.toUpperCase());
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [guessLetter]);

  const letters = answer.map(char => {
    if (correct.includes(char) || incorrect.length >= MAX_INCORRECT) {
      return char;
    } else {
      return '_';
    }
  }).join(' ');

  const handleLetterClick = (e: React.MouseEvent<HTMLInputElement>) => {
    guessLetter(e.currentTarget.value);
  };

  const showTheWord = () => {
    setCorrect([...answer]);
  };

  const resetGame = () => {
    setIncorrect([]);
    setCorrect([]);
    loadGameData();
  };

  const lostGame = incorrect.length >= MAX_INCORRECT;
  const gameIsInProgress = letters.includes('_') && !lostGame;

  return (game ?
    <div>
      <p>
        Definition: {game.definition}
      </p>
      { gameIsInProgress ?
        <span>Can you guess the word?</span> :
        <span>
          { lostGame ?
            <b style={{ color: 'red' }}>Oops! </b> :
            <b style={{ color: 'green' }}>Yay! </b>
          }
          The word is:
        </span>
      }
      <p className="Word">
        {letters}
      </p>
      <p>
      {
        ALPHABET.map(letter =>
          <input
            type="button"
            key={letter}
            onClick={handleLetterClick}
            value={letter}
            disabled={correct.includes(letter) || incorrect.includes(letter) || lostGame}
            className={classNames({
              'correct': correct.includes(letter),
              'incorrect': incorrect.includes(letter)
            })}
          />
        )
      }
      </p>
      <button type="button" onClick={showTheWord}>Show the word</button>
      <button type="button" onClick={resetGame}>Try a new word</button>
    </div>
  : <div>Loading game data...</div>);
}

export default App;
