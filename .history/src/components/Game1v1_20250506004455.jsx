import GameLayout1v1 from "./GameLayout1v1";
import { useNavigate } from "react-router-dom";
import { arrayMove } from "@dnd-kit/sortable";
import ShopHUD from "./ShopHUD";
import ShopBoard from "./ShopBoard";
import PlayerBoard from "./PlayerBoard";
import PlayerHUD from "./PlayerHUD";
import Player2HUD from "./Player2HUD";
import Player2HUDFight from "./Player2HUDFight";
import Player2BoardFight from "./Player2BoardFight";
import Player2Board from "./Player2Board";
import PlayerBoardFight from "./PlayerBoardFight";
import PlayerDeck from "./PlayerDeck";
import Player2Deck from "./Player2Deck";
import CardPreview from "./CardPreview";
import AlertModal from "./AlertModal";
import { deroulerCombat1v1 } from "@/utils/combatUtils1v1";
import { useState, useEffect, useRef } from "react";
import { coutLvlTaverne, getCartesPourShop, getCartesAleatoires, getNombreCartesShop, clonerCarte, actualiserBoutique, lvlUpTaverne, coutLvlTavernePlayer2, jouerCarteDepuisDeck, vendreCarteDuBoard, acheterCarte, fusionnerCartesIdentiques, addBoardPosition, boardPositionSell} from "@/utils/shopUtils";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { DndContext } from "@dnd-kit/core";
import DropZone from "./DropZone";
import MusicControl from "./MusicControl";
import { setSoundEffectVolume } from "@/utils/soundUtils";
import { piocherCarte, bivalence, piocherCarteFamille, verifEffetDebutTour } from "@/utils/mecaUtils";
import { lancerAnimationCriDeGuerreAoE, lancerAnimationCriDeGuerreUnique } from "@/utils/animUtils";
import ProjectileImage from "./ProjectileImage";
export default function Game1v1(){
    const [phase, setPhase] = useState("shopPlayer1");
    const [previewCard, setPreviewCard] = useState(null);
    const [carteAttaquantId, setCarteAttaquantId] = useState(null);
    const [carteDefenseurId, setCarteDefenseurId] = useState(null);
    const [actualPlayer, setActualPlayer] = useState(1);
    const [fusionAnim, setFusionAnim] = useState(null);
    const navigate = useNavigate();
    const [volume, setVolume] = useState(0.4); // Valeur par défaut
    const [muted, setMuted] = useState(false)
    const [soundVolume, setSoundVolume] = useState(1); // volume effets sonores
    const [bonusTourbillonDeSable, setBonusTourbillonDeSable] = useState(0);
    const [bonusAtkElem, setBonusAtkElem] = useState(0);
    const [fureurCeleste, setFureurCeleste] = useState(0);
    const [marinsCount, setMarinsCount] = useState(0);
    const [terrestresCount, setTerrestresCount] = useState(0);
    const [projectileAnim, setProjectileAnim] = useState(null);
    const [animAoEVisuelle, setAnimAoEVisuelle] = useState(false);
    const [griffeEffects, setGriffeEffects] = useState([]);
    const [popupMessage, setPopupMessage] = useState(null);

    //joueur 1
    const [lvlTaverne, setLvlTaverne] = useState(1);
    const [deck, setDeck] = useState([]);
    const [gold, setGold] = useState(100);
    const [playerPv, setplayerPv] = useState(50);
    const [boardPlayer, setBoardPlayer] = useState([]);
    const [boardCombat, setBoardCombat] = useState([]);
    const [goldTour1, setgoldTour1] = useState(3);

    //joueur2
    const [deckPlayer2, setDeckPlayer2] = useState([]);
    const [lvlTavernePlayer2, setLvlTavernePlayer2] = useState(1);
    const [goldPlayer2, setGoldPlayer2] = useState(100);
    const [player2Pv, setplayer2Pv] = useState(50);
    const [boardPlayer2, setBoardPlayer2] = useState([]);
    const [boardCombatPlayer2, setBoardCombatPlayer2] = useState([]);

    let [shopCards, setShopCards] = useState(() => {
        if (actualPlayer === 1){
            const tirage = getCartesPourShop(lvlTaverne);
            const cartesAleatoires = getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne));
            return cartesAleatoires.map(carte => clonerCarte({ carte, camp: "joueur" }));
        }
        if (actualPlayer === 2){
            const tirage = getCartesPourShop(lvlTavernePlayer2);
            const cartesAleatoires = getCartesAleatoires(tirage, getNombreCartesShop(lvlTavernePlayer2));
            return cartesAleatoires.map(carte => clonerCarte({ carte, camp: "joueur" }));
        }

    });
    const handleDragEnd = (event) => {
        if(actualPlayer === 1){

            const { active, over } = event;
            if (!over) return;
          
            const [sourceType, sourceId] = active.id.split("-");
            const targetType = over.id;
            const id = parseInt(sourceId);
            console.log("🔥 sourceType:", sourceType, "targetType:", targetType, "over.id:", over.id);
          
            let draggedCard;
            if (sourceType === "shop") {
              draggedCard = shopCards.find((c) => c.id === id);
            } else if (sourceType === "board") {
              draggedCard = boardPlayer.find((c) => c.id === id);
            } else if (sourceType === "deck") {
              draggedCard = deck.find((c) => c.id === id);
            }
          
            if (!draggedCard) return;

            if (sourceType === "board" && targetType.startsWith("board-")) {
                
                const oldIndex = boardPlayer.findIndex((c) => c.id === id);
                const newIndex = boardPlayer.findIndex((c) => c.id === parseInt(over.id.split("-")[1]));
                boardPlayer[oldIndex].boardPosition = newIndex + 1
                boardPlayer[newIndex].boardPosition = oldIndex + 1
                console.log(boardPlayer[oldIndex].boardPosition,boardPlayer[newIndex].boardPosition)
                console.log("🔁 reorder from", oldIndex, "to", newIndex);
                if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
                    const newBoard = arrayMove(boardPlayer, oldIndex, newIndex);
                    setBoardPlayer(newBoard);
                    return;
                }
            }

            //ELEMENTAIRES
            //si pose Board
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.criDeGuerreTaverne && boardPlayer.length <7 && draggedCard.nom !== "Oleiflamme flamboyant") {
      
                console.log(`📢 Cri de guerre activé pour ${draggedCard.nom}`);
            
                draggedCard.criDeGuerreTaverne(shopCards, bonusTourbillonDeSable, bonusAtkElem); // Effet sur tout le board

            }
            if (sourceType === "deck" && targetType === "board-drop" && boardPlayer.length <7 ) {
                if(draggedCard.famille === "Elementaire"){
                    boardPlayer.forEach(carte =>{
                        if(carte.upSelf && carte.nom === "Roche en fusion"){
                            carte.hp += 1 + bonusTourbillonDeSable
                        }
                    })
                }
            }
            if (sourceType === "deck" && targetType === "board-drop" && boardPlayer.length <7 ) {
                if(draggedCard.famille === "Elementaire" && draggedCard.magnetisme){
                    boardPlayer.some(carte =>{
                        if(carte.famille === "Elementaire"){
                            carte.atk += draggedCard.atk + bonusAtkElem
                            carte.hp += draggedCard.hp + bonusTourbillonDeSable
                            setBoardPlayer([...boardPlayer]);
                            return true;
                            
                        }
                    })
                }
            }

            if (sourceType === "deck" && targetType === "board-drop" && boardPlayer.length <7 &&  draggedCard.famille === "Elementaire") {
                    let elemDeFete = boardPlayer.findIndex(carte => carte.nom === "Elementaire de fête")
                    let eruptionDeMana = boardPlayer.findIndex(carte => carte.nom === "Eruption de mana déchainée")
                    if (elemDeFete >= 0){
                        let newBoard = boardPlayer.filter(carte => carte.nom !== "Elementaire de fête").filter(carte => carte.famille === "Elementaire")
                        if(newBoard.length > 0){
                            let cible = newBoard[Math.floor(Math.random() * newBoard.length)];
                            cible.atk += 2 + bonusAtkElem
                            cible.hp += 1 + bonusTourbillonDeSable
                        }
                    }
                    if(eruptionDeMana >=0){
                        let newBoard = boardPlayer.filter(carte => carte.nom !== "Eruption de mana déchainée").filter(carte => carte.famille === "Elementaire")
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
            if (sourceType === "deck" && targetType === "board-drop" && boardPlayer.length <7 && draggedCard.nom === "Tourbillon de sable") {
      
                setBonusTourbillonDeSable(bonusTourbillonDeSable + 1)
                console.log(bonusTourbillonDeSable)

            }
            //Si vente
            if(sourceType === "board" && targetType === "header"){
                if(draggedCard.famille === "Elementaire"){
                    boardPlayer.forEach(carte => {
                        if(carte.upSelf && carte.nom === "Fracasseur de météorites"){
                            carte.atk += 2 + bonusAtkElem
                            carte.hp += 2 + bonusTourbillonDeSable
                        }
                    })
                }
                if(draggedCard.nom === "Tornade décuplée"){
                    draggedCard.piocherCarteFamille = true
                    piocherCarteFamille(draggedCard, deck, setDeck, boardPlayer, setBoardPlayer, setFusionAnim)
                }
            }
            //FIN ELEMENTAIRES


            if (sourceType === "shop" && targetType === "footer" && gold >= 3 && deck.length < 7) {
                acheterCarte({
                  card: draggedCard,
                  gold,
                  setGold,
                  deck,
                  setDeck,
                  shopCards,
                  setShopCards,
                  lvlTaverne,
                  actualPlayer,
                  setPopupMessage
                });
                const futurDeck = [...deck, draggedCard];
                    fusionnerCartesIdentiques({
                        carteBase: draggedCard,
                        deck: futurDeck,
                        board: boardPlayer,
                        setDeck: setDeck,
                        setBoard: setBoardPlayer,
                        setFusionAnim,
                        // setFusionAnimation,
                    });

    
            } else if (sourceType === "board" && targetType === "header") {
                vendreCarteDuBoard(draggedCard, boardPlayer, setBoardPlayer, setGold, gold);
                if(draggedCard.piocherCarteApresVente || draggedCard.piocherCarteSpeApresVente){
                    piocherCarte( sourceType, targetType, draggedCard, deck, setDeck, boardPlayer, setBoardPlayer, setFusionAnim)
                }
                if(draggedCard.auraSell){
                    draggedCard.auraSell(boardPlayer)
                }
                if(draggedCard.bivalence){
                    bivalence(sourceType, targetType, draggedCard, boardPlayer)
                }
                if(draggedCard.evanescence){
                    draggedCard.evanescence(boardPlayer, draggedCard)
                }


            } else if (sourceType === "deck" && targetType === "board-drop" && boardPlayer.length < 7) {  
                jouerCarteDepuisDeck(draggedCard, boardPlayer, setDeck, deck, addBoardPosition, setBoardPlayer, setPopupMessage);
                
                if(draggedCard.piocherCarte || draggedCard.piocherCarteSpe || draggedCard.piocherCarteInf) {
                    piocherCarte( sourceType, targetType, draggedCard, deck, setDeck, boardPlayer, setBoardPlayer, setFusionAnim)
                }
                if (draggedCard.criCeleste) {
                    setTimeout(() => {
                      lancerAnimationCriDeGuerreAoE(draggedCard.id);
                      setFureurCeleste(fureurCeleste + 2)
                    }, 1000);
                    console.log(fureurCeleste)
                  

                }
                if (draggedCard.criDeGuerre) {
                    setTimeout(() => {
                      lancerAnimationCriDeGuerreAoE(draggedCard.id);
                    }, 1000);
                  
                    setTimeout(() => {
                      draggedCard.criDeGuerre(boardPlayer);
                      setBoardPlayer([...boardPlayer, draggedCard]);
                    }, 1200);
                }
                if (draggedCard.criDeGuerreUnique){
                    console.log(`🎯 Cri de guerre ciblé sur UNE seule carte pour ${draggedCard.nom}`);
                    let boardFiltred =  boardPlayer.filter(card => card.famille === draggedCard.famille);
                    if(boardFiltred.length > 0){
                        let cible = boardFiltred[Math.floor(Math.random() * boardFiltred.length)];
                        setTimeout(() => {
                            const targetId = boardPlayer.find(c => c.nom === cible.nom)?.id;
                            lancerAnimationCriDeGuerreUnique(draggedCard.id, targetId);
                        }, 1000);
                        
                        setTimeout(() => {
                            draggedCard.criDeGuerreUnique(cible, bonusTourbillonDeSable, bonusAtkElem);
                            setBoardPlayer([...boardPlayer, draggedCard]);
                        }, 1400);
                        
                    }
                }
                if(draggedCard.criDeGuerreUniqueBouclier){
                    console.log(`🎯 Cri de guerre ciblé sur UNE seule carte pour ${draggedCard.nom}`);
                    let boardFiltred =  boardPlayer.filter(card => card.famille === draggedCard.famille && card.bouclierUse === false);
                    if(boardFiltred.length > 0){
                        let cible = boardFiltred[Math.floor(Math.random() * boardFiltred.length)];
                        setTimeout(() => {
                            const targetId = boardPlayer.find(c => c.nom === cible.nom)?.id;
                            lancerAnimationCriDeGuerreUnique(draggedCard.id, targetId);
                        }, 1000);
                        
                        setTimeout(() => {
                            draggedCard.criDeGuerreUniqueBouclier(cible);
                            setBoardPlayer([...boardPlayer, draggedCard]);
                        }, 1400);
                        
                    }
                }
                if(draggedCard.criDeGuerreUniqueSelf){
                    console.log(`🎯 Cri de guerre ciblé sur ${draggedCard.nom} (elle même)`);
                    setTimeout(() => {
                        const targetId = draggedCard.id
                        lancerAnimationCriDeGuerreUnique(draggedCard.id, targetId);
                    }, 1000);
                    
                    setTimeout(() => {
                        draggedCard.criDeGuerreUniqueSelf(draggedCard, boardPlayer);
                        setBoardPlayer([...boardPlayer, draggedCard]);
                    }, 1400);
                     // Effet sur tout le board 
                }

                if(draggedCard.effetDeMass){
                    setTimeout(() => {
                        const targetId = draggedCard.id
                        lancerAnimationCriDeGuerreUnique(draggedCard.id, targetId);
                    }, 1000);
                    
                    setTimeout(() => {
                        draggedCard.effetDeMass(draggedCard, boardPlayer);
                        setBoardPlayer([...boardPlayer, draggedCard]);
                    }, 1400);
                }
                if(draggedCard.aura){
                    setTimeout(() => {
                        lancerAnimationCriDeGuerreAoE(draggedCard.id);
                      }, 1000);
                    
                      setTimeout(() => {
                        draggedCard.aura(boardPlayer)
                        setBoardPlayer([...boardPlayer, draggedCard]);
                      }, 1200);
                }

            }
            if (sourceType === "deck" && targetType === "board-drop"  && boardPlayer.length <7){
                let auraPresent = boardPlayer.findIndex(carte => carte.aura)        
                if (auraPresent >= 0){                   
                    let carteAura = boardPlayer.filter(card => card.aura);
                    carteAura.forEach(carte =>{
                        carte.auraUnique(draggedCard)
                    })
                }
            }
            if (sourceType === "deck" && targetType === "board-drop"  && boardPlayer.length <7){
                bivalence(sourceType, targetType, draggedCard, boardPlayer)
            }
        }
        if(actualPlayer === 2){
            const { active, over } = event;
            if (!over) return;
          
            const [sourceType, sourceId] = active.id.split("-");
            const targetType = over.id;
            const id = parseInt(sourceId);
          
            let draggedCard;
            if (sourceType === "shop") {
              draggedCard = shopCards.find((c) => c.id === id);
            } else if (sourceType === "board") {
              draggedCard = boardPlayer2.find((c) => c.id === id);
            } else if (sourceType === "deck") {
              draggedCard = deckPlayer2.find((c) => c.id === id);
            }
          
            if (!draggedCard) return;

            if (sourceType === "board" && targetType.startsWith("board-")) {
                
                const oldIndex = boardPlayer2.findIndex((c) => c.id === id);
                const newIndex = boardPlayer2.findIndex((c) => c.id === parseInt(over.id.split("-")[1]));
                boardPlayer2[oldIndex].boardPosition = newIndex + 1
                boardPlayer2[newIndex].boardPosition = oldIndex + 1

                console.log("🔁 reorder from", oldIndex, "to", newIndex);
                if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
                    const newBoard = arrayMove(boardPlayer2, oldIndex, newIndex);
                    setBoardPlayer2(newBoard);
                    return;
                }
            }

            //ELEMENTAIRES
            //si pose Board
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.criDeGuerreTaverne && boardPlayer2.length <7 && draggedCard.nom !== "Oleiflamme flamboyant") {
      
                console.log(`📢 Cri de guerre activé pour ${draggedCard.nom}`);
            
                draggedCard.criDeGuerreTaverne(shopCards, bonusTourbillonDeSable, bonusAtkElem); // Effet sur tout le board

            }
            if (sourceType === "deck" && targetType === "board-drop" && boardPlayer2.length <7 ) {
                if(draggedCard.famille === "Elementaire"){
                    boardPlayer2.forEach(carte =>{
                        if(carte.upSelf && carte.nom === "Roche en fusion"){
                            carte.hp += 1 + bonusTourbillonDeSable
                        }
                    })
                }
            }
            if (sourceType === "deck" && targetType === "board-drop" && boardPlayer2.length <7 ) {
                if(draggedCard.famille === "Elementaire" && draggedCard.magnetisme){
                    boardPlayer2.some(carte =>{
                        if(carte.famille === "Elementaire"){
                            carte.atk += draggedCard.atk + bonusAtkElem
                            carte.hp += draggedCard.hp + bonusTourbillonDeSable
                            setBoardPlayer2([...boardPlayer2]);
                            return true;
                            
                        }
                    })
                }
            }

            if (sourceType === "deck" && targetType === "board-drop" && boardPlayer2.length <7 && draggedCard.famille === "Elementaire" ) {
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
            if (sourceType === "deck" && targetType === "board-drop" && boardPlayer2.length <7 && draggedCard.nom === "Tourbillon de sable") {
      
                setBonusTourbillonDeSable(bonusTourbillonDeSable + 1)
                console.log(bonusTourbillonDeSable)

            }
            //Si vente
            if(sourceType === "board" && targetType === "header"){
                if(draggedCard.famille === "Elementaire"){
                    boardPlayer2.forEach(carte => {
                        if(carte.upSelf && carte.nom === "Fracasseur de météorites"){
                            carte.atk += 2 + bonusAtkElem
                            carte.hp += 2 + bonusTourbillonDeSable
                        }
                    })
                }
                if(draggedCard.nom === "Tornade décuplée"){
                    draggedCard.piocherCarteFamille = true
                    piocherCarteFamille(draggedCard, deckPlayer2, setDeckPlayer2, boardPlayer2, setBoardPlayer2, setFusionAnim)
                }
            }
            //FIN ELEMENTAIRES

            if (sourceType === "shop" && targetType === "footer" && goldPlayer2 >= 3 && deckPlayer2.length < 7) {
                acheterCarte({
                  card: draggedCard,
                  goldPlayer2,
                  setGoldPlayer2,
                  deckPlayer2,
                  setDeckPlayer2,
                  shopCards,
                  setShopCards,
                  lvlTavernePlayer2,
                  actualPlayer,
                  setPopupMessage
                });
                const futurDeck = [...deckPlayer2, draggedCard];
                fusionnerCartesIdentiques({
                  carteBase: draggedCard,
                  deck: futurDeck,
                  board: boardPlayer2,
                  setDeck: setDeckPlayer2,
                  setBoard: setBoardPlayer2,
                  setFusionAnim,
                  // setFusionAnimation,
                });
              } else if (sourceType === "board" && targetType === "header") {
                if(draggedCard.piocherCarteApresVente || draggedCard.piocherCarteSpeApresVente){
                    piocherCarte( sourceType, targetType, draggedCard, deckPlayer2, setDeckPlayer2, boardPlayer2, setBoardPlayer2, setFusionAnim)
                }
                if(draggedCard.auraSell){
                    draggedCard.auraSell(boardPlayer2)
                }
                if(draggedCard.bivalence){
                    bivalence(sourceType, targetType, draggedCard, boardPlayer2)
                }
                if(draggedCard.evanescence){
                    draggedCard.evanescence(boardPlayer2, draggedCard)
                }

                vendreCarteDuBoard(draggedCard, boardPlayer2, setBoardPlayer2, setGoldPlayer2, goldPlayer2);
              } else if (sourceType === "deck" && targetType === "board-drop" && boardPlayer2.length < 7) {
                jouerCarteDepuisDeck(draggedCard, boardPlayer2, setDeckPlayer2, deckPlayer2, addBoardPosition, setBoardPlayer2, setPopupMessage);

                if(draggedCard.piocherCarte || draggedCard.piocherCarteSpe || draggedCard.piocherCarteInf) {
                    piocherCarte( sourceType, targetType, draggedCard, deckPlayer2, setDeckPlayer2, boardPlayer2, setBoardPlayer2, setFusionAnim)
                }
                if (draggedCard.criDeGuerre) {
                    setTimeout(() => {
                      lancerAnimationCriDeGuerreAoE(draggedCard.id);
                    }, 1000);
                  
                    setTimeout(() => {
                      draggedCard.criDeGuerre(boardPlayer2);
                      setBoardPlayer2([...boardPlayer2, draggedCard]);
                    }, 1200);
                }
                if (draggedCard.criDeGuerreUnique){
                    console.log(`🎯 Cri de guerre ciblé sur UNE seule carte pour ${draggedCard.nom}`);
                    let boardFiltred =  boardPlayer2.filter(card => card.famille === draggedCard.famille);
                    if(boardFiltred.length > 0){
                        let cible = boardFiltred[Math.floor(Math.random() * boardFiltred.length)];
                        setTimeout(() => {
                            const targetId = boardPlayer2.find(c => c.nom === cible.nom)?.id;
                            lancerAnimationCriDeGuerreUnique(draggedCard.id, targetId);
                        }, 1000);
                        
                        setTimeout(() => {
                            draggedCard.criDeGuerreUnique(cible, bonusTourbillonDeSable, bonusAtkElem);
                            setBoardPlayer2([...boardPlayer2, draggedCard]);
                        }, 1400);
                        
                    }
                }
                if(draggedCard.criDeGuerreUniqueBouclier){
                    console.log(`🎯 Cri de guerre ciblé sur UNE seule carte pour ${draggedCard.nom}`);
                    let boardFiltred =  boardPlayer2.filter(card => card.famille === draggedCard.famille && card.bouclierUse === false);
                    if(boardFiltred.length > 0){
                        let cible = boardFiltred[Math.floor(Math.random() * boardFiltred.length)];
                        setTimeout(() => {
                            const targetId = boardPlayer2.find(c => c.nom === cible.nom)?.id;
                            lancerAnimationCriDeGuerreUnique(draggedCard.id, targetId);
                        }, 1000);
                        
                        setTimeout(() => {
                            draggedCard.criDeGuerreUniqueBouclier(cible);
                            setBoardPlayer2([...boardPlayer2, draggedCard]);
                        }, 1400);
                        
                    }
                }
                if(draggedCard.criDeGuerreUniqueSelf){
                    console.log(`🎯 Cri de guerre ciblé sur ${draggedCard.nom} (elle même)`);
                    setTimeout(() => {
                        const targetId = draggedCard.id
                        lancerAnimationCriDeGuerreUnique(draggedCard.id, targetId);
                    }, 1000);
                    
                    setTimeout(() => {
                        draggedCard.criDeGuerreUniqueSelf(draggedCard, boardPlayer2);
                        setBoardPlayer2([...boardPlayer2, draggedCard]);
                    }, 1400);
                     // Effet sur tout le board 
                }
                if(draggedCard.aura){
                    setTimeout(() => {
                        lancerAnimationCriDeGuerreAoE(draggedCard.id);
                      }, 1000);
                    
                      setTimeout(() => {
                        draggedCard.aura(boardPlayer2)
                        setBoardPlayer2([...boardPlayer2, draggedCard]);
                      }, 1200);
                }
                if(draggedCard.effetDeMass){
                    setTimeout(() => {
                        const targetId = draggedCard.id
                        lancerAnimationCriDeGuerreUnique(draggedCard.id, targetId);
                    }, 1000);
                    
                    setTimeout(() => {
                        draggedCard.effetDeMass(draggedCard, boardPlayer2);
                        setBoardPlayer2([...boardPlayer2, draggedCard]);
                    }, 1400);
                }
            }
            if (sourceType === "deck" && targetType === "board-drop"  && boardPlayer2.length <7){
                let auraPresent = boardPlayer2.findIndex(carte => carte.aura)        
                if (auraPresent >= 0){                   
                    let carteAura = boardPlayer2.filter(card => card.aura);
                    carteAura.forEach(carte =>{
                        carte.auraUnique(draggedCard)
                    })
                }
            }
            if (sourceType === "deck" && targetType === "board-drop"  && boardPlayer2.length <7){
                bivalence(sourceType, targetType, draggedCard, boardPlayer2)
            }
        }
    }
    useEffect(() => {
        if (fusionAnim) {
          const timer = setTimeout(() => {
            setFusionAnim(null);
          }, 1500);
          return () => clearTimeout(timer);
        }
    }, [fusionAnim]);
    useEffect(() => {
        if (griffeEffects.length > 0) {
          const timeout = setTimeout(() => setGriffeEffects([]), 500);
          return () => clearTimeout(timeout);
        }
    }, [griffeEffects]);

    const shopMusicRef = useRef(new Audio("sounds/ambiance.mp3"));
    const combatMusicRef = useRef(new Audio("sounds/combat.mp3"));
    const fadeInterval = useRef(null);

    useEffect(() => {
        const shopMusic = shopMusicRef.current;
        const combatMusic = combatMusicRef.current;
  
        shopMusic.loop = true;
        combatMusic.loop = true;
  
        const fadeOut = (audio, callback) => {
            clearInterval(fadeInterval.current);
            fadeInterval.current = setInterval(() => {
              if (audio.volume > 0) {
                audio.volume = Math.max(audio.volume - 0.05, 0);
              } else {
                audio.pause();
                clearInterval(fadeInterval.current);
                if (callback) callback(); // 💡 appelle le callback ici
              }
            }, 100);
        };
          
        const fadeIn = (audio) => {
            clearInterval(fadeInterval.current);
            audio.volume = 0;
            audio.play();
            fadeInterval.current = setInterval(() => {
              if (audio.volume < (muted ? 0 : volume)) {
                audio.volume = Math.min(audio.volume + 0.04, volume);
              } else {
                clearInterval(fadeInterval.current);
              }
            }, 100);
        };
  
    if (phase === "combat") {
      // 💥 transition rapide vers combat
      fadeOut(shopMusic, () => fadeIn(combatMusic, 0.4, 0.05), 0.05);
    } else if (phase === "shopPlayer1" || phase === "shopPlayer2") {
      // 🛑 si shopMusic déjà en cours, ne rien faire
      if (shopMusic.paused) {
        fadeOut(combatMusic, () => fadeIn(shopMusic));
      }
    }
    }, [phase, volume, muted]); // 👈 ajoute les dépendances volume / muted
    useEffect(() => {
        setSoundEffectVolume(muted ? 0 : soundVolume);
    }, [soundVolume, muted]);
    return (  
        <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]} >   
            <GameLayout1v1
                AlertModal={
                    <AlertModal message={popupMessage} onClose={() => setPopupMessage(null)} />
                }
                ShopHUD={
                    phase === "shopPlayer1" ? (
                        <DropZone id="header" className="drop-header">
                            <ShopHUD cout={coutLvlTaverne[lvlTaverne]} onRefresh={() => actualiserBoutique({ lvlTaverne, setShopCards, gold, setGold, actualPlayer, setPopupMessage })} onLvlUp={() => lvlUpTaverne({ gold, lvlTaverne, setGold, setLvlTaverne, setShopCards, actualPlayer, setPopupMessage })}/>
                        </DropZone>
                    ) : phase === "shopPlayer2" ? (
                        <DropZone id="header" className="drop-header">
                            <ShopHUD cout={coutLvlTavernePlayer2[lvlTavernePlayer2]} onRefresh={() => actualiserBoutique({ lvlTavernePlayer2, setShopCards, goldPlayer2, setGoldPlayer2, actualPlayer, setPopupMessage })}onLvlUp={() => lvlUpTaverne({ goldPlayer2, lvlTavernePlayer2, setGoldPlayer2, setLvlTavernePlayer2, setShopCards, actualPlayer, setPopupMessage })}/>
                        </DropZone>
                    ) : (
                        <Player2HUDFight goldPlayer2 = {goldPlayer2} lvlTavernePlayer2 = {lvlTavernePlayer2} player2Pv = {player2Pv}/>
                    )    
                }
                ShopBoard={
                    phase === "shopPlayer1" || phase === "shopPlayer2" ? (
                        <ShopBoard cards={shopCards} origin="shop" onPreview={setPreviewCard}/>
                    ) : (
                        <Player2BoardFight cards={ boardCombatPlayer2 } origin="board" onPreview={setPreviewCard} phase={phase} carteAttaquantId={carteAttaquantId} carteDefenseurId={carteDefenseurId}/>
                    )
                }
                PlayerBoard={
                    phase === "shopPlayer1" ? (
                        <DropZone id="board-drop" className="drop-bord">
                            <PlayerBoard cards={ boardPlayer } origin="board" onPreview={setPreviewCard} phase={phase} carteAttaquantId={carteAttaquantId} carteDefenseurId={carteDefenseurId}/>
                        </DropZone>
                    ) : phase === "shopPlayer2" ? (
                        <DropZone id="board-drop" className="drop-bord">
                            <Player2Board cards={ boardPlayer2 } origin="board" onPreview={setPreviewCard} phase={phase} carteAttaquantId={carteAttaquantId} carteDefenseurId={carteDefenseurId}/>
                        </DropZone>
                    ) : (
                        <PlayerBoardFight cards={ boardCombat } origin="board" onPreview={setPreviewCard} phase={phase} carteAttaquantId={carteAttaquantId} carteDefenseurId={carteDefenseurId}/>
                    )
                }
                PlayerDeck={
                    phase === "shopPlayer1" || phase === "combat" ? (
                        <DropZone id="footer" className="drop-footer">
                            <PlayerDeck cards={deck} origin="deck" onPlay={jouerCarteDepuisDeck} onPreview={setPreviewCard}/>
                        </DropZone>
                    ) : (
                        <DropZone id="footer" className="drop-footer">
                            <Player2Deck cards={deckPlayer2} origin="deck" onPlay={jouerCarteDepuisDeck} onPreview={setPreviewCard}/>
                        </DropZone>
                    )
                }
                PlayerHUD={
                    phase === "shopPlayer1" ? (
                        <>
                            <PlayerHUD gold={gold} lvlTaverne={lvlTaverne} playerPv={playerPv}/> 
                            <button className="btn btn-danger mt-2 phase" onClick={async () => {setPhase("shopPlayer2"); setActualPlayer(2); const tiragePhase = getCartesPourShop(lvlTavernePlayer2); const cartesPhase = getCartesAleatoires(tiragePhase, getNombreCartesShop(lvlTavernePlayer2)).map(carte => clonerCarte({ carte, camp: "shop" })); setShopCards(cartesPhase); await verifEffetDebutTour(boardPlayer2, setBoardPlayer2, deckPlayer2, setDeckPlayer2, setFusionAnim, bonusAtkElem, bonusTourbillonDeSable, setBonusAtkElem, setBonusTourbillonDeSable, shopCards, setShopCards, setAnimAoEVisuelle)}}>
                                Tour Joueur 2
                            </button>
                        </>
                    ) : phase === "apresCombat" ? (
                        <>
                          <PlayerHUD gold={gold} lvlTaverne={lvlTaverne} playerPv={playerPv}/>
                          <button
                            className="btn btn-success mt-2 phase"
                            onClick={async () => {
                              const tiragePhase = getCartesPourShop(lvlTaverne);
                              const cartesPhase = getCartesAleatoires(tiragePhase, getNombreCartesShop(lvlTaverne))
                                .map(carte => clonerCarte({ carte, camp: "shop" }));
                              setShopCards(cartesPhase);
                              setActualPlayer(1);
                              setPhase("shopPlayer1");
                    
                              await verifEffetDebutTour(
                                boardPlayer,
                                setBoardPlayer,
                                deck,
                                setDeck,
                                setFusionAnim,
                                bonusAtkElem,
                                bonusTourbillonDeSable,
                                setBonusAtkElem,
                                setBonusTourbillonDeSable,
                                shopCards,
                                setShopCards,
                                setAnimAoEVisuelle
                              );
                            }}
                          >
                            Tour Joueur 1
                          </button>
                        </>
                      ) : phase === "shopPlayer2" ? (
                        <>
                            <Player2HUD goldPlayer2={goldPlayer2} lvlTavernePlayer2={lvlTavernePlayer2} player2Pv={player2Pv}/> 
                            <button 
                                className="btn btn-danger mt-2 phase" 
                                onClick={async () => {
                                    setPhase("combat");
                                    await deroulerCombat1v1({
                                        boardPlayer,
                                        setBoardPlayer,
                                        boardPlayer2,
                                        setBoardPlayer2,
                                        lvlTaverne,
                                        lvlTavernePlayer2,
                                        playerPv,
                                        setplayerPv,
                                        player2Pv,
                                        setGoldPlayer2,
                                        setplayer2Pv,
                                        setPhase,
                                        setBoardCombat,
                                        setBoardCombatPlayer2,
                                        setCarteAttaquantId,
                                        setCarteDefenseurId,
                                        goldTour1,
                                        setgoldTour1,
                                        setGold,
                                        setShopCards,
                                        navigate,
                                        setActualPlayer,
                                        deck, 
                                        setDeck,
                                        deckPlayer2, 
                                        setDeckPlayer2,
                                        setFusionAnim,
                                        shopCards,
                                        setProjectileAnim,
                                        bonusTourbillonDeSable,
                                        setBonusTourbillonDeSable,
                                        bonusAtkElem,
                                        setBonusAtkElem,
                                        setAnimAoEVisuelle,
                                        setGriffeEffects,
                                        setPopupMessage
                                      });
                                }}
                            >
                                Fight !!
                            </button>
                        </>
                    ) : (
                        <PlayerHUD gold={gold} lvlTaverne={lvlTaverne} playerPv={playerPv}/>
                    )                                             
                }
                CardPreview={
                    <CardPreview card={previewCard} onClose={() => setPreviewCard(null)} />
                }
                MusicControl={
                    <MusicControl
                        volume={volume}
                        setVolume={setVolume}
                        muted={muted}
                        setMuted={setMuted}
                        audioRefs={[shopMusicRef, combatMusicRef]}
                        soundVolume={soundVolume}
                        setSoundVolume={setSoundVolume}
                    />
                }
                FusionAnim={
                    fusionAnim && (
                      <div className="fusion-overlay">
                        <div className="fusion-effect animate__animated animate__zoomIn">
                          <img src={fusionAnim.carteResultat.img} alt="Fusion Dorée" />
                          <p className="fusion-text">Fusion en {fusionAnim.carteResultat.nom} !</p>
                        </div>
                      </div>
                    )
                }
                ProjectileAnim={
                    projectileAnim && (
                        <ProjectileImage
                            key={projectileAnim.id}
                            startX={projectileAnim.startX}
                            startY={projectileAnim.startY}
                            endX={projectileAnim.endX}
                            endY={projectileAnim.endY}
                            onEnd={() => {
                            projectileAnim.onEnd?.(); // 👈 ceci résout la promesse
                            setProjectileAnim(null);  // 👈 ceci enlève l’animation de l’écran
                             }}
                            imgSrc={projectileAnim.imgSrc} // 👈 personnalisé
                        />
                    )
                }
                AnimAoeVisuelle={
                    phase === "combat" && animAoEVisuelle && (
                        <div className="aoe-wave" />
                    )
                }
                GriffeEffects={
                    griffeEffects.map((effet, index) => (
                        <div
                            key={`${effet.id}-${index}`}
                            className="griffe-effect"
                            style={{ top: `${effet.y}px`, left: `${effet.x}px` }}
                        />
                    ))
                }
                 
            />  
        </DndContext>        
    )
}