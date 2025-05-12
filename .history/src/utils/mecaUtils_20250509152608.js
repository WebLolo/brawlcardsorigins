import { sleep } from "@/utils/combatUtils1v1";
import { clonerCarte, fusionnerCartesIdentiques } from "@/utils/shopUtils";
import { cards } from "@/data/cardsData";
export function piocherCarte( sourceType, targetType, draggedCard, deck, setDeck, boardPlayer, setBoardPlayer, setFusionAnim ){
    if (sourceType === "deck" && targetType === "board-drop" && boardPlayer.length <7) {
        const nouveauDeck = deck.filter((c) => c.id !== draggedCard.id);
        const cartesFamille = cards.filter((c) => c.famille === draggedCard.famille);
        const carteRandom = cartesFamille[Math.floor(Math.random() * cartesFamille.length)];
        const cartesInf = cards.filter((c) => c.famille === draggedCard.famille && c.lvl < draggedCard.lvl);
        const carteInfRandom = cartesInf[Math.floor(Math.random() * cartesInf.length)];
        const carteSpe = cards[draggedCard.carteSpe]
        if(draggedCard.piocherCarte){
            const clone = clonerCarte({ carte: carteRandom, camp: "joueur" });
            setDeck([...nouveauDeck, clone]);
            setTimeout(() => {
                fusionnerCartesIdentiques({
                    carteBase: draggedCard,
                    deck: nouveauDeck,
                    board: boardPlayer,
                    setDeck: setDeck,
                    setBoard: setBoardPlayer,
                    clone,
                    setFusionAnim,
                    // setFusionAnimation
                });
            }, 1500);
        }
        if(draggedCard.piocherCarteSpe){
            const clone = clonerCarte({ carte: carteSpe, camp: "joueur" });
            setDeck([...nouveauDeck, clone]);
            const vessalyn = boardPlayer.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
            if(vessalyn.length > 0){
                const clone1 = clonerCarte({ carte: carteSpe, camp: "joueur" });
                setDeck([...nouveauDeck, clone, clone1]);
            }
            setTimeout(() => {
                fusionnerCartesIdentiques({
                    carteBase: draggedCard,
                    deck: nouveauDeck,
                    board: boardPlayer,
                    setDeck: setDeck,
                    setBoard: setBoardPlayer,
                    clone,
                    setFusionAnim,
                    // setFusionAnimation
                });
              }, 1500);

        }
        if(draggedCard.piocherCarteInf){
            const clone = clonerCarte({ carte: carteInfRandom, camp: "joueur" });
            setDeck([...nouveauDeck, clone]);
            setTimeout(() => {
                fusionnerCartesIdentiques({
                    carteBase: draggedCard,
                    deck: nouveauDeck,
                    board: boardPlayer,
                    setDeck: setDeck,
                    setBoard: setBoardPlayer,
                    clone,
                    setFusionAnim,
                    // setFusionAnimation
            });
            }, 1500);
        }
    }
    if (sourceType === "board" && targetType === "header" && deck.length <7){
        if(draggedCard.piocherCarteApresVente){
            let clone = []
            const cartesFamille = cards.filter((c) => c.famille === draggedCard.famille)
            const randomFamille = cartesFamille[Math.floor(Math.random() * cartesFamille.length)]
            clone = clonerCarte({ carte: randomFamille, camp: "joueur" });
            setDeck([...deck, clone]);
            const vessalyn = boardPlayer.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
            if(vessalyn.length > 0){
                const clone1 = clonerCarte({ carte: randomFamille, camp: "joueur" });
                setDeck([...deck, clone, clone1]);
            }
            setTimeout(() => {
            fusionnerCartesIdentiques({
                carteBase: draggedCard,
                deck: deck,
                board: boardPlayer,
                setDeck: setDeck,
                setBoard: setBoardPlayer,
                clone,
                setFusionAnim,
                // setFusionAnimation
              });
            }, 1500);
        }
        if(draggedCard.piocherCarteSpeApresVente){
            let clone = []
            const carteSpe = cards[draggedCard.carteSpe]
            clone = clonerCarte({ carte: carteSpe, camp: "joueur" });
            setDeck([...deck, clone]);
            const vessalyn = boardPlayer.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
            if(vessalyn.length > 0){
                const clone1 = clonerCarte({ carte: carteSpe, camp: "joueur" });
                setDeck([...deck, clone , clone1]);
            }
            fusionnerCartesIdentiques({
                carteBase: draggedCard,
                deck: deck,
                board: boardPlayer,
                setDeck: setDeck,
                setBoard: setBoardPlayer,
                clone,
                setFusionAnim,
                // setFusionAnimation
              });

        }
    }
}
export function piocherCarteFamille(draggedCard, deck, setDeck, boardPlayer, setBoardPlayer, setFusionAnim){
    if(draggedCard.piocherCarteFamille){
        let clone = []
        const nouveauDeck = deck.filter((c) => c.id !== draggedCard.id);
        const cardsFamilly = cards.filter((c) => c.famille === draggedCard.famille)
        const randomCard = cardsFamilly[Math.floor(Math.random() * cardsFamilly.length)]
        clone = clonerCarte({ carte: randomCard, camp: "joueur" });
        if(draggedCard.nom === "Tornade décuplée"){
            clone.atk += draggedCard.atk
            clone.hp += draggedCard.hp
        }
        setDeck([...nouveauDeck, clone]);
        if(boardPlayer){
            setTimeout(() => {
            fusionnerCartesIdentiques({
                carteBase: draggedCard,
                deck: deck,
                board: boardPlayer,
                setDeck: setDeck,
                setBoard: setBoardPlayer,
                clone,
                setFusionAnim,
                // setFusionAnimation
              });
            }, 1500);
        }

          return clone
    }
}
export function piocherCarteApresDecompte( decompteCard, deck, setDeck, boardPlayer, setBoardPlayer, setFusionAnim ){
    const randomCardFamilly = cards.filter(card => card.famille === decompteCard.famille)
    const randomCard = randomCardFamilly[Math.floor(Math.random() * randomCardFamilly.length)]
    const clone = clonerCarte({ carte: randomCard, camp: "joueur" });
    setDeck([...deck, clone]);
    setTimeout(() => {
    fusionnerCartesIdentiques({
        carteBase: clone,
        deck: deck,
        board: boardPlayer,
        setDeck: setDeck,
        setBoard: setBoardPlayer,
        clone,
        setFusionAnim,
        // setFusionAnimation
    });
    }, 1500);
    
}
export async function oneTicDebutCombat(cartesSource, cartesCible, setProjectileAnim) {
    const resultCibles = [...cartesCible];
    const morts = [];
  
    const lanceurs = cartesSource.filter(carte => carte.oneTicDebutCombat);
  
    for (const lanceur of lanceurs) {
      // 🔁 Cibles vivantes à jour
      let ciblesVivantes = []
      if(lanceur.oneTicCible){
        ciblesVivantes = resultCibles.filter(c => c.hp > 0).sort((a, b) => a.hp - b.hp);
      }else{
        ciblesVivantes = resultCibles.filter(c => c.hp > 0);
      }
      
      if (ciblesVivantes.length === 0) break;
      let cible = [];
      if(lanceur.oneTicCible){
        cible = ciblesVivantes[0];
      }else{
        cible = ciblesVivantes[Math.floor(Math.random() * ciblesVivantes.length)];
      }
      
      const index = resultCibles.findIndex(c => c.id === cible.id);
      if (index === -1) continue; // sécurité
  
      // 💥 Animation avant effet
      await jouerProjectileAvecAttente({ lanceur, cible: resultCibles[index], setProjectileAnim });
  
      // 🧠 Appliquer l'effet directement sur l’objet dans le tableau
      lanceur.oneTicDebutCombat(resultCibles[index], lanceur);
  
      // ✅ Vérifie si la cible est morte après l'effet
      if (resultCibles[index].hp <= 0) {
        morts.push(resultCibles[index]);
      }
  
      await sleep(200);
    }
  
    return {
      cartesCible: resultCibles.filter(c => c.hp > 0),
      morts,
    };
}

