import { clsx } from 'clsx';
import { getFarewellText } from '../utils';

export default function Status(props) {
  const gameStatusClass = clsx('status-container', {
    won: props.won,
    lost: props.lost,
    farewell: !props.over && props.isLastGuessIncorrect,
  });

  return (
    <section className={gameStatusClass}>
      {!props.over && props.isLastGuessIncorrect ? (
        <p className="farewell-message">{getFarewellText(props.languages[props.wrongGuessCount - 1].name)}</p>
      ) : props.over ? (
        props.won ? (
          <>
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
          </>
        ) : (
          <>
            <h2>Game over!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
          </>
        )
      ) : null}
    </section>
  );
}
