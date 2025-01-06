import { useState } from 'react';
import Header from './Header';
import Status from './Status';
import Languages from './Languages';
import Keyboard from './Keyboard';

export default function App() {
  const [currentWord, setCurrentWord] = useState('javascript');

  const letters = currentWord.split('').map((letter, index) => <span key={index}>{letter.toUpperCase()}</span>);

  console.log(letters);
  return (
    <main>
      <Header />
      <Status />
      <Languages />
      <section className="word">{letters}</section>
      <Keyboard />
    </main>
  );
}
