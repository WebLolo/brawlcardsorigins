// CardPreview.jsx
import "@/styles/CardPreview.css";

export default function CardPreview({ card, onClose }) {
  if (!card) return null; // 👈 Si card est null, rien ne s'affiche
  console.log("✅ CardPreview reçoit :", card);

  return (
    <div className="preview-overlay" onClick={onClose}>
      <div className="preview-content" onClick={(e) => e.stopPropagation()}>
        <p className="textPreview">{card.texte}</p>
        <p className="atkPreview">{card.baseAtk}</p>
        <p className="hpPreview">{card.baseHp}</p>
        <img src={card.img} alt={card.nom} />
      </div>
    </div>
  );
}
