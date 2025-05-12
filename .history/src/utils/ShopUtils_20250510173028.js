import { cards, getUniqueId } from "@/data/cardsData";
export const coutLvlTaverne = {
    1: 5,
    2: 7,
    3: 8,
    4: 10,
    5: 10,
};
export const coutLvlTavernePlayer2 = {
    1: 5,
    2: 7,
    3: 8,
    4: 10,
    5: 10,
};
export const clonerCarte = ({ carte, camp }) => {
    return {
        id: getUniqueId(), // Génère un ID unique
        nom: carte.nom,
        hp: carte.hp, // PV actuels
        hpCombat: carte.hp,
        atk: carte.atk, // ATK actuelle
        lvl: carte.lvl,
        img: carte.img,
        texte: carte.texte !== undefined ? carte.texte : null,
        imgMinia: carte.imgMinia,
        imgMiniaProvoc: carte.imgMiniaProvoc,
        imgMiniaBouclier: carte.imgMiniaBouclier,
        imgMiniaProvocBouclier: carte.imgMiniaProvocBouclier,
        baseHp: carte.baseHp !== undefined ? carte.baseHp : carte.hp,
        baseAtk: carte.baseAtk !== undefined ? carte.baseAtk : carte.atk,
        buffHp: carte.buffHp !== undefined ? carte.buffHp : 0,
        buffAtk: carte.buffAtk !== undefined ? carte.buffAtk : 0,
        buffHpBivalence: carte.buffHpBivalence !== undefined ? carte.buffHpBivalence : 0,
        buffAtkBivalence: carte.buffAtkBivalence !== undefined ? carte.buffAtkBivalence : 0,
        bivalenceEffect: carte.bivalenceEffect !== undefined ? carte.bivalenceEffect : false,
        oneTicCible: carte.oneTicCible !== undefined ? carte.oneTicCible : false,
        atkDispo: false,
        auraEffect: carte.auraEffect !== undefined ? carte.auraEffect : false,
        auraVynthaEffect: carte.auraVynthaEffect !== undefined ? carte.auraVynthaEffect : false,
        criDeGuerre: carte.criDeGuerre ? (cartesBoard) => carte.criDeGuerre(cartesBoard) : null,
        criDeGuerreUnique: carte.criDeGuerreUnique ? (carteAleatoire, bonusTourbillonDeSable, bonusAtkElem) => carte.criDeGuerreUnique(carteAleatoire, bonusTourbillonDeSable, bonusAtkElem) : null,
        criDeGuerreUniqueBouclier: carte.criDeGuerreUniqueBouclier ? (carteAleatoire) => carte.criDeGuerreUniqueBouclier(carteAleatoire) : null,
        criDeGuerreUniqueSelf: carte.criDeGuerreUniqueSelf ? (self, board) => carte.criDeGuerreUniqueSelf(self, board) : null,
        poteLa: carte.poteLa ? (cartesBoard) => carte.poteLa(cartesBoard) : null,
        sangNoble: carte.sangNoble ? (cartesBoard) => carte.sangNoble(cartesBoard) : null,
        aura: carte.aura ? (cartesBoard) => carte.aura(cartesBoard) : null,
        auraSell: carte.auraSell ? (cartesBoard) => carte.auraSell(cartesBoard) : null,
        auraUnique: carte.auraUnique ? (cartesBoard) => carte.auraUnique(cartesBoard) : null,
        effetDeMass: carte.effetDeMass || null,
        aoe: carte.aoe ? (cartesBoard) => carte.aoe(cartesBoard) : null,
        aoeCible: carte.aoeCible ? (cartesBoard) => carte.aoeCible(cartesBoard) : null,
        aoeCibleApresCombat: carte.aoeCibleApresCombat ? (cartesBoard) => carte.aoeCibleApresCombat(cartesBoard) : null,
        oneTicDebutCombat: carte.oneTicDebutCombat ? (carteCible, carteSource) => carte.oneTicDebutCombat(carteCible, carteSource) : null,
        oneTicPendantCombat: carte.oneTicPendantCombat ? (carteCible, carteSource) => carte.oneTicPendantCombat(carteCible, carteSource) : null,
        bivalence: carte.bivalence ? (cartesBoard) => carte.bivalence(cartesBoard) : null,
        bivalenceSell: carte.bivalenceSell ? (cartesBoard) => carte.bivalenceSell(cartesBoard) : null,
        deathTrigger: carte.deathTrigger ? (mortCarte, cartesBoard, self) => carte.deathTrigger(mortCarte, cartesBoard, self) : null,
        evanescence: carte.evanescence ? (cartesBoard, card) => carte.evanescence(cartesBoard, card) : null,
        effetDeCouple: carte.effetDeCouple ? { ...carte.effetDeCouple } : null,
        effetApplique: carte.effetApplique || false, // ✅ Conserve l'état de l'effet
        camp: camp, // ✅ Ajout du camp
        famille: carte.famille,
        sousFamille: carte.sousFamille !== undefined ? carte.sousFamille : null,
        bivalenceMarinEffect: carte.bivalenceMarinEffect !== undefined ? carte.bivalenceMarinEffect : false,
        bivalenceTerrestreEffect: carte.bivalenceTerrestreEffect !== undefined ? carte.bivalenceTerrestreEffect : false,
        piocherCarte: carte.piocherCarte !== undefined ? carte.piocherCarte : false,
        piocherCarteInf: carte.piocherCarteInf !== undefined ? carte.piocherCarteInf : false,
        piocherCarteSpe: carte.piocherCarteSpe !== undefined ? carte.piocherCarteSpe : false,
        piocherCarteApresVente: carte.piocherCarteApresVente !== undefined ? carte.piocherCarteApresVente : false,
        piocherCarteSpeApresVente: carte.piocherCarteSpeApresVente !== undefined ? carte.piocherCarteSpeApresVente : false,
        boardPosition: carte.boardPosition !== undefined ? carte.boardPosition : carte.boardPosition,
        carteSpe: carte.carteSpe !== undefined ? carte.carteSpe : null,
        bivalenceSources : carte.bivalenceSources !== undefined ? carte.bivalenceSources : [] ,
        provocation: carte.provocation !== undefined ? carte.provocation : false,
        furie: carte.furie !== undefined ? carte.furie : false,
        provocationUse: carte.provocationUse !== undefined ? carte.provocationUse : false,
        bouclier: carte.bouclier !== undefined ? carte.bouclier : false,
        bouclierUse: carte.bouclierUse !== undefined ? carte.bouclierUse : false,
        furieUse: carte.furieUse !== undefined ? carte.furieUse : false,
        degatsAdj: carte.degatsAdj !== undefined ? carte.degatsAdj : false,
        reincarnation: carte.reincarnation !== undefined ? carte.reincarnation : false,
        gainOr: carte.gainOr !== undefined ? carte.gainOr : null,
        control: carte.control !== undefined ? carte.control : false,
        estDoree: carte.estDoree !== undefined ? carte.estDoree : false,
  
        criDeGuerreTaverne: carte.criDeGuerreTaverne ? (shopCards, bonusTourbillonDeSable, bonusAtkElem) => carte.criDeGuerreTaverne(shopCards, bonusTourbillonDeSable, bonusAtkElem) : null,
        upSelf: carte.upSelf !== undefined ? carte.upSelf : false,
        decomptePioche: carte.decomptePioche !== undefined ? carte.decomptePioche : null,
        magnetisme: carte.magnetisme !== undefined ? carte.magnetisme : null,
        piocherCarteFamille: carte.piocherCarteFamille !== undefined ? carte.piocherCarteFamille : false,
        imgProjectile: carte.imgProjectile !== undefined ? carte.imgProjectile : false,
        vaFusionner: carte.vaFusionner !== undefined ? carte.vaFusionner : false,

        criCeleste: carte.criCeleste !== undefined ? carte.criCeleste : false,
        criCeleste2: carte.criCeleste2 !== undefined ? carte.criCeleste2 : false,
        fureurCeleste3Self: carte.fureurCeleste3Self ? (self, fureurValue) => carte.fureurCeleste3Self(self, fureurValue) : null,
        deathFureur: carte.deathFureur !== undefined ? carte.deathFureur : false,
        criFureurCeleste3SelfFight : carte.criFureurCeleste3SelfFight ? (self,fureurValue) => carte.criFureurCeleste3SelfFight(self,fureurValue) : null,
        fureurCeleste3OneRandom: carte.fureurCeleste3OneRandom ? (cible, fureurValue, setter) => carte.fureurCeleste3OneRandom(cible, fureurValue) : null,
        touchFureur: carte.touchFureur !== undefined ? carte.touchFureur : false,
        touchFureur2: carte.touchFureur2 !== undefined ? carte.touchFureur2 : false,
        touchFureur3: carte.touchFureur3 !== undefined ? carte.touchFureur3 : false,
        fureurCeleste3OneRandomDef: carte.fureurCeleste3OneRandomDef ? (cible, fureurValue) => carte.fureurCeleste3OneRandomDef(cible, fureurValue) : null,
        fureurCeleste5AllDef: carte.fureurCeleste5AllDef ? (board, fureurValue) => carte.fureurCeleste5AllDef(board, fureurValue) : null,
        fureurCeleste3All: carte.fureurCeleste3All ? (board, fureurValue) => carte.fureurCeleste3All(board, fureurValue) : null,
        fureurCeleste5All: carte.fureurCeleste5All ? (board, fureurValue) => carte.fureurCeleste5All(board, fureurValue) : null,
        fureurCeleste7All: carte.fureurCeleste7All ? (board, fureurValue) => carte.fureurCeleste7All(board, fureurValue) : null,
        criFureurCeleste5SelfFight: carte.criFureurCeleste5SelfFight ? (self,fureurValue) => carte.criFureurCeleste5SelfFight(self,fureurValue) : null,
        criFureurCeleste5AllFight: carte.criFureurCeleste5AllFight ? (board, attaquant, fureurValue) => carte.criFureurCeleste5AllFight(board, attaquant, fureurValue) : null,
        criFureurCeleste7AllFight: carte.criFureurCeleste7AllFight ? (board, attaquant, fureurValue) => carte.criFureurCeleste7AllFight(board, attaquant, fureurValue) : null,
    };
}

