import { languages } from '../languages';

export default function Languages() {
  const languageElements = languages.map((lang) => {
    const styles = {
      color: lang.color,
      backgroundColor: lang.backgroundColor,
    };
    return (
      <span className="chip" key={lang.name} style={styles}>
        {lang.name}
      </span>
    );
  });

  return <section className="language-chips">{languageElements}</section>;
}