export async function oneTicPendantCombat(carteMourante, carteCible, cartesCible, setProjectileAnim) {
    const resultCibles = [...cartesCible];
    const morts = [];

    const lanceur = carteMourante
    const cible = carteCible

    if (cible.hp > 0){
        // 💥 Animation avant effet
        await jouerProjectileAvecAttente({ lanceur, cible: carteCible, setProjectileAnim });

        // 🧠 Appliquer l'effet directement sur l’objet dans le tableau
        lanceur.oneTicPendantCombat(cible, lanceur);
    }

    // ✅ Vérifie si la cible est morte après l'effet
    if (cible.hp <= 0) {
        morts.push(cible);
        await sleep(200);
    }

    return {
    cartesCible: cartesCible.filter(c => c.hp > 0),
    morts,
    };
}

async function jouerProjectileAvecAttente({ lanceur, cible, setProjectileAnim }) {
    return new Promise((resolve) => {
        const sourceEl = document.querySelector(`[data-id='${lanceur.id}']`);
        const targetEl = document.querySelector(`[data-id='${cible.id}']`);

        if (sourceEl && targetEl) {
            const sRect = sourceEl.getBoundingClientRect();
            const tRect = targetEl.getBoundingClientRect();
            const projectileId = `${lanceur.id}-${cible.id}-${Date.now()}`;

            console.log("🔥 Lancement animation projectile", projectileId);
            setProjectileAnim({
                id: projectileId,
                startX: sRect.left + sRect.width / 2,
                startY: sRect.top + sRect.height / 2,
                endX: tRect.left + tRect.width / 2,
                endY: tRect.top + tRect.height / 2,
                onEnd: resolve, // très important : on résout quand le projectile est terminé
                imgSrc: lanceur.imgProjectile,
            });
        } else {
            resolve(); // fallback : ne bloque pas le jeu
        }
    });
}
export function bivalence(sourceType, targetType, draggedCard, boardPlayer){
    // La Bivalence //
        //Achat
            console.log(draggedCard.nom)    
        //Placement
        //Comptage du board
        let futurBoard = [...boardPlayer];
        if (sourceType === "deck" && targetType === "board-drop") {
            futurBoard = [...boardPlayer, draggedCard]; // simulation du board après pose
        } else if (sourceType === "board" && targetType === "header") {
            futurBoard = boardPlayer.filter(c => c !== draggedCard); // simulation du board après vente
        }

        const nbCrocNoirMarin = futurBoard.filter(
            (c) => c.famille === "Croc-Noir" && c.sousFamille === "Marin"
        ).length;

        const nbCrocNoirTerrestre = futurBoard.filter(
            (c) => c.famille === "Croc-Noir" && c.sousFamille === "Terrestre"
        ).length;
        console.log("terre", nbCrocNoirTerrestre, "mer",  nbCrocNoirMarin)
        // Si Board vide
        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Marin" && boardPlayer.length <7 && nbCrocNoirMarin === 0 && nbCrocNoirTerrestre === 0){
            draggedCard.bivalenceMarinEffect = true
            if(draggedCard.provocation && draggedCard.nom === "Tor'Grag des Profondeurs"){
                draggedCard.provocationUse = true
            }
            
        }
        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Terrestre" && boardPlayer.length <7 && nbCrocNoirMarin === 0 && nbCrocNoirTerrestre === 0){
            draggedCard.bivalenceTerrestreEffect = true
            if(draggedCard.provocation && draggedCard.nom === "Zûn'Tul, le Mange-Racines"){
                draggedCard.provocationUse = true
            }
        }

        //Majorité ou Minorité

        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Marin" && boardPlayer.length <7 && nbCrocNoirMarin > nbCrocNoirTerrestre){  
            draggedCard.bivalenceMarinEffect = true
            futurBoard.forEach((carte) => {
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = false
                }
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
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
                        
            });
            if(draggedCard.bivalence){
                draggedCard.bivalence(futurBoard)
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }
                    
        }
        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Marin" && boardPlayer.length <7 && nbCrocNoirMarin < nbCrocNoirTerrestre){  
            draggedCard.bivalenceMarinEffect = false
            futurBoard.forEach((carte) => {
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = false
                }
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
                        
            });
            if(draggedCard.bivalence){
                draggedCard.bivalence(futurBoard)
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }
                    
        }
        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Terrestre" && boardPlayer.length <7 && nbCrocNoirTerrestre > nbCrocNoirMarin){ 
            draggedCard.bivalenceTerrestreEffect = true
            futurBoard.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = false
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
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
            }); 
            if(draggedCard.bivalence){
                draggedCard.bivalence(futurBoard)
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }   
        }
        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Terrestre" && boardPlayer.length <7 && nbCrocNoirTerrestre < nbCrocNoirMarin){ 
            draggedCard.bivalenceTerrestreEffect = false
            futurBoard.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = false
                }
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
            });  
            if(draggedCard.bivalence){
                draggedCard.bivalence(futurBoard)
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }  
        }
        //Egalité
        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Marin" && boardPlayer.length <7 && nbCrocNoirMarin === nbCrocNoirTerrestre){ 
            draggedCard.bivalenceMarinEffect = true
            futurBoard.forEach((carte) => {
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
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
            });  
            if(draggedCard.bivalence){
                draggedCard.bivalence(futurBoard)
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }   
        }
        if (sourceType === "deck" && targetType === "board-drop" && draggedCard.sousFamille === "Terrestre" && boardPlayer.length <7 && nbCrocNoirMarin === nbCrocNoirTerrestre){ 
            draggedCard.bivalenceTerrestreEffect = true
            futurBoard.forEach((carte) => {
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
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
                
            }); 
            if(draggedCard.bivalence){
                draggedCard.bivalence(futurBoard)
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }   
        }
        //vente
        if (sourceType === "board" && targetType === "header" && draggedCard.sousFamille === "Marin" && nbCrocNoirMarin < nbCrocNoirTerrestre){ 
            boardPlayer.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = false
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
                if(carte.nom === "Tor'Grag des Profondeurs"){
                    carte.furieUse = false
                    carte.provocationUse = true
                }
                if(carte.nom === "Zûn'Tul, le Mange-Racines"){
                    carte.furieUse = true
                    carte.provocationUse = true
                }
            });
            if(draggedCard.bivalence){
                draggedCard.bivalenceSell(futurBoard)
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }
        }
        
        if (sourceType === "board" && targetType === "header" && draggedCard.sousFamille === "Marin" && nbCrocNoirMarin > nbCrocNoirTerrestre){ 
            boardPlayer.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = false
                }
                if(carte.nom === "Tor'Grag des Profondeurs"){
                    carte.furieUse = true
                    carte.provocationUse = false
                }
                if(carte.nom === "Zûn'Tul, le Mange-Racines"){
                    carte.furieUse = true
                    carte.provocationUse = true
                }
            });
            if(draggedCard.bivalence){
                draggedCard.bivalenceSell(futurBoard)
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }
        }
        if (sourceType === "board" && targetType === "header" && draggedCard.sousFamille === "Terrestre" && nbCrocNoirTerrestre < nbCrocNoirMarin){ 
            futurBoard.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = false
                }
                if(carte.nom === "Tor'Grag des Profondeurs"){
                    carte.furieUse = true
                    carte.provocationUse = false
                }
                if(carte.nom === "Zûn'Tul, le Mange-Racines"){
                    carte.furieUse = true
                    carte.provocationUse = true
                }
            });
            if(draggedCard.bivalence){
                draggedCard.bivalenceSell(futurBoard)
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }
        }
        if (sourceType === "board" && targetType === "header" && draggedCard.sousFamille === "Terrestre" && nbCrocNoirTerrestre > nbCrocNoirMarin){ 
            boardPlayer.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = false
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
                if(carte.nom === "Tor'Grag des Profondeurs"){
                    carte.furieUse = false
                    carte.provocationUse = true
                }
                if(carte.nom === "Zûn'Tul, le Mange-Racines"){
                    carte.furieUse = true
                    carte.provocationUse = true
                }
            });
            if(draggedCard.bivalence){
                draggedCard.bivalenceSell(futurBoard)
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }
        }
        if (sourceType === "board" && targetType === "header" && draggedCard.sousFamille === "Marin" && nbCrocNoirMarin === nbCrocNoirTerrestre){ 
            boardPlayer.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
                if(carte.nom === "Tor'Grag des Profondeurs"){
                    carte.furieUse = true
                    carte.provocationUse = true
                }
                if(carte.nom === "Zûn'Tul, le Mange-Racines"){
                    carte.furieUse = true
                    carte.provocationUse = true
                }
            });
            if(draggedCard.bivalence){
                draggedCard.bivalenceSell(futurBoard)
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }

        }
        if (sourceType === "board" && targetType === "header" && draggedCard.sousFamille === "Terrestre" && nbCrocNoirMarin === nbCrocNoirTerrestre){ 
            boardPlayer.forEach((carte) => {
                if(carte.sousFamille === "Marin"){
                    carte.bivalenceMarinEffect = true
                }
                if(carte.sousFamille === "Terrestre"){
                    carte.bivalenceTerrestreEffect = true
                }
                if(carte.nom === "Tor'Grag des Profondeurs"){
                    carte.furieUse = true
                    carte.provocationUse = true
                }
                if(carte.nom === "Zûn'Tul, le Mange-Racines"){
                    carte.furieUse = true
                    carte.provocationUse = true
                }
            });
            if(draggedCard.bivalence){
                draggedCard.bivalenceSell(futurBoard)
            }else{
                // Faire réagir les autres cartes à l’arrivée de celle-ci
                futurBoard.forEach(c => {
                    if (c !== draggedCard && c.bivalence) {
                        c.bivalence(futurBoard, c); // chaque carte réévalue le board et s'applique à la nouvelle
                    }
                });
            }
        }                                 
}

