import { clsx } from 'clsx';

export default function Keyboard(props) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  const keyboard = alphabet.split('').map((letter) => {
    const isGuessed = props.guessedLetters.includes(letter);
    const isCorrect = isGuessed && props.currentWord.includes(letter);
    const isWrong = isGuessed && !props.currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button className={className} key={letter} disabled={props.over} onClick={() => props.addLetter(letter)}>
        {letter.toUpperCase()}
      </button>
    );
  });

  return <section className="keyboard">{keyboard}</section>;
}
// .split('') creates an array from the string
