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

  const resetGame = useCallback(() => {
    setIncorrect([]);
    setCorrect([]);
    loadGameData();
  }, [setIncorrect, setCorrect, loadGameData]);

  const showTheWord = useCallback(() => {
    setCorrect([...answer]);
  }, [setCorrect, answer]);

  useEffect(() => { loadGameData(); }, [loadGameData]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') resetGame();
      guessLetter(e.key.toUpperCase());
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [guessLetter, resetGame, showTheWord]);

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

  const gameIsLost = incorrect.length >= MAX_INCORRECT;
  const gameIsInProgress = letters.includes('_') && !gameIsLost;

  return (game ?
    <div>
      <p>
        Definition: {game.definition}
      </p>
      { gameIsInProgress ?
        <span>Can you guess the word?</span> :
        <span>
          { gameIsLost ?
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
            disabled={correct.includes(letter) || incorrect.includes(letter) || gameIsLost}
            className={classNames({
              'correct': correct.includes(letter),
              'incorrect': incorrect.includes(letter)
            })}
          />
        )
      }
      </p>
      <button type="button" onClick={showTheWord}>Show the word</button>
      <button type="button" onClick={resetGame}>Try a new word  (ESC key)</button>
    </div>
  : <div>Loading game data...</div>);
}

export default App;
