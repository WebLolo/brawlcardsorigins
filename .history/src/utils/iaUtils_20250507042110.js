// Nouvelle IA intelligente pour BrawlCards: Origins
import { sleep } from "@/utils/combatUtils1v1";
import { lvlUpTaverne, actualiserBoutiqueIA, getCartesPourShop, getCartesAleatoires, getNombreCartesShop, clonerCarte } from "@/utils/shopUtils";
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
    tourIa,
    setTourIa,
    setFusionAnim,
  }) {
    console.log(`🤖 Tour IA ${tourIa}`);
  
    const acheterEtJouer = async (carte) => {
      if (!carte || goldPlayer2 < 3 || boardPlayer2.length >= 7) return;
      setDeckPlayer2([carte]);
      deckPlayer2.push(carte);
      setGoldPlayer2((g) => g - 3);
      goldPlayer2 -= 3;
      let newShop = shopCards.filter((c) => c !== carte);
      setShopCards(newShop);
      shopCards = newShop;
      await sleep(1000);
      deckPlayer2.shift();
      setDeckPlayer2([]);
      await sleep(10);
      addBoardPosition(carte, boardPlayer2);
      boardPlayer2.push(carte);
      setBoardPlayer2([...boardPlayer2]);
      // Appliquer effets ici si besoin
    };
  
    if (tourIa === 1) {
        const tiragePhase = getCartesPourShop(lvlTavernePlayer2);
        const cartesPhase = getCartesAleatoires(tiragePhase, getNombreCartesShop(lvlTavernePlayer2)).map(carte => clonerCarte({ carte, camp: "shop" }));
        setShopCards(cartesPhase);
    
        if (goldPlayer2 >= 3) {
            console.log(cartesPhase)
          const cible = cartesPhase.sort((a, b) => b.atk - a.atk)[0];
          console.log(cible)
          if (!cible) return;
          await sleep(2000); // attente réaliste
          setDeckPlayer2([cible])
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          setGoldPlayer2(0)
          let newShopCards = cartesPhase.filter(c => c !== cible)
          setShopCards(newShopCards)
          await sleep(2000); // attente réaliste
          deckPlayer2.shift()
          console.log(deckPlayer2)
          setDeckPlayer2([])
          await sleep(10);
          addBoardPosition (cible, boardPlayer2)
          setBoardPlayer2([cible])
          
          boardPlayer2.push(cible)
          applicationEffectIa(boardPlayer2, cible, setBoardPlayer2, deckPlayer2, setDeckPlayer2, setFusionAnim)
          // On passe au prochain tour
          setTourIa(2);
        }
    }
      // 💡 TOUR 2 : Monter de niveau
    if (tourIa === 2) {
        await sleep(1500); // petite pause de réflexion
        lvlUpTaverne({
        goldPlayer2,
        lvlTavernePlayer2,
        setGoldPlayer2,
        setLvlTavernePlayer2,
        setShopCards,
        actualPlayer: 2,
        });
        setTourIa(3); // ✅ prêt pour le tour 3
    }
}
