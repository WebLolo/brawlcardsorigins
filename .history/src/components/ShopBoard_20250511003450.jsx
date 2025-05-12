import "../styles/ShopBoard.css";
import  CardShop  from "@/components/CardShop";
export default function ShopBoard({ cards, origin, onPreview }){
    return (
        <div className="shopBoard">
            {cards.map((card, index) => (
                <CardShop key={card.id} card={card} origin={origin} index={index} onPreview={onPreview} />
            ))}
        </div>
    
      );
}