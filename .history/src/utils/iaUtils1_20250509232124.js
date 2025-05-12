// Nouvelle IA intelligente pour BrawlCards: Origins
import { sleep } from "@/utils/combatUtils1v1";
import { lvlUpTaverne, actualiserBoutiqueIA, getCartesPourShop, getCartesAleatoires, getNombreCartesShop, clonerCarte } from "@/utils/shopUtils";
import { addBoardPosition } from "@/utils/mecaUtils";
import { acheterCarteIa, jouerCarteDepuisDeckIa, lvlUpTaverneIa, coutLvlTavernePlayer2, effetsApresVente} from "@/utils/mecaUtilsIa";

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
  }
  function actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards){
      const tiragePhase = getCartesPourShop(lvlTavernePlayer2);
      const cartesPhase = getCartesAleatoires(tiragePhase, getNombreCartesShop(lvlTavernePlayer2)).map(carte => clonerCarte({ carte, camp: "shop" }));
      setShopCards(cartesPhase);
      return cartesPhase
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
    bonusTourbillonDeSable, bonusAtkElem, setBonusTourbillonDeSable,
    setPopupMessage,
    fureurCelesteRefP2, setFureurCelesteP2
  }) {
  console.log(`🤖 Tour IA ${tourIa}`);
  if (tourIa === 1) {
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
      
    const cible = shopCards.sort((a, b) => b.atk - a.atk)[0];
    console.log(cible)
    if (!cible) return;
    await sleep(2000); // attente réaliste
    acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
    await sleep(2000); // attente réaliste
    deckPlayer2.push(cible)
    console.log(deckPlayer2)
    await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
    await sleep(1500); // attente réaliste
    boardPlayer2.push(cible)
    deckPlayer2.shift()
    console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
    await sleep(1500); // attente réaliste
    fightButton.classList.remove("d-none")
    setTourIa(2);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 1
  }

  if (tourIa === 2){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    console.log(goldPlayer2)
    lvlUpTaverneIa({ setShopCards, actualPlayer, goldPlayer2, lvlTavernePlayer2, setGoldPlayer2,setLvlTavernePlayer2, setPopupMessage })
    await sleep(1500); // attente réaliste
    fightButton.classList.remove("d-none")
    setTourIa(3);
  }

  if (tourIa === 3){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    const focusFamille = boardPlayer2[0].famille;
    while (goldPlayer2 > 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      console.log(planA)
      if(planA.length > 0){
        let cible = planA[0]
        acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
        shopCards = shopCards.filter((c) => c !== cible)
        goldPlayer2 = goldPlayer2 -3
        await sleep(2000); // attente réaliste
        deckPlayer2.push(cible)
        console.log(deckPlayer2)
        await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
        await sleep(1500); // attente réaliste
        boardPlayer2.push(cible)
        deckPlayer2.shift()
        console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
        await sleep(1500); // attente réaliste
      }else{
        shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
        goldPlayer2 = goldPlayer2 - 1
        setGoldPlayer2(goldPlayer2)
        await sleep(2000); // attente réaliste
      }
    }
    if(goldPlayer2 === 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      const planB = shopCards.sort((a, b) => b.atk - a.atk)
      if(planA.length > 0){
        let cible = planA[0]
        acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
        shopCards = shopCards.filter((c) => c !== cible)
        goldPlayer2 = goldPlayer2 -3
        await sleep(2000); // attente réaliste
        deckPlayer2.push(cible)
        console.log(deckPlayer2)
        await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
        await sleep(1500); // attente réaliste
        boardPlayer2.push(cible)
        deckPlayer2.shift()
        console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
        await sleep(1500); // attente réaliste
      }else if(planA.length === 0 && planB.length > 0 ){
        let cible = planB[0]
        acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
        shopCards = shopCards.filter((c) => c !== cible)
        goldPlayer2 = goldPlayer2 -3
        await sleep(2000); // attente réaliste
        deckPlayer2.push(cible)
        console.log(deckPlayer2)
        await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
        await sleep(1500); // attente réaliste
        boardPlayer2.push(cible)
        deckPlayer2.shift()
        console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
        await sleep(1500); // attente réaliste
      }
    }
    fightButton.classList.remove("d-none")
    setTourIa(4);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 1
  }
  if (tourIa === 4){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    const focusFamille = boardPlayer2[0].famille;
    while (goldPlayer2 > 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      console.log(planA)
      if(planA.length > 0){
        let cible = planA[0]
        acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
        shopCards = shopCards.filter((c) => c !== cible)
        goldPlayer2 = goldPlayer2 -3
        await sleep(2000); // attente réaliste
        deckPlayer2.push(cible)
        console.log(deckPlayer2)
        await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
        await sleep(1500); // attente réaliste
        boardPlayer2.push(cible)
        deckPlayer2.shift()
        console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
        await sleep(1500); // attente réaliste
      }else{
        shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
        goldPlayer2 = goldPlayer2 - 1
        setGoldPlayer2(goldPlayer2)
        await sleep(2000); // attente réaliste
      }
    }
    if(goldPlayer2 === 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      const planB = shopCards.sort((a, b) => b.atk - a.atk)
      if(planA.length > 0){
        let cible = planA[0]
        acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
        shopCards = shopCards.filter((c) => c !== cible)
        goldPlayer2 = goldPlayer2 -3
        await sleep(2000); // attente réaliste
        deckPlayer2.push(cible)
        console.log(deckPlayer2)
        await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
        await sleep(1500); // attente réaliste
        boardPlayer2.push(cible)
        deckPlayer2.shift()
        console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
        await sleep(1500); // attente réaliste
      }else if(planA.length === 0 && planB.length > 0 ){
        let cible = planB[0]
        acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
        shopCards = shopCards.filter((c) => c !== cible)
        goldPlayer2 = goldPlayer2 -3
        await sleep(2000); // attente réaliste
        deckPlayer2.push(cible)
        console.log(deckPlayer2)
        await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
        await sleep(1500); // attente réaliste
        boardPlayer2.push(cible)
        deckPlayer2.shift()
        console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
        await sleep(1500); // attente réaliste
      }
    }
    fightButton.classList.remove("d-none")
    setTourIa(5);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 2
  }
  if (tourIa === 5){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    const focusFamille = boardPlayer2[0].famille;
    let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
    const planB = shopCards.sort((a, b) => b.atk - a.atk)
    if(planA.length > 0){
      let cible = planA[0]
      acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
      shopCards = shopCards.filter((c) => c !== cible)
      goldPlayer2 = goldPlayer2 -3
      await sleep(2000); // attente réaliste
      deckPlayer2.push(cible)
      console.log(deckPlayer2)
      await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
      await sleep(1500); // attente réaliste
      boardPlayer2.push(cible)
      deckPlayer2.shift()
      console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
      await sleep(1500); // attente réaliste
    }else if(planA.length === 0 && planB.length > 0 ){
      let cible = planB[0]
      acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
      shopCards = shopCards.filter((c) => c !== cible)
      goldPlayer2 = goldPlayer2 -3
      await sleep(2000); // attente réaliste
      deckPlayer2.push(cible)
      console.log(deckPlayer2)
      await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
      await sleep(1500); // attente réaliste
      boardPlayer2.push(cible)
      deckPlayer2.shift()
      console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
      await sleep(1500); // attente réaliste
    }
    lvlUpTaverneIa({ setShopCards, actualPlayer, goldPlayer2, lvlTavernePlayer2, setGoldPlayer2,setLvlTavernePlayer2, setPopupMessage })
    await sleep(1500); // attente réaliste
    fightButton.classList.remove("d-none")
    setTourIa(6);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 1
  }
  if (tourIa === 6){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    const focusFamille = boardPlayer2[0].famille;
    while (goldPlayer2 > 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      console.log(planA)
      if(planA.length > 0){
        let cible = planA[0]
        acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
        shopCards = shopCards.filter((c) => c !== cible)
        goldPlayer2 = goldPlayer2 -3
        await sleep(2000); // attente réaliste
        deckPlayer2.push(cible)
        console.log(deckPlayer2)
        await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
        await sleep(1500); // attente réaliste
        boardPlayer2.push(cible)
        deckPlayer2.shift()
        console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
        await sleep(1500); // attente réaliste
      }else{
        shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
        goldPlayer2 = goldPlayer2 - 1
        setGoldPlayer2(goldPlayer2)
        await sleep(2000); // attente réaliste
      }
    }
    if(goldPlayer2 === 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      const planB = shopCards.sort((a, b) => b.atk - a.atk)
      if(planA.length > 0){
        let cible = planA[0]
        acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
        shopCards = shopCards.filter((c) => c !== cible)
        goldPlayer2 = goldPlayer2 -3
        await sleep(2000); // attente réaliste
        deckPlayer2.push(cible)
        console.log(deckPlayer2)
        await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
        await sleep(1500); // attente réaliste
        boardPlayer2.push(cible)
        deckPlayer2.shift()
        console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
        await sleep(1500); // attente réaliste
      }else if(planA.length === 0 && planB.length > 0 ){
        let cible = planB[0]
        acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
        shopCards = shopCards.filter((c) => c !== cible)
        goldPlayer2 = goldPlayer2 -3
        await sleep(2000); // attente réaliste
        deckPlayer2.push(cible)
        console.log(deckPlayer2)
        await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
        await sleep(1500); // attente réaliste
        boardPlayer2.push(cible)
        deckPlayer2.shift()
        console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
        await sleep(1500); // attente réaliste
      }
    }
    fightButton.classList.remove("d-none")
    setTourIa(7);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 2
  }
  if (tourIa === 7){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    const focusFamille = boardPlayer2[0].famille;
    let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
    const planB = shopCards.sort((a, b) => b.atk - a.atk)
    if(planA.length > 0){
      if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            effetsApresVente (poubelle1[0], boardPlayer2)
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            effetsApresVente (poubelle2[0], boardPlayer2)
            await sleep(800)
          }
        }
      if(boardPlayer2.length < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }
    }
    lvlUpTaverneIa({ setShopCards, actualPlayer, goldPlayer2, lvlTavernePlayer2, setGoldPlayer2,setLvlTavernePlayer2, setPopupMessage })
    await sleep(1500); // attente réaliste
    fightButton.classList.remove("d-none")
    setTourIa(8);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 1
  }
  if (tourIa === 8){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    const focusFamille = boardPlayer2[0].famille;
    while (goldPlayer2 > 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      console.log(planA)
      if(planA.length > 0){
        if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
        if(boardPlayer2.length < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }  
      }else{
        shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
        goldPlayer2 = goldPlayer2 - 1
        setGoldPlayer2(goldPlayer2)
        await sleep(2000); // attente réaliste
      }
    }
    if(goldPlayer2 === 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      if(planA.length > 0){
        if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
        if(boardPlayer2 < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }
      }else {
        console.log("fini")
      }
    }
    fightButton.classList.remove("d-none")
    setTourIa(9);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 1
  }
  if (tourIa === 9){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    const focusFamille = boardPlayer2[0].famille;
    while (goldPlayer2 > 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      console.log(planA)
      if(planA.length > 0){
        if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
        if(boardPlayer2.length < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }  
      }else{
        shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
        goldPlayer2 = goldPlayer2 - 1
        setGoldPlayer2(goldPlayer2)
        await sleep(2000); // attente réaliste
      }
    }
    if(goldPlayer2 === 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      if(planA.length > 0){
        if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
        if(boardPlayer2 < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }
      }else {
        console.log("fini")
      }
    }
    fightButton.classList.remove("d-none")
    setTourIa(10);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 2
  }
  if (tourIa === 10){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    const focusFamille = boardPlayer2[0].famille;
    let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
    const planB = shopCards.sort((a, b) => b.atk - a.atk)
    if(planA.length > 0){
      if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair" && c.nom !== "Fracasseur de météorites")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
      if(boardPlayer2.length < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }
    }
    lvlUpTaverneIa({ setShopCards, actualPlayer, goldPlayer2, lvlTavernePlayer2, setGoldPlayer2,setLvlTavernePlayer2, setPopupMessage })
    await sleep(1500); // attente réaliste
    fightButton.classList.remove("d-none")
    setTourIa(11);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 1
  }
  if (tourIa === 11){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    const focusFamille = boardPlayer2[0].famille;
    while (goldPlayer2 > 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      console.log(planA)
      if(planA.length > 0){
        if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
        if(boardPlayer2.length < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }  
      }else{
        shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
        goldPlayer2 = goldPlayer2 - 1
        setGoldPlayer2(goldPlayer2)
        await sleep(2000); // attente réaliste
      }
    }
    if(goldPlayer2 === 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      if(planA.length > 0){
        if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
        if(boardPlayer2 < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }
      }else {
        console.log("fini")
      }
    }
    fightButton.classList.remove("d-none")
    setTourIa(12);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 1
  }
  if (tourIa === 12){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    const focusFamille = boardPlayer2[0].famille;
    while (goldPlayer2 > 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      console.log(planA)
      if(planA.length > 0){
        if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
        if(boardPlayer2.length < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }  
      }else{
        shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
        goldPlayer2 = goldPlayer2 - 1
        setGoldPlayer2(goldPlayer2)
        await sleep(2000); // attente réaliste
      }
    }
    if(goldPlayer2 === 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      if(planA.length > 0){
        if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
        if(boardPlayer2 < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }
      }else {
        console.log("fini")
      }
    }
    fightButton.classList.remove("d-none")
    setTourIa(13);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 2
  }
  if (tourIa === 13){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    const focusFamille = boardPlayer2[0].famille;
    let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
    const planB = shopCards.sort((a, b) => b.atk - a.atk)
    if(planA.length > 0){
      if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
      if(boardPlayer2.length < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }
    }
    lvlUpTaverneIa({ setShopCards, actualPlayer, goldPlayer2, lvlTavernePlayer2, setGoldPlayer2,setLvlTavernePlayer2, setPopupMessage })
    await sleep(1500); // attente réaliste
    fightButton.classList.remove("d-none")
    setTourIa(14);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 1
  }
  if (tourIa === 14){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    const focusFamille = boardPlayer2[0].famille;
    while (goldPlayer2 > 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      console.log(planA)
      if(planA.length > 0){
        if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
        if(boardPlayer2.length < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }  
      }else{
        shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
        goldPlayer2 = goldPlayer2 - 1
        setGoldPlayer2(goldPlayer2)
        await sleep(2000); // attente réaliste
      }
    }
    if(goldPlayer2 === 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      if(planA.length > 0){
        if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
        if(boardPlayer2 < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }
      }else {
        console.log("fini")
      }
    }
    fightButton.classList.remove("d-none")
    setTourIa(15);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 1
  }
  if (tourIa === 15){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    const focusFamille = boardPlayer2[0].famille;
    while (goldPlayer2 > 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      console.log(planA)
      if(planA.length > 0){
        if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
        if(boardPlayer2.length < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }  
      }else{
        shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
        goldPlayer2 = goldPlayer2 - 1
        setGoldPlayer2(goldPlayer2)
        await sleep(2000); // attente réaliste
      }
    }
    if(goldPlayer2 === 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      if(planA.length > 0){
        if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
        if(boardPlayer2 < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }
      }else {
        console.log("fini")
      }
    }
    fightButton.classList.remove("d-none")
    setTourIa(16);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 1
  }
  if (tourIa === 16){
    let fightButton = document.querySelector(".fight")
    fightButton.classList.add("d-none")
    let actualPlayer = 2
    shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
    await sleep(2000); // attente réaliste
    const focusFamille = boardPlayer2[0].famille;
    while (goldPlayer2 > 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      console.log(planA)
      if(planA.length > 0){
        if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
        if(boardPlayer2.length < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }  
      }else{
        shopCards = actualiserBoutiqueIa(lvlTavernePlayer2, setShopCards)
        goldPlayer2 = goldPlayer2 - 1
        setGoldPlayer2(goldPlayer2)
        await sleep(2000); // attente réaliste
      }
    }
    if(goldPlayer2 === 3){
      let planA = shopCards.filter((c) => c.famille === focusFamille).sort((a, b) => b.lvl - a.lvl).sort((a, b) => b.atk - a.atk);
      if(planA.length > 0){
        if(boardPlayer2.length === 7){
          let poubelle1 = boardPlayer2.filter((c) => c.famille !== focusFamille)
          let poubelle2 = boardPlayer2.filter((c) => c.famille === focusFamille && c.nom !== "Roche en fusion" && c.nom !== "Totem d'Agitation Céleste" && c.nom !== "Drozha l'essoreuse d'os" && c.nom !== "Cyclone crépitant" && c.nom !== "Muk'Zar la Ravineuse" && c.nom !== "Elwyn la Souffleuse de brume" && c.nom !== "Elementaire du feu de brousse" && c.nom !== "Fracture-Éclair Rhakka" && c.nom !== "Totem de l'Étincelle Sage" && c.nom !== "Ka'Rasha la Lieuse d'Esprits" && c.nom !== "Vessalyn, Chuchoteuse d'Ailes"  && c.nom !== "Brise-Nuées Rekkha" && c.nom !== "Totem de Canalisation Céleste" && c.nom !== "Grûm le Sculpteur de Crocs" && c.nom !== "Méllua la Feuille Dansante" && c.nom !== "Totem-Runique de Lointanclair")
          if(poubelle1.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle1[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }else if(poubelle1.length === 0 && poubelle2.length > 0){
            let newBoardP2 = boardPlayer2.filter((c) => c !== poubelle2[0])
            setBoardPlayer2([ ...newBoardP2 ])
            boardPlayer2 = newBoardP2
            setGoldPlayer2(goldPlayer2 + 1)
            goldPlayer2 = goldPlayer2 + 1
            await sleep(800)
          }
        }
        if(boardPlayer2 < 7){
          let cible = planA[0]
          acheterCarteIa({ cible, goldPlayer2, goldPlayer2, deckPlayer2, setDeckPlayer2, shopCards, setShopCards, lvlTavernePlayer2, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage })
          shopCards = shopCards.filter((c) => c !== cible)
          goldPlayer2 = goldPlayer2 -3
          await sleep(2000); // attente réaliste
          deckPlayer2.push(cible)
          console.log(deckPlayer2)
          await jouerCarteDepuisDeckIa (cible, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage, shopCards, setBonusTourbillonDeSable, bonusTourbillonDeSable, bonusAtkElem, fureurCelesteRefP2, setFureurCelesteP2)
          await sleep(1500); // attente réaliste
          boardPlayer2.push(cible)
          deckPlayer2.shift()
          console.log("deck:", deckPlayer2 ,"board:", boardPlayer2)
          await sleep(1500); // attente réaliste
        }
      }else {
        console.log("fini")
      }
    }
    fightButton.classList.remove("d-none")
    setTourIa(17);
    coutLvlTavernePlayer2[lvlTavernePlayer2] = coutLvlTavernePlayer2[lvlTavernePlayer2] - 1
  }
       
}
