// CardPreview.jsx
import "@/styles/CardPreview.css";

export default function CardPreview({ card, onClose }) {
  if (!card) return null; // 👈 Si card est null, rien ne s'affiche
  console.log("✅ CardPreview reçoit :", card);
function parseCarteTexte(texte) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<root>${texte}</root>`, 'text/html');
  const root = doc.body.firstChild;

  let key = 0;

  function renderNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return <span key={key++}>{node.textContent}</span>;
    }

    const children = Array.from(node.childNodes).map(renderNode);

    switch (node.nodeName.toLowerCase()) {
      case 'b':
        return <strong key={key++}>{children}</strong>;
      case 'i':
        return <em key={key++}>{children}</em>;
      case 'u':
        return <u key={key++}>{children}</u>;
      case 'color':
        const color = node.getAttribute('color') || node.getAttribute('value');
        return (
          <span key={key++} style={{ color }}>
            {children}
          </span>
        );
      case 'br':
        return <br key={key++} />;
      default:
        return <span key={key++}>{children}</span>;
    }
  }

  return Array.from(root.childNodes).map(renderNode);
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
