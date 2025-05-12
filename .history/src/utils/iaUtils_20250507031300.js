// Nouvelle IA intelligente pour BrawlCards: Origins
import { applicationEffectIa } from "@/utils/applicationEffectIa";
import { sleep } from "@/utils/combatUtils1v1";
import { lvlUpTaverne, actualiserBoutiqueIA } from "@/utils/shopUtils1v1";
import { addBoardPosition } from "@/utils/mecaUtils";

let focusFamille = null;
function applicationEffectIa(boardPlayer2, carteAPoser, setBoardPlayer2, deckPlayer2, setDeckPlayer2, setFusionAnim){
    const nouveauBoard = [...boardPlayer2]
    const marinsB = nouveauBoard.filter(c => c.sousFamille === "Marin").length;
    const terrestresB = nouveauBoard.filter(c => c.sousFamille === "Terrestre").length;
    if(marinsB > terrestresB && carteAPoser.sousFamille === "Marin"){
      carteAPoser.bivalenceMarinEffect = true
      nouveauBoard.forEach(carte => {
        if(carte.nom === "Tor'Grag des Profondeurs"){
          carte.furieUse = true
          carte.provocationUse = false
        }
        if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
          carte.degatsAdj = true
          carte.furieUse = false
        }
        if(carte.nom === "Zûn'Tul, le Mange-Racines"){
          carte.furieUse = true
          carte.provocationUse = false
        }
      })
    }
    if(marinsB > terrestresB && carteAPoser.sousFamille === "Terrestre"){
      carteAPoser.bivalenceTerrestreEffect = false
      nouveauBoard.forEach(carte => {
        if(carte.nom === "Tor'Grag des Profondeurs"){
          carte.furieUse = true
          carte.provocationUse = false
        }
        if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
          carte.degatsAdj = true
          carte.furieUse = false
        }
        if(carte.nom === "Zûn'Tul, le Mange-Racines"){
          carte.furieUse = true
          carte.provocationUse = false
        }
      })
    }
    if(marinsB < terrestresB && carteAPoser.sousFamille === "Marin"){
      carteAPoser.bivalenceMarinEffect = false
      nouveauBoard.forEach(carte => {
        if(carte.nom === "Tor'Grag des Profondeurs"){
          carte.furieUse = false
          carte.provocationUse = true
        }
        if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
          carte.degatsAdj = false
          carte.furieUse = true
        }
        if(carte.nom === "Zûn'Tul, le Mange-Racines"){
          carte.furieUse = false
          carte.provocationUse = true
        }
      })
    }
    if(marinsB < terrestresB && carteAPoser.sousFamille === "Terrestre"){
      carteAPoser.bivalenceTerrestreEffect = true
      nouveauBoard.forEach(carte => {
        if(carte.nom === "Tor'Grag des Profondeurs"){
          carte.furieUse = false
          carte.provocationUse = true
        }
        if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
          carte.degatsAdj = false
          carte.furieUse = true
        }
        if(carte.nom === "Zûn'Tul, le Mange-Racines"){
          carte.furieUse = false
          carte.provocationUse = true
        }
      })
    }
    if(marinsB === terrestresB && carteAPoser.sousFamille === "Marin"){
      carteAPoser.bivalenceMarinEffect = true
      nouveauBoard.forEach(carte => {
        if(carte.nom === "Tor'Grag des Profondeurs"){
          carte.furieUse = true
          carte.provocationUse = true
        }
        if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
          carte.degatsAdj = true
          carte.furieUse = true
        }
        if(carte.nom === "Zûn'Tul, le Mange-Racines"){
          carte.furieUse = true
          carte.provocationUse = true
        }
      })
    }
    if(marinsB === terrestresB && carteAPoser.sousFamille === "Terrestre"){
      carteAPoser.bivalenceTerrestreEffect = true
      nouveauBoard.forEach(carte => {
        if(carte.nom === "Tor'Grag des Profondeurs"){
          carte.furieUse = true
          carte.provocationUse = true
        }
        if(carte.nom === "Vrak'Nul le Hurleur des Cimes"){
          carte.degatsAdj = true
          carte.furieUse = true
        }
        if(carte.nom === "Zûn'Tul, le Mange-Racines"){
          carte.furieUse = true
          carte.provocationUse = true
        }
      })
    }
    if(carteAPoser.bivalence){
      carteAPoser.bivalence(boardPlayer2)
      // Faire réagir les autres cartes à l’arrivée de celle-ci
      boardPlayer2.forEach(c => {
          if (c !== carteAPoser && c.bivalence) {
              c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
          }
      });
    }else{
      // Faire réagir les autres cartes à l’arrivée de celle-ci
      boardPlayer2.forEach(c => {
          if (c !== carteAPoser && c.bivalence) {
              c.bivalence(boardPlayer2, c); // chaque carte réévalue le board et s'applique à la nouvelle
          }
      });
    }
    if(carteAPoser.criDeGuerre){
      carteAPoser.criDeGuerre(boardPlayer2)
    }
    if(carteAPoser.criDeGuerreUnique && boardPlayer2.length > 0){
      let cible = boardPlayer2[Math.floor(Math.random() * boardPlayer2.length)];
      carteAPoser.criDeGuerreUnique(cible);
    }
    if(carteAPoser.aura){
      carteAPoser.aura(boardPlayer2)
    }
    if(carteAPoser.auraUnique){
      let auraPresent = boardPlayer2.findIndex(carte => carte.aura)
            
      if (auraPresent >= 0){
          let carteAura = boardPlayer2.find(carte => carte.aura)
          carteAura.auraUnique(carteAPoser)
      }
    }
    if(carteAPoser.effetDeMass){
      carteAPoser.effetDeMass(carteAPoser, boardPlayer2)
    }
  }

