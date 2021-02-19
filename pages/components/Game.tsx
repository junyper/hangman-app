import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GameData, Word } from '../../types';
import styles from './Game.module.css';
import { MAX_INCORRECT, Status } from './Status';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface GameProps {
  data?: GameData;
  error?: Array<{ message: string }>;
  reload: () => void;
}

export function Game(props: GameProps): JSX.Element {
  const word: Word = props.data?.word;
  const reload = props.reload;

  const [correct, setCorrect] = useState<string[]>([]);
  const [incorrect, setIncorrect] = useState<string[]>([]);

  const answer = useMemo(() => {
    return word && word.name ? word.name.split('').map((char) => char.toUpperCase()) : [];
  }, [word]);

  const guessLetter = useCallback(
    (letter: string) => {
      const isCorrect = answer.includes(letter);
      if (incorrect.length === MAX_INCORRECT || !ALPHABET.includes(letter)) {
        return;
      } else if (isCorrect && !correct.includes(letter)) {
        setCorrect([...correct, letter]);
      } else if (!isCorrect && !incorrect.includes(letter)) {
        setIncorrect([...incorrect, letter]);
      }
    },
    [setCorrect, setIncorrect, incorrect, correct, answer],
  );

  const handleGetNewWord = useCallback(() => {
    setIncorrect([]);
    setCorrect([]);
    reload();
  }, [setIncorrect, setCorrect, reload]);

  const handleShowWord = useCallback(() => {
    setCorrect([...answer]);
  }, [setCorrect, answer]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleGetNewWord();
      guessLetter(e.key.toUpperCase());
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [guessLetter, handleGetNewWord, handleShowWord]);

  const letters = answer
    .map((char) => {
      if (correct.includes(char) || incorrect.length >= MAX_INCORRECT || !ALPHABET.includes(char)) {
        return char;
      } else {
        return '_';
      }
    })
    .join(' ');

  const handleLetterClick = (e: React.MouseEvent<HTMLInputElement>) => {
    guessLetter(e.currentTarget.value);
  };

  const gameIsLost = incorrect.length >= MAX_INCORRECT;
  const gameIsInProgress = letters.includes('_') && !gameIsLost;

  if (!word) return <h1 className={styles.Loading}>Loading game data...</h1>;

  return (
    <div className={styles.Game}>
      {props.error ? (
        <h1 className={styles.Loading}>Could not load game data. Try refreshing the page after a few minutes.</h1>
      ) : (
        <div>
          <Status incorrect={incorrect.length} />

          <p className={styles.Definition}>Definition: {word.definition}</p>

          {gameIsInProgress ? (
            <span>Can you guess the word?</span>
          ) : (
            <span>
              {gameIsLost ? <b style={{ color: 'red' }}>Oops! </b> : <b style={{ color: 'green' }}>Yay! </b>}
              The word is:
            </span>
          )}

          <p className="Word">{letters}</p>

          <p>
            {ALPHABET.map((letter) => (
              <input
                type="button"
                key={letter}
                onClick={handleLetterClick}
                value={letter}
                disabled={correct.includes(letter) || incorrect.includes(letter) || gameIsLost}
                className={classNames(
                  styles.Letter,
                  correct.includes(letter) && styles.correct,
                  incorrect.includes(letter) && styles.incorrect,
                )}
              />
            ))}
          </p>

          <button type="button" onClick={handleShowWord}>
            Show the word
          </button>
          <button type="button" onClick={handleGetNewWord}>
            Try a new word (ESC key)
          </button>
        </div>
      )}
    </div>
  );
}