export async function aoeCible(cartesPlayer, cartesPlayer2) {
    [...cartesPlayer].forEach(carte => {
      if (carte.aoeCible) {
        carte.aoeCible(cartesPlayer2);
      }
    });
    [...cartesPlayer2].forEach(carte => {
        if (carte.aoeCible) {
          carte.aoeCible(cartesPlayer);
        }
    });
  
    const mortsPlayer = cartesPlayer.filter(c => c.hp <= 0);
    const mortsPlayer2 = cartesPlayer2.filter(c => c.hp <= 0);
  
    const cartesPlayerFiltered = cartesPlayer.filter(c => c.hp > 0);
    const cartesPlayer2Filtered = cartesPlayer2.filter(c => c.hp > 0);
  
    return {
      cartesPlayer: cartesPlayerFiltered,
      cartesPlayer2: cartesPlayer2Filtered,
      mortsPlayer,
      mortsPlayer2
    };
}

export async function aoeCibleApresCombat(cartesPlayer) {
    [...cartesPlayer].forEach(carte => {
      if (carte.aoeCibleApresCombat) {
        carte.aoeCibleApresCombat(cartesPlayer);
      }
    });
    const cartesPlayerFiltered = cartesPlayer.filter(c => c.hp > 0);
  
    return {
      cartesPlayer: cartesPlayerFiltered,
    };
}