export async function TourIa({
  goldPlayer2,
  setGoldPlayer2,
  shopCards,
  setShopCards,
  deckPlayer2,
  setDeckPlayer2,
  lvlTavernePlayer2,
  setLvlTavernePlayer2,
  boardPlayer2,
  setBoardPlayer2,
  jouerCarteDepuisDeck,
  tourIa,
  setTourIa,
  setFusionAnim,
}) {
  console.log(`🤖 Tour IA ${tourIa}`);
  
  const acheterEtJouer = async (carte) => {
    setDeckPlayer2([carte]);
    deckPlayer2.push(carte);
    setGoldPlayer2((g) => g - 3);
    let newShop = shopCards.filter((c) => c !== carte);
    setShopCards(newShop);
    shopCards = newShop;
    await sleep(600);
    deckPlayer2.shift();
    setDeckPlayer2([]);
    await sleep(10);
    addBoardPosition(carte, boardPlayer2);
    boardPlayer2.push(carte);
    setBoardPlayer2([...boardPlayer2]);
    applicationEffectIa(boardPlayer2, carte, setBoardPlayer2, deckPlayer2, setDeckPlayer2, setFusionAnim);
  };

  // 💡 Tour 1 : Acheter une carte (définit le focus)
  if (tourIa === 1) {
    const meilleures = [...shopCards].sort((a, b) => b.atk - a.atk);
    const carte = meilleures[0];
    if (!carte || goldPlayer2 < 3) return;
    focusFamille = carte.famille;
    console.log("🎯 Focus choisi:", focusFamille);
    await acheterEtJouer(carte);
    setTourIa(2);
    return;
  }

  // 💡 Tour 2 : Monter taverne
  if (tourIa === 2) {
    await sleep(800);
    lvlUpTaverne({ goldPlayer2, lvlTavernePlayer2, setGoldPlayer2, setLvlTavernePlayer2, setShopCards, actualPlayer: 2 });
    setTourIa(3);
    return;
  }

  // 💡 Tours 3 et 4 : Acheter selon focus
  if (tourIa === 3 || tourIa === 4) {
    while (goldPlayer2 >= 3 && boardPlayer2.length < 7) {
      const choix = shopCards.filter((c) => c.famille === focusFamille);
      const carte = choix[0] || shopCards[0];
      if (!carte) break;
      await acheterEtJouer(carte);
    }
    setTourIa(tourIa + 1);
    return;
  }

  // 💡 Tour 5, 7, 10, 13 : Monter taverne + acheter 1 carte
  const palier = [5, 7, 10, 13];
  if (palier.includes(tourIa)) {
    await sleep(600);
    lvlUpTaverne({ goldPlayer2, lvlTavernePlayer2, setGoldPlayer2, setLvlTavernePlayer2, setShopCards, actualPlayer: 2 });
    goldPlayer2 -= 5; // coût max lvl up
    const carte = shopCards.find((c) => c.famille === focusFamille) || shopCards[0];
    if (goldPlayer2 >= 3 && carte) {
      await acheterEtJouer(carte);
    }
    setTourIa(tourIa + 1);
    return;
  }

  // 💡 À partir du tour 14 : IA autonome
  if (tourIa >= 14) {
    while (goldPlayer2 >= 3 && boardPlayer2.length < 7) {
      let cible = shopCards.find((c) => c.famille === focusFamille);
      if (!cible) {
        shopCards = actualiserBoutiqueIA({ lvlTavernePlayer2, setShopCards, goldPlayer2, actualPlayer: 2, setGoldPlayer2 });
        setGoldPlayer2((g) => g - 1);
        goldPlayer2--;
        await sleep(300);
        continue;
      }
      await acheterEtJouer(cible);
    }
    setTourIa(tourIa + 1);
  }
}
