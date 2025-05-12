// CardPreview.jsx
import "@/styles/CardPreview.css";

export default function CardPreview({ card, onClose }) {
  if (!card) return null; // 👈 Si card est null, rien ne s'affiche
  console.log("✅ CardPreview reçoit :", card);
  function parseCarteTexte(texte) {
    const elements = [];
          const regex = /(<b>.*?<\/b>|<color=(.*?)>(.*?)<\/color>|<br>)/g;
  
          let lastIndex = 0;
          let match;
          let key = 0;
  
          while ((match = regex.exec(texte)) !== null) {
              // Texte avant la balise
              if (match.index > lastIndex) {
              elements.push(<span key={key++}>{texte.slice(lastIndex, match.index)}</span>);
              }
  
              if (match[0].startsWith('<b>')) {
              elements.push(
                  <strong key={key++}>{match[0].replace('<b>', '').replace('</b>', '')}</strong>
              );
              } else if (match[0].startsWith('<color=')) {
              const color = match[2];
              const content = match[3];
              const classText = "textStyle";
              elements.push(
                  <span class={textStyle} key={key++} style={{ color }}>{content}</span>
              );
              } else if (match[0] === '<br>') {
              elements.push(<br key={key++} />);
              }
  
              lastIndex = regex.lastIndex;
          }
  
          // Texte après la dernière balise
          if (lastIndex < texte.length) {
              elements.push(<span key={key++}>{texte.slice(lastIndex)}</span>);
          }
  
          return elements;
      }
  return (
    <div className="preview-overlay" onClick={onClose}>
      <div className="preview-content" onClick={(e) => e.stopPropagation()}>
        <div className="textPreview">
          {parseCarteTexte(card.texte)}
        </div>
        <p className="atkPreview">{card.baseAtk}</p>
        <p className="hpPreview">{card.baseHp}</p>
        <img src={card.img} alt={card.nom} />
      </div>
    </div>
  );
}