export async function verifEffetDebutTour(boardPlayer, setBoardPlayer, deck, setDeck, setFusionAnim, bonusAtkElem, bonusTourbillonDeSable, setBonusAtkElem, setBonusTourbillonDeSable, shopCards, setShopCards, setAnimAoEVisuelle){
      // verif si Roche mere bienfaisante
  let carteDecomptePioche = boardPlayer.findIndex(carte => carte.decomptePioche)
  if(carteDecomptePioche >= 0 ){
    boardPlayer.forEach(carte =>{
      if(carte.decomptePioche){
        carte.decomptePioche -= 1
        console.log("decompte avant pioche", carte.decomptePioche)
        if(carte.decomptePioche === 0){
          piocherCarteApresDecompte(carte, deck, setDeck, boardPlayer, setBoardPlayer, setFusionAnim)
          carte.decomptePioche = 2
        }
        setBoardPlayer(boardPlayer);
      }
    })
  }
    // verif si Lokholar
    let verifCartesLokholar = boardPlayer.findIndex(carte => carte.nom === "Lokholar le Forgegivre")
    if(verifCartesLokholar >= 0 ){
        await sleep(1500);
        boardPlayer.forEach(carte =>{
        carte.atk += 2 + bonusAtkElem
        carte.hp += 2 + bonusTourbillonDeSable
          
      })
      setBoardPlayer([...boardPlayer]);
    }
        // verif si Rejeton
    let verifCartesRejeton = boardPlayer.findIndex(carte => carte.nom === "Rejeton de lumière amplifié")
    if(verifCartesRejeton >= 0 ){
       
      setBonusAtkElem(bonusAtkElem + 1)
      setBonusTourbillonDeSable(bonusTourbillonDeSable + 1)
      await sleep(1500);
    }
    console.log(bonusTourbillonDeSable, bonusAtkElem)
    
    // verif si criDeGuerreApresCombat
    let carteCriDeGuerreTaverne = boardPlayer.findIndex(carte => carte.criDeGuerreTaverne)
    if(carteCriDeGuerreTaverne >= 0 ){

        boardPlayer.forEach(carte =>{
            if(carte.criDeGuerreTaverne && carte.nom === "Oleiflamme flamboyant"){
                carte.criDeGuerreTaverne(shopCards, bonusTourbillonDeSable, bonusAtkElem)
            }
            if(carte.criDeGuerreTaverne && carte.nom === "Souffle-grange dansant"){
                carte.criDeGuerreTaverne(shopCards, bonusTourbillonDeSable, bonusAtkElem)
            }
        })
        setShopCards(shopCards)
    }
      // verif si aoeCibleApresCombat

  let aoeCiblePresent1 = boardPlayer.findIndex(carte => carte.aoeCibleApresCombat)

  //aoe//
  if(aoeCiblePresent1 >= 0 ){
    await sleep(1200);
    const aoeCibleResult = await aoeCibleApresCombat(boardPlayer);
    // déclenchement visuel
    setAnimAoEVisuelle(true);
    await sleep(600);
    setAnimAoEVisuelle(false);
    setBoardPlayer([...boardPlayer]);
    boardPlayer.forEach(carte => {
      carte.animAoE = false
    })
    boardPlayer = aoeCibleResult.boardPlayer;
  }
}

