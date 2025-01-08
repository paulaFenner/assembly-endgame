import { useState, useEffect } from 'react';
import { languages } from '../languages';
import Header from './Header';
import Status from './Status';
import Languages from './Languages';
import Keyboard from './Keyboard';

export default function App() {
  const [currentWord, setCurrentWord] = useState('react');
  const [guessedLetters, setGuessedLetters] = useState([]);

  const numGuessesLeft = languages.length - 1;
  const wrongGuessCount = guessedLetters.filter((letter) => !currentWord.includes(letter)).length;
  const isGameWon = currentWord.split('').every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= numGuessesLeft;
  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const letters = currentWord
    .split('')
    .map((letter, index) => <span key={index}>{guessedLetters.includes(letter) ? letter.toUpperCase() : ''}</span>);

  function addLetter(letter) {
    setGuessedLetters((prevLetters) => (prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]));
  }

  return (
    <main>
      <Header />

      <Status
        won={isGameWon}
        lost={isGameLost}
        over={isGameOver}
        isLastGuessIncorrect={isLastGuessIncorrect}
        wrongGuessCount={wrongGuessCount}
        languages={languages}
      />

      <Languages wrongGuessCount={wrongGuessCount} />

      <section className="word">{letters}</section>

      {/* Combined visually-hidden aria-live region for status updates */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in the word.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {numGuessesLeft} attempts left.
        </p>
        <p>
          Current word:{' '}
          {currentWord
            .split('')
            .map((letter) => (guessedLetters.includes(letter) ? letter + '.' : 'blank.'))
            .join(' ')}
        </p>
      </section>

      <Keyboard addLetter={addLetter} currentWord={currentWord} guessedLetters={guessedLetters} over={isGameOver} />

      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  );
}
