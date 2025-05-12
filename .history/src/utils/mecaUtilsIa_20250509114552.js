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
  if(carteAPoser.bivalence){
    carteAPoser.bivalence(boardPlayer)
    // Faire réagir les autres cartes à l’arrivée de celle-ci
    boardPlayer.forEach(c => {
      if (c !== carteAPoser && c.bivalence) {
        c.bivalence(boardPlayer, c); // chaque carte réévalue le board et s'applique à la nouvelle
      }
    });
  }else{
    // Faire réagir les autres cartes à l’arrivée de celle-ci
    boardPlayer.forEach(c => {
      if (c !== carteAPoser && c.bivalence) {
          c.bivalence(boardPlayer, c); // chaque carte réévalue le board et s'applique à la nouvelle
      }
    });
  }
  if(carteAPoser.criDeGuerre){
    carteAPoser.criDeGuerre(boardPlayer)
  }
  if(carteAPoser.criDeGuerreUnique && boardPlayer.length > 0){
    let cible = boardPlayer[Math.floor(Math.random() * boardPlayer.length)];
    carteAPoser.criDeGuerreUnique(cible);
  }
  if(carteAPoser.aura){
    carteAPoser.aura(boardPlayer)
  }
  if(carteAPoser.auraUnique){
    let auraPresent = boardPlayer.findIndex(carte => carte.aura)      
    if (auraPresent >= 0){
      let carteAura = boardPlayer.find(carte => carte.aura)
      carteAura.auraUnique(carteAPoser)
    }
  }
  if(carteAPoser.effetDeMass){
    carteAPoser.effetDeMass(carteAPoser, boardPlayer)
  }
  //ELEMENTAIRES
  //si pose Board
  if (carteAPoser.criDeGuerreTaverne && carteAPoser.nom !== "Oleiflamme flamboyant") {
    console.log(`📢 Cri de guerre activé pour ${carteAPoser.nom}`);
    carteAPoser.criDeGuerreTaverne(shopCards, bonusTourbillonDeSable, bonusAtkElem); // Effet sur tout le board
  }
  if(carteAPoser.famille === "Elementaire"){
    boardPlayer2.forEach(carte =>{
      if(carte.upSelf && carte.nom === "Roche en fusion"){
        carte.hp += 1 + bonusTourbillonDeSable
      }
    })
  }
  if(carteAPoser.famille === "Elementaire" && carteAPoser.magnetisme){
    boardPlayer2.some(carte =>{
      if(carte.famille === "Elementaire"){
        carte.atk += carteAPoser.atk + bonusAtkElem
        carte.hp += carteAPoser.hp + bonusTourbillonDeSable
        setBoardPlayer2([...boardPlayer2]);
        return true;                       
      }
    })
  }
  if (carteAPoser.famille === "Elementaire") {
    let elemDeFete = boardPlayer2.findIndex(carte => carte.nom === "Elementaire de fête")
    let eruptionDeMana = boardPlayer2.findIndex(carte => carte.nom === "Eruption de mana déchainée")
      if (elemDeFete >= 0){
        let newBoard = boardPlayer2.filter(carte => carte.nom !== "Elementaire de fête").filter(carte => carte.famille === "Elementaire")
        if(newBoard.length > 0){
          let cible = newBoard[Math.floor(Math.random() * newBoard.length)];
          cible.atk += 2 + bonusAtkElem
          cible.hp += 1 + bonusTourbillonDeSable
        }
      }
    if(eruptionDeMana >=0){
      let newBoard = boardPlayer2.filter(carte => carte.nom !== "Eruption de mana déchainée").filter(carte => carte.famille === "Elementaire")
      if(newBoard.length > 0){
        let cible = newBoard[Math.floor(Math.random() * newBoard.length)];
        cible.atk += 1 + bonusAtkElem
        cible.hp += 1 + bonusTourbillonDeSable

        let cible1 = newBoard[Math.floor(Math.random() * newBoard.length)];
        cible1.atk += 1 + bonusAtkElem
        cible1.hp += 1 + bonusTourbillonDeSable

        let cible2 = newBoard[Math.floor(Math.random() * newBoard.length)];
        cible2.atk += 1 + bonusAtkElem
        cible2.hp += 1 + bonusTourbillonDeSable
      }
    }
  }
  if (carteAPoser.nom === "Tourbillon de sable") {
    setBonusTourbillonDeSable(bonusTourbillonDeSable + 1)
    console.log(bonusTourbillonDeSable)
  }
  //Si vente

  //FIN ELEMENTAIRES     
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