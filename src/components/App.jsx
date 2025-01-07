import { useState, useEffect } from 'react';
import Header from './Header';
import Status from './Status';
import Languages from './Languages';
import Keyboard from './Keyboard';

export default function App() {
  const [currentWord, setCurrentWord] = useState('react');
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wrongGuessCount = guessedLetters.filter((letter) => !currentWord.includes(letter)).length;
  console.log(wrongGuessCount);

  const letters = currentWord
    .split('')
    .map((letter, index) => <span key={index}>{guessedLetters.includes(letter) ? letter.toUpperCase() : ''}</span>);

  function addLetter(letter) {
    setGuessedLetters((prevLetters) => (prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]));
  }

  return (
    <main>
      <Header />
      <Status />
      <Languages wrongGuessCount={wrongGuessCount} />
      <section className="word">{letters}</section>
      <Keyboard addLetter={addLetter} currentWord={currentWord} guessedLetters={guessedLetters} />
      <button className="new-game">New Game</button>
    </main>
  );
}