export const getCartesPourShop = (niveauTaverne) => {
    return cards.filter((c) => c.lvl <= niveauTaverne && c.famille !== "Sort");
};
export const getCartesSortsPourShop = (niveauTaverne) => {
    return cards.filter((c) => c.lvl <= niveauTaverne && c.famille === "Sort");
};

export const getCartesAleatoires = (liste, nombre) => {
    return [...liste].sort(() => 0.5 - Math.random()).slice(0, nombre);
};

export const getNombreCartesShop = (lvl) => {
    if (lvl === 1) return 3;
    if (lvl === 2 || lvl === 3) return 4;
    if (lvl === 4 || lvl === 5) return 5;
    return 6;
};
export const getNombreCartesSortsShop = (lvl) => {
    if (lvl === 1 || lvl === 2) return 1;
    if (lvl === 3 || lvl === 4 || lvl === 5) return 2;
    return 3;
};

export const actualiserBoutique = ({ lvlTaverne, setShopCards, gold, setGold, actualPlayer, goldPlayer2, lvlTavernePlayer2, setGoldPlayer2, shopCards, setPopupMessage }) => {
    if(actualPlayer === 1){
      if (gold < 1) {
        setPopupMessage("💰 Pas assez d'or !");
        return;
      }
      const tirage = getCartesPourShop(lvlTaverne);
      const cartes = getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne)).map(carte => clonerCarte({ carte, camp: "shop" }));;
      const tirageSorts = getCartesSortsPourShop(lvlTaverne);
      const Sorts = getCartesAleatoires(tirageSorts, getNombreCartesSortsShop(lvlTaverne)).map(carte => clonerCarte({ carte, camp: "shop" }));;
      
      const cartesEtSorts = cartes + Sorts
      console.log(cartesEtSorts)
      setShopCards(cartesEtSorts);
      setGold(gold - 1)
      
    }
    if(actualPlayer === 2){
      if (goldPlayer2 < 1) {
        setPopupMessage("💰 Pas assez d'or !");
        return;
      }
      const tirage = getCartesPourShop(lvlTavernePlayer2);
      const cartes = getCartesAleatoires(tirage, getNombreCartesShop(lvlTavernePlayer2)).map(carte => clonerCarte({ carte, camp: "shop" }));;
      setShopCards(cartes);
      setGoldPlayer2(goldPlayer2 - 1)
      
    }
  
};

