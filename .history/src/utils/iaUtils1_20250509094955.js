// Nouvelle IA intelligente pour BrawlCards: Origins
import { sleep } from "@/utils/combatUtils1v1";
import { lvlUpTaverne, actualiserBoutiqueIA, getCartesPourShop, getCartesAleatoires, getNombreCartesShop, clonerCarte } from "@/utils/shopUtils";
import { addBoardPosition } from "@/utils/mecaUtils";
import {  acheterCarteIa } from "@/utils/mecaUtilsIa";

let focusFamille = null;
function applicationEffectIa(boardPlayer2, carteAPoser, setBoardPlayer2, deckPlayer2, setDeckPlayer2, setFusionAnim, shopCards, bonusTourbillonDeSable, bonusAtkElem, setBonusTourbillonDeSable){
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
                            setBoardPlayer([...boardPlayer2]);
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
    bonusTourbillonDeSable, bonusAtkElem, setBonusTourbillonDeSable
  }) {
    console.log(`🤖 Tour IA ${tourIa}`);
    
  
    if (tourIa === 1) {
      actualPlayer = 2
      const cible = shopCards.sort((a, b) => b.atk - a.atk)[0];
      console.log(cible)
      if (!cible) return;
      await sleep(2000); // attente réaliste
      acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
    }

        
}