export function degatsAdj(attaquant, defenseur, cartesPlayer, cartesPlayer2, nomDefenseur, setGriffeEffects) {
    const newEffects = [];
  
    const ajouterEffet = (carte) => {
        const el = document.querySelector(`[data-id='${carte.id}']`);
        const wrapper = document.getElementById("game-wrapper");
      
        if (el && wrapper) {
          const rect = el.getBoundingClientRect();
          const wrapperRect = wrapper.getBoundingClientRect();
      
          const scale =
            parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--scale")) || 1;
      
          newEffects.push({
            id: carte.id,
            x: (rect.left - wrapperRect.left + rect.width / 2 - 30) * (1 / scale),
            y: (rect.top - wrapperRect.top + rect.height / 2 - 30) * (1 / scale),
          });
        }
    };

    let indexJ1 = 1
    let indexJ2 = 1
    cartesPlayer.forEach(card =>{ 
        card.boardPosition = indexJ1
        card.boardPositionFight = indexJ1
        indexJ1++
    });
       cartesPlayer2.forEach(card =>{ 
        card.boardPosition = indexJ2
        card.boardPositionFight = indexJ2
        indexJ2++
    });

  
    if (nomDefenseur === "joueur2" && cartesPlayer2.length > 1) {
      if (defenseur.boardPosition === 1) {
        if(attaquant.control){
            console.log("coucou")
            ajouterEffet(cartesPlayer[1]);
            cartesPlayer[1].hp -= attaquant.atk
            cartesPlayer[1].degatsRecus = attaquant.atk
        }else{
            console.log("coucou1")
            ajouterEffet(cartesPlayer2[1]);
            cartesPlayer2[1].hp -= attaquant.atk
            cartesPlayer2[1].degatsRecus = attaquant.atk
        }

      } else if (defenseur === cartesPlayer2[cartesPlayer2.length - 1]) {
        if(attaquant.control){
            console.log("coucou2")
            ajouterEffet(cartesPlayer[cartesPlayer.length - 2]);
            cartesPlayer[cartesPlayer.length - 2].hp -= attaquant.atk
            cartesPlayer[cartesPlayer.length - 2].degatsRecus = attaquant.atk
        }else{
            console.log("coucou3")
            ajouterEffet(cartesPlayer2[cartesPlayer2.length - 2]);
            cartesPlayer2[cartesPlayer2.length - 2].hp -= attaquant.atk
            cartesPlayer2[cartesPlayer2.length - 2].degatsRecus = attaquant.atk
        }

        
      } else {
        if(attaquant.control){
            console.log("coucou4")

            
            ajouterEffet(cartesPlayer[defenseur.boardPosition]);
            cartesPlayer[defenseur.boardPosition ].hp -= attaquant.atk
            cartesPlayer[defenseur.boardPosition ].degatsRecus = attaquant.atk
        }else{
            console.log("coucou5")
            ajouterEffet(cartesPlayer2[defenseur.boardPosition - 2]);
            cartesPlayer2[defenseur.boardPosition -2].hp -= attaquant.atk
            cartesPlayer2[defenseur.boardPosition -2].degatsRecus = attaquant.atk
            
            ajouterEffet(cartesPlayer2[defenseur.boardPosition]);
            cartesPlayer2[defenseur.boardPosition ].hp -= attaquant.atk
            cartesPlayer2[defenseur.boardPosition ].degatsRecus = attaquant.atk
        }

        
      }
    }
  
    if (nomDefenseur === "joueur" && cartesPlayer.length > 1) {
        if (defenseur.boardPosition === 1) {
            if(attaquant.control){
                ajouterEffet(cartesPlayer2[1]);
                cartesPlayer2[1].hp -= attaquant.atk
                cartesPlayer2[1].degatsRecus = attaquant.atk
            }else{
                ajouterEffet(cartesPlayer[1]);
                cartesPlayer[1].hp -= attaquant.atk
                cartesPlayer[1].degatsRecus = attaquant.atk
            }

        } else if (defenseur === cartesPlayer[cartesPlayer.length - 1]) {
            if(attaquant.control){
                ajouterEffet(cartesPlayer2[cartesPlayer2.length - 2]);
                cartesPlayer2[cartesPlayer2.length - 2].hp -= attaquant.atk
                cartesPlayer2[cartesPlayer2.length - 2].degatsRecus = attaquant.atk
            }else{
                ajouterEffet(cartesPlayer[cartesPlayer.length - 2]);
                cartesPlayer[cartesPlayer.length - 2].hp -= attaquant.atk
                cartesPlayer[cartesPlayer.length - 2].degatsRecus = attaquant.atk
            }

          
        } else {
            if(attaquant.control){
                ajouterEffet(cartesPlayer2[defenseur.boardPosition]);
                cartesPlayer2[defenseur.boardPosition ].hp -= attaquant.atk
                cartesPlayer2[defenseur.boardPosition ].degatsRecus = attaquant.atk
            }else{
                ajouterEffet(cartesPlayer[defenseur.boardPosition - 2]);
                cartesPlayer[defenseur.boardPosition -2].hp -= attaquant.atk
                cartesPlayer[defenseur.boardPosition -2].degatsRecus = attaquant.atk
                
                ajouterEffet(cartesPlayer[defenseur.boardPosition]);
                cartesPlayer[defenseur.boardPosition ].hp -= attaquant.atk
                cartesPlayer[defenseur.boardPosition ].degatsRecus = attaquant.atk
            }

          
        }
      }
  
    setGriffeEffects((prev) => [...prev, ...newEffects]);
  }
  

