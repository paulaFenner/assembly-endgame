import { languages } from '../languages';

export default function Languages(props) {
  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < props.wrongGuessCount;
    const styles = {
      color: lang.color,
      backgroundColor: lang.backgroundColor,
    };
    return (
      <span className={`chip ${isLanguageLost ? 'lost' : ''}`} key={lang.name} style={styles}>
        {lang.name}
      </span>
    );
  });

  return <section className="language-chips">{languageElements}</section>;
}
