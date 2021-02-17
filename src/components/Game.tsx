import React, { useState, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';

import { MAX_INCORRECT, ALPHABET }  from '../constants';
import { GameData } from '../types';
import { Status } from './Status';
import './Game.css';

interface GameProps {
  data: GameData;
  reloadGame: () => void
}

export function Game (props: GameProps) {
  const game = props.data;
  const reloadGame = props.reloadGame;

  const [correct, setCorrect] = useState<string[]>([]);
  const [incorrect, setIncorrect] = useState<string[]>([]);

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

  const resetGame = useCallback(() => {
    setIncorrect([]);
    setCorrect([]);
    reloadGame();
  }, [setIncorrect, setCorrect, reloadGame]);

  const showTheWord = useCallback(() => {
    setCorrect([...answer]);
  }, [setCorrect, answer]);

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

  return (
    <div className="Game">
      <Status incorrect={incorrect.length} />

      <p className="Definition">
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
              'Letter': true,
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
  );
}