export function infligerDegats(carte, degats) {
    if (!carte) return carte;
  
    return {
      ...carte,
      hp: carte.hp - degats,
      degatsRecus: degats,
    };
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
  export function piocherCarteSpeIa(draggedCard, deck, setDeck, boardPlayer, setBoardPlayer, setFusionAnim ){
    if (draggedCard.piocherCarteSpe === true && boardPlayer.length <7) {
        const nouveauDeck = deck.filter((c) => c.id !== draggedCard.id);
        const carteSpe = cards[draggedCard.carteSpe]
        const clone = clonerCarte({ carte: carteSpe, camp: "joueur" });
        setDeck([...nouveauDeck, clone]);
        if(draggedCard.piocherCarteSpe){
            fusionnerCartesIdentiques({
                carteBase: draggedCard,
                deck: nouveauDeck,
                board: boardPlayer,
                setDeck: setDeck,
                setBoard: setBoardPlayer,
                clone,
                setFusionAnim,
                // setFusionAnimation
              });
        }
        return clone
    }
    
}
export function piocherCarteApresVente( sourceType, targetType, draggedCard, deck, setDeck, boardPlayer, setBoardPlayer, setFusionAnim ){
    if (sourceType === "board" && targetType === "header" && draggedCard.piocherCarteApresVente === true && deck.length <7) {
        let clone = []
        if(draggedCard.nom === "Nym'Leth la Tisseuse d'Échos"){
            const cartesSylphes = cards.filter((c) => c.famille === "Les Sylphariels")
            const randomSylphe = cartesSylphes[Math.floor(Math.random() * cartesSylphes.length)]
            clone = clonerCarte({ carte: randomSylphe, camp: "joueur" });
            setDeck([...deck, clone]);
            fusionnerCartesIdentiques({
                carteBase: draggedCard,
                deck: deck,
                board: boardPlayer,
                setDeck: setDeck,
                setBoard: setBoardPlayer,
                clone,
                setFusionAnim,
                // setFusionAnimation
              });
        }else{
            const carteSpe = cards[draggedCard.carteSpe]
            clone = clonerCarte({ carte: carteSpe, camp: "joueur" });
            setDeck([...deck, clone]);
            console.log(deck, boardPlayer)
            boardPlayer = boardPlayer.filter(c => c.id !== draggedCard.id)
            console.log(deck, boardPlayer)
            fusionnerCartesIdentiques({
                carteBase: draggedCard,
                deck: deck,
                board: boardPlayer,
                setDeck: setDeck,
                setBoard: setBoardPlayer,
                clone,
                setFusionAnim,
                draggedCard
                // setFusionAnimation
              });
        }
    
    }
}
export function piocherCarteInf( sourceType, targetType, draggedCard, deck, setDeck, boardPlayer, setBoardPlayer, setFusionAnim ){
    if (sourceType === "deck" && targetType === "board-drop" && draggedCard.piocherCarteInf === true && boardPlayer.length <7) {
        const nouveauDeck = deck.filter((c) => c.id !== draggedCard.id);
        const cartesCrocNoirInf = cards.filter((c) => c.famille === "Croc-Noir" && c.lvl < draggedCard.lvl);
        const carteRandom = cartesCrocNoirInf[Math.floor(Math.random() * cartesCrocNoirInf.length)];
        if(draggedCard.nom === "Sha'Rok, la pisteuse furtive" && draggedCard.bivalenceMarinEffect === true){
            carteRandom.atk += 2
        }else{
            carteRandom.hp += 2
        }
        const clone = clonerCarte({ carte: carteRandom, camp: "joueur" });
        setDeck([...nouveauDeck, clone]);
        fusionnerCartesIdentiques({
            carteBase: draggedCard,
            deck: nouveauDeck,
            board: boardPlayer,
            setDeck: setDeck,
            setBoard: setBoardPlayer,
            clone,
            setFusionAnim,
            // setFusionAnimation
          });
    
    }
}
export function piocherCarteSpe( sourceType, targetType, draggedCard, deck, setDeck, boardPlayer, setBoardPlayer, setFusionAnim ){
    if (sourceType === "deck" && targetType === "board-drop" && draggedCard.piocherCarteSpe === true && boardPlayer.length <7) {
        const nouveauDeck = deck.filter((c) => c.id !== draggedCard.id);
        const carteSpe = cards[draggedCard.carteSpe]
        const clone = clonerCarte({ carte: carteSpe, camp: "joueur" });
        setDeck([...nouveauDeck, clone]);
        if(draggedCard.piocherCarteSpe){
            fusionnerCartesIdentiques({
                carteBase: draggedCard,
                deck: nouveauDeck,
                board: boardPlayer,
                setDeck: setDeck,
                setBoard: setBoardPlayer,
                clone,
                setFusionAnim,
                // setFusionAnimation
              });
        }
    
    }
}

  