export const lvlUpTaverne = ({ gold, lvlTaverne, setGold, setLvlTaverne, setShopCards, actualPlayer, goldPlayer2, lvlTavernePlayer2, setGoldPlayer2,setLvlTavernePlayer2, setPopupMessage }) => {
  
    if(actualPlayer === 1){
      const cout = coutLvlTaverne[lvlTaverne];
      if (gold < cout) {
        setPopupMessage("💰 Pas assez d'or pour monter de niveau !");
        return;
      }
    
      if (lvlTaverne >= 6) {
        setPopupMessage("🔒 Niveau max atteint !");
        return;
      }
    
      const nouveauLvl = lvlTaverne + 1;
      setGold(gold - cout);
      setLvlTaverne(nouveauLvl);
    
      const tirage = getCartesPourShop(nouveauLvl);
      const cartes = getCartesAleatoires(tirage, getNombreCartesShop(nouveauLvl))
        .map(carte => clonerCarte({ carte, camp: "shop" }));
    
      setShopCards(cartes);
    }
    if(actualPlayer === 2){
      const cout = coutLvlTavernePlayer2[lvlTavernePlayer2];
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
export const jouerCarteDepuisDeck = (card, boardPlayer, setDeck, deck, addBoardPosition, setBoardPlayer, setPopupMessage) => {
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

export const vendreCarteDuBoard = (card, boardPlayer, setBoardPlayer, setGold, gold) => {
  const vessalyn = boardPlayer.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
      boardPositionSell(card, boardPlayer)
      setBoardPlayer(boardPlayer.filter((c) => c.id !== card.id));
      if(card.gainOr){
        if(vessalyn.length > 0){
          setGold(gold + 1 + card.gainOr * 2)
        }else{
          setGold(gold + 1 + card.gainOr)
        }
          
      }else{
          setGold(gold + 1);
      }
};

export const acheterCarte = ({ card, gold, setGold, deck, setDeck, shopCards, setShopCards, lvlTaverne, actualPlayer, goldPlayer2, deckPlayer2, setGoldPlayer2,setDeckPlayer2, setPopupMessage }) => {
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
    setDeck([...deck, card]);
    setShopCards(shopCards.filter((c) => c.id !== card.id));
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
    setDeckPlayer2([...deckPlayer2, card]);
    setShopCards(shopCards.filter((c) => c.id !== card.id));
  }

};

export function fusionnerCartesIdentiques({ carteBase, deck, board, setDeck, setBoard, clone, setFusionAnim, setFusionAnimation, draggedCard }) {
        
  // 1. Regrouper toutes les cartes du joueur
  const toutesCartes = [...deck, ...board];
  
  // 2. Trouver les copies par nom
  let copies = toutesCartes.filter(c => c.nom === carteBase.nom).sort((a, b) => b.hp - a.hp).sort((a, b) => b.atk - a.atk);
  let bestCopie = copies.filter(c => c.bouclier === true || c.provocation === true)
  copies.forEach(card => {
    card.vaFusionner = true
  })
  
  
  if(clone){
      // 3. Si 3 copies ou plus => fusion
      const toutesCartesAvecClone = [...toutesCartes, clone];
      const copiesclone = toutesCartesAvecClone.filter(c => c.nom === clone.nom).sort((a, b) => b.hp - a.hp).sort((a, b) => b.atk - a.atk);         
  if (copiesclone.length >= 3) {    
    console.log(`✨ Fusion de 3 cartes ${clone.nom} en carte dorée !`);
    // 4. Créer la carte dorée
    const carteDoree = {
      ...copiesclone[0],
      hp: copiesclone[0].hp * 2,
      atk: copiesclone[0].atk * 2,
      estDoree: true,
      nom: `${carteBase.nom} ✨`, // Optionnel : nom + icône
    };
    let carte = carteDoree
    const carteDoreecloner = clonerCarte({ carte, camp: "joueur" })
    

    // 5. Supprimer les 3 premières copies (peu importe où elles sont)
    let àRetirer = 3;
    const nouveauDeck = [];
    let nouveauBoard = [];
    if(carteBase.piocherCarteApresVente){
      board = board.filter(c => c.id !== carteBase.id)
    }
    
    for (const carte of deck) {
      if (carte.nom === clone.nom && àRetirer > 0) {
        àRetirer--;
      } else {
        nouveauDeck.push(carte);
      }
    }
    console.log(nouveauBoard)
    for (const carte of board) {
      if (carte.nom === clone.nom && àRetirer > 0) {
        àRetirer--;
      } else if(carte.nom === carteBase.nom && àRetirer > 0 && carteBase.piocherCarteApresVente){
        àRetirer--;
      } else {
        nouveauBoard.push(carte);
      }
      
    }
    console.log(nouveauBoard)
    if(carteBase.piocherCarteApresVente === false || carteBase.piocherCarteSpeApresVente === false){
      nouveauBoard.push(carteBase)
    }
    if( carteBase.piocherCarteApresVente || carteBase.piocherCarteSpeApresVente){
      nouveauBoard = nouveauBoard.filter((c => c.nom !== carteBase.nom))
    }
    console.log(nouveauBoard)
    

    // 6. Ajouter la carte dorée au deck
    setFusionAnim({
      cartes: copiesclone,
      carteResultat: carteDoreecloner
    });
    // setFusionAnimation({
    //   cartes: copiesclone,
    //   carteResultat: carteDoree
    // });
    setDeck([...nouveauDeck, carteDoreecloner]);
    
    setBoard(nouveauBoard);
    
    // 7. (optionnel) Lancer animation ici si tu veux
    // ex: setFusionAnim({ from: copies, to: carteDoree });

  }        
  }else{
    // 3. Si 3 copies ou plus => fusion
  if (copies.length >= 3) {
    console.log(`✨ Fusion de 3 cartes ${carteBase.nom} en carte dorée !`);
    // 4. Créer la carte dorée
    let carteDoree = {}
    if(bestCopie.length > 0){
      carteDoree = {
        ...bestCopie[0],
        nom: `${carteBase.nom} ✨`,
        hp: copies[0].hp * 2,
        atk: copies[0].atk * 2,
        estDoree: true,
      };
    }else{
      carteDoree = {
        ...copies[0],
        nom: `${carteBase.nom} ✨`,
        hp: copies[0].hp * 2,
        atk: copies[0].atk * 2,
        estDoree: true,
      };
    }

    let carte = carteDoree
    console.log(carte)
    const carteDoreecloner = clonerCarte({ carte, camp: "joueur" })
    // 5. Supprimer les 3 premières copies (peu importe où elles sont)
    let àRetirer = 3;
    const nouveauDeck = [];
    const nouveauBoard = [];

    for (const carte of deck) {
      if (carte.nom === carteBase.nom && àRetirer > 0) {
        àRetirer--;
      } else {
        nouveauDeck.push(carte);
      }
    }

    for (const carte of board) {
      if (carte.nom === carteBase.nom && àRetirer > 0) {
        àRetirer--;
      } else {
        nouveauBoard.push(carte);
      }
    }
    setFusionAnim({
      cartes: copies,
      carteResultat: carteDoreecloner
    });
   
    // setFusionAnimation({
    //   cartes: copies,
    //   carteResultat: carteDoree
    // });
    // 6. Ajouter la carte dorée au deck
    setDeck([...nouveauDeck, carteDoreecloner]);
    setBoard(nouveauBoard);
    
    // 7. (optionnel) Lancer animation ici si tu veux
    // ex: setFusionAnim({ from: copies, to: carteDoree });

  }
  }

  
 
}

export function addBoardPosition (card, boardPlayer){
  if(boardPlayer.length === 0){
      card.boardPosition = 1
  }
  if(boardPlayer.length === 1){
      card.boardPosition = 2
  }
  if(boardPlayer.length === 2){
      card.boardPosition = 3
  }
  if(boardPlayer.length === 3){
      card.boardPosition = 4
  }
  if(boardPlayer.length === 4){
      card.boardPosition = 5
  }
  if(boardPlayer.length === 5){
      card.boardPosition = 6
  }
  if(boardPlayer.length === 6){
      card.boardPosition = 7
  }
}

export function boardPositionSell(card, boardPlayer){
  if(card.boardPosition === 1){
      boardPlayer.forEach((card) => {
          if(card.boardPosition > 1){
              card.boardPosition--
          }
      })
  }
  if(card.boardPosition === 2){
      boardPlayer.forEach((card) => {
          if(card.boardPosition > 2){
              card.boardPosition--
          }
      })
  }
  if(card.boardPosition === 3){
      boardPlayer.forEach((card) => {
          if(card.boardPosition > 3){
              card.boardPosition--
          }
      })
  }
  if(card.boardPosition === 4){
      boardPlayer.forEach((card) => {
          if(card.boardPosition > 4){
              card.boardPosition--
          }
      })
  }
  if(card.boardPosition === 5){
      boardPlayer.forEach((card) => {
          if(card.boardPosition > 5){
              card.boardPosition--
          }
      })
  }
  if(card.boardPosition === 6){
      boardPlayer.forEach((card) => {
          if(card.boardPosition > 6){
              card.boardPosition--
          }
      })
  }

}

export function boardPositionFight(cartesPlayer){
  cartesPlayer.forEach((card) => {
      if(card.boardPosition === 1 && card.hp <= 0){
        cartesPlayer.forEach((card) => {
          if(card.boardPosition > 1){
            card.boardPosition --
          }
        })
      }
      if(card.boardPosition === 2 && card.hp <= 0){
        cartesPlayer.forEach((card) => {
          if(card.boardPosition > 2){
            card.boardPosition --
          }
        })
      }
      if(card.boardPosition === 3 && card.hp <= 0){
        cartesPlayer.forEach((card) => {
          if(card.boardPosition > 3){
            card.boardPosition --
          }
        })
      }
      if(card.boardPosition === 4 && card.hp <= 0){
        cartesPlayer.forEach((card) => {
          if(card.boardPosition > 4){
            card.boardPosition --
          }
        })
      }
      if(card.boardPosition === 5 && card.hp <= 0){
        cartesPlayer.forEach((card) => {
          if(card.boardPosition > 5){
            card.boardPosition --
          }
        })
      }
      if(card.boardPosition === 6 && card.hp <= 0){
        cartesPlayer.forEach((card) => {
          if(card.boardPosition > 6){
            card.boardPosition --
          }
        })
      }
    })
}

export const actualiserBoutiqueIA = ({ lvlTaverne, setShopCards, gold, setGold, actualPlayer, goldPlayer2, lvlTavernePlayer2, setGoldPlayer2 }) => {
  if(actualPlayer === 1){
    if (gold < 1) {
      alert("💰 Pas assez d'or !");
      return;
    }
    const tirage = getCartesPourShop(lvlTaverne);
    const cartes = getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne)).map(carte => clonerCarte({ carte, camp: "shop" }));;
    setShopCards(cartes);
    setGold(gold - 1)
    
  }
  if(actualPlayer === 2){
    if (goldPlayer2 < 1) {
      alert("💰 Pas assez d'or !");
      return;
    }
    const tirage = getCartesPourShop(lvlTavernePlayer2);
    const cartes = getCartesAleatoires(tirage, getNombreCartesShop(lvlTavernePlayer2)).map(carte => clonerCarte({ carte, camp: "shop" }));;
    setShopCards(cartes);
    setGoldPlayer2(goldPlayer2 - 1)
    return cartes
  }

};
