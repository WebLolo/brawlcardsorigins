import GameLayout1v1 from "./GameLayout1v1";
import { useNavigate } from "react-router-dom";
import { arrayMove } from "@dnd-kit/sortable";
import SynergyHUD from "./SynergyHUD";
import SynergyHUDP2 from "./SynergyHUDP2";
import SynergyHUDFight from "./SynergyHUDFight";
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
import { TourIa } from "@/utils/iaUtils1";
import { useState, useEffect, useRef } from "react";
import { coutLvlTaverne, getCartesPourShop, getCartesAleatoires, getNombreCartesShop, clonerCarte, actualiserBoutique, lvlUpTaverne, coutLvlTavernePlayer2, jouerCarteDepuisDeck, vendreCarteDuBoard, acheterCarte, fusionnerCartesIdentiques, addBoardPosition, boardPositionSell, getNombreCartesSortsShop} from "@/utils/shopUtils";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { DndContext } from "@dnd-kit/core";
import DropZone from "./DropZone";
import MusicControl from "./MusicControl";
import { setSoundEffectVolume } from "@/utils/soundUtils";
import { piocherCarte, bivalence, piocherCarteFamille, verifEffetDebutTour } from "@/utils/mecaUtils";
import { lancerAnimationCriDeGuerreAoE, lancerAnimationCriDeGuerreUnique } from "@/utils/animUtils";
import ProjectileImage from "./ProjectileImage";
export default function GameIA(){
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
    const [fureurCelesteP2, setFureurCelesteP2] = useState(0);
    const fureurCelesteRef = useRef(fureurCeleste);
    const fureurCelesteRefP2 = useRef(fureurCelesteP2);
    const [marinsCount, setMarinsCount] = useState(0);
    const [terrestresCount, setTerrestresCount] = useState(0);
    const [projectileAnim, setProjectileAnim] = useState(null);
    const [animAoEVisuelle, setAnimAoEVisuelle] = useState(false);
    const [griffeEffects, setGriffeEffects] = useState([]);
    const [popupMessage, setPopupMessage] = useState(null);
    const [tourIa, setTourIa] = useState(1);

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
            const tirageSorts = getCartesSortsPourShop(lvlTaverne);
            const Sorts = getCartesAleatoires(tirageSorts, getNombreCartesSortsShop(lvlTaverne)).map(carte => clonerCarte({ carte, camp: "shop" }));;
            const cartesEtSorts = []
            cartesAleatoires.forEach(carte =>{
                cartesEtSorts.push(carte)
            })
            Sorts.forEach(carte =>{
                cartesEtSorts.push(carte)
            })
            return cartesEtSorts.map(carte => clonerCarte({ carte, camp: "joueur" }));
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
            
                draggedCard.criDeGuerreTaverne(shopCards, draggedCard, bonusTourbillonDeSable, bonusAtkElem); // Effet sur tout le board

            }
            if (sourceType === "deck" && targetType === "board-drop" && boardPlayer.length <7 ) {
                if(draggedCard.famille === "Elementaire"){
                    boardPlayer.forEach(carte =>{
                        if(carte.upSelf && carte.nom === "Roche en fusion"){
                            if(carte.estDoree){
                                carte.hp += 1 * 2 + bonusTourbillonDeSable
                            }else{
                                carte.hp += 1 + bonusTourbillonDeSable
                            }
                        }
                    })
                }
            }
            if (sourceType === "deck" && targetType === "board-drop") {
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
                        let elemDeFeteDoree = boardPlayer.filter(carte => carte.nom === "Elementaire de fête" && carte.estDoree === true)
                        if(elemDeFeteDoree){
                            if(newBoard.length > 0){
                                let cible = newBoard[Math.floor(Math.random() * newBoard.length)];
                                cible.atk += 2 * 2 + bonusAtkElem
                                cible.hp += 1 * 2 + bonusTourbillonDeSable
                            }
                        }else{
                            if(newBoard.length > 0){
                                let cible = newBoard[Math.floor(Math.random() * newBoard.length)];
                                cible.atk += 2 + bonusAtkElem
                                cible.hp += 1 + bonusTourbillonDeSable
                            }
                        }
                        
                    }
                    if(eruptionDeMana >=0){
                        let newBoard = boardPlayer.filter(carte => carte.nom !== "Eruption de mana déchainée").filter(carte => carte.famille === "Elementaire")
                        let eruptionDeManaDoree = boardPlayer.filter(carte => carte.nom === "Eruption de mana déchainée" && carte.estDoree === true)
                        if(eruptionDeManaDoree){
                            if(newBoard.length > 0){
                                let cible = newBoard[Math.floor(Math.random() * newBoard.length)];
                                cible.atk += 1 * 2 + bonusAtkElem
                                cible.hp += 1 * 2 + bonusTourbillonDeSable

                                let cible1 = newBoard[Math.floor(Math.random() * newBoard.length)];
                                cible1.atk += 1 * 2 + bonusAtkElem
                                cible1.hp += 1 * 2 + bonusTourbillonDeSable

                                let cible2 = newBoard[Math.floor(Math.random() * newBoard.length)];
                                cible2.atk += 1 * 2 + bonusAtkElem
                                cible2.hp += 1 * 2 + bonusTourbillonDeSable
                            }
                        }else{
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
            }
            if (sourceType === "deck" && targetType === "board-drop" && boardPlayer.length <7 && draggedCard.nom === "Tourbillon de sable") {
                if(draggedCard.estDoree){
                    setBonusTourbillonDeSable(bonusTourbillonDeSable + 1 * 2)
                }else{
                    setBonusTourbillonDeSable(bonusTourbillonDeSable + 1)
                }
                
                console.log(bonusTourbillonDeSable)

            }
            //Si vente
            if(sourceType === "board" && targetType === "header"){
                if(draggedCard.famille === "Elementaire"){
                    boardPlayer.forEach(carte => {
                        if(carte.upSelf && carte.nom === "Fracasseur de météorites"){
                            if(carte.estDoree){
                                carte.atk += 2 * 2 + bonusAtkElem
                                carte.hp += 2 * 2 + bonusTourbillonDeSable
                            }else{
                                carte.atk += 2 + bonusAtkElem
                                carte.hp += 2 + bonusTourbillonDeSable
                            }
                            
                        }
                    })
                }
                if(draggedCard.nom === "Tornade décuplée"){
                    draggedCard.piocherCarteFamille = true
                    piocherCarteFamille(draggedCard, deck, setDeck, boardPlayer, setBoardPlayer, setFusionAnim)
                }
            }
            //FIN ELEMENTAIRES

            if (sourceType === "deck" && targetType === "board-drop") {
                if(draggedCard.famille === "Sort"){
                    draggedCard.lancerSort(setGold, gold, boardPlayer, shopCards, setDeck, deck, setShopCards)
                }
            }
            if (sourceType === "deck" && targetType === "board-drop" && draggedCard.famille === "Sort"){
                jouerCarteDepuisDeck(draggedCard, boardPlayer, setDeck, deck, addBoardPosition, setBoardPlayer, setPopupMessage);
            }
            if (sourceType === "shop" && targetType === "footer" && deck.length < 7) {
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
                    draggedCard.auraSell(boardPlayer, draggedCard)
                }
                if(draggedCard.bivalence){
                    bivalence(sourceType, targetType, draggedCard, boardPlayer)
                }
                if(draggedCard.evanescence){
                    draggedCard.evanescence(boardPlayer, draggedCard)
                }


            } else if (sourceType === "deck" && targetType === "board-drop" && boardPlayer.length < 7) {  
                console.log("coucou")
                jouerCarteDepuisDeck(draggedCard, boardPlayer, setDeck, deck, addBoardPosition, setBoardPlayer, setPopupMessage);
                
                if(draggedCard.piocherCarte || draggedCard.piocherCarteSpe || draggedCard.piocherCarteInf) {
                    piocherCarte( sourceType, targetType, draggedCard, deck, setDeck, boardPlayer, setBoardPlayer, setFusionAnim)
                }
                if (draggedCard.criCeleste) {
                    setTimeout(() => {
                      lancerAnimationCriDeGuerreAoE(draggedCard.id);
                      setFureurCeleste(prev => {
                        const newValue = prev + 5;
                        fureurCelesteRef.current = newValue;
                        console.log("Fureur céleste actualisée :", newValue);
                        return newValue;
                      }); 
                    }, 1000);
                    
                    
                }
                if (draggedCard.criCeleste2) {
                    setTimeout(() => {
                      lancerAnimationCriDeGuerreAoE(draggedCard.id);
                      setFureurCeleste(prev => {
                        const newValue = prev + boardPlayer.length * 2;
                        fureurCelesteRef.current = newValue;
                        console.log("Fureur céleste actualisée :", newValue);
                        return newValue;
                      }); 
                    }, 1000);   
                }
                if(draggedCard.fureurCeleste3Self){
                    if(fureurCelesteRef.current >= 3){
                        setTimeout(() => {
                            lancerAnimationCriDeGuerreUnique(draggedCard.id, draggedCard.id);
                        }, 1000);
                        
                        setTimeout(() => {
                            draggedCard.fureurCeleste3Self(draggedCard, fureurCelesteRef.current);
                            if(draggedCard.nom === "Brise-Nuées Rekkha" || draggedCard.nom === "Karaa la Frappe-Foudre"){
                                setFureurCeleste(prev => {
                                    const newValue = prev - prev;
                                    fureurCelesteRef.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                });
                            }else{
                                setFureurCeleste(prev => {
                                    const newValue = prev - 3;
                                    fureurCelesteRef.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                });
                            }

                        }, 1400);
                    }

                }
                if(draggedCard.fureurCeleste3OneRandom){
                    console.log(fureurCeleste)
                    if(fureurCelesteRef.current >= 3){
                        const boardFiltred = boardPlayer.filter(carte => carte.famille === "Les Sabre-Tempête")
                        if(boardFiltred.length > 0){
                            const cible = boardFiltred[Math.floor(Math.random() * boardFiltred.length)];
                            setTimeout(() => {
                                lancerAnimationCriDeGuerreUnique(draggedCard.id, cible.id);
                            }, 1000);
                            
                            setTimeout(() => {
                                draggedCard.fureurCeleste3OneRandom(cible, fureurCelesteRef.current, draggedCard);
                                setFureurCeleste(prev => {
                                    const newValue = prev - 3;
                                    fureurCelesteRef.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                  });
                            }, 1400);
                        }
                    }
                }
                if(draggedCard.fureurCeleste3All){
                    if(fureurCelesteRef.current >= 3){
                        const boardFiltred = boardPlayer.filter(carte => carte.famille === "Les Sabre-Tempête")
                        if(boardFiltred.length > 0){
                            setTimeout(() => {
                                lancerAnimationCriDeGuerreAoE(draggedCard.id);
                            }, 1000);
                            
                            setTimeout(() => {
                                draggedCard.fureurCeleste3All(boardFiltred, fureurCelesteRef.current);
                                setFureurCeleste(prev => {
                                    const newValue = prev - 3;
                                    fureurCelesteRef.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                  });
                            }, 1400);
                        }
                    }
                }
                if(draggedCard.fureurCeleste5All){
                    if(fureurCelesteRef.current >= 5){
                        const boardFiltred = boardPlayer.filter(carte => carte.famille === "Les Sabre-Tempête")
                        if(boardFiltred.length > 0){
                            setTimeout(() => {
                                lancerAnimationCriDeGuerreAoE(draggedCard.id);
                            }, 1000);
                            
                            setTimeout(() => {
                                draggedCard.fureurCeleste5All(boardFiltred, fureurCelesteRef.current, draggedCard);
                                setFureurCeleste(prev => {
                                    const newValue = prev - 5;
                                    fureurCelesteRef.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                  });
                            }, 1400);
                        }
                    }else if(fureurCelesteRef.current >= 3 && fureurCelesteRef.current < 5){
                        const boardFiltred = boardPlayer.filter(carte => carte.famille === "Les Sabre-Tempête")
                        if(boardFiltred.length > 0){
                            setTimeout(() => {
                                lancerAnimationCriDeGuerreAoE(draggedCard.id);
                            }, 1000);
                            
                            setTimeout(() => {
                                draggedCard.fureurCeleste5All(boardFiltred, fureurCelesteRef.current, draggedCard);
                                setFureurCeleste(prev => {
                                    const newValue = prev - 3;
                                    fureurCelesteRef.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                  });
                            }, 1400);
                        }
                    }
                }
                if(draggedCard.fureurCeleste7All){
                    if(fureurCelesteRef.current >= 7){
                        const boardFiltred = boardPlayer.filter(carte => carte.famille === "Les Sabre-Tempête")
                        if(boardFiltred.length > 0){
                            setTimeout(() => {
                                lancerAnimationCriDeGuerreAoE(draggedCard.id);
                            }, 1000);
                            
                            setTimeout(() => {
                                draggedCard.fureurCeleste7All(boardFiltred, fureurCelesteRef.current, draggedCard);
                                setFureurCeleste(prev => {
                                    const newValue = prev - 7;
                                    fureurCelesteRef.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                  });
                            }, 1400);
                        }
                    }else if(fureurCelesteRef.current >= 5 && fureurCelesteRef.current < 7){
                        const boardFiltred = boardPlayer.filter(carte => carte.famille === "Les Sabre-Tempête")
                        if(boardFiltred.length > 0){
                            setTimeout(() => {
                                lancerAnimationCriDeGuerreAoE(draggedCard.id);
                            }, 1000);
                            
                            setTimeout(() => {
                                draggedCard.fureurCeleste7All(boardFiltred, fureurCelesteRef.current, draggedCard);
                                setFureurCeleste(prev => {
                                    const newValue = prev - 5;
                                    fureurCelesteRef.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                  });
                            }, 1400);
                        }
                    }else if(fureurCelesteRef.current >= 3 && fureurCelesteRef.current < 5){
                        const boardFiltred = boardPlayer.filter(carte => carte.famille === "Les Sabre-Tempête")
                        if(boardFiltred.length > 0){
                            setTimeout(() => {
                                lancerAnimationCriDeGuerreAoE(draggedCard.id);
                            }, 1000);
                            
                            setTimeout(() => {
                                draggedCard.fureurCeleste7All(boardFiltred, fureurCelesteRef.current, draggedCard);
                                setFureurCeleste(prev => {
                                    const newValue = prev - 3;
                                    fureurCelesteRef.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                  });
                            }, 1400);
                        }
                    }
                }
                if (draggedCard.criDeGuerre) {
                    setTimeout(() => {
                      lancerAnimationCriDeGuerreAoE(draggedCard.id);
                    }, 1000);
                  
                    setTimeout(() => {
                      draggedCard.criDeGuerre(boardPlayer, draggedCard);
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
                            draggedCard.criDeGuerreUnique(cible, draggedCard, bonusTourbillonDeSable, bonusAtkElem);
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
                            draggedCard.criDeGuerreUniqueBouclier(cible, draggedCard);
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
                        draggedCard.aura(boardPlayer, draggedCard)
                        setBoardPlayer([...boardPlayer, draggedCard]);
                      }, 1200);
                }

            }
            if (sourceType === "deck" && targetType === "board-drop"  && boardPlayer.length <7){
                let auraPresent = boardPlayer.findIndex(carte => carte.aura)        
                if (auraPresent >= 0){                   
                    let carteAura = boardPlayer.filter(card => card.aura);
                    carteAura.forEach(carte =>{
                        if(carte.estDoree){
                            carte.auraUnique(draggedCard)
                            carte.auraUnique(draggedCard)
                        }else{
                            carte.auraUnique(draggedCard)
                        } 
                    })
                }
            }
            if (sourceType === "deck" && targetType === "board-drop"  && boardPlayer.length <7){
                bivalence(sourceType, targetType, draggedCard, boardPlayer)
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
    useEffect(() => {
        fureurCelesteRef.current = fureurCeleste;
    }, [fureurCeleste]);
    useEffect(() => {
        fureurCelesteRefP2.current = fureurCelesteP2;
    }, [fureurCelesteP2]);
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
                    phase === "shopPlayer1" ? (
                        <DropZone id="footer" className="drop-footer">
                            <PlayerDeck cards={deck} origin="deck" onPlay={jouerCarteDepuisDeck} onPreview={setPreviewCard}/>
                        </DropZone>
                    ) : phase === "shopPlayer2" ? (
                        <DropZone id="footer" className="drop-footer">
                            <Player2Deck cards={deckPlayer2} origin="deck" onPlay={jouerCarteDepuisDeck} onPreview={setPreviewCard}/>
                        </DropZone>
                    ) : (
                        null
                    )
                }
                PlayerHUD={
                    phase === "shopPlayer1" ? (
                        <>
                            <PlayerHUD gold={gold} lvlTaverne={lvlTaverne} playerPv={playerPv}/> 
                            <button className="btn btn-danger mt-2 phase" onClick={async () => {setPhase("shopPlayer2"); setActualPlayer(2); await verifEffetDebutTour(boardPlayer2, setBoardPlayer2, deckPlayer2, setDeckPlayer2, setFusionAnim, bonusAtkElem, bonusTourbillonDeSable, setBonusAtkElem, setBonusTourbillonDeSable, shopCards, setShopCards, setAnimAoEVisuelle), await TourIa({goldPlayer2,setGoldPlayer2,shopCards,setShopCards,deckPlayer2,setDeckPlayer2,lvlTavernePlayer2,setLvlTavernePlayer2,boardPlayer2,setBoardPlayer2,jouerCarteDepuisDeck,tourIa,setTourIa,setFusionAnim, bonusTourbillonDeSable, bonusAtkElem, setBonusTourbillonDeSable, setPopupMessage, fureurCelesteRefP2, setFureurCelesteP2})}}>
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
                                className="btn btn-danger mt-2 phase fight" 
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
                                        setPopupMessage,
                                        fureurCeleste, 
                                        setFureurCeleste,
                                        lancerAnimationCriDeGuerreUnique,
                                        fureurCelesteP2, setFureurCelesteP2, fureurCelesteRef, fureurCelesteRefP2
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
                SynergyHUD={
                    phase === "shopPlayer1" ? (
                        <>
                            <SynergyHUD 
                                fureurCeleste={fureurCeleste}
                            />
                        </>

                    ) : phase === "shopPlayer2" ? (
                        <>
                        <SynergyHUDP2 
                            fureurCelesteP2={fureurCelesteP2}
                        />
                    </>
                    ) : <SynergyHUDFight 
                            fureurCeleste={fureurCeleste} fureurCelesteP2={fureurCelesteP2}
                        />
                        
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