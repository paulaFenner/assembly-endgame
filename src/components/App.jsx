import { useState, useEffect } from 'react';
import { languages } from '../languages';
import { getRandomWord } from '../utils';
import { clsx } from 'clsx';
import Header from './Header';
import Status from './Status';
import Languages from './Languages';
import Keyboard from './Keyboard';
import Confetti from 'react-confetti';

export default function App() {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const numGuessesLeft = languages.length - 1;
  const wrongGuessCount = guessedLetters.filter((letter) => !currentWord.includes(letter)).length;
  const isGameWon = currentWord.split('').every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= numGuessesLeft;
  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const letters = currentWord.split('').map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx(isGameLost && !guessedLetters.includes(letter) && 'missed-letter');
    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ''}
      </span>
    );
  });

  function addLetter(letter) {
    setGuessedLetters((prevLetters) => (prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]));
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  return (
    <main>
      {isGameWon && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={1000} />}

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

      {isGameOver && (
        <button className="new-game" onClick={startNewGame}>
          New Game
        </button>
      )}
    </main>
  );
}
