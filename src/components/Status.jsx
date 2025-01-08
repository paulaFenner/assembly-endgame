import { clsx } from 'clsx';

export default function Status(props) {
  const gameStatusClass = clsx('status-container', {
    won: props.won,
    lost: props.lost,
  });

  return (
    <section className={gameStatusClass}>
      {props.over ? (
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
