export let uniqueID = 1000;
export function getUniqueId() {
  return uniqueID++;
}
export let boardPosition = 0;
export function getBoardPosition() {
  return boardPosition++;
}
export function getBoardPositionDec() {
  return boardPosition--;
}

export const cards = [
  {
    id: 1,
    nom: "Rok'gar Croc-des-Mers",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 5,
    atkDispo: false,
    img: "img/card29.1.png",
    imgMinia: "img/cardfight29.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "Aura: +3/+3 aux Croc-Noir. Aura Bivalente mer: +5 atk supp. Si Darka est présente: Rok'gar gagne +4/+4",
    aura: (cartesBoard, draggedCard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "Croc-Noir") {
          if(draggedCard.estDoree){
            carte.atk += 3 * 2;
            carte.buffAtk += 3 * 2;
            carte.hp += 3 * 2;
            carte.buffHp += 3 * 2;
            carte.auraEffect = true;
          }else{
            carte.atk += 3;
            carte.buffAtk += 3;
            carte.hp += 3;
            carte.buffHp += 3;
            carte.auraEffect = true;
          }
        }
        
      });
    },
    auraSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (carte.auraEffect === true && carte.famille === "Croc-Noir") {
            carte.atk -= 3 * 2;
            carte.buffAtk -= 3 * 2;
            carte.hp -= 3 * 2;
            carte.buffHp -= 3 * 2;
            if(carte.buffHp === 0 && carte.buffAtk === 0){
              carte.auraEffect = false
            }        
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (carte.auraEffect === true && carte.famille === "Croc-Noir") {
            carte.atk -= 3;
            carte.buffAtk -= 3;
            carte.hp -= 3;
            carte.buffHp -= 3;
            if(carte.buffHp === 0 && carte.buffAtk === 0){
              carte.auraEffect = false
            }        
          }
        });
      } 
    },
    auraUnique: (carte) => {
      if (carte.famille === "Croc-Noir") {
        carte.atk += 3;
        carte.buffAtk += 3;
        carte.hp += 3;
        carte.buffHp += 3;
        carte.auraEffect = true; 
      }     
    },
    bivalence: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          let karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          let bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
            if(carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Rok'gar")){
              carte.atk += 5 * 2 + bonus;
              carte.buffAtk += 5 * 2 + bonus;
              carte.buffAtkBivalence += 5 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Rok'gar");
            }
            if(!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Rok'gar")){
              carte.atk -= 5 * 2 + bonus;
              carte.buffAtk -= 5 * 2 + bonus;
              carte.buffAtkBivalence -= 5 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Rok'gar");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false
              }
            }
          }
        })
      }else{
        cartesBoard.forEach(carte => {
          let karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          let bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
            if(carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Rok'gar")){
              carte.atk += 5 + bonus;
              carte.buffAtk += 5 + bonus;
              carte.buffAtkBivalence += 5 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Rok'gar");
            }
            if(!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Rok'gar")){
              carte.atk -= 5 + bonus;
              carte.buffAtk -= 5 + bonus;
              carte.buffAtkBivalence -= 5 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Rok'gar");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false
              }
            }
          }
        })
      }
    },
    bivalenceSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Rok'gar")) {
    
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
              carte.atk -= 5 * 2 + bonus;
              carte.buffAtk -= 5 * 2 + bonus;
              carte.buffAtkBivalence -= 5 * 2 + bonus;
            }
    
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Rok'gar");
    
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
             carte.bivalenceEffect = false;
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Rok'gar")) {
    
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
              carte.atk -= 5 + bonus;
              carte.buffAtk -= 5 + bonus;
              carte.buffAtkBivalence -= 5 + bonus;
            }
    
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Rok'gar");
    
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }
    },
    effetDeCouple: {
      partenaire: "Darka la Brise-Voiles",
      effet: (cartesBoard) => {
        cartesBoard.forEach(carte => {
            if (carte.famille === "Croc-Noir") {
                carte.atk += 3;
                carte.buffAtk += 3;
                carte.hp += 3;
                carte.buffHp += 3;
            }
        });
      }
    },
  },
  {
    id: 2,
    nom: "La Matriarche Sang'Thalla",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 5,
    atkDispo: false,
    img: "img/card30.1.png",
    imgMinia: "img/cardfight30.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "Aura: +5 hp aux Croc-Noir. Aura Bivalente mer: +2 hp supp. Aura Bivalente terre: +4 atk supp.",
    aura: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
        if (carte.famille === "Croc-Noir") {
          carte.hp += 5 * 2;
          carte.buffHp += 5 * 2;
          carte.auraEffect = true;
        }
        
      });
      }else{
        cartesBoard.forEach(carte => {
        if (carte.famille === "Croc-Noir") {
          carte.hp += 5;
          carte.buffHp += 5;
          carte.auraEffect = true;
        }
        
      });
      }
      
    },
    auraSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (carte.auraEffect === true && carte.famille === "Croc-Noir") {
            carte.hp -= 5 * 2;
            carte.buffHp -= 5 * 2;
            if(carte.buffHp === 0 && carte.buffAtk === 0){
              carte.auraEffect = false
            }        
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (carte.auraEffect === true && carte.famille === "Croc-Noir") {
            carte.hp -= 5;
            carte.buffHp -= 5;
            if(carte.buffHp === 0 && carte.buffAtk === 0){
              carte.auraEffect = false
            }        
          }
        });
      } 
    },
    auraUnique: (carte) => {
      if (carte.famille === "Croc-Noir") {
        carte.hp += 5;
        carte.buffHp += 5;
        carte.auraEffect = true; 
      }     
    },
    bivalence: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          let karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          let bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
    
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Sang'Thalla")) {
              carte.hp += 2 * 2 + bonus;
              carte.buffHp += 2 * 2 + bonus;
              carte.buffHpBivalence += 2 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Sang'Thalla");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Sang'Thalla")) {
              carte.hp -= 2 * 2 + bonus;
              carte.buffHp -= 2 * 2 + bonus;
              carte.buffHpBivalence -= 2 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Sang'Thalla");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
            if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Sang'Thalla")) {
              carte.atk += 4 * 2 + bonus;
              carte.buffAtk += 4 * 2 + bonus;
              carte.buffAtkBivalence += 4 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Sang'Thalla");
            }
            if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Sang'Thalla")) {
              carte.atk -= 4 * 2 + bonus;
              carte.buffAtk -= 4 * 2 + bonus;
              carte.buffAtkBivalence -= 4 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Sang'Thalla");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          let karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          let bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
    
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Sang'Thalla")) {
              carte.hp += 2 + bonus;
              carte.buffHp += 2 + bonus;
              carte.buffHpBivalence += 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Sang'Thalla");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Sang'Thalla")) {
              carte.hp -= 2 + bonus;
              carte.buffHp -= 2 + bonus;
              carte.buffHpBivalence -= 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Sang'Thalla");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
            if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Sang'Thalla")) {
              carte.atk += 4 + bonus;
              carte.buffAtk += 4 + bonus;
              carte.buffAtkBivalence += 4 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Sang'Thalla");
            }
            if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Sang'Thalla")) {
              carte.atk -= 4 + bonus;
              carte.buffAtk -= 4 + bonus;
              carte.buffAtkBivalence -= 4 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Sang'Thalla");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }
    },
    bivalenceSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Sang'Thalla")) {
    
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
            
              carte.hp -= 2 * 2 + bonus;
              carte.buffHp -= 2 * 2 + bonus;
              carte.buffHpBivalence -= 2 * 2 + bonus;
            }
    
            if (carte.bivalenceTerrestreEffect) {
              carte.atk -= 4 * 2 + bonus;
              carte.buffAtk -= 4 * 2 + bonus;
              carte.buffAtkBivalence -= 4 * 2 + bonus;
            }
    
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Sang'Thalla");
    
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Sang'Thalla")) {
    
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
            
              carte.hp -= 2 + bonus;
              carte.buffHp -= 2 + bonus;
              carte.buffHpBivalence -= 2 + bonus;
            }
    
            if (carte.bivalenceTerrestreEffect) {
              carte.atk -= 4 + bonus;
              carte.buffAtk -= 4 + bonus;
              carte.buffAtkBivalence -= 4 + bonus;
            }
    
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Sang'Thalla");
    
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }
    },
  },
  {
    id: 3,
    nom: "Shak’Noth, l’Oracle des Marées",
    lvl: 6,
    hp: 4,
    baseHp: 4,
    atk: 7,
    atkDispo: false,
    img: "img/card31.1.png",
    imgMinia: "img/cardfight31.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    piocherCarte: true,
    texte: "Cri: +4/+4 aux Croc-Noir présent sur le Board + invoque une carte Croc-Noir aléatoire.",
    criDeGuerre: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.famille === "Croc-Noir"){
            carte.atk += 4 * 2;
            carte.buffAtk +=4 * 2;
            carte.hp += 4 * 2;
            carte.buffHp +=4 * 2;
            carte._criDeGuerreAnim = true; // 👈 animation à déclencher
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.famille === "Croc-Noir"){
            carte.atk += 4;
            carte.buffAtk +=4;
            carte.hp += 4;
            carte.buffHp +=4;
            carte._criDeGuerreAnim = true; // 👈 animation à déclencher
          }
        });
      } 
    },
  },
  {
    id: 4,
    nom: "Kaz'Drok le Maudit",
    lvl: 6,
    hp: 7,
    baseHp: 7,
    atk: 2,
    atkDispo: false,
    img: "img/card32.1.png",
    imgMinia: "img/cardfight32.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "Debut de combat: 4 dégats à tout le Board adverse. Aura bivalente mer: +4 atk aux Croc-Noir. Aura bivalente terre: +4 hp aux Croc-Noir.",
    aoeCible: (cartesBoardAdv, carteAoe) => {
      if(carteAoe.estDoree){
        cartesBoardAdv.forEach(carte => {
          if(carte.bouclierUse){
            carte.hp -= 0;
            carte.degatsRecus = 0;
            carte.bouclierUse = false
            carte.animAoE = true;
          }else{
            carte.hp -= 4 * 2;
            carte.degatsRecus = 4 * 2;
            carte.animAoE = true;
          }
        });
      }else{
        cartesBoardAdv.forEach(carte => {
          if(carte.bouclierUse){
            carte.hp -= 0;
            carte.degatsRecus = 0;
            carte.bouclierUse = false
            carte.animAoE = true;
          }else{
            carte.hp -= 4;
            carte.degatsRecus = 4;
            carte.animAoE = true;
          }
        });
      }  
    },
    bivalence: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
    
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Kaz'Drok")) {
              carte.atk += 4 * 2 + bonus;
              carte.buffAtk += 4 * 2 + bonus;
              carte.buffAtkBivalence += 4 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Kaz'Drok");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Kaz'Drok")) {
              carte.atk -= 4 * 2 + bonus;
              carte.buffAtk -= 4 * 2 + bonus;
              carte.buffAtkBivalence -= 4 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Kaz'Drok");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
            if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Kaz'Drok")) {
              carte.hp += 4 * 2 + bonus;
              carte.buffHp += 4 * 2 + bonus;
              carte.buffHpBivalence += 4 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Kaz'Drok");
            }
            if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Kaz'Drok")) {
              carte.hp -= 4 * 2 + bonus;
              carte.buffHp -= 4 * 2 + bonus;
              carte.buffHpBivalence -= 4 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Kaz'Drok");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
      
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Kaz'Drok")) {
              carte.atk += 4 + bonus;
              carte.buffAtk += 4 + bonus;
              carte.buffAtkBivalence += 4 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Kaz'Drok");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Kaz'Drok")) {
              carte.atk -= 4 + bonus;
              carte.buffAtk -= 4 + bonus;
              carte.buffAtkBivalence -= 4 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Kaz'Drok");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
          
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
            if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Kaz'Drok")) {
              carte.hp += 4 + bonus;
              carte.buffHp += 4 + bonus;
              carte.buffHpBivalence += 4 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Kaz'Drok");
            }
            if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Kaz'Drok")) {
              carte.hp -= 4 + bonus;
              carte.buffHp -= 4 + bonus;
              carte.buffHpBivalence -= 4 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Kaz'Drok");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }
      
    },
    bivalenceSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Kaz'Drok")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
              
              carte.hp -= 1 * 2;
              carte.buffHp -= 1 * 2;
              carte.buffHpBivalence -= 1 + bonus;
            }
      
            if (carte.bivalenceTerrestreEffect) {
              carte.atk -= 1 * 2;
              carte.buffAtk -= 1 * 2;
              carte.buffAtkBivalence -= 1 * 2 + bonus;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Kaz'Drok");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Kaz'Drok")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
              
              carte.hp -= 1;
              carte.buffHp -= 1;
              carte.buffHpBivalence -= 1 + bonus;
            }
      
            if (carte.bivalenceTerrestreEffect) {
              carte.atk -= 1;
              carte.buffAtk -= 1;
              carte.buffAtkBivalence -= 1 + bonus;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Kaz'Drok");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }  
    },
  },
  {
    id: 5,
    nom: "Zog'Bar le Vent d'Acier",
    lvl: 6,
    hp: 5,
    baseHp: 5,
    atk: 4,
    atkDispo: false,
    img: "img/card33.1.png",
    imgMinia: "img/cardfight33.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "Zog'Bar aussi inflige des dégats aux adv. adjacents. Aura Bivalente mer: +3 atk aux Croc-Noir. Aura Bivalente terre: +3 hp aux Croc-Noir.",
    degatsAdj: true,
    bivalence: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Zog'Bar")) {
              carte.atk += 3 * 2 + bonus;
              carte.buffAtk += 3 * 2 + bonus;
              carte.buffAtkBivalence += 3 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Zog'Bar");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Zog'Bar")) {
              carte.atk -= 3 * 2 + bonus;
              carte.buffAtk -= 3 * 2 + bonus;
              carte.buffAtkBivalence -= 3 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zog'Bar");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
          
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
            if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Zog'Bar")) {
              carte.hp += 3 * 2 + bonus;
              carte.buffHp += 3 * 2 + bonus;
              carte.buffHpBivalence += 3 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Zog'Bar");
            }
            if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Zog'Bar")) {
              carte.hp -= 3 * 2 + bonus;
              carte.buffHp -= 3 * 2 + bonus;
              carte.buffHpBivalence -= 3 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zog'Bar");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Zog'Bar")) {
              carte.atk += 3 + bonus;
              carte.buffAtk += 3 + bonus;
              carte.buffAtkBivalence += 3 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Zog'Bar");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Zog'Bar")) {
              carte.atk -= 3 + bonus;
              carte.buffAtk -= 3 + bonus;
              carte.buffAtkBivalence -= 3 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zog'Bar");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
          
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
            if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Zog'Bar")) {
              carte.hp += 3 + bonus;
              carte.buffHp += 3 + bonus;
              carte.buffHpBivalence += 3 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Zog'Bar");
            }
            if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Zog'Bar")) {
              carte.hp -= 3 + bonus;
              carte.buffHp -= 3 + bonus;
              carte.buffHpBivalence -= 3 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zog'Bar");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }
    },
    bivalenceSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Zog'Bar")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
              
              carte.atk -= 3 * 2 + bonus;
              carte.buffAtk -= 3 * 2 + bonus;
              carte.buffAtkBivalence -= 3 * 2 + bonus;
            }
      
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 3 * 2 + bonus;
              carte.buffHp -= 3 * 2 + bonus;
              carte.buffHpBivalence -= 3 * 2 + bonus;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zog'Bar");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Zog'Bar")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
              
              carte.atk -= 3 + bonus;
              carte.buffAtk -= 3 + bonus;
              carte.buffAtkBivalence -= 3 + bonus;
            }
      
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 3 + bonus;
              carte.buffHp -= 3 + bonus;
              carte.buffHpBivalence -= 3 + bonus;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zog'Bar");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }  
    },
  },
  {
    id: 6,
    nom: "Darka la Brise-Voiles",
    lvl: 5,
    hp: 6,
    baseHp: 6,
    atk: 4,
    atkDispo: false,
    img: "img/card34.1.png",
    imgMinia: "img/cardfight34.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "Aura Bivalente mer: les Croc-Noir ont +4/+2. Bivalence Terre: les Croc-Noir ont +2/+4. Si Rok'gar ets présent, Darka gagne +4/+2",
    effetDeCouple: {
      partenaire: "Rok'gar Croc-des-Mers",
      effetUnique: (carte) => {
        if(carte.estDoree){
          carte.atk += 4 * 2;
          carte.hp += 2 * 2;
          carte.buffAtk += 4 * 2;
          carte.buffHp += 2 * 2
        }else{
          carte.atk += 4;
          carte.hp += 2;
          carte.buffAtk += 4;
          carte.buffHp += 2
        }
        
      },
    },
    bivalence: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Darka")) {
              carte.atk += 4 * 2 + bonus;
              carte.buffAtk += 4 * 2 + bonus;
              carte.buffAtkBivalence += 4 * 2 + bonus;
              carte.hp += 2 * 2 + bonus;
              carte.buffHp += 2 * 2 + bonus;
              carte.buffHpBivalence += 2 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Darka");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Darka")) {
              carte.atk -= 4 * 2 + bonus;
              carte.buffAtk -= 4 * 2 + bonus;
              carte.buffAtkBivalence -= 4 * 2 + bonus;
              carte.hp -= 2 * 2 + bonus;
              carte.buffHp -= 2 * 2 + bonus;
              carte.buffHpBivalence -= 2 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Darka");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
          
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
            if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Darka")) {
              carte.atk += 2 * 2 + bonus;
              carte.buffAtk += 2 * 2 + bonus;
              carte.buffAtkBivalence += 2 * 2 + bonus;
              carte.hp += 4 * 2 + bonus;
              carte.buffHp += 4 * 2 + bonus;
              carte.buffHpBivalence += 4 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Darka");
            }
            if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Darka")) {
              carte.atk -= 2 * 2 + bonus;
              carte.buffAtk -= 2 * 2 + bonus;
              carte.buffAtkBivalence -= 2 * 2 + bonus;
              carte.hp -= 4 * 2 + bonus;
              carte.buffHp -= 4 * 2 + bonus;
              carte.buffHpBivalence -= 4 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Darka");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Darka")) {
              carte.atk += 4 + bonus;
              carte.buffAtk += 4 + bonus;
              carte.buffAtkBivalence += 4 + bonus;
              carte.hp += 2 + bonus;
              carte.buffHp += 2 + bonus;
              carte.buffHpBivalence += 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Darka");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Darka")) {
              carte.atk -= 4 + bonus;
              carte.buffAtk -= 4 + bonus;
              carte.buffAtkBivalence -= 4 + bonus;
              carte.hp -= 2 + bonus;
              carte.buffHp -= 2 + bonus;
              carte.buffHpBivalence -= 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Darka");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
          
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
            if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Darka")) {
              carte.atk += 2 + bonus;
              carte.buffAtk += 2 + bonus;
              carte.buffAtkBivalence += 2 + bonus;
              carte.hp += 4 + bonus;
              carte.buffHp += 4 + bonus;
              carte.buffHpBivalence += 4 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Darka");
            }
            if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Darka")) {
              carte.atk -= 2 + bonus;
              carte.buffAtk -= 2 + bonus;
              carte.buffAtkBivalence -= 2 + bonus;
              carte.hp -= 4 + bonus;
              carte.buffHp -= 4 + bonus;
              carte.buffHpBivalence -= 4 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Darka");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }
    },
    bivalenceSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Darka")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
              
              carte.atk -= 2 * 2 + bonus;
              carte.buffAtk -= 2 * 2 + bonus;
              carte.buffAtkBivalence -= 2 * 2 + bonus;
            }
      
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 2 * 2 + bonus;
              carte.buffHp -= 2 * 2 + bonus;
              carte.buffHpBivalence -= 2 * 2 + bonus;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Darka");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Darka")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
              
              carte.atk -= 2 + bonus;
              carte.buffAtk -= 2 + bonus;
              carte.buffAtkBivalence -= 2 + bonus;
            }
      
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 2 + bonus;
              carte.buffHp -= 2 + bonus;
              carte.buffHpBivalence -= 2 + bonus;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Darka");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }  
    },
  },
  {
    id: 7,
    nom: "Grûm le Sculpteur de Crocs",
    lvl: 5,
    hp: 7,
    baseHp: 7,
    atk: 3,
    atkDispo: false,
    img: "img/card35.1.png",
    imgMinia: "img/cardfight35.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "Quand un Croc-Noir meurs, les Croc-Noir gagne +1/+1. Bivalence mer: +1 atk supp. Bivalence terre: +1 hp supp.",
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if (mortCarte.famille !== "Croc-Noir" || mortCarte.id === self.id) return;
      const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
      const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Croc-Noir" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      );
    
      if (cibles.length === 0) return;
    
      // Choisir une cible aléatoire
      const cible = cibles[Math.floor(Math.random() * cibles.length)];
      if(self.estDoree){
        // Appliquer les buffs selon la bivalence
        if (self.bivalenceMarinEffect) {
          cible.atk += 2 * 2 + bonus;
          cible.hp += 1 * 2 + bonus;
          cible.buffAtk += 2 * 2 + bonus;
          cible.buffHp += 1 * 2 + bonus;
          cible.buffAtkGrum = (cible.buffAtkGrum || 0) + 2 * 2 + bonus;
          cible.buffHpGrum = (cible.buffHpGrum || 0) + 1 * 2 + bonus;
        } else if (self.bivalenceTerrestreEffect) {
          cible.atk += 1 * 2 + bonus;
          cible.hp += 2 * 2 + bonus;
          cible.buffAtk += 1 * 2 + bonus;
          cible.buffHp += 2 * 2 + bonus;
          cible.buffAtkGrum = (cible.buffAtkGrum || 0) + 1 * 2 + bonus;
          cible.buffHpGrum = (cible.buffHpGrum || 0) + 2 * 2 + bonus;
        } else {
          cible.atk += 1 * 2 + bonus;
          cible.buffAtk += 1 * 2 + bonus;
          cible.buffAtkGrum = (cible.buffAtkGrum || 0) + 1 * 2 + bonus;
        }
      }else{
        // Appliquer les buffs selon la bivalence
        if (self.bivalenceMarinEffect) {
          cible.atk += 2 + bonus;
          cible.hp += 1 + bonus;
          cible.buffAtk += 2 + bonus;
          cible.buffHp += 1 + bonus;
          cible.buffAtkGrum = (cible.buffAtkGrum || 0) + 2 + bonus;
          cible.buffHpGrum = (cible.buffHpGrum || 0) + 1 + bonus;
        } else if (self.bivalenceTerrestreEffect) {
          cible.atk += 1 + bonus;
          cible.hp += 2 + bonus;
          cible.buffAtk += 1 + bonus;
          cible.buffHp += 2 + bonus;
          cible.buffAtkGrum = (cible.buffAtkGrum || 0) + 1 + bonus;
          cible.buffHpGrum = (cible.buffHpGrum || 0) + 2 + bonus;
        } else {
          cible.atk += 1 + bonus;
          cible.buffAtk += 1 + bonus;
          cible.buffAtkGrum = (cible.buffAtkGrum || 0) + 1 + bonus;
        }
      }
      cible.grumBuffEffect = true; // Pour tracking ou affichage
    }
    
  },

  {
    id: 8,
    nom: "Brak'Na la Dompteuse d'Écaille",
    lvl: 6,
    hp: 4,
    baseHp: 4,
    atk: 5,
    atkDispo: false,
    img: "img/card36.png",
    imgMinia: "img/cardfight36.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "Cri: Invoque 'LE REQUIN' 4/4 avec réincarnation. Si Bivalence mer: LE REQUIN gagne +4/+4",
    carteSpe: 23,
    piocherCarteSpe: true,
    bivalence: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin" && carte.nom === "LE REQUIN") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Brak'Na")) {
              carte.atk += 4 * 2 + bonus;
              carte.buffAtk += 4 * 2 + bonus;
              carte.buffAtkBivalence += 4 * 2 + bonus;
              carte.hp += 4 * 2 + bonus;
              carte.buffHp += 4 * 2 + bonus;
              carte.buffHpBivalence += 4 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Brak'Na");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Brak'Na")) {
              carte.atk -= 4 * 2 + bonus;
              carte.buffAtk -= 4 * 2 + bonus;
              carte.buffAtkBivalence -= 4 * 2 + bonus;
              carte.hp -= 4 * 2 + bonus;
              carte.buffHp -= 4 * 2 + bonus;
              carte.buffHpBivalence -= 4 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Brak'Na");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin" && carte.nom === "LE REQUIN") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Brak'Na")) {
              carte.atk += 4 + bonus;
              carte.buffAtk += 4 + bonus;
              carte.buffAtkBivalence += 4 + bonus;
              carte.hp += 4 + bonus;
              carte.buffHp += 4 + bonus;
              carte.buffHpBivalence += 4 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Brak'Na");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Brak'Na")) {
              carte.atk -= 4 + bonus;
              carte.buffAtk -= 4 + bonus;
              carte.buffAtkBivalence -= 4 + bonus;
              carte.hp -= 4 + bonus;
              carte.buffHp -= 4 + bonus;
              carte.buffHpBivalence -= 4 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Brak'Na");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }
    },
    bivalenceSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Brak'Na")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect && carte.nom === "LE REQUIN") {
              
              carte.atk -= 4 * 2 + bonus;
              carte.buffAtk -= 4 * 2 + bonus;
              carte.buffAtkBivalence -= 4 * 2 + bonus;
              carte.hp -= 4 * 2 + bonus;
              carte.buffHp -= 4 * 2 + bonus;
              carte.buffHpBivalence -= 4 * 2 + bonus;
            }
      
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 0;
              carte.buffHpBivalence -= 0;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Brak'Na");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Brak'Na")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect && carte.nom === "LE REQUIN") {
              
              carte.atk -= 4 + bonus;
              carte.buffAtk -= 4 + bonus;
              carte.buffAtkBivalence -= 4 + bonus;
              carte.hp -= 4 + bonus;
              carte.buffHp -= 4 + bonus;
              carte.buffHpBivalence -= 4 + bonus;
            }
      
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 0;
              carte.buffHpBivalence -= 0;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Brak'Na");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }
      
    },
  },
 
  {
    id: 9,
    nom: "Urgak la Ravageuse",
    lvl: 5,
    hp: 5,
    baseHp: 5,
    atk: 4,
    atkDispo: false,
    img: "img/card38.1.png",
    imgMinia: "img/cardfight38.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "Cri: +3/+3 aux Croc-Noir sur le Board. Bivalence mer: +3 atk supp. Bivalence terre: +3hp supp",
    criDeGuerre: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.famille === "Croc-Noir"){
            carte.atk += 3 * 2;
            carte.buffAtk +=3 * 2;
            carte.hp += 3 * 2;
            carte.buffHp += 3 * 2;
            if(carte.bivalenceMarinEffect){
              carte.atk += 3 * 2;
              carte.buffAtk +=3 * 2;
            }else{
              carte.hp += 3 * 2;
              carte.buffHp += 3 * 2;
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.famille === "Croc-Noir"){
            carte.atk += 3;
            carte.buffAtk +=3;
            carte.hp += 3;
            carte.buffHp += 3;
            if(carte.bivalenceMarinEffect){
              carte.atk += 3;
              carte.buffAtk +=3;
            }else{
              carte.hp += 3;
              carte.buffHp += 3;
            }
          }
        });
      }
      
    },

  },
  {
    id: 10,
    nom: "Vrak'Nul le Hurleur des Cimes",
    lvl: 4,
    hp: 4,
    baseHp: 4,
    atk: 5,
    atkDispo: false,
    img: "img/card39.1.png",
    imgMinia: "img/cardfight39.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "Aoe général: Inflige 2 dégats a TOUT le monde. Aura Bivalente mer: +4 atk aux Croc-Noir. Aura Bivalente terre: +4 hp aux Croc-Noir",
    degatsAdj: false,
    furie: true,
    furieUse: false,
    aoeCible: (cartesBoardAdv, cardAoe) => {
      if(cardAoe.estDoree){
        cartesBoardAdv.forEach(carte => {
          if(carte.bouclierUse){
            carte.hp -= 0;
            carte.degatsRecus = 0;
            carte.bouclierUse = false
            carte.animAoE = true;
          }else{
            carte.hp -= 2 * 2;
            carte.degatsRecus = 2 * 2;
            carte.animAoE = true;
          }
        });
      }else{
        cartesBoardAdv.forEach(carte => {
          if(carte.bouclierUse){
            carte.hp -= 0;
            carte.degatsRecus = 0;
            carte.bouclierUse = false
            carte.animAoE = true;
          }else{
            carte.hp -= 2;
            carte.degatsRecus = 2;
            carte.animAoE = true;
          }
        });
      }
      
    },
    bivalence: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Vrak'Nul")) {
              carte.atk += 4 * 2 + bonus;
              carte.buffAtk += 4 * 2 + bonus;
              carte.buffAtkBivalence += 4 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Vrak'Nul");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Vrak'Nul")) {
              carte.atk -= 4 * 2 + bonus;
              carte.buffAtk -= 4 * 2 + bonus;
              carte.buffAtkBivalence -= 4 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Vrak'Nul");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
            if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Vrak'Nul")) {
              carte.hp += 4 * 2 + bonus;
              carte.buffHp += 4 * 2 + bonus;
              carte.buffHpBivalence += 4 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Vrak'Nul");
            }
            if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Vrak'Nul")) {
              carte.hp -= 4 * 2 + bonus;
              carte.buffHp -= 4 * 2 + bonus;
              carte.buffHpBivalence -= 4 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Vrak'Nul");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Vrak'Nul")) {
              carte.atk += 4 + bonus;
              carte.buffAtk += 4 + bonus;
              carte.buffAtkBivalence += 4 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Vrak'Nul");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Vrak'Nul")) {
              carte.atk -= 4 + bonus;
              carte.buffAtk -= 4 + bonus;
              carte.buffAtkBivalence -= 4 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Vrak'Nul");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
            if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Vrak'Nul")) {
              carte.hp += 4 + bonus;
              carte.buffHp += 4 + bonus;
              carte.buffHpBivalence += 4 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Vrak'Nul");
            }
            if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Vrak'Nul")) {
              carte.hp -= 4 + bonus;
              carte.buffHp -= 4 + bonus;
              carte.buffHpBivalence -= 4 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Vrak'Nul");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }
      
    },
    bivalenceSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Vrak'Nul")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
              
              carte.atk -= 4 * 2 + bonus;
              carte.buffAtk -= 4 * 2 + bonus;
              carte.buffAtkBivalence -= 4 * 2 + bonus;
            }
      
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 4 * 2 + bonus;
              carte.buffHp -= 4 * 2 + bonus;
              carte.buffHpBivalence -= 4 * 2 + bonus;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Vrak'Nul");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Vrak'Nul")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
              
              carte.atk -= 4 + bonus;
              carte.buffAtk -= 4 + bonus;
              carte.buffAtkBivalence -= 4 + bonus;
            }
      
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 4 + bonus;
              carte.buffHp -= 4 + bonus;
              carte.buffHpBivalence -= 4 + bonus;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Vrak'Nul");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }
      
    },
  },
  {
    id: 11,
    nom: "Ka'Rasha la Lieuse d'Esprits",
    lvl: 4,
    hp: 6,
    baseHp: 6,
    atk: 3,
    atkDispo: false,
    img: "img/card40.1.png",
    imgMinia: "img/cardfight40.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "Aura: les effets Bivalents sont doublés. Aura bivalente mer: +2/+1 aux Croc-Noir. Aura bivalente terre: +1/+2 aux Croc-Noir",
    bivalence: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Ka'Rasha")) {
              carte.atk += 2 * 2 + bonus;
              carte.buffAtk += 2 * 2 + bonus;
              carte.buffAtkBivalence += 2 * 2 + bonus;
              carte.hp += 1 * 2 + bonus;
              carte.buffHp += 1 * 2 + bonus;
              carte.buffHpBivalence += 1 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Ka'Rasha");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Ka'Rasha")) {
              carte.atk -= 2 * 2 + bonus;
              carte.buffAtk -= 2 * 2 + bonus;
              carte.buffAtkBivalence -= 2 * 2 + bonus;
              carte.hp -= 1 * 2 + bonus;
              carte.buffHp -= 1 * 2 + bonus;
              carte.buffHpBivalence -= 1 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Ka'Rasha");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
          
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
            if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Ka'Rasha")) {
              carte.hp += 2 * 2 + bonus;
              carte.buffHp += 2 * 2 + bonus;
              carte.buffHpBivalence += 2 * 2 + bonus;
              carte.atk += 1 * 2 + bonus;
              carte.buffAtk += 1 * 2 + bonus;
              carte.buffAtkBivalence += 1 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Ka'Rasha");
            }
            if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Ka'Rasha")) {
              carte.hp -= 2 * 2 + bonus;
              carte.buffHp -= 2 * 2 + bonus;
              carte.buffHpBivalence -= 2 * 2 + bonus;
              carte.atk -= 1 * 2 + bonus;
              carte.buffAtk -= 1 * 2 + bonus;
              carte.buffAtkBivalence -= 1 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Ka'Rasha");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Ka'Rasha")) {
              carte.atk += 2 + bonus;
              carte.buffAtk += 2 + bonus;
              carte.buffAtkBivalence += 2 + bonus;
              carte.hp += 1 + bonus;
              carte.buffHp += 1 + bonus;
              carte.buffHpBivalence += 1 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Ka'Rasha");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Ka'Rasha")) {
              carte.atk -= 2 + bonus;
              carte.buffAtk -= 2 + bonus;
              carte.buffAtkBivalence -= 2 + bonus;
              carte.hp -= 1 + bonus;
              carte.buffHp -= 1 + bonus;
              carte.buffHpBivalence -= 1 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Ka'Rasha");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
          
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre") {
            if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Ka'Rasha")) {
              carte.hp += 2 + bonus;
              carte.buffHp += 2 + bonus;
              carte.buffHpBivalence += 2 + bonus;
              carte.atk += 1 + bonus;
              carte.buffAtk += 1 + bonus;
              carte.buffAtkBivalence += 1 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Ka'Rasha");
            }
            if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Ka'Rasha")) {
              carte.hp -= 2 + bonus;
              carte.buffHp -= 2 + bonus;
              carte.buffHpBivalence -= 2 + bonus;
              carte.atk -= 1 + bonus;
              carte.buffAtk -= 1 + bonus;
              carte.buffAtkBivalence -= 1 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Ka'Rasha");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }
      
    },
    bivalenceSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Ka'Rasha")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
              
              carte.atk -= 2 * 2 + bonus;
              carte.buffAtk -= 2 * 2 + bonus;
              carte.buffAtkBivalence -= 2 * 2 + bonus;
              carte.hp -= 1 * 2 + bonus;
              carte.buffHp -= 1 * 2 + bonus;
              carte.buffHpBivalence -= 1 * 2 + bonus;
            }
      
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 2 * 2 + bonus;
              carte.buffHp -= 2 * 2 + bonus;
              carte.buffHpBivalence -= 2 * 2 + bonus;
              carte.atk -= 1 * 2 + bonus;
              carte.buffAtk -= 1 * 2 + bonus;
              carte.buffAtkBivalence -= 1 * 2 + bonus;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Ka'Rasha");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Ka'Rasha")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
              
              carte.atk -= 2 + bonus;
              carte.buffAtk -= 2 + bonus;
              carte.buffAtkBivalence -= 2 + bonus;
              carte.hp -= 1 + bonus;
              carte.buffHp -= 1 + bonus;
              carte.buffHpBivalence -= 1 + bonus;
            }
      
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 2 + bonus;
              carte.buffHp -= 2 + bonus;
              carte.buffHpBivalence -= 2 + bonus;
              carte.atk -= 1 + bonus;
              carte.buffAtk -= 1 + bonus;
              carte.buffAtkBivalence -= 1 + bonus;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Ka'Rasha");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }  
    },
  },

  {
    id: 12,
    nom: "Na'Kra des Cendres Brûlantes",
    lvl: 4,
    hp: 4,
    baseHp: 4,
    atk: 4,
    atkDispo: false,
    img: "img/card42.1.png",
    imgMinia: "img/cardfight42.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "Début de combat: inflige 2 dégats à tous le Board adv. Aura bivalente terre: les Croc-Noir ont +2hp",
    aoeCible: (cartesBoardAdv, carteAoe) => {
      if(carteAoe.estDoree){
        cartesBoardAdv.forEach(carte => {
          if(carte.bouclierUse){
            carte.hp -= 0;
            carte.degatsRecus = 0;
            carte.bouclierUse = false
            carte.animAoE = true;
          }else{
            carte.hp -= 2 * 2;
            carte.degatsRecus = 2 * 2;
            carte.animAoE = true;
          }
        });
      }else{
        cartesBoardAdv.forEach(carte => {
          if(carte.bouclierUse){
            carte.hp -= 0;
            carte.degatsRecus = 0;
            carte.bouclierUse = false
            carte.animAoE = true;
          }else{
            carte.hp -= 2;
            carte.degatsRecus = 2;
            carte.animAoE = true;
          }
        });
      }
      
    },
    bivalence: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
            if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Na'Kra")) {
              carte.hp += 2 * 2 + bonus;
              carte.buffHp += 2 * 2 + bonus;
              carte.buffHpBivalence += 2 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Na'Kra");
            }
            if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Na'Kra")) {
              carte.hp -= 2 * 2 + bonus;
              carte.buffHp -= 2 * 2 + bonus;
              carte.buffHpBivalence -= 2 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Na'Kra");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin") {
            if (carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Na'Kra")) {
              carte.hp += 2 + bonus;
              carte.buffHp += 2 + bonus;
              carte.buffHpBivalence += 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Na'Kra");
            }
            if (!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Na'Kra")) {
              carte.hp -= 2 + bonus;
              carte.buffHp -= 2 + bonus;
              carte.buffHpBivalence -= 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Na'Kra");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }
      
    },
    bivalenceSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Na'Kra")) {
      
            // Retrait des effets appliqués par cette source
      
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 2 * 2 + bonus;
              carte.buffHp -= 2 * 2 + bonus;
              carte.buffHpBivalence -= 2 * 2 + bonus;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Na'Kra");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Na'Kra")) {
      
            // Retrait des effets appliqués par cette source
      
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 2 + bonus;
              carte.buffHp -= 2 + bonus;
              carte.buffHpBivalence -= 2 + bonus;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Na'Kra");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }
      
    },
  },
  {
    id: 13,
    nom: "Sha'Rok, la pisteuse furtive",
    lvl: 4,
    hp: 5,
    baseHp: 5,
    atk: 3,
    atkDispo: false,
    img: "img/card43.1.png",
    imgMinia: "img/cardfight43.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "Cri: +2/+2 à un Croc-Noir aléatoire + Vous obtenez une carte Croc-Noir aléatoire de niveau inférieur à Sha'Rok",
    piocherCarteInf: true,
    criDeGuerreUnique: (carte, draggedCard) => {
      if(draggedCard.estDoree){
        carte.atk += 2 * 2;
        carte.buffAtk +=2 * 2;
        carte.hp += 2 * 2;
        carte.buffHp += 2 * 2;
        if(carte.bivalenceMarinEffect){
          carte.atk += 1 * 2;
          carte.buffAtk +=1 * 2;
        }else{
          carte.hp += 1 * 2;
          carte.buffHp += 1 * 2;
        }
      }else{
        carte.atk += 2;
        carte.buffAtk +=2;
        carte.hp += 2;
        carte.buffHp += 2;
        if(carte.bivalenceMarinEffect){
          carte.atk += 1;
          carte.buffAtk +=1;
        }else{
          carte.hp += 1;
          carte.buffHp += 1;
        }
      }
    },
  },
  {
    id: 14,
    nom: "Trok'Ma, l'Écumeur Grinçant",
    lvl: 3,
    hp: 4,
    baseHp: 4,
    atk: 3,
    atkDispo: false,
    img: "img/card44.1.png",
    imgMinia: "img/cardfight44.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "Cri: +2/+2 à un Croc-Noir aléatoire. Bivalence mer: +2 atk supp. Bivalence Terre: +2 hp supp.",
    criDeGuerreUnique: (carte, draggedCard) => {
      if(draggedCard.estDoree){
        carte.atk += 2 * 2;
        carte.buffAtk +=2 * 2;
        carte.hp += 2 * 2;
        carte.buffHp += 2 * 2;
        if(carte.bivalenceMarinEffect){
          carte.atk += 2 * 2;
          carte.buffAtk += 2 * 2;
        }else{
          carte.hp += 2 * 2;
          carte.buffHp += 2 * 2;
        }
      }else{
        carte.atk += 2;
        carte.buffAtk +=2;
        carte.hp += 2;
        carte.buffHp += 2;
        if(carte.bivalenceMarinEffect){
          carte.atk += 2;
          carte.buffAtk += 2;
        }else{
          carte.hp += 2;
          carte.buffHp += 2;
        }
      }
    },
  },
  {
    id: 15,
    nom: "Muk'Zar la Ravineuse",
    lvl: 3,
    hp: 3,
    baseHp: 3,
    atk: 4,
    atkDispo: false,
    img: "img/card45.1.png",
    imgMinia: "img/cardfight45.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "Cri: Muk'Zar gagne +1/+1 pour chaque Croc-Noir présent sur le Board. Bivalence Mer: +2 atk supp. Bivalence terre: +2 hp supp.",
    effetDeMass: (carte, board) => {
      if(carte.estDoree){
        const crocNoir = board.filter(c => c.famille === "Croc-Noir" && c.id !== carte.id);
        if (crocNoir.length > 0) {
          carte.atk += crocNoir.length * 2;
          carte.hp += crocNoir.length * 2;
          carte.buffAtk += crocNoir.length * 2;
          carte.buffHp += crocNoir.length * 2;
          if(carte.bivalenceTerrestreEffect){
            carte.hp += 2 * 2;
            carte.buffHp += 2 * 2;
          }else{
            carte.atk += 2 * 2;
            carte.buffAtk += 2 * 2;
          } 
        } 
      }else{
        const crocNoir = board.filter(c => c.famille === "Croc-Noir" && c.id !== carte.id);
        if (crocNoir.length > 0) {
          carte.atk += crocNoir.length;
          carte.hp += crocNoir.length;
          carte.buffAtk += crocNoir.length;
          carte.buffHp += crocNoir.length;
          if(carte.bivalenceTerrestreEffect){
            carte.hp += 2;
            carte.buffHp += 2;
          }else{
            carte.atk += 2;
            carte.buffAtk += 2;
          } 
        } 
      }
          
    },
  },
  {
    id: 16,
    nom: "Zug'Rok le Dresseur de Crabes",
    lvl: 4,
    hp: 5,
    baseHp: 5,
    atk: 2,
    atkDispo: false,
    img: "img/card46.1.png",
    imgMinia: "img/cardfight46.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "Cri: Invoque 'Craby' 3/3 avec réincarnation. Si Bivalence mer: Craby gagne +2/+2",
    carteSpe: 24,
    piocherCarteSpe: true,
    bivalence: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin" && carte.nom === "Craby") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Zug'Rok")) {
              carte.atk += 2 * 2 + bonus;
              carte.BuffAtk += 2 * 2 + bonus;
              carte.buffAtkBivalence += 2 * 2 + bonus;
              carte.hp += 2 * 2 + bonus;
              carte.buffHp += 2 * 2 + bonus;
              carte.buffHpBivalence += 2 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Zug'Rok");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Zug'Rok")) {
              carte.atk -= 2 * 2 + bonus;
              carte.buffAtk -= 2 * 2 + bonus;
              carte.buffAtkBivalence -= 2 * 2 + bonus;
              carte.hp -= 2 * 2 + bonus;
              carte.buffHp -= 2 * 2 + bonus;
              carte.buffHpBivalence -= 2 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zug'Rok");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin" && carte.nom === "Craby") {
            if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Zug'Rok")) {
              carte.atk += 2 + bonus;
              carte.BuffAtk += 2 + bonus;
              carte.buffAtkBivalence += 2 + bonus;
              carte.hp += 2 + bonus;
              carte.buffHp += 2 + bonus;
              carte.buffHpBivalence += 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Zug'Rok");
            }
            if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Zug'Rok")) {
              carte.atk -= 2 + bonus;
              carte.buffAtk -= 2 + bonus;
              carte.buffAtkBivalence -= 2 + bonus;
              carte.hp -= 2 + bonus;
              carte.buffHp -= 2 + bonus;
              carte.buffHpBivalence -= 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zug'Rok");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false;
              }
            }
          }
        });
      }
      
    },
    bivalenceSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Zug'Rok")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect && carte.nom === "Craby") {
              
              carte.atk -= 1 * 2 + bonus;
              carte.buffAtk -= 1 * 2 + bonus;
              carte.buffAtkBivalence -= 1 * 2 + bonus;
              carte.hp -= 2 * 2 + bonus;
              carte.buffHp -= 2 * 2 + bonus;
              carte.buffHpBivalence -= 2 * 2 + bonus;
            }
      
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 0;
              carte.buffHpBivalence -= 0;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zug'Rok");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Zug'Rok")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect && carte.nom === "Craby") {
              
              carte.atk -= 1 + bonus;
              carte.buffAtk -= 1 + bonus;
              carte.buffAtkBivalence -= 1 + bonus;
              carte.hp -= 2 + bonus;
              carte.buffHp -= 2 + bonus;
              carte.buffHpBivalence -= 2 + bonus;
            }
      
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 0;
              carte.buffHpBivalence -= 0;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Zug'Rok");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }  
    },
  },
  {
    id: 17,
    nom: "Narka Brise-Roches",
    lvl: 3,
    hp: 5,
    baseHp: 5,
    atk: 3,
    atkDispo: false,
    img: "img/card47.1.png",
    imgMinia: "img/cardfight47.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "Aura: Les Croc-Noir sur le Board gagne +1/+2. Bivalence mer: +2 atk supp. Bivalence Terre: +2 hp supp.",
    aura: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (carte.famille === "Croc-Noir") {
            carte.atk += 1 * 2;
            carte.buffAtk += 1 * 2;
            carte.hp += 2 * 2;
            carte.buffHp += 2 * 2;
            carte.auraEffect = true;
          }
          
        });
      }else{
        cartesBoard.forEach(carte => {
          if (carte.famille === "Croc-Noir") {
            carte.atk += 1;
            carte.buffAtk += 1;
            carte.hp += 2;
            carte.buffHp += 2;
            carte.auraEffect = true;
          }
          
        });
      }  
    },
    auraSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (carte.auraEffect === true && carte.famille === "Croc-Noir") {
            carte.atk -= 1 * 2;
            carte.buffAtk -= 1 * 2;
            carte.hp -= 2 * 2;
            carte.buffHp -= 2 * 2;
            if(carte.buffHp === 0 && carte.buffAtk === 0){
              carte.auraEffect = false
            }        
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (carte.auraEffect === true && carte.famille === "Croc-Noir") {
            carte.atk -= 1;
            carte.buffAtk -= 1;
            carte.hp -= 2;
            carte.buffHp -= 2;
            if(carte.buffHp === 0 && carte.buffAtk === 0){
              carte.auraEffect = false
            }        
          }
        });
      }  
    },
    auraUnique: (carte) => {
      if (carte.famille === "Croc-Noir") {
        carte.atk += 1;
        carte.buffAtk += 1;
        carte.hp += 2;
        carte.buffHp += 2;
        carte.auraEffect = true; 
      }     
    },
    bivalence: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
            if(carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Narka")){
              carte.atk += 2 * 2 + bonus;
              carte.buffAtk += 2 * 2 + bonus;
              carte.buffAtkBivalence += 2 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Narka");
            }
            if(!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Narka")){
              carte.atk -= 2 * 2 + bonus;
              carte.buffAtk -= 2 * 2 + bonus;
              carte.buffAtkBivalence -= 2 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Narka");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false
              }
            }
          }
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre"){
            if(carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Narka")){
              carte.hp += 2 * 2 + bonus;
              carte.buffHp += 2 * 2 + bonus;
              carte.buffHpBivalence += 2 * 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Narka");
            }
            if(!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Narka")){
              carte.hp -= 2 * 2 + bonus;
              carte.buffHp -= 2 * 2 + bonus;
              carte.buffHpBivalence -= 2 * 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Narka");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false
              }
            }
          }
        })
      }else{
        cartesBoard.forEach(carte => {
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
          if (!carte.bivalenceSources) carte.bivalenceSources = [];
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
            if(carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Narka")){
              carte.atk += 2 + bonus;
              carte.buffAtk += 2 + bonus;
              carte.buffAtkBivalence += 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Narka");
            }
            if(!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Narka")){
              carte.atk -= 2 + bonus;
              carte.buffAtk -= 2 + bonus;
              carte.buffAtkBivalence -= 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Narka");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false
              }
            }
          }
          if (carte.famille === "Croc-Noir" && carte.sousFamille === "Terrestre"){
            if(carte.bivalenceTerrestreEffect && !carte.bivalenceSources.includes("Narka")){
              carte.hp += 2 + bonus;
              carte.buffHp += 2 + bonus;
              carte.buffHpBivalence += 2 + bonus;
              carte.bivalenceEffect = true;
              carte.bivalenceSources.push("Narka");
            }
            if(!carte.bivalenceTerrestreEffect && carte.bivalenceSources.includes("Narka")){
              carte.hp -= 2 + bonus;
              carte.buffHp -= 2 + bonus;
              carte.buffHpBivalence -= 2 + bonus;
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Narka");
              if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                carte.bivalenceEffect = false
              }
            }
          }
        })
      }
      
    },
    bivalenceSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Narka")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
              carte.atk -= 2 * 2 + bonus;
              carte.buffAtk -= 2 * 2 + bonus;
              carte.buffAtkBivalence -= 2 * 2 + bonus;
            }
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 2 * 2 + bonus;
              carte.buffHp -= 2 * 2 + bonus;
              carte.buffHpBivalence -= 2 * 2 + bonus;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Narka");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (!carte.bivalenceSources) return;
          const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
          const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
      
          // Si la source est présente dans les effets appliqués
          if (carte.bivalenceSources.includes("Narka")) {
      
            // Retrait des effets appliqués par cette source
            if (carte.bivalenceMarinEffect) {
              carte.atk -= 2 + bonus;
              carte.buffAtk -= 2 + bonus;
              carte.buffAtkBivalence -= 2 + bonus;
            }
            if (carte.bivalenceTerrestreEffect) {
              carte.hp -= 2 + bonus;
              carte.buffHp -= 2 + bonus;
              carte.buffHpBivalence -= 2 + bonus;
            }
      
            // Suppression de la source
            carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Narka");
      
            // Si plus aucun buff actif, on désactive le flag global
            if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
              carte.bivalenceEffect = false;
            }
          }
        });
      }
      
    },
  },
  
  {
    id: 18,
    nom: "Krug le Moussaillon",
    lvl: 2,
    hp: 3,
    baseHp: 3,
    atk: 2,
    atkDispo: false,
    img: "img/card49.1.png",
    imgMinia: "img/cardfight49.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "Cri: +2 atk à un Croc-Noir aléatoire. Bivalence mer: +1 atk supp. Bivalence Terre: +1 hp supp.",
    criDeGuerreUnique: (carte, draggedCard) => {
      if(draggedCard.estDoree){
        if(carte.famille === "Croc-Noir"){
          carte.atk += 2 * 2;
          carte.buffAtk +=2 * 2;
          if(carte.bivalenceMarinEffect){
            carte.atk += 1 * 2;
            carte.buffAtk +=1 * 2;
          }else{
            carte.hp += 1 * 2;
            carte.buffHp += 1 * 2;
          }
        }
      }else{
        if(carte.famille === "Croc-Noir"){
          carte.atk += 2;
          carte.buffAtk +=2;
          if(carte.bivalenceMarinEffect){
            carte.atk += 1;
            carte.buffAtk +=1;
          }else{
            carte.hp += 1;
            carte.buffHp += 1;
          }
        }
      }
      
    },
  },
  {
    id: 19,
    nom: "Drozha l'essoreuse d'os",
    lvl: 2,
    hp: 2,
    baseHp: 2,
    atk: 3,
    atkDispo: false,
    img: "img/card50.1.png",
    imgMinia: "img/cardfight50.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "Lorsqu'un Croc-Noir meurt, Drozha gagne +1 atk. Bivalance mer: +1 atk supp. Bivalence terre: + 1 hp supp.",
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if (mortCarte.famille !== "Croc-Noir" || mortCarte.id === self.id) return;
      const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
      const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Croc-Noir" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      );
    
      if (cibles.length === 0) return;
    
      // Choisir une cible aléatoire
      const cible = cibles[Math.floor(Math.random() * cibles.length)];
      if(self.estDoree){
        // Appliquer les buffs selon la bivalence
        if (self.bivalenceMarinEffect) {
          self.atk += 2 * 2 + bonus;
          self.buffAtk += 2 * 2 + bonus;
          self.buffAtkGrum = (self.buffAtkGrum || 0) + 2 * 2 + bonus;
        } else if (self.bivalenceTerrestreEffect) {
          self.atk += 1 * 2 + bonus;
          self.buffAtk += 1 * 2 + bonus;
          self.hp += 1 * 2 + bonus;
          self.buffHp += 1 * 2 + bonus;
          self.buffAtkGrum = (self.buffAtkGrum || 0) + 1 * 2 + bonus;
          self.buffHpGrum = (self.buffHpGrum || 0) + 1 * 2 + bonus;
        } else {
          self.atk += 1 * 2 + bonus;
          self.buffAtk += 1 * 2 + bonus;
          self.buffAtkGrum = (self.buffAtkGrum || 0) + 1 * 2 + bonus;
        }
      
        self.grumBuffEffect = true; // Pour tracking ou affichage
      }else{
        // Appliquer les buffs selon la bivalence
        if (self.bivalenceMarinEffect) {
          self.atk += 2 + bonus;
          self.buffAtk += 2 + bonus;
          self.buffAtkGrum = (self.buffAtkGrum || 0) + 2 + bonus;
        } else if (self.bivalenceTerrestreEffect) {
          self.atk += 1 + bonus;
          self.buffAtk += 1 + bonus;
          self.hp += 1 + bonus;
          self.buffHp += 1 + bonus;
          self.buffAtkGrum = (self.buffAtkGrum || 0) + 1 + bonus;
          self.buffHpGrum = (self.buffHpGrum || 0) + 1 + bonus;
        } else {
          self.atk += 1 + bonus;
          self.buffAtk += 1 + bonus;
          self.buffAtkGrum = (self.buffAtkGrum || 0) + 1 + bonus;
        }
      
        self.grumBuffEffect = true; // Pour tracking ou affichage
        }
      
    }
  },
  {
    id: 20,
    nom: "Zûn'Tul, le Mange-Racines",
    lvl: 2,
    hp: 5,
    baseHp: 5,
    atk: 1,
    atkDispo: false,
    img: "img/card51.1.png",
    imgMinia: "img/cardfight51.png",
    imgMiniaProvoc: "img/cardfight51-provoc.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "Aura: +1 hp aux Croc-Noir du Board. Bivalence mer: il gagne furie. Bivalence Terre: il gagne Provocation",
    provocation: true,
    provocationUse: false,
    furie: true,
    furieUse: false,
    aura: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (carte.famille === "Croc-Noir") {
            carte.hp += 1 * 2;
            carte.buffHp += 1 * 2;
            carte.auraEffect = true;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (carte.famille === "Croc-Noir") {
            carte.hp += 1;
            carte.buffHp += 1;
            carte.auraEffect = true;
          }
        });
      }
      
    },
    auraSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (carte.auraEffect === true && carte.famille === "Croc-Noir") {
            carte.hp -= 1 * 2;
            carte.buffHp -= 1 * 2;
            if(carte.buffHp === 0 && carte.buffHp === 0){
              carte.auraEffect = false
            }        
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (carte.auraEffect === true && carte.famille === "Croc-Noir") {
            carte.hp -= 1;
            carte.buffHp -= 1;
            if(carte.buffHp === 0 && carte.buffHp === 0){
              carte.auraEffect = false
            }        
          }
        });
      }
      
    },
    auraUnique: (carte) => {
      if (carte.famille === "Croc-Noir") {
        carte.hp += 1;
        carte.buffHp += 1;
        carte.auraEffect = true; 
      }     
    }
  },

  {
    id: 21,
    nom: "Krosh l’Écailleuse",
    lvl: 1,
    hp: 3,
    baseHp: 3,
    atk: 1,
    atkDispo: false,
    img: "img/card55.1.png",
    imgMinia: "img/cardfight55.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "Cri: +1 atk à un allié Croc-Noir aléatoire",
    criDeGuerreUnique: (carte, draggedCard) => {
      if(draggedCard.estDoree){
        if(carte.famille === "Croc-Noir"){
          carte.atk += 1 * 2;
          carte.buffAtk +=1 * 2;
        }
      }else{
        if(carte.famille === "Croc-Noir"){
          carte.atk += 1;
          carte.buffAtk +=1;
        }
      }
        
    },
  },
  {
    id: 22,
    nom: "Ur'Thok le Rampe-Sable",
    lvl: 1,
    hp: 1,
    baseHp: 1,
    atk: 3,
    atkDispo: false,
    img: "img/card56.1.png",
    imgMinia: "img/cardfight56.png",
    imgProjectile: "img/projectile.png",
    famille: "Croc-Noir",
    sousFamille : "Terrestre",
    texte: "Debut de combat: inflige 1 dégat à une cible aléatoire",
    oneTicDebutCombat: (carteCible, carteSource) => {
      if(carteSource.estDoree){
        if(carteCible.bouclierUse){
          carteCible.hp -= 0;
          carteCible.degatsRecus = 0;
          carteCible.bouclierUse = false
        }else{
          carteCible.hp -= 1 * 2; 
          carteCible.degatsRecus = 1 * 2;
        }
      }else{
        if(carteCible.bouclierUse){
          carteCible.hp -= 0;
          carteCible.degatsRecus = 0;
          carteCible.bouclierUse = false
        }else{
          carteCible.hp -= 1; 
          carteCible.degatsRecus = 1;
        }
      }
      
    },
  },
  {
    id: 23,
    nom: "Drush la Poissonneuse",
    lvl: 2,
    hp: 2,
    baseHp: 2,
    atk: 1,
    atkDispo: false,
    img: "img/card57.1.png",
    imgMinia: "img/cardfight57.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "Cri: Invoque un Poisson Gris 1/1 avec réincarnation",
    carteSpe: 25,
    piocherCarteSpe: true,
  },

  {
    id: 24,
    nom: "LE REQUIN",
    lvl: 7,
    hp: 4,
    baseHp: 4,
    atk: 4,
    atkDispo: false,
    img: "img/card59.png",
    imgMinia: "img/cardfight59.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "Reincarnation: revient 1x à la vie avec 1 hp",
    reincarnation: true,
  },
  {
    id: 25,
    nom: "Craby",
    lvl: 7,
    hp: 3,
    baseHp: 3,
    atk: 3,
    atkDispo: false,
    img: "img/card60.png",
    imgMinia: "img/cardfight60.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "Reincarnation: revient 1x à la vie avec 1 hp",
    reincarnation: true,
  },

  {
    id: 26,
    nom: "Poisson gris",
    lvl: 7,
    hp: 1,
    baseHp: 1,
    atk: 1,
    atkDispo: false,
    img: "img/card61.1.png",
    imgMinia: "img/cardfight61.png",
    famille: "Croc-Noir",
    sousFamille : "Marin",
    texte: "Reincarnation: revient 1x à la vie avec 1 hp",
    reincarnation: true,
  },
  {
    id: 27,
    nom: "Myrrh Reine des Voiles",
    lvl: 6,
    hp: 7,
    baseHp: 7,
    atk: 5,
    atkDispo: false,
    img: "img/card63.1.png",
    imgMinia: "img/cardfight63.png",
    imgMiniaProvoc: "img/cardfight63-provoc.png",
    imgMiniaBouclier: "img/cardfight63-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<i>Cri</i><br><br> Donne <color=rgb(0, 163, 238)> Voile</color> aux Sylph<br><br> <color=rgb(20, 33, 220)>Aura</color> <color=red>+4 hp</color> aux Sylph ayant <br><br><color=rgb(0, 163, 238)> Voile</color>",
    criDeGuerre: (cartesBoard) => {
      cartesBoard.forEach(carte => {
        if(carte.famille === "Les Sylphariels" && carte.bouclierUse === false){
          carte.bouclierUse = true
        }
      });
    },
    criDeGuerreUniqueSelf: (carte, board) => {
      carte.bouclierUse = true  
    },
    aura: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (carte.famille === "Les Sylphariels" && carte.bouclierUse) {
            carte.hp += 4 * 2;
            carte.buffHp += 4 * 2;
            carte.auraEffect = true;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (carte.famille === "Les Sylphariels" && carte.bouclierUse) {
            carte.hp += 4;
            carte.buffHp += 4;
            carte.auraEffect = true;
          }
        });
      }
      
    },
    auraSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (carte.auraEffect === true && carte.bouclierUse && carte.famille === "Les Sylphariels") {
            carte.hp -= 4 * 2;
            carte.buffHp -= 4 * 2;
            if(carte.buffHp === 0 && carte.buffHp === 0){
              carte.auraEffect = false
            }        
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (carte.auraEffect === true && carte.bouclierUse && carte.famille === "Les Sylphariels") {
            carte.hp -= 4;
            carte.buffHp -= 4;
            if(carte.buffHp === 0 && carte.buffHp === 0){
              carte.auraEffect = false
            }        
          }
        });
      }
      
    },
    auraUnique: (carte) => {
      if (carte.famille === "Les Sylphariels" && carte.bouclierUse) {
        carte.hp += 4;
        carte.buffHp += 4;
        carte.auraEffect = true; 
      }     
    },
  },
  {
    id: 28,
    nom: "Nythéa la Sorcière des Brumes",
    lvl: 6,
    hp: 4,
    baseHp: 4,
    atk: 6,
    atkDispo: false,
    img: "img/card64.1.png",
    imgMinia: "img/cardfight64.png",
    imgMiniaProvoc: "img/cardfight64-provoc.png",
    imgMiniaBouclier: "img/cardfight64-bouclier.png",
    imgProjectile: "img/projectile3.png",
    famille: "Les Sylphariels",
    sousFamille : "Dark",
    bouclier: true,
    bouclierUse: true,
    texte: "<i>Début de tour</i><br><br> <color=red>+ 4atk</color> aux Sylph <br><br><i>Début de Combat</i><br><br> Lance <color=rgb(52, 16, 79)>Envoûtement</color>",
    oneTicDebutCombat: (carteCible, carteSource) => {
      carteCible.control = true;
    },
    aoeCibleApresCombat: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          carte.atk += 4 * 2;
          carte.buffAtk +=4 * 2;
          carte.animAoE = true; 
        });
      }else{
        cartesBoard.forEach(carte => {
          carte.atk += 4;
          carte.buffAtk +=4;
          carte.animAoE = true; 
        });
      }  
    },
    
  },
  {
    id: 29,
    nom: "Arwyn des Mille Reflets",
    lvl: 6,
    hp: 3,
    baseHp: 3,
    atk: 3,
    atkDispo: false,
    img: "img/card65.1.png",
    imgMinia: "img/cardfight65.png",
    imgMiniaProvoc: "img/cardfight65-provoc.png",
    imgMiniaBouclier: "img/cardfight65-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<i>Début du tour</i><br><br><br> Les Sylph gagnent <color=red>+4hp</color>",
    aoeCibleApresCombat: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          carte.hp += 4 * 2;
          carte.buffHp += 4 * 2;
          carte.animAoE = true; 
        });
      }else{
        cartesBoard.forEach(carte => {
          carte.hp += 4;
          carte.buffHp += 4;
          carte.animAoE = true; 
        });
      }
      
    },
  },
  {
    id: 30,
    nom: "Thalya le Jugement Serein",
    lvl: 6,
    hp: 4,
    baseHp: 4,
    atk: 6,
    atkDispo: false,
    img: "img/card66.1.png",
    imgMinia: "img/cardfight69.png",
    imgMiniaProvoc: "img/cardfight69-provoc.png",
    imgMiniaBouclier: "img/cardfight69-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "Cri et Evanescence mort: +4 atk aux Sylphariels présents sur le Board. Inflige aussi des dégats aux adversaires adjacents",
    degatsAdj: true,
    criDeGuerre: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 4 * 2;
            carte.buffAtk +=4 * 2;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 4;
            carte.buffAtk +=4;
          }
        });
      }
      
    },
    criDeGuerreUniqueSelf: (carte, board) => {
      if(carte.estDoree){
        carte.atk += 4 * 2;
        carte.buffAtk +=4 * 2;
      }else{
        carte.atk += 4;
        carte.buffAtk +=4;
      }  
    },
    


    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if ( mortCarte.id !== self.id) return;
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Les Sylphariels" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      ).sort((a, b) => a.hp - b.hp);
      if (cibles.length === 0) return;
      if(self.estDoree){
        cibles.forEach(cible => {
          // Appliquer les buffs
          cible.atk += 4 * 2;
          cible.buffAtk += 4 * 2;
          cible.buffatkTahlRin = (cible.buffatkTahlRin || 0) + 4 * 2;

          cible.tahlRinBuffEffect = true; // Pour tracking ou affichage

        })
      }else{
        cibles.forEach(cible => {
          // Appliquer les buffs
          cible.atk += 4;
          cible.buffAtk += 4;
          cible.buffatkTahlRin = (cible.buffatkTahlRin || 0) + 4;

          cible.tahlRinBuffEffect = true; // Pour tracking ou affichage

        })
      }
    },
  },
  {
    id: 31,
    nom: "Lúmena La Dernière Lueur",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 4,
    atkDispo: false,
    img: "img/card67.1.png",
    imgMinia: "img/cardfight67.png",
    imgMiniaProvoc: "img/cardfight67-provoc.png",
    imgMiniaBouclier: "img/cardfight67-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<i>Cri et Evanescence(Vente)</i><br><br><br> <color=red>+3/+6</color> aux Sylphs ayant <br><br><br> <color=rgb(0, 163, 238)> Voile de Lune</color>",
    criDeGuerre: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
            carte.atk += 3 * 2;
            carte.buffAtk +=3 * 2;
            carte.hp += 6 * 2;
            carte.buffHp += 6 * 2;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
            carte.atk += 3;
            carte.buffAtk +=3;
            carte.hp += 6;
            carte.buffHp += 6;
          }
        });
      }
      
    },
    evanescence: (board, draggedCard) => {
      if(draggedCard.estDoree){
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
            carte.atk += 3 * 2;
            carte.buffAtk +=3 * 2;
            carte.hp += 6 * 2;
            carte.buffHp += 6 * 2;
          }
        });
        const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
        if(vessalyn.length > 0){
          board.forEach(carte => {
            if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
              carte.atk += 3;
              carte.buffAtk += 3;
              carte.hp += 6;
              carte.buffHp += 6;
            }
          });
        }
      }else{
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
            carte.atk += 3;
            carte.buffAtk +=3;
            carte.hp += 6;
            carte.buffHp += 6;
          }
        });
        const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
        if(vessalyn.length > 0){
          board.forEach(carte => {
            if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
              carte.atk += 3;
              carte.buffAtk += 3;
              carte.hp += 6;
              carte.buffHp += 6;
            }
          });
        }
      }
    },
  },
  {
    id: 32,
    nom: "Elyssia le Miroir de l'Éclat",
    lvl: 5,
    hp: 6,
    baseHp: 6,
    atk: 4,
    atkDispo: false,
    img: "img/card68.1.png",
    imgMinia: "img/cardfight68.png",
    imgMiniaProvoc: "img/cardfight68-provoc.png",
    imgMiniaBouclier: "img/cardfight68-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<i>Cri et Evanescence(Vente)</i><br><br><br> <color=red>+2/+4</color> aux Sylphs ayant <br><br><br> <color=rgb(0, 163, 238)> Voile de Lune</color>",
    criDeGuerre: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
            carte.atk += 2 * 2;
            carte.buffAtk +=2 * 2;
            carte.hp += 4 * 2;
            carte.buffHp += 4 * 2;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
            carte.atk += 2;
            carte.buffAtk +=2;
            carte.hp += 4;
            carte.buffHp += 4;
          }
        });
      }
      
    },
    evanescence: (board, draggedCard) => {
      if(draggedCard.estDoree){
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
            carte.atk += 2 * 2;
            carte.buffAtk +=2 * 2;
            carte.hp += 2 * 2;
            carte.buffHp += 2 * 2;
          }
        });
        const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
        if(vessalyn.length > 0){
          board.forEach(carte => {
            if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
              carte.atk += 2;
              carte.buffAtk += 2;
              carte.hp += 2;
              carte.buffHp += 2;
            }
          });
        }
      }else{
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
            carte.atk += 2;
            carte.buffAtk +=2;
            carte.hp += 2;
            carte.buffHp += 2;
          }
        });
        const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
        if(vessalyn.length > 0){
          board.forEach(carte => {
            if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
              carte.atk += 2;
              carte.buffAtk += 2;
              carte.hp += 2;
              carte.buffHp += 2;
            }
          });
        }
      }
    },
  },

  {
    id: 33,
    nom: "Virelys Porteuse de Lueurs",
    lvl: 3,
    hp: 4,
    baseHp: 4,
    atk: 4,
    atkDispo: false,
    img: "img/card70.1.png",
    imgMinia: "img/cardfight70.png",
    imgMiniaProvoc: "img/cardfight70-provoc.png",
    imgMiniaBouclier: "img/cardfight70-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<i>Cri et Evanescence(Vente)</i><br><br><br> Vous obtenez une <br><br><color=white>Lueur déferlante</color>",
    carteSpe: 49,
    piocherCarteSpeApresVente: true,
    piocherCarteSpe: true,
    
  },
  {
    id: 34,
    nom: "Sillènne, l'Épine de Brume",
    lvl: 5,
    hp: 3,
    baseHp: 3,
    atk: 6,
    atkDispo: false,
    img: "img/card71.1.png",
    imgMinia: "img/cardfight71.png",
    imgMiniaProvoc: "img/cardfight71-provoc.png",
    imgMiniaBouclier: "img/cardfight71-bouclier.png",
    imgProjectile: "img/projectile1.png",
    famille: "Les Sylphariels",
    sousFamille : "Dark",
    texte: "<i>Debut de combat</i><br><br><color=red>-4hp</color> à tous les ennemis <br><br> <color=rgb(111, 52, 139)>Vengeance Furieuse</color> <br><br><i>Evanescence</i><br><br> <color=red>+2atk</color> aux Sylphariels",
    aoeCible: (cartesBoardAdv, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoardAdv.forEach(carte => {
          if(carte.bouclierUse){
            carte.atk -= 0;
            carte.degatsRecus = 0;
            carte.bouclierUse = false
            carte.animAoE = true;
          }else{
            carte.hp -= 4 * 2;
            carte.degatsRecus = 4 * 2;
            carte.animAoE = true;
          }
        });
      }else{
        cartesBoardAdv.forEach(carte => {
          if(carte.bouclierUse){
            carte.atk -= 0;
            carte.degatsRecus = 0;
            carte.bouclierUse = false
            carte.animAoE = true;
          }else{
            carte.hp -= 4;
            carte.degatsRecus = 4;
            carte.animAoE = true;
          }
        });
      }
      
    },
    oneTicPendantCombat: (carteCible, carteSource) => {
      if(carteSource.estDoree){
        if(carteCible.bouclierUse){
          carteCible.hp -= 0;
          carteCible.degatsRecus = 0;
          carteCible.bouclierUse = false
        }else{
          carteCible.hp -= carteSource.atk * 2; 
          carteCible.degatsRecus = carteSource.atk * 2;
        }
      }else{
        if(carteCible.bouclierUse){
          carteCible.hp -= 0;
          carteCible.degatsRecus = 0;
          carteCible.bouclierUse = false
        }else{
          carteCible.hp -= carteSource.atk; 
          carteCible.degatsRecus = carteSource.atk;
        }
      }
      
    },
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if ( mortCarte.id !== self.id) return;
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Les Sylphariels" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      ).sort((a, b) => a.atk - b.atk);
    
      if (cibles.length === 0) return;
      if(self.estDoree){
        cibles.forEach(cible => {
          // Appliquer les buffs
          cible.atk += 2 * 2;
          cible.buffAtk += 2 * 2;
          cible.buffAtkSillenne = (cible.buffHpSillenne || 0) + 2 * 2;

          cible.sillenneBuffEffect = true; // Pour tracking ou affichage

        })
      }else{
        cibles.forEach(cible => {
          // Appliquer les buffs
          cible.atk += 2;
          cible.buffAtk += 2;
          cible.buffAtkSillenne = (cible.buffHpSillenne || 0) + 2;

          cible.sillenneBuffEffect = true; // Pour tracking ou affichage

        })
      } 
    },
  },
  {
    id: 35,
    nom: "Méllua la Feuille Dansante",
    lvl: 5,
    hp: 7,
    baseHp: 7,
    atk: 3,
    atkDispo: false,
    img: "img/card72.1.png",
    imgMinia: "img/cardfight72.png",
    imgMiniaProvoc: "img/cardfight72-provoc.png",
    imgMiniaBouclier: "img/cardfight72-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<i>Debut de tour</i><br><br><color=red>+2hp</color> aux Sylphariels<br><br><br> <color=rgb(20, 33, 220)>Aura</color><br><br><color=red>+4hp</color> aux Sylphariels",
    aura: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (carte.famille === "Les Sylphariels") {
            carte.hp += 4 * 2;
            carte.buffHp += 4 * 2;
            carte.auraEffect = true;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (carte.famille === "Les Sylphariels") {
            carte.hp += 4;
            carte.buffHp += 4;
            carte.auraEffect = true;
          }
        });
      }
      
    },
    auraSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (carte.auraEffect === true && carte.famille === "Les Sylphariels") {
            carte.hp -= 4 * 2;
            carte.buffHp -= 4 * 2;
            if(carte.buffHp === 0 && carte.buffHp === 0){
              carte.auraEffect = false
            }        
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (carte.auraEffect === true && carte.famille === "Les Sylphariels") {
            carte.hp -= 4;
            carte.buffHp -= 4;
            if(carte.buffHp === 0 && carte.buffHp === 0){
              carte.auraEffect = false
            }        
          }
        });
      }
      
    },
    auraUnique: (carte) => {
      if (carte.famille === "Les Sylphariels") {
        carte.hp += 4;
        carte.buffHp += 4;
        carte.auraEffect = true; 
      }     
    },
    aoeCibleApresCombat: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          carte.hp += 2 * 2;
          carte.buffHp += 2 * 2;
          carte.animAoE = true; 
        });
      }else{
        cartesBoard.forEach(carte => {
          carte.hp += 2;
          carte.buffHp += 2;
          carte.animAoE = true; 
        });
      }  
    },
  },
  {
    id: 36,
    nom: "Syra des Feuilles Troublées",
    lvl: 4,
    hp: 5,
    baseHp: 5,
    atk: 4,
    atkDispo: false,
    img: "img/card73.1.png",
    imgMinia: "img/cardfight73.png",
    imgMiniaProvoc: "img/cardfight73-provoc.png",
    imgMiniaBouclier: "img/cardfight73-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<i>Cri et Evanescence</i><br><br><br> <color=red>+1/+3</color> aux Sylphariels ",
    criDeGuerre: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 1 * 2;
            carte.buffAtk +=1 * 2;
            carte.hp += 3 * 2;
            carte.buffHp += 3 * 2;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 1;
            carte.buffAtk +=1;
            carte.hp += 3;
            carte.buffHp += 3;
          }
        });
      }
      
    },
    evanescence: (board, draggedCard) => {
      if(draggedCard.estDoree){
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 1 * 2;
            carte.buffAtk +=1 * 2;
            carte.hp += 3 * 2;
            carte.buffHp += 3 * 2;
          }
        });
      }else{
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 1;
            carte.buffAtk +=1;
            carte.hp += 3;
            carte.buffHp += 3;
          }
        });
      }
      const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
      if(vessalyn.length > 0){
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 1;
            carte.buffAtk += 1;
            carte.hp += 3;
            carte.buffHp += 3;
          }
        });
      }
    },
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if ( mortCarte.id !== self.id) return;
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Les Sylphariels" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      ).sort((a, b) => a.hp - b.hp);
    
      if (cibles.length === 0) return;
      if(self.estDoree){
        cibles.forEach(cible => {
          // Appliquer les buffs
          cible.atk += 1 * 2;
          cible.buffAtk += 1 * 2;
          cible.buffAtkSyra = (cible.buffHpSyra || 0) + 1 * 2;
          cible.hp += 3 * 2;
          cible.buffHp += 3 * 2;
          cible.buffHpSyra = (cible.buffHpSyra || 0) + 3 * 2;

          cible.syraBuffEffect = true; // Pour tracking ou affichage

        })
      }else{
        cibles.forEach(cible => {
          // Appliquer les buffs
          cible.atk += 1;
          cible.buffAtk += 1;
          cible.buffAtkSyra = (cible.buffHpSyra || 0) + 1;
          cible.hp += 3;
          cible.buffHp += 3;
          cible.buffHpSyra = (cible.buffHpSyra || 0) + 3;

          cible.syraBuffEffect = true; // Pour tracking ou affichage

        })
      }
      
    },
  },
  {
    id: 37,
    nom: "Nym'Leth la Tisseuse d'Échos",
    lvl: 4,
    hp: 4,
    baseHp: 4,
    atk: 3,
    atkDispo: false,
    img: "img/card74.1.png",
    imgMinia: "img/cardfight74.png",
    imgMiniaProvoc: "img/cardfight74-provoc.png",
    imgMiniaBouclier: "img/cardfight74-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<i>Evanescence(Vente)</i><br><br><br> Pioche une Sylphariel<br><br> de lvl 1 à 6",
    piocherCarteApresVente: true,
  },
  {
    id: 38,
    nom: "Ivrana, l'Onde Retenue",
    lvl: 2,
    hp: 3,
    baseHp: 3,
    atk: 2,
    atkDispo: false,
    img: "img/card75.1.png",
    imgMinia: "img/cardfight75.png",
    imgMiniaProvoc: "img/cardfight75-provoc.png",
    imgMiniaBouclier: "img/cardfight75-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<br><i>Evanescence(Vente)</i> et <color=rgb(20, 33, 220)>Aura</color><br><br><br><color=red>+2hp</color> aux Sylphariels",
    evanescence: (board, draggedCard) => {
      if(draggedCard.estDoree){
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.hp += 2 * 2;
            carte.buffHp += 2 * 2;
          }
        });
      }else{
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.hp += 2;
            carte.buffHp += 2;
          }
        });
      }
      
      const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
      if(vessalyn.length > 0){
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.hp += 2;
            carte.buffHp += 2;
          }
        });
      }
    },
    aura: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (carte.famille === "Les Sylphariels") {
            carte.hp += 2 * 2;
            carte.buffHp += 2 * 2;
            carte.auraEffect = true;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (carte.famille === "Les Sylphariels") {
            carte.hp += 2;
            carte.buffHp += 2;
            carte.auraEffect = true;
          }
        });
      } 
    },
    auraSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
        if (carte.auraEffect === true && carte.famille === "Les Sylphariels") {
          carte.hp -= 2 * 2;
          carte.buffHp -= 2 * 2;
          if(carte.buffHp === 0 && carte.buffHp === 0){
            carte.auraEffect = false
          }        
        }
      });
      }else{
        cartesBoard.forEach(carte => {
        if (carte.auraEffect === true && carte.famille === "Les Sylphariels") {
          carte.hp -= 2;
          carte.buffHp -= 2;
          if(carte.buffHp === 0 && carte.buffHp === 0){
            carte.auraEffect = false
          }        
        }
      });
      }  
    },
    auraUnique: (carte) => {
      if (carte.famille === "Les Sylphariels") {
        carte.hp += 2;
        carte.buffHp += 2;
        carte.auraEffect = true; 
      }     
    }
  },
  {
    id: 39,
    nom: "Liraël la Douteuse",
    lvl: 4,
    hp: 2,
    baseHp: 2,
    atk: 5,
    atkDispo: false,
    img: "img/card76.1.png",
    imgMinia: "img/cardfight76.png",
    imgMiniaProvoc: "img/cardfight76-provoc.png",
    imgMiniaBouclier: "img/cardfight76-bouclier.png",
    imgProjectile: "img/projectile1.png",
    famille: "Les Sylphariels",
    sousFamille : "Dark",
    texte: "<i>Cri</i> <br><br><color=red>+4atk</color> aux Sylphariels <br><br> <i>Debut de combat</i><br><br><color=red>-2hp</color> à un adversaire <br><br><i>Vengeance</i> <color=red>-2hp</color>",
    criDeGuerre: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 4 * 2;
            carte.buffAtk +=4 * 2;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 4;
            carte.buffAtk +=4;
          }
        });
      }      
    },
    oneTicDebutCombat: (carteCible, carteSource) => {
      if(carteSource.estDoree){
        if(carteCible.bouclierUse){
          carteCible.hp -= 0;
          carteCible.degatsRecus = 0;
          carteCible.bouclierUse = false
        }else{
          carteCible.hp -= 2 * 2; 
          carteCible.degatsRecus = 2 * 2;
        }
      }else{
        if(carteCible.bouclierUse){
          carteCible.hp -= 0;
          carteCible.degatsRecus = 0;
          carteCible.bouclierUse = false
        }else{
          carteCible.hp -= 2; 
          carteCible.degatsRecus = 2;
        }
      }  
    },
    oneTicPendantCombat: (carteCible, carteSource) => {
      if(carteSource.estDoree){
        if(carteCible.bouclierUse){
          carteCible.hp -= 0;
          carteCible.degatsRecus = 0;
          carteCible.bouclierUse = false
        }else{
          carteCible.hp -= 2 * 2; 
          carteCible.degatsRecus = 2 * 2;
        }
      }else{
        if(carteCible.bouclierUse){
          carteCible.hp -= 0;
          carteCible.degatsRecus = 0;
          carteCible.bouclierUse = false
        }else{
          carteCible.hp -= 2; 
          carteCible.degatsRecus = 2;
        }
      }
      
    },
  },
  {
    id: 40,
    nom: "Vessalyn, Chuchoteuse d''Ailes",
    lvl: 4,
    hp: 5,
    baseHp: 5,
    atk: 3,
    atkDispo: false,
    img: "img/card77.1.png",
    imgMinia: "img/cardfight77.png",
    imgMiniaProvoc: "img/cardfight77-provoc.png",
    imgMiniaBouclier: "img/cardfight77-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<color=rgb(20, 33, 220)>Aura</color><br><br><br>Les effets d'Evanescence <br><br>sont doublés",
  },
  {
    id: 41,
    nom: "Naëlia des Brumes Tournoyantes",
    lvl: 4,
    hp: 4,
    baseHp: 4,
    atk: 3,
    atkDispo: false,
    img: "img/card78.1.png",
    imgMinia: "img/cardfight78.png",
    imgMiniaProvoc: "img/cardfight78-provoc.png",
    imgMiniaBouclier: "img/cardfight78-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<i>Cri et Evanescence</i><br><br> Pose <color=rgb(0, 163, 238)> Voile</color> sur une Sylph <br><br><br><color=rgb(20, 33, 220)>Aura</color> Les Sylph avec <color=rgb(0, 163, 238)> Voile</color> ont <br><br><color=red>+1/+1</color>",
    criDeGuerreUniqueBouclier: (cible, draggedCard) => {
      if(draggedCard.estDoree){
        cible.bouclier = true;
        cible.bouclierUse = true;
        cible.atk += 1 * 2;
        cible.buffAtk += 1 * 2;
        cible.hp += 1 * 2;
        cible.buffHp += 1 * 2;
      }else{
        cible.bouclier = true;
        cible.bouclierUse = true;
        cible.atk += 1;
        cible.buffAtk += 1;
        cible.hp += 1;
        cible.buffHp += 1;
      }
    },
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if ( mortCarte.id !== self.id) return;
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Les Sylphariels" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      );
    
      if (cibles.length === 0) return;  
      // Choisir une cible aléatoire
      if(self.estDoree){
        const cible = cibles[Math.floor(Math.random() * cibles.length)];
        const cible1 = cibles[Math.floor(Math.random() * cibles.length)];
        cible.bouclier = true;
        cible.bouclierUse = true;
        cible1.bouclier = true;
        cible1.bouclierUse = true;
      }else{
        const cible = cibles[Math.floor(Math.random() * cibles.length)];
        cible.bouclier = true;
        cible.bouclierUse = true;
      }

    },
    aura: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (carte.bouclierUse) {
            carte.atk += 1 * 2;
            carte.buffAtk += 1 * 2;
            carte.hp += 1 * 2;
            carte.buffHp += 1 * 2;
            carte.auraNaeliaEffect = true;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (carte.bouclierUse) {
            carte.atk += 1;
            carte.buffAtk += 1;
            carte.hp += 1;
            carte.buffHp += 1;
            carte.auraNaeliaEffect = true;
          }
        });
      }
      
    },
    auraUnique: (carte) => {
      if (carte.bouclierUse) {
        carte.atk += 1;
        carte.buffAtk += 1;
        carte.hp += 1;
        carte.buffHp += 1;
        carte.auraNaeliaEffect = true; 
      }     
    },
    auraSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (carte.auraNaeliaEffect === true && carte.famille === "Les Sylphariels") {
            carte.atk -= 1 * 2;
            carte.buffAtk -= 1 * 2;
            carte.hp -= 1 * 2;
            carte.buffHp -= 1 * 2;
            if(carte.buffHp === 0 && carte.buffHp === 0){
              carte.auraNaeliaEffect = false
            }        
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (carte.auraNaeliaEffect === true && carte.famille === "Les Sylphariels") {
            carte.atk -= 1;
            carte.buffAtk -= 1;
            carte.hp -= 1;
            carte.buffHp -= 1;
            if(carte.buffHp === 0 && carte.buffHp === 0){
              carte.auraNaeliaEffect = false
            }        
          }
        });
      }  
    },
  },
  {
    id: 42,
    nom: "Elwyn la Souffleuse de brume",
    lvl: 3,
    hp: 2,
    baseHp: 2,
    atk: 5,
    atkDispo: false,
    img: "img/card79.1.png",
    imgMinia: "img/cardfight79.png",
    imgMiniaProvoc: "img/cardfight79-provoc.png",
    imgMiniaBouclier: "img/cardfight79-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight79-provoc-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Dark",
    texte: "<i>Debut de tour</i><br><br><color=red>+1atk</color> aux Sylphariels<br><br><i>Evanescence</i><br><br><color=red>+2atk</color> à la Sylphariel <br><br>ayant le moins d'atk",
    aoeCibleApresCombat: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          carte.atk += 1 * 2;
          carte.buffAtk += 1 * 2;
          carte.animAoE = true; 
        });
      }else{
        cartesBoard.forEach(carte => {
          carte.atk += 1;
          carte.buffAtk += 1;
          carte.animAoE = true; 
        });
      }
      
    },
    evanescence: (board, card) => {      
      if(board.length > 1 ){
        const copies = board.filter(c => c.id !== card.id).filter(c => c.famille === "Les Sylphariels").sort((a, b) => a.atk - b.atk)
        let cible = copies[0]
        if(card.estDoree){
          if(cible.famille === "Les Sylphariels"){
            cible.atk += 2 * 2;
            cible.buffAtk += 1 * 2;
          }
        }else{
          if(cible.famille === "Les Sylphariels"){
            cible.atk += 2;
            cible.buffAtk += 1;
          }
        }
        
        const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
        if(vessalyn.length > 0){
          cible.atk += 2;
          cible.buffAtk += 1;
        }
      } 
    }, 
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if ( mortCarte.id !== self.id) return;
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Les Sylphariels" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      ).sort((a, b) => a.atk - b.atk);
    
      if (cibles.length === 0) return;
      if(self.estDoree){
        // Choisir une cible aléatoire
        const cible = cibles[0];
      
        // Appliquer les buffs selon la bivalence
        cible.atk += 2 * 2;
        cible.buffAtk += 2 * 2;
        cible.buffAtkElwyn = (cible.buffAtkElwyn || 0) + 2 * 2;

        cible.elwynBuffEffect = true; // Pour tracking ou affichage
      }else{
        // Choisir une cible aléatoire
        const cible = cibles[0];
      
        // Appliquer les buffs selon la bivalence
        cible.atk += 2;
        cible.buffAtk += 2;
        cible.buffAtkElwyn = (cible.buffAtkElwyn || 0) + 2;

        cible.elwynBuffEffect = true; // Pour tracking ou affichage
      }  
    },
  },

  {
    id: 43,
    nom: "Nyssa l'Épine de Rosée",
    lvl: 3,
    hp: 2,
    baseHp: 2,
    atk: 4,
    atkDispo: false,
    img: "img/card81.1.png",
    imgMinia: "img/cardfight81.png",
    imgMiniaProvoc: "img/cardfight81-provoc.png",
    imgMiniaBouclier: "img/cardfight81-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Dark",
    imgProjectile: "img/projectile1.png",
    texte: "<i>Debut de combat</i><br><br><color=red>-1hp</color> à tous les ennemis <br><br><br><i>Evanescence</i><br><br> <color=red>+2atk</color> aux Sylphariels",
    oneTicCible:  true,
    aoeCible: (cartesBoardAdv, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoardAdv.forEach(carte => {
          if(carte.bouclierUse){
            carte.atk -= 0;
            carte.degatsRecus = 0;
            carte.bouclierUse = false
            carte.animAoE = true;
          }else{
            carte.hp -= 1 * 2;
            carte.degatsRecus = 1 * 2;
            carte.animAoE = true;
          }
        });
      }else{
        cartesBoardAdv.forEach(carte => {
          if(carte.bouclierUse){
            carte.atk -= 0;
            carte.degatsRecus = 0;
            carte.bouclierUse = false
            carte.animAoE = true;
          }else{
            carte.hp -= 1;
            carte.degatsRecus = 1;
            carte.animAoE = true;
          }
        });
      }
      
    },
    evanescence: (board, draggedCard) => {
      if(draggedCard.estDoree){
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 2 * 2;
            carte.buffAtk += 2 * 2;
          }
        });
      }else{
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 2;
            carte.buffAtk += 2;
          }
        });
      }
      
      const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
      if(vessalyn.length > 0){
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 2;
            carte.buffAtk += 2;
          }
        });
      }
    },
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if ( mortCarte.id !== self.id) return;
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Les Sylphariels" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      ).sort((a, b) => a.atk - b.atk);
    
      if (cibles.length === 0) return;
    
      // Choisir une cible aléatoire
      const cible = cibles[0];
      if(self.estDoree){
        // Appliquer les buffs selon la bivalence
        cible.atk += 2;
        cible.buffAtk += 1;
        cible.buffAtkNyssa = (cible.buffAtkNyssa || 0) + 2;

        cible.nyssaBuffEffect = true; // Pour tracking ou affichage
      }else{
        // Appliquer les buffs selon la bivalence
        cible.atk += 2;
        cible.buffAtk += 1;
        cible.buffAtkNyssa = (cible.buffAtkNyssa || 0) + 2;

        cible.nyssaBuffEffect = true; // Pour tracking ou affichage
      }
    }
  },
  {
    id: 44,
    nom: "Sylène la Faiblissante",
    lvl: 3,
    hp: 4,
    baseHp: 4,
    atk: 2,
    atkDispo: false,
    img: "img/card82.1.png",
    imgMinia: "img/cardfight82.png",
    imgMiniaProvoc: "img/cardfight82-provoc.png",
    imgMiniaBouclier: "img/cardfight82-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Dark",
    texte: "<i>Debut de combat</i><br><br><color=red>-1atk</color> à tous les ennemis <br><br><br><i>Evanescence</i><br><br> <color=red>+1atk</color> aux Sylphariels",
    aoeCible: (cartesBoardAdv, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoardAdv.forEach(carte => {
          if(carte.bouclierUse){
            carte.atk -= 0;
            carte.degatsRecus = 0;
            carte.bouclierUse = false
            carte.animAoE = true;
          }else{
            carte.atk -= 1 * 2;
            carte.degatsRecus = 1 * 2;
            carte.animAoE = true;
          }
        });
      }else{
        cartesBoardAdv.forEach(carte => {
          if(carte.bouclierUse){
            carte.atk -= 0;
            carte.degatsRecus = 0;
            carte.bouclierUse = false
            carte.animAoE = true;
          }else{
            carte.atk -= 1;
            carte.degatsRecus = 1;
            carte.animAoE = true;
          }
        });
      }  
    },
    evanescence: (board, draggedCard) => {
      if(draggedCard.estDoree){
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 1 * 2;
            carte.buffAtk += 1 * 2;
          }
        });
      }else{
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 1;
            carte.buffAtk += 1;
          }
        });
      }      
      const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
      if(vessalyn.length > 0){
        board.forEach(carte => {
          if(carte.famille === "Les Sylphariels"){
            carte.atk += 1;
            carte.buffAtk += 1;
          }
        });
      }
    },
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if ( mortCarte.id !== self.id) return;
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Les Sylphariels" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      );
    
      if (cibles.length === 0) return;
    
      // Choisir une cible aléatoire
      if(self.estDoree){
        cibles.forEach(carte => {
          carte.atk += 1 * 2;
          carte.buffAtk += 1 * 2;
          carte.buffAtkSylene = (carte.buffAtkSylene || 0) + 1 * 2;
          carte.syleneBuffEffect = true; // Pour tracking ou affichage
        })
      }else{
        cibles.forEach(carte => {
          carte.atk += 1;
          carte.buffAtk += 1;
          carte.buffAtkSylene = (carte.buffAtkSylene || 0) + 1;
          carte.syleneBuffEffect = true; // Pour tracking ou affichage
        })
      }  
    }
  },
  {
    id: 45,
    nom: "Fylia l'Évanouie",
    lvl: 2,
    hp: 3,
    baseHp: 3,
    atk: 2,
    atkDispo: false,
    img: "img/card83.1.png",
    imgMinia: "img/cardfight83.png",
    imgMiniaProvoc: "img/cardfight83-provoc.png",
    imgMiniaBouclier: "img/cardfight83-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Dark",
    texte: "<i>Evanescence</i><br><br><br> Donne <color=red>+2atk</color> <br><br>à une Sylphariel aléatoire",
    evanescence: (board, card) => {  
      if(card.estDoree){
        if(board.length > 1 ){
          const copies = board.filter(c => c.id !== card.id).filter(c => c.famille === "Les Sylphariels")
          if(copies.length > 0){
            let random = copies[Math.floor(Math.random() * copies.length)]
            if(random.famille === "Les Sylphariels"){
              random.atk += 2 * 2;
              random.buffAtk += 2 * 2;
            }
            const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
            const copies1 = copies.filter(c => c.nom !== random.nom)
            if(copies1.length > 0){
              let random1 = copies[Math.floor(Math.random() * copies.length)]
              if(vessalyn.length > 0){
                random1.atk += 2;
                random1.buffAtk += 2;
              }  
            }
          }
        }
      }else{
        if(board.length > 1 ){
          const copies = board.filter(c => c.id !== card.id).filter(c => c.famille === "Les Sylphariels")
          if(copies.length > 0){
            let random = copies[Math.floor(Math.random() * copies.length)]
            if(random.famille === "Les Sylphariels"){
              random.atk += 2;
              random.buffAtk += 2;
            }
            const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
            const copies1 = copies.filter(c => c.nom !== random.nom)
            if(copies1.length > 0){
              let random1 = copies[Math.floor(Math.random() * copies.length)]
              if(vessalyn.length > 0){
                random1.atk += 2;
                random1.buffAtk += 2;
              }  
            }
          }
        }
      }      
    },
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if ( mortCarte.id !== self.id) return;
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Les Sylphariels" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      );
    
      if (cibles.length === 0) return; 
      if(self.estDoree){
        // Choisir une cible aléatoire
        const cible = cibles[Math.floor(Math.random() * cibles.length)];
        cible.atk += 2 * 2;
        cible.buffAtk += 2 * 2;
        cible.buffAtkFylia = (cible.buffAtkFylia || 0) + 2 * 2;
        cible.fyliaBuffEffect = true; // Pour tracking ou affichage
      }else{
        // Choisir une cible aléatoire
        const cible = cibles[Math.floor(Math.random() * cibles.length)];
        cible.atk += 2;
        cible.buffAtk += 2;
        cible.buffAtkFylia = (cible.buffAtkFylia || 0) + 2;
        cible.fyliaBuffEffect = true; // Pour tracking ou affichage
      }
      
    },
  },

  {
    id: 46,
    nom: "Veya l'Inaperçue",
    lvl: 1,
    hp: 2,
    baseHp: 2,
    atk: 3,
    atkDispo: false,
    img: "img/card85.1.png",
    imgMinia: "img/cardfight85.png",
    imgMiniaProvoc: "img/cardfight85-provoc.png",
    imgMiniaBouclier: "img/cardfight85-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<i>Cri</i><br><br>Si seule gagne <color=red>+2atk</color><br><br><i>Evanescence(vente)</i><br><br><color=gold>+1 po</color>",
    gainOr: 1,
    criDeGuerreUniqueSelf: (carte, board) => {
      if(carte.estDoree){
        if(board.length === 0){
          carte.atk += 2 * 2;
          carte.buffAtk +=2 * 2;
        }
      }else{
        if(board.length === 0){
          carte.atk += 2;
          carte.buffAtk +=2;
        }
      }
         
    },    
  },
  {
    id: 47,
    nom: "Linn d'Écorce Douce",
    lvl: 2,
    hp: 5,
    baseHp: 5,
    atk: 1,
    atkDispo: false,
    img: "img/card86.1.png",
    imgMinia: "img/cardfight86.png",
    imgMiniaProvoc: "img/cardfight86-provoc.png",
    imgMiniaBouclier: "img/cardfight86-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<i>Evanescence</i><br><br><br>Confère<color=rgb(0, 163, 238)> Voile de lune</color> <br><br>à une Sylphariel aléatoire",
    evanescence: (board, card) => {    
      if(card.estDoree){
        if(board.length > 1 ){
          const copies = board.filter(c => c.id !== card.id).filter(c => c.famille === "Les Sylphariels")
          if(copies.length > 0){
            let random = copies[Math.floor(Math.random() * copies.length)]
            let random1 = copies[Math.floor(Math.random() * copies.length)]
            if(random.famille === "Les Sylphariels"){
              random.bouclier = true;
              random.bouclierUse = true;
            }
            if(random1.famille === "Les Sylphariels"){
              random1.bouclier = true;
              random1.bouclierUse = true;
            }
            const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
            const copies1 = copies.filter(c => c.nom !== random.nom)
            if(copies1.length > 0){
              let random2 = copies[Math.floor(Math.random() * copies.length)]
              if(vessalyn.length > 0){
                random2.bouclier = true;
                random2.bouclierUse = true;
              }
            }
          }
        }
      }else{
        if(board.length > 1 ){
          const copies = board.filter(c => c.id !== card.id).filter(c => c.famille === "Les Sylphariels")
          if(copies.length > 0){
            let random = copies[Math.floor(Math.random() * copies.length)]
            if(random.famille === "Les Sylphariels"){
              random.bouclier = true;
              random.bouclierUse = true;
            }
            const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
            const copies1 = copies.filter(c => c.nom !== random.nom)
            if(copies1.length > 0){
              let random1 = copies[Math.floor(Math.random() * copies.length)]
              if(vessalyn.length > 0){
                random1.bouclier = true;
                random1.bouclierUse = true;
              }
    
            }
          }

        }
      }  
       
    },
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if ( mortCarte.id !== self.id) return;
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Les Sylphariels" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      );
    
      if (cibles.length === 0) return;  
      // Choisir une cible aléatoire
      if(self.estDoree){
        const ciblesFiltred = cibles.filter(c => c.bouclierUse === false)
        const cible = ciblesFiltred[Math.floor(Math.random() * ciblesFiltred.length)];
        const cible1 = ciblesFiltred[Math.floor(Math.random() * ciblesFiltred.length)];
        cible.bouclier = true;
        cible.bouclierUse = true;
        cible1.bouclier = true;
        cible1.bouclierUse = true;
      }else{
        const ciblesFiltred = cibles.filter(c => c.bouclierUse === false)
        const cible = ciblesFiltred[Math.floor(Math.random() * ciblesFiltred.length)];
        cible.bouclier = true;
        cible.bouclierUse = true;
      }

    },
  },
  {
    id: 48,
    nom: "Elra la Clignotante",
    lvl: 2,
    hp: 2,
    baseHp: 2,
    atk: 2,
    atkDispo: false,
    img: "img/card87.1.png",
    imgMinia: "img/cardfight87.png",
    imgMiniaProvoc: "img/cardfight87-provoc.png",
    imgMiniaBouclier: "img/cardfight87-bouclier.png",
    imgProjectile: "img/projectile2.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<i>Debut de combat</i><br><br><color=red>-1hp</color> à un adv aléatoire<br><br><i>Evanescence(mort)</i><br><br><color=red>+1hp</color> à une <br><br>Sylphariel aléatoire",
    oneTicDebutCombat: (carteCible, carteSource) => {
      if(carteSource.estDoree){
        if(carteCible.bouclierUse){
          carteCible.hp -= 0;
          carteCible.degatsRecus = 0;
          carteCible.bouclierUse = false
        }else{
          carteCible.hp -= 1 * 2; 
          carteCible.degatsRecus = 1 * 2;
        }
      }else{
        if(carteCible.bouclierUse){
          carteCible.hp -= 0;
          carteCible.degatsRecus = 0;
          carteCible.bouclierUse = false
        }else{
          carteCible.hp -= 1; 
          carteCible.degatsRecus = 1;
        }
      }
    },
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if ( mortCarte.id !== self.id) return;
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Les Sylphariels" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      );
    
      if (cibles.length === 0) return;  
      // Choisir une cible aléatoire
      const cible = cibles[Math.floor(Math.random() * cibles.length)];
      cible.hp += 1;
      cible.buffHp += 1;
      cible.buffHpSilyne = (cible.buffHpSilyne || 0) + 1;
      cible.silyneBuffEffect = true; // Pour tracking ou affichage
      }      
  },


  {
    id: 49,
    nom: "Fiffa la Trébuchante",
    lvl: 1,
    hp: 2,
    baseHp: 2,
    atk: 2,
    atkDispo: false,
    img: "img/card90.1.png",
    imgMinia: "img/cardfight90.png",
    imgMiniaProvoc: "img/cardfight90-provoc.png",
    imgMiniaBouclier: "img/cardfight90-bouclier.png",
    imgProjectile: "img/projectile2.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "<i>Debut de combat</i><br><br><br>33% de chance d'infliger <br><br><color=red>-1hp</color> à un adversaire aléatoire",
    oneTicDebutCombat: (carteCible, carteSource) => {
      if(carteSource.estDoree){
        let unSurTrois = Math.floor(Math.random() * 3)
        if(unSurTrois === 0){
          if(carteCible.bouclierUse){
            carteCible.hp -= 0;
            carteCible.degatsRecus = 0;
            carteCible.bouclierUse = false
          }else{
            carteCible.hp -= 1 * 2;
            carteCible.degatsRecus = 1 * 2;
          }
        }else{
          carteCible.hp -= 0;
          carteCible.degatsRecus = 0;
        } 
      }else{
        let unSurTrois = Math.floor(Math.random() * 3)
        if(unSurTrois === 0){
          if(carteCible.bouclierUse){
            carteCible.hp -= 0;
            carteCible.degatsRecus = 0;
            carteCible.bouclierUse = false
          }else{
            carteCible.hp -= 1;
            carteCible.degatsRecus = 1;
          }
        }else{
          carteCible.hp -= 0;
          carteCible.degatsRecus = 0;
        } 
      }      
    },
  },

  {
    id: 50,
    nom: "Lueur déferlante",
    lvl: 7,
    hp: 6,
    baseHp: 6,
    atk: 0,
    atkDispo: false,
    img: "img/card93.1.png",
    imgMinia: "img/cardfight93.png",
    imgMiniaProvoc: "img/cardfight93-provoc.png",
    imgMiniaBouclier: "img/cardfight93-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight93-provoc-bouclier.png",
    famille: "Les Sylphariels",
    sousFamille : "Light",
    texte: "*",
    provocation: true,
    provocationUse: true,
    bouclier: true,
    bouclierUse: true,
  },
  {
    id: 51,
    nom: "Habitant des dunes",
    lvl: 1,
    hp: 2,
    baseHp: 2,
    atk: 3,
    atkDispo: false,
    img: "img/card94.png",
    imgMinia: "img/cardfight94.png",
    famille: "Elementaire",
    texte: "*",
    criDeGuerreTaverne: (shopCards, draggedCard, bonusTourbillonDeSable, bonusAtkElem) => {
      if(draggedCard.estDoree){
        shopCards.forEach(carte => {
          if(carte.famille === "Elementaire"){
            carte.atk += 1 * 2 + bonusAtkElem;
            carte.buffAtk += 1 * 2 + bonusAtkElem;
            carte.hp += 1 + bonusTourbillonDeSable;
          }
        });
        cards.forEach(carte =>{
          if(carte.famille === "Elementaire"){
            carte.baseAtk = carte.atk
            carte.atk += 1 * 2 + bonusAtkElem;
            carte.buffAtk += 1 * 2 + bonusAtkElem;
            carte.hp += 1 * 2 + bonusTourbillonDeSable;
          }
        })
      }else{
        shopCards.forEach(carte => {
          if(carte.famille === "Elementaire"){
            carte.atk += 1 + bonusAtkElem;
            carte.buffAtk += 1 + bonusAtkElem;
            carte.hp += 1 + bonusTourbillonDeSable;
          }
        });
        cards.forEach(carte =>{
          if(carte.famille === "Elementaire"){
            carte.baseAtk = carte.atk
            carte.atk += 1 + bonusAtkElem;
            carte.buffAtk += 1 + bonusAtkElem;
            carte.hp += 1 + bonusTourbillonDeSable;
          }
        })
      }
      
    }
  },
  {
    id: 52,
    nom: "Roche en fusion",
    lvl: 1,
    hp: 3,
    baseHp: 3,
    atk: 3,
    atkDispo: false,
    img: "img/card95.png",
    imgMinia: "img/cardfight95.png",
    famille: "Elementaire",
    texte: "*",
    upSelf: true,
  },
  {
    id: 53,
    nom: "Cyclone crépitant",
    lvl: 2,
    hp: 1,
    baseHp: 1,
    atk: 5,
    atkDispo: false,
    img: "img/card96.png",
    imgMinia: "img/cardfight96.png",
    imgMiniaBouclier: "img/cardfight96-bouclier.png",
    famille: "Elementaire",
    texte: "*",
    bouclier: true,
    bouclierUse: true,
    furie: true,
    furieUse: true,
  },
  {
    id: 54,
    nom: "Elemenplus",
    lvl: 2,
    hp: 3,
    baseHp: 3,
    atk: 3,
    atkDispo: false,
    img: "img/card97.png",
    imgMinia: "img/cardfight97.png",
    famille: "Elementaire",
    texte: "*",
    carteSpe: 74,
    piocherCarteSpeApresVente: true,
  },
  {
    id: 55,
    nom: "Elementaire de fête",
    lvl: 2,
    hp: 2,
    baseHp: 2,
    atk: 3,
    atkDispo: false,
    img: "img/card98.png",
    imgMinia: "img/cardfight98.png",
    famille: "Elementaire",
    texte: "*",
  },
  {
    id: 56,
    nom: "Pirate d'eau douce",
    lvl: 3,
    hp: 5,
    baseHp: 5,
    atk: 4,
    atkDispo: false,
    img: "img/card99.png",
    imgMinia: "img/cardfight99.png",
    famille: "Elementaire",
    texte: "*",
    gainOr: 1,
  },
  {
    id: 57,
    nom: "Roche mère bienfaisante",
    lvl: 3,
    hp: 4,
    baseHp: 4,
    atk: 3,
    atkDispo: false,
    img: "img/card100.png",
    imgMinia: "img/cardfight100.png",
    famille: "Elementaire",
    texte: "*",
    decomptePioche: 2,
  },
  {
    id: 58,
    nom: "Tourbillon de sable",
    lvl: 3,
    hp: 3,
    baseHp: 3,
    atk: 4,
    atkDispo: false,
    img: "img/card101.png",
    imgMinia: "img/cardfight101.png",
    famille: "Elementaire",
    texte: "*",
  },
  {
    id: 59,
    nom: "Elementaire du feu de brousse",
    lvl: 3,
    hp: 3,
    baseHp: 3,
    atk: 6,
    atkDispo: false,
    img: "img/card102.png",
    imgMinia: "img/cardfight102.png",
    famille: "Elementaire",
    texte: "*",
    degatsAdj: true,
  },
  {
    id: 60,
    nom: "Elementaire gangrené",
    lvl: 3,
    hp: 3,
    baseHp: 3,
    atk: 6,
    atkDispo: false,
    img: "img/card103.png",
    imgMinia: "img/cardfight103.png",
    famille: "Elementaire",
    texte: "*",
    criDeGuerreTaverne: (shopCards, draggedCard, bonusTourbillonDeSable, bonusAtkElem) => {
      if(draggedCard.estDoree){
        shopCards.forEach(carte => {
          if(carte.famille === "Elementaire"){
            carte.atk += 1 * 2 + bonusAtkElem;
            carte.buffAtk += 1 * 2 + bonusAtkElem;
            carte.hp += 1 * 2 + bonusTourbillonDeSable;
          }
        });
        cards.forEach(carte =>{
          if(carte.famille === "Elementaire"){
            carte.baseAtk = carte.atk
            carte.atk += 1 * 2 + bonusAtkElem;
            carte.buffAtk += 1 * 2 + bonusAtkElem;
            carte.hp += 1 * 2 + bonusTourbillonDeSable;
          }
        })
      }else{
        shopCards.forEach(carte => {
          if(carte.famille === "Elementaire"){
            carte.atk += 1 + bonusAtkElem;
            carte.buffAtk += 1 + bonusAtkElem;
            carte.hp += 1 + bonusTourbillonDeSable;
          }
        });
        cards.forEach(carte =>{
          if(carte.famille === "Elementaire"){
            carte.baseAtk = carte.atk
            carte.atk += 1 + bonusAtkElem;
            carte.buffAtk += 1 + bonusAtkElem;
            carte.hp += 1 + bonusTourbillonDeSable;
          }
        })
      }
      
    }
  },
  {
    id: 61,
    nom: "Anomalie actualisante",
    lvl: 4,
    hp: 5,
    baseHp: 5,
    atk: 4,
    atkDispo: false,
    img: "img/card104.png",
    imgMinia: "img/cardfight104.png",
    famille: "Elementaire",
    texte: "*",
    gainOr: 2,
  },
  {
    id: 62,
    nom: "Fracasseur de météorites",
    lvl: 4,
    hp: 6,
    baseHp: 6,
    atk: 4,
    atkDispo: false,
    img: "img/card105.png",
    imgMinia: "img/cardfight105.png",
    famille: "Elementaire",
    texte: "*",
    upSelf: true,
  },
  {
    id: 63,
    nom: "Incandescence de braise",
    lvl: 4,
    hp: 2,
    baseHp: 2,
    atk: 4,
    atkDispo: false,
    img: "img/card106.png",
    imgMinia: "img/cardfight106.png",
    famille: "Elementaire",
    texte: "*",
  },
  {
    id: 64,
    nom: "Oleiflamme flamboyant",
    lvl: 4,
    hp: 4,
    baseHp: 4,
    atk: 6,
    atkDispo: false,
    img: "img/card107.png",
    imgMinia: "img/cardfight107.png",
    famille: "Elementaire",
    texte: "*",
    criDeGuerreTaverne: (shopCards, draggedCard, bonusTourbillonDeSable, bonusAtkElem) => {
      if(draggedCard.estDoree){
        shopCards.forEach(carte => {
          if(carte.famille === "Elementaire"){
            carte.atk += 3 * 2 + bonusAtkElem;
            carte.buffAtk += 3 * 2 + bonusAtkElem;
            carte.hp += 2 * 2 + bonusTourbillonDeSable;
          }
        });
        cards.forEach(carte =>{
          if(carte.famille === "Elementaire"){
            carte.baseAtk = carte.atk
            carte.atk += 3 * 2 + bonusAtkElem;
            carte.buffAtk += 3 * 2 + bonusAtkElem;
            carte.hp += 2 * 2 + bonusTourbillonDeSable;
          }
        })
      }else{
        shopCards.forEach(carte => {
          if(carte.famille === "Elementaire"){
            carte.atk += 3 + bonusAtkElem;
            carte.buffAtk += 3 + bonusAtkElem;
            carte.hp += 2 + bonusTourbillonDeSable;
          }
        });
        cards.forEach(carte =>{
          if(carte.famille === "Elementaire"){
            carte.baseAtk = carte.atk
            carte.atk += 3 + bonusAtkElem;
            carte.buffAtk += 3 + bonusAtkElem;
            carte.hp += 2 + bonusTourbillonDeSable;
          }
        })
      }
      
    }
  },
  {
    id: 65,
    nom: "Tornade décuplée",
    lvl: 4,
    hp: 4,
    baseHp: 4,
    atk: 4,
    atkDispo: false,
    img: "img/card108.png",
    imgMinia: "img/cardfight108.png",
    famille: "Elementaire",
    texte: "*",
    piocherCarteFamille: false,
  },
  {
    id: 66,
    nom: "Lokholar le Forgegivre",
    lvl: 5,
    hp: 5,
    baseHp: 5,
    atk: 7,
    atkDispo: false,
    img: "img/card109.png",
    imgMinia: "img/cardfight109.png",
    famille: "Elementaire",
    texte: "*",
  },
  {
    id: 67,
    nom: "Souffle-grange dansant",
    lvl: 5,
    hp: 4,
    baseHp: 4,
    atk: 5,
    atkDispo: false,
    img: "img/card110.png",
    imgMinia: "img/cardfight110.png",
    famille: "Elementaire",
    texte: "*",
    criDeGuerreTaverne: (shopCards, draggedCard, bonusTourbillonDeSable, bonusAtkElem) => {
      if(draggedCard.estDoree){
        shopCards.forEach(carte => {
          if(carte.famille === "Elementaire"){
            carte.atk += 2 * 2 + bonusAtkElem;
            carte.buffAtk += 2 * 2 + bonusAtkElem;
            carte.hp += 2 * 2 + bonusTourbillonDeSable;
          }
        });
        cards.forEach(carte =>{
          if(carte.famille === "Elementaire"){
            carte.baseAtk = carte.atk
            carte.atk += 2 * 2 + bonusAtkElem;
            carte.buffAtk += 2 * 2 + bonusAtkElem;
            carte.hp += 2 * 2 + bonusTourbillonDeSable;
          }
        })
      }else{
        shopCards.forEach(carte => {
          if(carte.famille === "Elementaire"){
            carte.atk += 2 + bonusAtkElem;
            carte.buffAtk += 2 + bonusAtkElem;
            carte.hp += 2 + bonusTourbillonDeSable;
          }
        });
        cards.forEach(carte =>{
          if(carte.famille === "Elementaire"){
            carte.baseAtk = carte.atk
            carte.atk += 2 + bonusAtkElem;
            carte.buffAtk += 2 + bonusAtkElem;
            carte.hp += 2 + bonusTourbillonDeSable;
          }
        })
      }
      
    }
  },
  {
    id: 68,
    nom: "Element technique",
    lvl: 5,
    hp: 10,
    baseHp: 10,
    atk: 10,
    atkDispo: false,
    img: "img/card111.png",
    imgMinia: "img/cardfight111.png",
    famille: "Elementaire",
    texte: "*",
    magnetisme: true,
  },
  {
    id: 69,
    nom: "Ama-tueur de thé",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 6,
    atkDispo: false,
    img: "img/card112.png",
    imgMinia: "img/cardfight112.png",
    famille: "Elementaire",
    texte: "*",
    criDeGuerreUnique: (carte, draggedCard, bonusTourbillonDeSable, bonusAtkElem) => {
      if(draggedCard.estDoree){
        carte.atk += 3 * 2 + bonusAtkElem;
        carte.buffAtk += 3 * 2 + bonusAtkElem;
        carte.hp += 3 * 2 + bonusTourbillonDeSable;
        carte.buffHp += 3 * 2 + bonusTourbillonDeSable;
      }else{
        carte.atk += 3 + bonusAtkElem;
        carte.buffAtk += 3 + bonusAtkElem;
        carte.hp += 3 + bonusTourbillonDeSable;
        carte.buffHp += 3 + bonusTourbillonDeSable;
      }
    },
  },
  {
    id: 70,
    nom: "Atrocité aride",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 6,
    atkDispo: false,
    img: "img/card113.png",
    imgMinia: "img/cardfight113.png",
    famille: "Elementaire",
    texte: "*",
  },
  {
    id: 71,
    nom: "Gentil djinn",
    lvl: 6,
    hp: 5,
    baseHp: 5,
    atk: 4,
    atkDispo: false,
    img: "img/card114.png",
    imgMinia: "img/cardfight114.png",
    imgMiniaProvoc: "img/cardfight114-provoc.png",
    famille: "Elementaire",
    texte: "*",
    piocherCarte: true,
    provocation: true,
    provocationUse: true,
  },
  {
    id: 72,
    nom: "Rejeton de lumière amplifié",
    lvl: 6,
    hp: 9,
    baseHp: 9,
    atk: 5,
    atkDispo: false,
    img: "img/card115.png",
    imgMinia: "img/cardfight115.png",
    famille: "Elementaire",
    texte: "*",
  },
  {
    id: 73,
    nom: "Elementaire de surprise",
    lvl: 6,
    hp: 8,
    baseHp: 8,
    atk: 8,
    atkDispo: false,
    img: "img/card116.png",
    imgMinia: "img/cardfight116.png",
    famille: "Elementaire",
    texte: "*",
  },
  {
    id: 74,
    nom: "Eruption de mana déchainée",
    lvl: 6,
    hp: 4,
    baseHp: 4,
    atk: 6,
    atkDispo: false,
    img: "img/card117.png",
    imgMinia: "img/cardfight117.png",
    famille: "Elementaire",
    texte: "*",
  },
  {
    id: 75,
    nom: "Elementaire",
    lvl: 7,
    hp: 3,
    baseHp: 3,
    atk: 3,
    atkDispo: false,
    img: "img/card118.png",
    imgMinia: "img/cardfight118.png",
    famille: "Elementaire",
    texte: "*",
  },
  {
    id: 76,
    nom: "Grorak, Œil-du-Ciel",
    lvl: 6,
    hp: 8,
    baseHp: 8,
    atk: 7,
    atkDispo: false,
    img: "img/card119.1.png",
    imgMinia: "img/cardfight119.png",
    imgMiniaProvoc: "img/cardfight119-provoc.png",
    imgMiniaBouclier: "img/cardfight119-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight119-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<i>Cri</i><br><br><br>Piochez le Totem <br><br> Ancien de l'Orage Hurlant ",
    deathFureur: true,
    carteSpe: 77,
    piocherCarteSpe: true,
  },
  {
    id: 77,
    nom: "Karaa la Frappe-Foudre",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 9,
    atkDispo: false,
    img: "img/card120.1.png",
    imgMinia: "img/cardfight120.png",
    imgMiniaProvoc: "img/cardfight120-provoc.png",
    imgMiniaBouclier: "img/cardfight120-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight120-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<i>Cri</i><br><br> Consomme <color=aqua>toutes</color> vos <br><br>charges et gagne <br><br><color=red>+2/+2</color> par charge<br><br>",
    deathFureur: true,
    fureurCeleste3Self: (self, fureurValue) => {
      if(self.estDoree){
        if (fureurValue >= 3){
          self.atk += fureurValue * 4;
          self.buffAtk += fureurValue * 4;
          self.hp += fureurValue * 4;
          self.buffHp += fureurValue * 4;
        }
      }else{
        if (fureurValue >= 3){
          self.atk += fureurValue * 2;
          self.buffAtk += fureurValue * 2;
          self.hp += fureurValue * 2;
          self.buffHp += fureurValue * 2;
        }
      }
      
    },
  },
  {
    id: 78,
    nom: "Ancien de l'Orage Hurlant",
    lvl: 6,
    hp: 12,
    baseHp: 12,
    atk: 4,
    atkDispo: false,
    img: "img/card121.1.png",
    imgMinia: "img/cardfight121.png",
    imgMiniaProvoc: "img/cardfight121-provoc.png",
    imgMiniaBouclier: "img/cardfight121-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight121-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "A chaque attaque subi <br><br><color=aqua>+3</color> Fureur Céleste <br><br> Donne <color=red>+8/+8</color> <br><br>aux Sabre-Tempête",
    deathFureur: true,
    provocation: true,
    provocationUse: true,
    touchFureur3: true,
    fureurCeleste5AllDef: (board, fureurValue, defenseur) => {
      if(defenseur.estDoree){
        if (fureurValue >= 5 && board.length > 1){
          board.forEach(carte => {
            carte.atk += 8 * 2;
            carte.buffAtk += 8 * 2;
            carte.hp += 8 * 2;
            carte.buffHp += 8 * 2;
          })
        }else if (fureurValue >= 3 && fureurValue < 5){
          board.forEach(carte => {
            carte.atk += 4 * 2;
            carte.buffAtk += 4 * 2;
            carte.hp += 4 * 2;
            carte.buffHp += 4 * 2;
          })
        }
      }else{
        if (fureurValue >= 5 && board.length > 1){
          board.forEach(carte => {
            carte.atk += 8;
            carte.buffAtk += 8;
            carte.hp += 8;
            carte.buffHp += 8;
          })
        }else if (fureurValue >= 3 && fureurValue < 5){
          board.forEach(carte => {
            carte.atk += 4;
            carte.buffAtk += 4;
            carte.hp += 4;
            carte.buffHp += 4;
          })
        }
      }
      
    }
  },
  {
    id: 79,
    nom: "Marche-Foudre Jorr'Tan",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 6,
    atkDispo: false,
    img: "img/card122.1.png",
    imgMinia: "img/cardfight122.png",
    imgMiniaProvoc: "img/cardfight122-provoc.png",
    imgMiniaBouclier: "img/cardfight122-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight122-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "Au moment d'attaquer<br><br>Consomme <color=aqua>7</color> - <color=aqua>5</color> ou <color=aqua>3</color><br><br>Donne <color=red>+1/+1</color> par charge<br><br> supp - <color=red>+6/+6</color> ou <color=red>+3/+3</color>",
    deathFureur: true,
    criFureurCeleste7AllFight: (board, attaquant, fureurValue) => {
      if(attaquant.estDoree){
        if (fureurValue >= 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += fureurValue * 2;
              card.buffAtk += fureurValue * 2;
              card.hp += fureurValue * 2;
              card.buffHp += fureurValue * 2;
            }
          })

        }else if(fureurValue >= 5 && fureurValue < 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 6 * 2;
              card.buffAtk += 6 * 2;
              card.hp += 6 * 2;
              card.buffHp += 6 * 2;
            }
          })

        }
        else if(fureurValue >= 3 && fureurValue < 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 3 * 2;
              card.buffAtk += 3 * 2;
              card.hp += 3 * 2;
              card.buffHp += 3 * 2;
            }
          })

        }
      }else{
        if (fureurValue >= 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += fureurValue;
              card.buffAtk += fureurValue;
              card.hp += fureurValue;
              card.buffHp += fureurValue;
            }
          })

        }else if(fureurValue >= 5 && fureurValue < 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 6;
              card.buffAtk += 6;
              card.hp += 6;
              card.buffHp += 6;
            }
          })

        }
        else if(fureurValue >= 3 && fureurValue < 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 3;
              card.buffAtk += 3;
              card.hp += 3;
              card.buffHp += 3;
            }
          })

        }
      }
      
    }
  },
  {
    id: 80,
    nom: "Torrha, Avatar de l'Ascension",
    lvl: 6,
    hp: 6,
    baseHp: 6,
    atk: 6,
    atkDispo: false,
    img: "img/card123.1.png",
    imgMinia: "img/cardfight123.png",
    imgMiniaProvoc: "img/cardfight123-provoc.png",
    imgMiniaBouclier: "img/cardfight123-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight123-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<i>Cri</i><br><br>Consomme <color=aqua>7</color> - <color=aqua>5</color> ou <color=aqua>3</color> <br><br>Donne <color=red>10atk</color> - <color=red>6atk</color> ou <br><br><color=red>3atk</color> aux Sabre-Tempête",
    deathFureur: true,
    fureurCeleste7All: (board, fureurValue, draggedCard) => {
      if(draggedCard.estDoree){
        if (fureurValue >= 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 10 * 2;
              card.buffAtk += 10 * 2;
            }
          })
        }else if(fureurValue >= 5 && fureurValue < 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 6 * 2;
              card.buffAtk += 6 * 2;
            }
          })
        }else if(fureurValue >= 3 && fureurValue < 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 3 * 2;
              card.buffAtk += 3 * 2;
            }
          })
        }
      }else{
        if (fureurValue >= 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 10;
              card.buffAtk += 10;
            }
          })
        }else if(fureurValue >= 5 && fureurValue < 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 6;
              card.buffAtk += 6;
            }
          })
        }else if(fureurValue >= 3 && fureurValue < 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 3;
              card.buffAtk += 3;
            }
          })
        }
      }
    }
  },
  {
    id: 81,
    nom: "Rôdeur Cramponné",
    lvl: 6,
    hp: 5,
    baseHp: 5,
    atk: 8,
    atkDispo: false,
    img: "img/card124.1.png",
    imgMinia: "img/cardfight124.png",
    imgMiniaProvoc: "img/cardfight124-provoc.png",
    imgMiniaBouclier: "img/cardfight124-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight124-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<i>Cri</i><br><br>Consomme <color=aqua>7</color> - <color=aqua>5</color> ou <color=aqua>3</color> <br><br>Donne <color=red>10hp</color> - <color=red>6hp</color> ou <br><br><color=red>3hp</color> aux Sabre-Tempête",
    deathFureur: true,
    fureurCeleste7All: (board, fureurValue, draggedCard) => {
      if(draggedCard.estDoree){
        if (fureurValue >= 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.hp += 10 * 2;
              card.buffHp += 10 * 2;
            }
          })
        }else if(fureurValue >= 5 && fureurValue < 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.hp += 6 * 2;
              card.buffHp += 6 * 2;
            }
          })
        }else if(fureurValue >= 3 && fureurValue < 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.hp += 3 * 2;
              card.buffHp += 3 * 2;
            }
          })
        }
      }else{
        if (fureurValue >= 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.hp += 10;
              card.buffHp += 10;
            }
          })
        }else if(fureurValue >= 5 && fureurValue < 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.hp += 6;
              card.buffHp += 6;
            }
          })
        }else if(fureurValue >= 3 && fureurValue < 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.hp += 3;
              card.buffHp += 3;
            }
          })
        }
      }
      
      
    }
  },
  {
    id: 82,
    nom: "Hurle-Rite d'Éclat-Tempête",
    lvl: 5,
    hp: 7,
    baseHp: 7,
    atk: 6,
    atkDispo: false,
    img: "img/card125.1.png",
    imgMinia: "img/cardfight125.png",
    imgMiniaProvoc: "img/cardfight125-provoc.png",
    imgMiniaBouclier: "img/cardfight125-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight125-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<i>Cri</i><br><br><br>Piochez un Totem de <br><br> Canalisation Céleste",
    deathFureur: true,
    carteSpe: 87,
    piocherCarteSpe: true,
  },
  {
    id: 83,
    nom: "Totem-Runique de Lointanclair",
    lvl: 5,
    hp: 15,
    baseHp: 15,
    atk: 2,
    atkDispo: false,
    img: "img/card126.1.png",
    imgMinia: "img/cardfight126.png",
    imgMiniaProvoc: "img/cardfight126-provoc.png",
    imgMiniaBouclier: "img/cardfight126-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight126-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<br>Après chaque attaque subi <br><br> consomme <color=aqua>5</color> ou <color=aqua>3</color> <br><br>  donne <color=red>+4/+4</color> ou <color=red>+2/+2</color> <br><br> aux Sabre-Tempête",
    deathFureur: true,
    provocation: true,
    provocationUse: true,
    fureurCeleste5AllDef: (board, fureurValue, defenseur) => {
      if(defenseur.estDoree){
        if (fureurValue >= 5){
          board.forEach(carte => {
            carte.atk += 4 * 2;
            carte.buffAtk += 4 * 2;
            carte.hp += 4 * 2;
            carte.buffHp += 4 * 2;
          })
        }else if (fureurValue >= 3 && fureurValue < 5){
          board.forEach(carte => {
            carte.atk += 2 * 2;
            carte.buffAtk += 2 * 2;
            carte.hp += 2 * 2;
            carte.buffHp += 2 * 2;
          })
        }
      }else{
        if (fureurValue >= 5){
          board.forEach(carte => {
            carte.atk += 4;
            carte.buffAtk += 4;
            carte.hp += 4;
            carte.buffHp += 4;
          })
        }else if (fureurValue >= 3 && fureurValue < 5){
          board.forEach(carte => {
            carte.atk += 2;
            carte.buffAtk += 2;
            carte.hp += 2;
            carte.buffHp += 2;
          })
        }
      }
      
    }
  },
  {
    id: 84,
    nom: "Maître-Tonnerre Korr'Lok",
    lvl: 5,
    hp: 8,
    baseHp: 8,
    atk: 5,
    atkDispo: false,
    img: "img/card127.1.png",
    imgMinia: "img/cardfight127.png",
    imgMiniaProvoc: "img/cardfight127-provoc.png",
    imgMiniaBouclier: "img/cardfight127-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight127-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<i>Cri</i><br><br><color=aqua>+2</color> Fureur Celeste <br><br>par Sabre-Tempête <br><br>présent sur le board",
    deathFureur: true,
    criCeleste2: true,
  },
  {
    id: 85,
    nom: "Fauche-Vents de la Cime Noire",
    lvl: 5,
    hp: 7,
    baseHp: 7,
    atk: 7,
    atkDispo: false,
    img: "img/card128.1.png",
    imgMinia: "img/cardfight128.png",
    imgMiniaProvoc: "img/cardfight128-provoc.png",
    imgMiniaBouclier: "img/cardfight128-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight128-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "Au moment d'attaquer<br><br>Consomme <color=aqua>7</color> - <color=aqua>5</color> ou <color=aqua>3</color> <br><br>Donne <color=red>+6/+6</color> - <color=red>+4/+4</color> ou <br><br><color=red>+2/+2</color> aux Sabre-Tempête<br><br>Il gagne le double",
    deathFureur: true,
    criFureurCeleste7AllFight: (board, attaquant, fureurValue) => {
      if(attaquant.estDoree){
        if (fureurValue >= 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 6 * 2;
              card.buffAtk += 6 * 2;
              card.hp += 6 * 2;
              card.buffHp += 6 * 2;
            }
          })
          attaquant.atk += 6 * 2;
          attaquant.buffAtk += 6 * 2;
          attaquant.hp += 6 * 2;
          attaquant.buffHp += 6 * 2;

        }else if(fureurValue >= 5 && fureurValue < 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 4 * 2;
              card.buffAtk += 4 * 2;
              card.hp += 4 * 2;
              card.buffHp += 4 * 2;
            }
          })
          attaquant.atk += 4 * 2;
          attaquant.buffAtk += 4 * 2;
          attaquant.hp += 4 * 2;
          attaquant.buffHp += 4 * 2;

        }
        else if(fureurValue >= 3 && fureurValue < 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 2 * 2;
              card.buffAtk += 2 * 2;
              card.hp += 2 * 2;
              card.buffHp += 2 * 2;
            }
          })
          attaquant.atk += 2 * 2;
          attaquant.buffAtk += 2 * 2;
          attaquant.hp += 2 * 2;
          attaquant.buffHp += 2 * 2;

        }
      }else{
        if (fureurValue >= 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 6;
              card.buffAtk += 6;
              card.hp += 6;
              card.buffHp += 6;
            }
          })
          attaquant.atk += 6;
          attaquant.buffAtk += 6;
          attaquant.hp += 6;
          attaquant.buffHp += 6;

        }else if(fureurValue >= 5 && fureurValue < 7){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 4;
              card.buffAtk += 4;
              card.hp += 4;
              card.buffHp += 4;
            }
          })
          attaquant.atk += 4;
          attaquant.buffAtk += 4;
          attaquant.hp += 4;
          attaquant.buffHp += 4;

        }
        else if(fureurValue >= 3 && fureurValue < 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 2;
              card.buffAtk += 2;
              card.hp += 2;
              card.buffHp += 2;
            }
          })
          attaquant.atk += 2;
          attaquant.buffAtk += 2;
          attaquant.hp += 2;
          attaquant.buffHp += 2;

        }
      }
      
    }
  },
  {
    id: 86,
    nom: "Gardien des Hautes-Terres",
    lvl: 4,
    hp: 10,
    baseHp: 10,
    atk: 4,
    atkDispo: false,
    img: "img/card129.1.png",
    imgMinia: "img/cardfight129.png",
    imgMiniaProvoc: "img/cardfight129-provoc.png",
    imgMiniaBouclier: "img/cardfight129-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight129-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<br>Au moment d'attaquer<br><br>consomme <color=aqua>5</color> ou <color=aqua>3</color> charges<br><br> Gagne <color=red>10hp</color> ou <color=red>5hp</color>",
    deathFureur: true,
    criFureurCeleste5SelfFight: (self, fureurValue) => {
      if(self.estDoree){
        if (fureurValue >= 5){
          self.provocation = true;
          self.provocationUse = true;
          self.hp += 10 * 2;
          self.buffHp += 10 * 2;
        }else if(fureurValue >= 3 && fureurValue < 5){
          self.hp += 5 * 2;
          self.buffHp += 5 * 2;
        }
      }else{
        if (fureurValue >= 5){
          self.provocation = true;
          self.provocationUse = true;
          self.hp += 10;
          self.buffHp += 10;
        }else if(fureurValue >= 3 && fureurValue < 5){
          self.hp += 5;
          self.buffHp += 5;
        }
      }
      
    },
  },
  {
    id: 87,
    nom: "Brise-Nuées Rekkha",
    lvl: 4,
    hp: 2,
    baseHp: 2,
    atk: 2,
    atkDispo: false,
    img: "img/card130.1.png",
    imgMinia: "img/cardfight130.png",
    imgMiniaProvoc: "img/cardfight130-provoc.png",
    imgMiniaBouclier: "img/cardfight130-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight130-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<i>Cri</i><br><br> Consomme <color=aqua>toutes</color> vos <br><br>charges gagne <br><br><color=red>+1/+1</color> par charge<br><br>",
    deathFureur: true,
    fureurCeleste3Self: (self, fureurValue) => {
      if(self.estDoree){
        if (fureurValue >= 3){
          self.atk += fureurValue * 2;
          self.buffAtk += fureurValue * 2;
          self.hp += fureurValue * 2;
          self.buffHp += fureurValue * 2;
        }
      }else{
        if (fureurValue >= 3){
          self.atk += fureurValue;
          self.buffAtk += fureurValue;
          self.hp += fureurValue;
          self.buffHp += fureurValue;
        }
      }
      
    },
  },
  {
    id: 88,
    nom: "Totem de Canalisation Céleste",
    lvl: 4,
    hp: 12,
    baseHp: 12,
    atk: 0,
    atkDispo: false,
    img: "img/card131.1.png",
    imgMinia: "img/cardfight131.png",
    imgMiniaProvoc: "img/cardfight131-provoc.png",
    imgMiniaBouclier: "img/cardfight131-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight131-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<br><br><color=aqua>+4</color> Fureur Celeste à<br><br> chaque fois qu'il est<br><br> attaqué",
    deathFureur: true,
    provocation: true,
    provocationUse: true,
    touchFureur2: true,
  },
  {
    id: 89,
    nom: "Vétéran Sabre-Gris",
    lvl: 4,
    hp: 6,
    baseHp: 6,
    atk: 5,
    atkDispo: false,
    img: "img/card132.1.png",
    imgMinia: "img/cardfight132.png",
    imgMiniaProvoc: "img/cardfight132-provoc.png",
    imgMiniaBouclier: "img/cardfight132-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight132-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<br>Au moment d'attaquer<br><br>consomme <color=aqua>5</color> ou <color=aqua>3</color> charges<br><br> Gagne <color=red>+6/+6</color> ou <color=red>+3/+3</color>",
    deathFureur: true,
    criFureurCeleste5SelfFight: (self, fureurValue) => {
      if(self.estDoree){
        if (fureurValue >= 5){
          self.atk += 6 * 2;
          self.buffAtk += 6 * 2;
          self.hp += 6 * 2;
          self.buffHp += 6 * 2;
        }else if(fureurValue >= 3 && fureurValue < 5){
          self.atk += 3 * 2;
          self.buffAtk += 3 * 2;
          self.hp += 3 * 2;
          self.buffHp += 3 * 2;
        }
      }else{
        if (fureurValue >= 5){
          self.atk += 6;
          self.buffAtk += 6;
          self.hp += 6;
          self.buffHp += 6;
        }else if(fureurValue >= 3 && fureurValue < 5){
          self.atk += 3;
          self.buffAtk += 3;
          self.hp += 3;
          self.buffHp += 3;
        }
      }
      
    },
  },
  {
    id: 90,
    nom: "Lame-Rituelle de Farghann",
    lvl: 4,
    hp: 7,
    baseHp: 7,
    atk: 3,
    atkDispo: false,
    img: "img/card133.1.png",
    imgMinia: "img/cardfight133.png",
    imgMiniaProvoc: "img/cardfight133-provoc.png",
    imgMiniaBouclier: "img/cardfight133-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight133-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<i>Cri</i><br><br>Cosomme <color=aqua>5</color> ou <color=aqua>3</color> charges <br><br> Donne <color=red>+4/+4</color> ou <color=red>+2/+2</color> <br><br> aux Sabre-Tempête",
    deathFureur: true,
    fureurCeleste5All: (board, fureurValue, draggedCard) => {
      if(draggedCard.estDoree){
        if (fureurValue >= 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 4 * 2;
              card.buffAtk += 4 * 2;
              card.hp += 4 * 2;
              card.buffHp += 4 * 2;
            }
          })
        }else if(fureurValue >= 3 && fureurValue < 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 2 * 2;
              card.buffAtk += 2 * 2;
              card.hp += 2 * 2;
              card.buffHp += 2 * 2;
            }
          })
        }
      }else{
        if (fureurValue >= 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 4;
              card.buffAtk += 4;
              card.hp += 4;
              card.buffHp += 4;
            }
          })
        }else if(fureurValue >= 3 && fureurValue < 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 2;
              card.buffAtk += 2;
              card.hp += 2;
              card.buffHp += 2;
            }
          })
        }
      }
      
    }
  },
  {
    id: 91,
    nom: "Fracture-Éclair Rhakka",
    lvl: 3,
    hp: 5,
    baseHp: 5,
    atk: 5,
    atkDispo: false,
    img: "img/card134.1.png",
    imgMinia: "img/cardfight134.png",
    imgMiniaProvoc: "img/cardfight134-provoc.png",
    imgMiniaBouclier: "img/cardfight134-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight134-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "Au moment d'attaquer<br><br>consomme <color=aqua>5</color> ou <color=aqua>3</color> charges<br><br>donne <color=red>+2/+2</color> ou <color=red>+1/+1</color> <br><br>aux Sabre-Tempête<br><br>Rhakka gagne le double",
    deathFureur: true,
    criFureurCeleste5AllFight: (board, attaquant, fureurValue) => {
      if(attaquant.estDoree){
        if (fureurValue >= 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 2 * 2;
              card.buffAtk += 2 * 2;
              card.hp += 2 * 2;
              card.buffHp += 2 * 2;
            }
          })
          attaquant.atk += 2 * 2;
          attaquant.buffAtk += 2 * 2;
          attaquant.hp += 2 * 2;
          attaquant.buffHp += 2 * 2;
        }else if(fureurValue >= 3 && fureurValue < 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 1 * 2;
              card.buffAtk += 1 * 2;
              card.hp += 1 * 2;
              card.buffHp += 1 * 2;
            }
          })
          attaquant.atk += 1 * 2;
          attaquant.buffAtk += 1 * 2;
          attaquant.hp += 1 * 2;
          attaquant.buffHp += 1 * 2;
        }
      }else{
        if (fureurValue >= 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 2;
              card.buffAtk += 2;
              card.hp += 2;
              card.buffHp += 2;
            }
          })
          attaquant.atk += 2;
          attaquant.buffAtk += 2;
          attaquant.hp += 2;
          attaquant.buffHp += 2;
        }else if(fureurValue >= 3 && fureurValue < 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 1;
              card.buffAtk += 1;
              card.hp += 1;
              card.buffHp += 1;
            }
          })
          attaquant.atk += 1;
          attaquant.buffAtk += 1;
          attaquant.hp += 1;
          attaquant.buffHp += 1;
        }
      }
      
    }
  },
  {
    id: 92,
    nom: "Chante-Rites Féral'Ka",
    lvl: 3,
    hp: 6,
    baseHp: 6,
    atk: 3,
    atkDispo: false,
    img: "img/card135.1.png",
    imgMinia: "img/cardfight135.png",
    imgMiniaProvoc: "img/cardfight135-provoc.png",
    imgMiniaBouclier: "img/cardfight135-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight135-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<i>Cri</i><br><br>Cosomme <color=aqua>5</color> ou <color=aqua>3</color> charges <br><br> Donne <color=red>+2/+2</color> ou <color=red>+1/+1</color> <br><br> aux Sabre-Tempête  ",
    deathFureur: true,
    fureurCeleste5All: (board, fureurValue, draggedCard) => {
      if(draggedCard.estDoree){
        if (fureurValue >= 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 2 * 2;
              card.buffAtk += 2 * 2;
              card.hp += 2 * 2;
              card.buffHp += 2 * 2;
            }
          })
        }else if(fureurValue >= 3 && fureurValue < 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 1 * 2;
              card.buffAtk += 1 * 2;
              card.hp += 1 * 2;
              card.buffHp += 1 * 2;
            }
          })
        }
      }else{
        if (fureurValue >= 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 2;
              card.buffAtk += 2;
              card.hp += 2;
              card.buffHp += 2;
            }
          })
        }else if(fureurValue >= 3 && fureurValue < 5){
          board.forEach(card =>{
            if(card.famille === "Les Sabre-Tempête"){
              card.atk += 1;
              card.buffAtk += 1;
              card.hp += 1;
              card.buffHp += 1;
            }
          })
        }
      }
      
    }
  },
  {
    id: 93,
    nom: "Totem de l'Étincelle Sage",
    lvl: 3,
    hp: 8,
    baseHp: 8,
    atk: 0,
    atkDispo: false,
    img: "img/card136.1.png",
    imgMinia: "img/cardfight136.png",
    imgMiniaProvoc: "img/cardfight136-provoc.png",
    imgMiniaBouclier: "img/cardfight136-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight136-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<br><color=red>+2/+2</color> à un Sabre-Tempête<br><br>aléatoire après chaque<br><br>attaque subi<br><br>Consomme <color=aqua>3</color> charges",
    deathFureur: true,
    provocation: true,
    provocationUse: true,
    fureurCeleste3OneRandomDef: (cible, fureurValue, defenseur) => {
      if(defenseur.estDoree){
        if (fureurValue >= 3){
          cible.atk += 2 * 2;
          cible.buffAtk += 2 * 2;
          cible.hp += 2 * 2;
          cible.buffHp += 2 * 2;
        }
      }else{
        if (fureurValue >= 3){
          cible.atk += 2;
          cible.buffAtk += 2;
          cible.hp += 2;
          cible.buffHp += 2;
        }
      }
      
    }
  },
  {
    id: 94,
    nom: "Tisse-Foudre Tahran",
    lvl: 3,
    hp: 4,
    baseHp: 4,
    atk: 6,
    atkDispo: false,
    img: "img/card137.1.png",
    imgMinia: "img/cardfight137.png",
    imgMiniaProvoc: "img/cardfight137-provoc.png",
    imgMiniaBouclier: "img/cardfight137-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight137-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<br><br> Au moment d'attaquer <br><br> Consomme <color=aqua>3</color> charges <br><br> gagne <color=red>+2/+2</color>",
    deathFureur: true,
    criFureurCeleste3SelfFight: (self, fureurValue) => {
      if(self.estDoree){
        if (fureurValue >= 3){
          self.atk += 2 * 2;
          self.buffAtk += 2 * 2;
          self.hp += 2 * 2;
          self.buffHp += 2 * 2;
        }
      }else{
        if (fureurValue >= 3){
          self.atk += 2;
          self.buffAtk += 2;
          self.hp += 2;
          self.buffHp += 2;
        }
      }
      
    },
  },
  {
    id: 95,
    nom: "Gardienne Totémique Korai",
    lvl: 2,
    hp: 7,
    baseHp: 7,
    atk: 3,
    atkDispo: false,
    img: "img/card138.1.png",
    imgMinia: "img/cardfight138.png",
    imgMiniaProvoc: "img/cardfight138-provoc.png",
    imgMiniaBouclier: "img/cardfight138-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight138-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<br><i>Cri</i><br><br>Piochez un Totem<br><br> d'Agitation Céleste",
    deathFureur: true,
    carteSpe: 97,
    piocherCarteSpe: true,
  },
  {
    id: 96,
    nom: "Torak Bouclier-des-Plaines",
    lvl: 2,
    hp: 4,
    baseHp: 4,
    atk: 4,
    atkDispo: false,
    img: "img/card139.1.png",
    imgMinia: "img/cardfight139.png",
    imgMiniaProvoc: "img/cardfight139-provoc.png",
    imgMiniaBouclier: "img/cardfight139-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight139-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<br><br> Au moment d'attaquer <br><br> Consomme <color=aqua>3</color> charges <br><br> gagne <color=red>+1/+2</color> ",
    deathFureur: true,
    criFureurCeleste3SelfFight: (self, fureurValue) => {
      if(self.estDoree){
        if (fureurValue >= 3){
          self.atk+= 1 * 2;
          self.buffAtk += 1 * 2;
          self.hp += 2 * 2;
          self.buffHp += 2 * 2;
        }
      }else{
        if (fureurValue >= 3){
          self.atk+= 1;
          self.buffAtk += 1;
          self.hp += 2;
          self.buffHp += 2;
        }
      }
      
    },
    
  },
  {
    id: 97,
    nom: "Soigne-Vents Taliha",
    lvl: 2,
    hp: 5,
    baseHp: 5,
    atk: 3,
    atkDispo: false,
    img: "img/card140.1.png",
    imgMinia: "img/cardfight140.png",
    imgMiniaProvoc: "img/cardfight140-provoc.png",
    imgMiniaBouclier: "img/cardfight140-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight140-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<i>Cri</i><br><br> <color=red>+2hp</color> à un Sabre-Tempête<br><br>aléatoire. Consomme <color=aqua>3</color><br><br>charges",
    deathFureur: true,
    fureurCeleste3OneRandom: (cible, fureurValue, draggedCard) => {
      if(draggedCard.estDoree){
        if (fureurValue >= 3){
          cible.hp += 2 * 2;
          cible.buffHp += 2 * 2;
        }
      }else{
        if (fureurValue >= 3){
          cible.hp += 2;
          cible.buffHp += 2;
        }
      }
      
    }
  },
  {
    id: 98,
    nom: "Totem d'Agitation Céleste",
    lvl: 2,
    hp: 6,
    baseHp: 6,
    atk: 0,
    atkDispo: false,
    img: "img/card141.1.png",
    imgMinia: "img/cardfight141.png",
    imgMiniaProvoc: "img/cardfight141-provoc.png",
    imgMiniaBouclier: "img/cardfight141-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight141-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<br><br><color=aqua>+2</color> Fureur Celeste à<br><br> chaque fois qu'il est<br><br> attaqué",
    deathFureur: true,
    provocation: true,
    provocationUse: true,
    touchFureur: true,
  },
  {
    id: 99,
    nom: "Lame de Loint'Roc",
    lvl: 1,
    hp: 3,
    baseHp: 3,
    atk: 5,
    atkDispo: false,
    img: "img/card142.1.png",
    imgMinia: "img/cardfight142.png",
    imgMiniaProvoc: "img/cardfight142-provoc.png",
    imgMiniaBouclier: "img/cardfight142-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight142-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<i>Cri</i><br><br><br> Consomme <color=aqua>3</color> charges <br><br> Gagne <color=red>+1/+1</color>",
    fureurCeleste3Self: (self, fureurValue) => {
      if(self.estDoree){
        if (fureurValue >= 3){
          self.atk += 1 * 2;
          self.buffAtk += 1 * 2;
          self.hp += 1 * 2;
          self.buffHp += 1 * 2;
        }
      }else{
        if (fureurValue >= 3){
          self.atk += 1;
          self.buffAtk += 1;
          self.hp += 1;
          self.buffHp += 1;
        }
      }
      
    },
    deathFureur: true,
  },
  {
    id: 100,
    nom: "Vole-Flamme Mikka",
    lvl: 1,
    hp: 3,
    baseHp: 3,
    atk: 2,
    atkDispo: false,
    img: "img/card143.1.png",
    imgMinia: "img/cardfight143.png",
    imgMiniaProvoc: "img/cardfight143-provoc.png",
    imgMiniaBouclier: "img/cardfight143-bouclier.png",
    imgMiniaProvocBouclier: "img/cardfight143-provoc-bouclier.png",
    famille: "Les Sabre-Tempête",
    texte: "<br><i>Cri</i><br><br><br> Fureur Celeste <color=aqua>+5</color>",
    criCeleste: true,
    deathFureur: true,
  },
  {
    id: 101,
    nom: "Tirelire",
    lvl: 1,
    hp: "",
    baseHp: "",
    atk: "",
    atkDispo: false,
    img: "img/card144.png",
    imgMinia: "img/cardfight144.png",
    famille: "Sort",
    texte: "<br><i>Tirelire</i><br><br><br><br>Vous gagnez <color=gold> 1 </color> pièce d'or.",
    lancerSort: (setter, gold) => {
      setter(gold + 1)
    }
  },
  {
    id: 102,
    nom: "Ration de Combat",
    lvl: 1,
    hp: "",
    baseHp: "",
    atk: "",
    atkDispo: false,
    img: "img/card145.png",
    imgMinia: "img/cardfight145.png",
    famille: "Sort",
    texte: "<br><i>Ration de Combat</i> <br><br><br> Donne <color=red>+2/+2</color> au serviteur<br><br>le plus à gauche du board",
    lancerSort: (setter, gold, board) => {
      if(board.length > 0){
        board[0].atk += 2;
        board[0].buffAtk += 2;
        board[0].hp += 2;
        board[0].BuffHp += 2;
      }

    }
  },
  {
    id: 103,
    nom: "Hache de Guerre",
    lvl: 1,
    hp: "",
    baseHp: "",
    atk: "",
    atkDispo: false,
    img: "img/card146.png",
    imgMinia: "img/cardfight146.png",
    famille: "Sort",
    texte: "<br><i>Hache de Guerre</i> <br><br><br> Donne <color=red>+4Atk</color> au serviteur <br><br> le plus à gauche du board",
    lancerSort: (setter, gold, board) => {
      if(board.length > 0){
        board[0].atk += 4;
        board[0].buffAtk += 4;
      }

    }
  },
  {
    id: 104,
    nom: "Bouclier en Bois",
    lvl: 1,
    hp: "",
    baseHp: "",
    atk: "",
    atkDispo: false,
    img: "img/card147.png",
    imgMinia: "img/cardfight147.png",
    famille: "Sort",
    texte: "<br><i>Bouclier en Bois</i> <br><br><br> Donne <color=red>+4 Hp</color> au serviteur <br><br> le plus à gauche du board",
    lancerSort: (setter, gold, board) => {
      if(board.length > 0){
        board[0].hp += 4;
        board[0].buffHp += 4;
      }

    }
  },
  {
    id: 104,
    nom: "Gardien",
    lvl: 1,
    hp: "",
    baseHp: "",
    atk: "",
    atkDispo: false,
    img: "img/card148.png",
    imgMinia: "img/cardfight148.png",
    famille: "Sort",
    texte: "<br><i>Gardien</i> <br><br><br> Donne <color=red>Gardien</color> au <br><br> serviteur le plus à gauche <br><br> du board",
    lancerSort: (setter, gold, board) => {
      if(board.length > 0){
        board[0].provocation = true;
        board[0].provocationUse = true;
      }

    }
  },
  {
    id: 105,
    nom: "Subtiliser",
    lvl: 2,
    hp: "",
    baseHp: "",
    atk: "",
    atkDispo: false,
    img: "img/card149.png",
    imgMinia: "img/cardfight149.png",
    famille: "Sort",
    texte: "<br><i>Subtiliser</i> <br><br><br> Vole une carte aléatoire du <br><br> shop et la place dans votre <br><br> deck",
    lancerSort: (setter, gold, board, shop, setterDeck, deck, setterShop) => {
      const randomCardShop = shop[Math.floor(Math.random() * shop.length)]
      let newDeck = deck.push(randomCardShop)
      setterDeck(newDeck)
      let newShop = shop.filter(c => c !== randomCardShop)
      setterShop(newShop)
    }
  },
  {
    id: 106,
    nom: "Petit Coffre",
    lvl: 2,
    hp: "",
    baseHp: "",
    atk: "",
    atkDispo: false,
    img: "img/card150.png",
    imgMinia: "img/cardfight150.png",
    famille: "Sort",
    texte: "<br><i>Petit Coffre</i> <br><br><br> Pioche une carte aléatoire <br><br> de lvl <color=red>1</color> et la place dans <br><br> votre deck",
    lancerSort: (setter, gold, board, shop, setterDeck, deck, setterShop) => {
      const cardsLvl1 = cards.filter(c => c.lvl === 1 && c.famille !== "Sort")
      const randomCardsLvl1 = cardsLvl1[Math.floor(Math.random() * cardsLvl1.length)]
      let newDeck = deck.push(randomCardsLvl1)
      setterDeck(newDeck)
    }
  },
  {
    id: 107,
    nom: "Lien Spirituel",
    lvl: 2,
    hp: "",
    baseHp: "",
    atk: "",
    atkDispo: false,
    img: "img/card151.png",
    imgMinia: "img/cardfight151.png",
    famille: "Sort",
    texte: "<br><i>Lien Spirituel</i> <br><br><br> Pioche une carte d'un lvl <br><br> inferieur et de la même <br><br> famille que celle la plus à <br><br> gauche du Board",
    lancerSort: (setter, gold, board, shop, setterDeck, deck, setterShop) => {
      const cardsFamilleLvlInf = cards.filter(c => c.lvl < board[0].lvl && c.famille !== "Sort" && c.famille === board[0].famille)
      const randomCardsFamilleInf = cardsFamilleLvlInf[Math.floor(Math.random() * cardsFamilleLvlInf.length)]
      let newDeck = deck.push(randomCardsFamilleInf)
      setterDeck(newDeck)
    }
  },
  {
    id: 108,
    nom: "Gold additionnel",
    lvl: 3,
    hp: "",
    baseHp: "",
    atk: "",
    atkDispo: false,
    img: "img/card152.png",
    imgMinia: "img/cardfight152.png",
    famille: "Sort",
    texte: "<br><i>Gold additionnel</i> <br><br><br> Augmente votre maximum <br><br> d'or de <color=gold>1</color>",
    lancerSort: (setter, gold, board, shop, setterDeck, deck, setterShop, maxGold, setmaxGold) => {
      setmaxGold(maxGold + 1)
      console.log(maxGold)
    }
  },
  {
    id: 109,
    nom: "Titi L'aigri",
    lvl: 1,
    hp: 2,
    baseHp: 2,
    atk: 3,
    atkDispo: false,
    img: "img/card7.png",
    imgMinia: "img/cardfight7.png",
    famille: "Les Hierels",
    sousFamille: "Les L",
    texte: "<br><i>Miaouuu</i> <br><br><br> Réclame à manger mais <br><br> ne mange rien...",
  },
  {
    id: 110,
    nom: "Maya-Bull",
    lvl: 1,
    hp: 3,
    baseHp: 3,
    atk: 2,
    atkDispo: false,
    img: "img/card6.png",
    imgMinia: "img/cardfight6.png",
    famille: "Les Hierels",
    sousFamille: "Les L",
    texte: "<br><i>On joue?!?</i> <br><br><br> On joue? on joue? <br><br> ON JOUE?? On mange?",
  },
  {
    id: 111,
    nom: "Floby",
    lvl: 2,
    hp: 2,
    baseHp: 2,
    atk: 1,
    atkDispo: false,
    img: "img/card4.png",
    imgMinia: "img/cardfight4.png",
    famille: "Les Hierels",
    sousFamille: "Les Z",
    texte: "<br><i>Cri</i> <br><br><br> <color=red>+1 Atk</color> à un Hierel <br><br> aléatoire",
    criDeGuerreUnique: (carte, draggedCard) => {
      if(draggedCard.estDoree){
        if(carte.famille === "Les Hierels"){
          carte.atk += 1 * 2;
          carte.buffAtk +=1 * 2;
        }
      }else{
        if(carte.famille === "Les Hierels"){
          carte.atk += 1;
          carte.buffAtk +=1;
        }
      }    
    },
  },
  {
    id: 112,
    nom: "Los Mecanos",
    lvl: 2,
    hp: 2,
    baseHp: 2,
    atk: 2,
    atkDispo: false,
    img: "img/card5.png",
    imgMinia: "img/cardfight5.png",
    famille: "Les Hierels",
    sousFamille: "Les L",
    texte: "<br><i>Cri</i> <br><br><br> Donne Gardien à un Hierel <br><br> aléatoire",
    criDeGuerreUnique: (carte, draggedCard) => {
      if(carte.famille === "Les Hierels"){
        carte.provocation = true
        carte.provocationUse = true
      }     
    },
  },
  {
    id: 113,
    nom: "Chauve Qui Peut",
    lvl: 2,
    hp: 3,
    baseHp: 3,
    atk: 3,
    atkDispo: false,
    img: "img/card28.1.png",
    imgMinia: "img/cardfight28.1.png",
    famille: "Les Hierels",
    sousFamille: "Les L",
    texte: "<br><i>Cri</i> <br><br><br> Gagne <color=red>+2 Hp</color> si un autre <br><br> Hierel est présent",
    criDeGuerreUniqueSelf: (carte, board) => {
      if(carte.estDoree){
        let boardFiltred =  board.filter(card => card.famille === "Les Hierels")
        if(boardFiltred.length > 0){
          carte.hp += 2 * 2;
          carte.buffHp +=2 * 2;
        }
      }else{
        let boardFiltred =  board.filter(card => card.famille === "Les Hierels")
        if(boardFiltred.length > 0){
          carte.hp += 2;
          carte.buffHp +=2;
        }
      }
         
    },
  },
  {
    id: 114,
    nom: "Gio & Toto",
    lvl: 3,
    hp: 2,
    baseHp: 2,
    atk: 2,
    atkDispo: false,
    img: "img/card11.png",
    imgMinia: "img/cardfight11.png",
    famille: "Les Hierels",
    sousFamille: "Les N",
    texte: "<br><i>Renforcement familiaux</i> <br><br><br> Gagne <color=red>+1/+1</color> à chaque <br><br> fois qu'un Hierel est posé",
    upSelf: true,
  },
  {
    id: 115,
    nom: "Chrys & Jerem",
    lvl: 3,
    hp: 3,
    baseHp: 3,
    atk: 4,
    atkDispo: false,
    img: "img/card16.png",
    imgMinia: "img/cardfight16.png",
    imgProjectile: "img/projectile2.png",
    famille: "Les Hierels",
    sousFamille: "Les Z",
    texte: "<br><i>Debut de combat</i> <br><br><br> inflige <color=red>2 dégats</color> à 1 adv. <br><br> aléatoire",
    oneTicDebutCombat: (carteCible, carteSource) => {
      if(carteSource.estDoree){
        if(carteCible.bouclierUse){
          carteCible.hp -= 0;
          carteCible.degatsRecus = 0;
          carteCible.bouclierUse = false
        }else{
          carteCible.hp -= 2 * 2; 
          carteCible.degatsRecus = 2 * 2;
        }
      }else{
        if(carteCible.bouclierUse){
          carteCible.hp -= 0;
          carteCible.degatsRecus = 0;
          carteCible.bouclierUse = false
        }else{
          carteCible.hp -= 2; 
          carteCible.degatsRecus = 2;
        }
      }  
    },
  },
  {
    id: 116,
    nom: "Lohan",
    lvl: 3,
    hp: 2,
    baseHp: 2,
    atk: 2,
    atkDispo: false,
    img: "img/card3.png",
    imgMinia: "img/cardfight3.png",
    famille: "Les Hierels",
    sousFamille: "Les L",
    texte: "<br><i>Cri et tous les 2 tours</i> <br><br><br> Piochez une carte <br><br> <color=white>Doudou</color> aléatoire",
    carteSpe: 117,
    piocherCarteSpe: true,
    decomptePioche: 2,
  },
  {
    id: 117,
    nom: "Chat-Miaou",
    lvl: 7,
    hp: 2,
    baseHp: 2,
    atk: 2,
    atkDispo: false,
    img: "img/card17.png",
    imgMinia: "img/cardfight17.png",
    famille: "Les Hierels",
    sousFamille: "Doudou",
    texte: "<br><i>Renforcement du maitre</i> <br><br><br> Donne <color=red>+1/+1</color> à Lohan",
    criDeGuerre: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.nom === "Lohan"){
            carte.atk += 1 * 2;
            carte.buffAtk +=1 * 2;
            carte.hp += 1 * 2;
            carte.buffHp +=1 * 2;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.nom === "Lohan"){
            carte.atk += 1;
            carte.buffAtk +=1;
            carte.hp += 1;
            carte.buffHp +=1;
          }
        });
      }      
    }, 
  },
  {
    id: 118,
    nom: "Felix",
    lvl: 7,
    hp: 3,
    baseHp: 3,
    atk: 1,
    atkDispo: false,
    img: "img/card19.png",
    imgMinia: "img/cardfight19.png",
    famille: "Les Hierels",
    sousFamille: "Doudou",
    texte: "<br><i>Renforcement du maitre</i> <br><br><br> Donne <color=red>+2 Hp</color> à Lohan",
    criDeGuerre: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.nom === "Lohan"){
            carte.hp += 2 * 2;
            carte.buffHp +=2 * 2;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.nom === "Lohan"){
            carte.hp += 2;
            carte.buffHp +=2;
          }
        });
      }      
    },
  },
  {
    id: 119,
    nom: "Pinceau",
    lvl: 7,
    hp: 1,
    baseHp: 1,
    atk: 3,
    atkDispo: false,
    img: "img/card20.png",
    imgMinia: "img/cardfight20.png",
    famille: "Les Hierels",
    sousFamille: "Doudou",
    texte: "<br><i>Renforcement du maitre</i> <br><br><br> Donne <color=red>+2 Atk</color> à Lohan",
    criDeGuerre: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.nom === "Lohan"){
            carte.atk += 2 * 2;
            carte.buffAtk +=2 * 2;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.nom === "Lohan"){
            carte.atk += 2;
            carte.buffAtk +=2;
          }
        });
      }      
    },
  },
  {
    id: 120,
    nom: "Fufu",
    lvl: 3,
    hp: 4,
    baseHp: 4,
    atk: 2,
    atkDispo: false,
    img: "img/card22.png",
    imgMinia: "img/cardfight22.png",
    famille: "Les Hierels",
    sousFamille: "Les BBEW",
    texte: "<br><i>En combat</i> <br><br><br> Gagne <br><br> <color=red>+2/+2</color> à chaque Hierel <br><br> mort",
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if (mortCarte.famille !== "Les Hierels" || mortCarte.id === self.id) return;
      if(self.estDoree){
        self.atk += 2 * 2;
        self.buffAtk += 2 * 2;
        self.hp += 1 * 2;
        self.buffHp += 1 * 2;
        self.buffAtkGrum = (self.buffAtkGrum || 0) + 1 * 2;
        self.buffHpGrum = (self.buffHpGrum || 0) + 1 * 2; 
        self.grumBuffEffect = true; // Pour tracking ou affichage
      }else{
        self.atk += 2;
        self.buffAtk += 2;
        self.hp += 1;
        self.buffHp += 1;
        self.buffAtkGrum = (self.buffAtkGrum || 0) + 1;
        self.buffHpGrum = (self.buffHpGrum || 0) + 1; 
        self.grumBuffEffect = true; // Pour tracking ou affichage
      }
    }
  },
  {
    id: 121,
    nom: "Super Thomux",
    lvl: 3,
    hp: 3,
    baseHp: 3,
    atk: 3,
    atkDispo: false,
    img: "img/card24.png",
    imgMinia: "img/cardfight24.png",
    famille: "Les Hierels",
    sousFamille: "Les BBEW",
    texte: "<br><i>Cri</i> <br><br> Donne <color=red>+1/+1</color> aux Hierels <br><br> présent. <color=red>+2/+2</color> si c'est un <br><br> BBEW",
    criDeGuerre: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Hierels"){
            carte.atk += 1 * 2;
            carte.buffAtk +=1 * 2;
            carte.hp += 1 * 2;
            carte.buffHp +=1 * 2;
          }
          if(carte.sousFamille === "Les BBEW"){
            carte.atk += 1 * 2;
            carte.buffAtk +=1 * 2;
            carte.hp += 1 * 2;
            carte.buffHp +=1 * 2;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Hierels"){
            carte.atk += 1;
            carte.buffAtk +=1;
            carte.hp += 1;
            carte.buffHp +=1;
          }
          if(carte.sousFamille === "Les BBEW"){
            carte.atk += 1;
            carte.buffAtk +=1;
            carte.hp += 1;
            carte.buffHp +=1;
          }
        });
      }      
    },
  },
  {
    id: 122,
    nom: "Ludo & Jenny",
    lvl: 4,
    hp: 4,
    baseHp: 4,
    atk: 4,
    atkDispo: false,
    img: "img/card12.png",
    imgMinia: "img/cardfight12.png",
    famille: "Les Hierels",
    sousFamille: "Les N",
    texte: "<br><i>effet de mass</i> <br><br><color=red>+1/+1</color> pour chaque Hierel <br><br><i>aura</i> <br><br><color=red>+1/+1</color> aux Hierels",
    effetDeMass: (carte, board) => {
      if(carte.estDoree){
        const Hierel = board.filter(c => c.famille === "Les Hierels" && c.id !== carte.id);
        if (Hierel.length > 0) {
          carte.atk += Hierel.length * 2;
          carte.hp += Hierel.length * 2;
          carte.buffAtk += Hierel.length * 2;
          carte.buffHp += Hierel.length * 2;
        } 
      }else{
        const Hierel = board.filter(c => c.famille === "Les Hierels" && c.id !== carte.id);
        if (Hierel.length > 0) {
          carte.atk += Hierel.length;
          carte.hp += Hierel.length;
          carte.buffAtk += Hierel.length;
          carte.buffHp += Hierel.length; 
        } 
      }    
    },
    aura: (cartesBoard, draggedCard) => {
      cartesBoard.forEach(carte => {
        if (carte.famille === "Les Hierels") {
          if(draggedCard.estDoree){
            carte.atk += 2 * 2;
            carte.buffAtk += 2 * 2;
            carte.hp += 2 * 2;
            carte.buffHp += 2 * 2;
            carte.auraEffect = true;
          }else{
            carte.atk += 2;
            carte.buffAtk += 2;
            carte.hp += 2;
            carte.buffHp += 2;
            carte.auraEffect = true;
          }
        }
        
      });
    },
    auraSell: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if (carte.auraEffect === true && carte.famille === "Les Hierels") {
            carte.atk -= 2 * 2;
            carte.buffAtk -= 2 * 2;
            carte.hp -= 2 * 2;
            carte.buffHp -= 2 * 2;
            if(carte.buffHp === 0 && carte.buffAtk === 0){
              carte.auraEffect = false
            }        
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if (carte.auraEffect === true && carte.famille === "Les Hierels") {
            carte.atk -= 2;
            carte.buffAtk -= 2;
            carte.hp -= 2;
            carte.buffHp -= 2;
            if(carte.buffHp === 0 && carte.buffAtk === 0){
              carte.auraEffect = false
            }        
          }
        });
      } 
    },
    auraUnique: (carte) => {
      if (carte.famille === "Les Hierels") {
        carte.atk += 2;
        carte.buffAtk += 2;
        carte.hp += 2;
        carte.buffHp += 2;
        carte.auraEffect = true; 
      }     
    },
  },
  {
    id: 123,
    nom: "Rayan",
    lvl: 4,
    hp: 3,
    baseHp: 3,
    atk: 4,
    atkDispo: false,
    img: "img/card14.png",
    imgMinia: "img/cardfight14.png",
    famille: "Les Hierels",
    sousFamille: "Les L",
    texte: "<br><i>Début de tour</i> <br><br> Gagne <color=red>+1/+1</color><br><br> si Aurelie ou Cedric <br><br> présent, <color=red>+2/+2</color>",
    aoeCibleApresCombat: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.sousFamille === "Les L"){
            draggedCard.atk += 2 * 2;
            draggedCard.buffAtk += 2 * 2;
            draggedCard.hp += 2 * 2;
            draggedCard.buffHp += 2 * 2;
            draggedCard.animAoE = true; 
          }else{
            if(carte.famille === "Les Hierels"){
              draggedCard.atk += 1 * 2;
              draggedCard.buffAtk += 1 * 2;
              draggedCard.hp += 1 * 2;
              draggedCard.buffHp += 1 * 2;
              draggedCard.animAoE = true;
            }
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.sousFamille === "Les L"){
            draggedCard.atk += 2;
            draggedCard.buffAtk += 2;
            draggedCard.hp += 2;
            draggedCard.buffHp += 2;
            draggedCard.animAoE = true; 
          }else{
            if(carte.famille === "Les Hierels"){
              draggedCard.atk += 1;
              draggedCard.buffAtk += 1;
              draggedCard.hp += 1;
              draggedCard.buffHp += 1;
              draggedCard.animAoE = true;
            }
          } 
        });
      }
      
    },

  },
  {
    id: 124,
    nom: "Flo Mediv",
    lvl: 4,
    hp: 3,
    baseHp: 3,
    atk: 2,
    atkDispo: false,
    img: "img/card1.png",
    imgMinia: "img/cardfight1.png",
    famille: "Les Hierels",
    sousFamille: "Les Z",
    texte: "<br><i>Cri et Début de tour</i> <br><br> Donne <color=red>+1/+1</color><br><br>, <color=red>+2/+2</color> si c'est un Z",
    aoeCibleApresCombat: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Hierels"){
            carte.hp += 2 * 2;
            carte.buffHp += 2 * 2;
            carte.animAoE = true; 
          }else{
            carte.hp += 1 * 2;
            carte.buffHp += 1 * 2;
            carte.animAoE = true;
          }

        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Hierels"){
            carte.hp += 2;
            carte.buffHp += 2;
            carte.animAoE = true; 
          }else{
            carte.hp += 1;
            carte.buffHp += 1;
            carte.animAoE = true;
          } 
        });
      }
      
    },
    criDeGuerre: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Hierels"){
            carte.atk += 2 * 2;
            carte.buffAtk += 2 * 2;
            carte.hp += 2 * 2;
            carte.buffHp +=2 * 2;
          }
          if(carte.sousFamille === "Les Z"){
            carte.atk += 1 * 2;
            carte.buffAtk +=1 * 2;
            carte.hp += 1 * 2;
            carte.buffHp +=1 * 2;
          }
        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.famille === "Les Hierels"){
            carte.atk += 1;
            carte.buffAtk +=1;
            carte.hp += 1;
            carte.buffHp +=1;
          }
          if(carte.sousFamille === "Les Z"){
            carte.atk += 1;
            carte.buffAtk +=1;
            carte.hp += 1;
            carte.buffHp +=1;
          }
        });
      }      
    },

  },
  {
    id: 125,
    nom: "Thomux",
    lvl: 4,
    hp: 4,
    baseHp: 4,
    atk: 5,
    atkDispo: false,
    img: "img/card18.png",
    imgMinia: "img/cardfight18.png",
    famille: "Les Hierels",
    sousFamille: "Les BBEW",
    texte: "<i>Pote la !</i> <br><br> Quand un Hierel meurt <br><br> donne <color=red>+2/+1</color> à un autre <br><br><i>Début de tour</i> <br><br> gagne <color=red>+1/+1</color>",
    upSelf: true,
    deathTrigger: (mortCarte, cartesBoard, self) => {
      // Ne rien faire si la carte morte n’est pas Croc-Noir ou si elle est Grûm lui-même
      if (mortCarte.famille !== "Les Hierels" || mortCarte.id === self.id) return;
    
      // Cherche les cibles valides (autres Croc-Noir vivants, excluant Grûm et la carte morte)
      const cibles = cartesBoard.filter(c =>
        c.famille === "Les Hierels" &&
        c.id !== self.id &&
        c.id !== mortCarte.id &&
        c.hp > 0
      );
    
      if (cibles.length === 0) return;
    
      // Choisir une cible aléatoire
      const cible = cibles[Math.floor(Math.random() * cibles.length)];
      if(self.estDoree){
        cible.atk += 2 * 2;
        cible.hp += 1 * 2;
        cible.buffAtk += 2 * 2;
        cible.buffHp += 1 * 2;
        cible.buffAtkGrum = (cible.buffAtkGrum || 0) + 2 * 2;
        cible.buffHpGrum = (cible.buffHpGrum || 0) + 1 * 2;
      }else{
        cible.atk += 2;
        cible.hp += 1;
        cible.buffAtk += 2;
        cible.buffHp += 1;
        cible.buffAtkGrum = (cible.buffAtkGrum || 0) + 2;
        cible.buffHpGrum = (cible.buffHpGrum || 0) + 1;
      }
      cible.grumBuffEffect = true; // Pour tracking ou affichage
    }
  },
  {
    id: 126,
    nom: "Patricia",
    lvl: 5,
    hp: 6,
    baseHp: 6,
    atk: 2,
    atkDispo: false,
    img: "img/card13.png",
    imgMinia: "img/cardfight13.png",
    famille: "Les Hierels",
    sousFamille: "Les L",
    texte: "<br><i>Gold additionnel</i> <br><br><br> Augmente votre maximum <br><br> d'or de <color=gold>1</color>",
    effetDeCouple: {
      partenaire: "Patrick",
      effet: (cartesBoard) => {
        cartesBoard.forEach(carte => {
            if (carte.famille === "Les Hierels") {
                carte.atk += 2;
                carte.buffAtk += 2;
                carte.hp += 2;
                carte.buffHp += 2;
            }
        });
      },
      aura: (cartesBoard, draggedCard) => {
        cartesBoard.forEach(carte => {
          if (carte.famille === "Les Hierels") {
            if(draggedCard.estDoree){
              if(carte.sousFamille === "Les L"){
                carte.atk += 4 * 2;
                carte.buffAtk += 4 * 2;
                carte.hp += 4 * 2;
                carte.buffHp += 4 * 2;
                carte.auraEffect = true;
              }else{
                carte.atk += 2 * 2;
                carte.buffAtk += 2 * 2;
                carte.hp += 2 * 2;
                carte.buffHp += 2 * 2;
                carte.auraEffect = true;
              }  
            }else{
              if(carte.sousFamille === "Les L"){
                carte.atk += 4;
                carte.buffAtk += 4;
                carte.hp += 4;
                carte.buffHp += 4;
                carte.auraEffect = true;
              }else{
                carte.atk += 2;
                carte.buffAtk += 2;
                carte.hp += 2;
                carte.buffHp += 2;
                carte.auraEffect = true;
              } 
            }
          } 
        });
      },
      auraSell: (cartesBoard, draggedCard) => {
        if(draggedCard.estDoree){
          cartesBoard.forEach(carte => {
            if (carte.auraEffect === true && carte.famille === "Les Hierels") {
              if(carte.sousFamille === "Les L"){
                carte.atk -= 4 * 2;
                carte.buffAtk -= 4 * 2;
                carte.hp -= 4 * 2;
                carte.buffHp -= 4 * 2;
              }else{
                carte.atk -= 2 * 2;
                carte.buffAtk -= 2 * 2;
                carte.hp -= 2 * 2;
                carte.buffHp -= 2 * 2;
              }
              if(carte.buffHp === 0 && carte.buffAtk === 0){
                carte.auraEffect = false
              }        
            }
          });
        }else{
          cartesBoard.forEach(carte => {
            if (carte.auraEffect === true && carte.famille === "Les Hierels") {
              if(carte.sousFamille === "Les L"){
                carte.atk -= 4;
                carte.buffAtk -= 4;
                carte.hp -= 4;
                carte.buffHp -= 4;
              }else{
                carte.atk -= 2;
                carte.buffAtk -= 2;
                carte.hp -= 2;
                carte.buffHp -= 2;
              }
              if(carte.buffHp === 0 && carte.buffAtk === 0){
                carte.auraEffect = false
              }        
            }
          });
        } 
      },
      auraUnique: (carte) => {
        if (carte.famille === "Les Hierels") {
          if(carte.sousFamille === "Les L"){
            carte.atk += 4;
            carte.buffAtk += 4;
            carte.hp += 4;
            carte.buffHp += 4;
          }else{
            carte.atk += 2;
            carte.buffAtk += 2;
            carte.hp += 2;
            carte.buffHp += 2;
          }
          carte.auraEffect = true;     
        }     
      },
    },
    
  },

]