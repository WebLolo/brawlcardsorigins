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
  if(card.bivalence){
    card.bivalence(boardPlayer)
    // Faire réagir les autres cartes à l’arrivée de celle-ci
    boardPlayer.forEach(c => {
      if (c !== card && c.bivalence) {
        c.bivalence(boardPlayer, c); // chaque carte réévalue le board et s'applique à la nouvelle
      }
    });
  }else{
    // Faire réagir les autres cartes à l’arrivée de celle-ci
    boardPlayer.forEach(c => {
      if (c !== card && c.bivalence) {
          c.bivalence(boardPlayer, c); // chaque carte réévalue le board et s'applique à la nouvelle
      }
    });
  }
  if(card.criDeGuerre){
    card.criDeGuerre(boardPlayer)
  }
  if(card.criDeGuerreUnique && boardPlayer.length > 0){
    let cible = boardPlayer[Math.floor(Math.random() * boardPlayer.length)];
    card.criDeGuerreUnique(cible);
  }
  if(card.aura){
    card.aura(boardPlayer)
  }
  if(card.auraUnique){
    let auraPresent = boardPlayer.findIndex(carte => carte.aura)      
    if (auraPresent >= 0){
      let carteAura = boardPlayer.find(carte => carte.aura)
      carteAura.auraUnique(card)
    }
  }
  if(card.effetDeMass){
    card.effetDeMass(card, boardPlayer)
  }
  //ELEMENTAIRES
  //si pose Board
  if (card.criDeGuerreTaverne && card.nom !== "Oleiflamme flamboyant") {
    console.log(`📢 Cri de guerre activé pour ${card.nom}`);
    card.criDeGuerreTaverne(shopCards, bonusTourbillonDeSable, bonusAtkElem); // Effet sur tout le board
  }
  if(card.famille === "Elementaire"){
    boardPlayer.forEach(carte =>{
      if(carte.upSelf && carte.nom === "Roche en fusion"){
        carte.hp += 1 + bonusTourbillonDeSable
      }
    })
  }
  if(card.famille === "Elementaire" && card.magnetisme){
    boardPlayer.some(carte =>{
      if(carte.famille === "Elementaire"){
        carte.atk += card.atk + bonusAtkElem
        carte.hp += card.hp + bonusTourbillonDeSable
        setBoardPlayer([...boardPlayer]);
        return true;                       
      }
    })
  }
  if (card.famille === "Elementaire") {
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
    if (draggedCard.criCeleste) {
      setTimeout(() => {
        lancerAnimationCriDeGuerreAoE(draggedCard.id);
        setFureurCelesteP2(prev => {
          const newValue = prev + 5;
          fureurCelesteRefP2.current = newValue;
          console.log("Fureur céleste actualisée :", newValue);
          return newValue;
        }); 
      }, 1000);               
    }
    if (draggedCard.criCeleste2) {
      setTimeout(() => {
        lancerAnimationCriDeGuerreAoE(draggedCard.id);
        setFureurCelesteP2(prev => {
          const newValue = prev + boardPlayer2.length * 2 ;
          fureurCelesteRefP2.current = newValue;
          console.log("Fureur céleste actualisée :", newValue);
          return newValue;
        }); 
      }, 1000);   
    }
                if(draggedCard.fureurCeleste3Self){
                    if(fureurCelesteRefP2.current >= 3){
                        setTimeout(() => {
                            lancerAnimationCriDeGuerreUnique(draggedCard.id, draggedCard.id);
                        }, 1000);
                        
                        setTimeout(() => {
                            draggedCard.fureurCeleste3Self(draggedCard, fureurCelesteRefP2.current);
                            if(draggedCard.nom === "Brise-Nuées Rekkha" || draggedCard.nom === "Karaa la Frappe-Foudre"){
                                setFureurCelesteP2(prev => {
                                    const newValue = prev - prev;
                                    fureurCelesteRefP2.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                });
                            }else{
                                setFureurCelesteP2(prev => {
                                    const newValue = prev - 3;
                                    fureurCelesteRefP2.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                });
                            }

                        }, 1400);
                    }

                }
                if(draggedCard.fureurCeleste3OneRandom){
                    console.log(fureurCelesteP2)
                    if(fureurCelesteRefP2.current >= 3){
                        const boardFiltred = boardPlayer2.filter(carte => carte.famille === "Les Sabre-Tempête")
                        if(boardFiltred.length > 0){
                            const cible = boardFiltred[Math.floor(Math.random() * boardFiltred.length)];
                            setTimeout(() => {
                                lancerAnimationCriDeGuerreUnique(draggedCard.id, cible.id);
                            }, 1000);
                            
                            setTimeout(() => {
                                draggedCard.fureurCeleste3OneRandom(cible, fureurCelesteRefP2.current);
                                setFureurCelesteP2(prev => {
                                    const newValue = prev - 3;
                                    fureurCelesteRefP2.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                });
                            }, 1400);
                        }
                    }
                }
                if(draggedCard.fureurCeleste3All){
                    if(fureurCelesteRefP2.current >= 3){
                        const boardFiltred = boardPlayer2.filter(carte => carte.famille === "Les Sabre-Tempête")
                        if(boardFiltred.length > 0){
                            setTimeout(() => {
                                lancerAnimationCriDeGuerreAoE(draggedCard.id);
                            }, 1000);
                            
                            setTimeout(() => {
                                draggedCard.fureurCeleste3All(boardFiltred, fureurCelesteRefP2.current);
                                setFureurCelesteP2(prev => {
                                    const newValue = prev - 3;
                                    fureurCelesteRefP2.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                  });
                            }, 1400);
                        }
                    }
                }
                if(draggedCard.fureurCeleste5All){
                    if(fureurCelesteRefP2.current >= 5){
                        const boardFiltred = boardPlayer2.filter(carte => carte.famille === "Les Sabre-Tempête")
                        if(boardFiltred.length > 0){
                            setTimeout(() => {
                                lancerAnimationCriDeGuerreAoE(draggedCard.id);
                            }, 1000);
                            
                            setTimeout(() => {
                                draggedCard.fureurCeleste5All(boardFiltred, fureurCelesteRefP2.current);
                                setFureurCelesteP2(prev => {
                                    const newValue = prev - 5;
                                    fureurCelesteRefP2.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                  });
                            }, 1400);
                        }
                    }else if(fureurCelesteRefP2.current >= 3 && fureurCelesteRefP2.current < 5){
                        const boardFiltred = boardPlayer2.filter(carte => carte.famille === "Les Sabre-Tempête")
                        if(boardFiltred.length > 0){
                            setTimeout(() => {
                                lancerAnimationCriDeGuerreAoE(draggedCard.id);
                            }, 1000);
                            
                            setTimeout(() => {
                                draggedCard.fureurCeleste5All(boardFiltred, fureurCelesteRefP2.current);
                                setFureurCelesteP2(prev => {
                                    const newValue = prev - 3;
                                    fureurCelesteRefP2.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                  });
                            }, 1400);
                        }
                    }
                }
                if(draggedCard.fureurCeleste7All){
                    if(fureurCelesteRefP2.current >= 7){
                        const boardFiltred = boardPlayer2.filter(carte => carte.famille === "Les Sabre-Tempête")
                        if(boardFiltred.length > 0){
                            setTimeout(() => {
                                lancerAnimationCriDeGuerreAoE(draggedCard.id);
                            }, 1000);
                            
                            setTimeout(() => {
                                draggedCard.fureurCeleste7All(boardFiltred, fureurCelesteRefP2.current);
                                setFureurCelesteP2(prev => {
                                    const newValue = prev - 7;
                                    fureurCelesteRefP2.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                  });
                            }, 1400);
                        }
                    }else if(fureurCelesteRefP2.current >= 5 && fureurCelesteRefP2.current < 7){
                        const boardFiltred = boardPlayer2.filter(carte => carte.famille === "Les Sabre-Tempête")
                        if(boardFiltred.length > 0){
                            setTimeout(() => {
                                lancerAnimationCriDeGuerreAoE(draggedCard.id);
                            }, 1000);
                            
                            setTimeout(() => {
                                draggedCard.fureurCeleste7All(boardFiltred, fureurCelesteRefP2.current);
                                setFureurCelesteP2(prev => {
                                    const newValue = prev - 5;
                                    fureurCelesteRefP2.current = newValue;
                                    console.log("Fureur céleste actualisée :", newValue);
                                    return newValue;
                                  });
                            }, 1400);
                        }
                    }else if(fureurCelesteRefP2.current >= 3 && fureurCelesteRefP2.current < 5){
                        const boardFiltred = boardPlayer2.filter(carte => carte.famille === "Les Sabre-Tempête")
                        if(boardFiltred.length > 0){
                            setTimeout(() => {
                                lancerAnimationCriDeGuerreAoE(draggedCard.id);
                            }, 1000);
                            
                            setTimeout(() => {
                                draggedCard.fureurCeleste7All(boardFiltred, fureurCelesteRefP2.current);
                                setFureurCelesteP2(prev => {
                                    const newValue = prev - 3;
                                    fureurCelesteRefP2.current = newValue;
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
  if (card.nom === "Tourbillon de sable") {
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