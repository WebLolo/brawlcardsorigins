import { getCartesPourShop, getCartesAleatoires, getNombreCartesShop, clonerCarte } from "@/utils/shopUtils";
export const coutLvlTavernePlayer2 = {
    1: 5,
    2: 7,
    3: 8,
    4: 10,
    5: 10,
};
export const acheterCarteIa = ({ cible, gold, setGold, deck, setDeck, shopCards, setShopCards, lvlTaverne, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage }) => {
  if(actualPlayer === 1){
    if (gold < 3) {
      setPopupMessage("💰 Pas assez d'or !");
      return;
    }
    if (deck.length >= 7) {
      setPopupMessage("🛑 Board plein !");
      return;
    }
  
    setGold(gold - 3);
    setDeck([...deck, cible]);
    setShopCards(shopCards.filter((c) => c.id !== cible.id));
  }
  if(actualPlayer === 2){
    if (goldPlayer2 < 3) {
      setPopupMessage("💰 Pas assez d'or !");
      return;
    }
    if (deckPlayer2.length >= 7) {
      setPopupMessage("🛑 Board plein !");
      return;
    }
    setGoldPlayer2(goldPlayer2 - 3);
    setDeckPlayer2([...deckPlayer2, cible]);
    setShopCards(shopCards.filter((c) => c.id !== cible.id));
    return cible
  }

};

export const jouerCarteDepuisDeckIa = (card, boardPlayer, setDeck, deck, addBoardPosition, setBoardPlayer, setPopupMessage) => {
  if (boardPlayer.length >= 7) {
    setPopupMessage("🛑 Board plein !");
    return;
  } 
  setDeck(deck.filter((c) => c.id !== card.id));
  if(!card.magnetisme){
      addBoardPosition (card, boardPlayer)
      setBoardPlayer([...boardPlayer, card]);
  }     
};

export const lvlUpTaverneIa = ({ setShopCards, actualPlayer, goldPlayer2, lvlTavernePlayer2, setGoldPlayer2,setLvlTavernePlayer2, setPopupMessage }) => {
  

    if(actualPlayer === 2){
      const cout = coutLvlTavernePlayer2[lvlTavernePlayer2];
      console.log(goldPlayer2, cout)
      if (goldPlayer2 < cout) {
        setPopupMessage("💰 Pas assez d'or pour monter de niveau !");
        return;
      }
    
      if (lvlTavernePlayer2 >= 6) {
        setPopupMessage("🔒 Niveau max atteint !");
        return;
      }
    
      const nouveauLvl = lvlTavernePlayer2 + 1;
      setGoldPlayer2(goldPlayer2 - cout);
      setLvlTavernePlayer2(nouveauLvl);
    
      const tirage = getCartesPourShop(nouveauLvl);
      const cartes = getCartesAleatoires(tirage, getNombreCartesShop(nouveauLvl))
        .map(carte => clonerCarte({ carte, camp: "shop" }));
    
      setShopCards(cartes);
    }
  
};