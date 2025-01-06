export default function Keyboard() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const keyboard = alphabet.split('').map((letter) => (
    <button className="keyboard-key" key={letter}>
      {letter.toUpperCase()}
    </button>
  ));
  return <section className="keyboard">{keyboard}</section>;
}
