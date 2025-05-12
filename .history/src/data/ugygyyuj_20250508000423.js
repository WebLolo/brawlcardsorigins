const carte = [
    {
        id: 1,
        nom: "Rok'gar Croc-des-Mers",
        lvl: 6,
        hp: 6,
        baseHp: 6,
        atk: 5,
        atkDispo: false,
        img: "img/card29.png",
        imgMinia: "img/cardfight29.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Aura: +3/+3 aux Croc-Noir. Aura Bivalente mer: +5 atk supp. Si Darka est présente: Rok'gar gagne +4/+4",
        aura: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.famille === "Croc-Noir") {
              carte.atk += 3;
              carte.buffAtk += 3;
              carte.hp += 3;
              carte.buffHp += 3;
              carte.auraEffect = true;
            }
            
          });
        },
        auraSell: (cartesBoard) => {
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
        bivalence: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            let karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
            let bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
            if (!carte.bivalenceSources) carte.bivalenceSources = [];
            if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin"){
              if(carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Rok’gar")){
                carte.atk += 5 + bonus;
                carte.buffAtk += 5 + bonus;
                carte.buffAtkBivalence += 5 + bonus;
                carte.bivalenceEffect = true;
                carte.bivalenceSources.push("Rok’gar");
              }
              if(!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Rok’gar")){
                carte.atk -= 5 + bonus;
                carte.buffAtk -= 5 + bonus;
                carte.buffAtkBivalence -= 5 + bonus;
                carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Rok’gar");
                if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                  carte.bivalenceEffect = false
                }
              }
            }
          })
        },
        bivalenceSell: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (!carte.bivalenceSources) return;
            const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
            const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        
            // Si la source est présente dans les effets appliqués
            if (carte.bivalenceSources.includes("Rok’gar")) {
        
              // Retrait des effets appliqués par cette source
              if (carte.bivalenceMarinEffect) {
                carte.atk -= 5 + bonus;
                carte.buffAtk -= 5 + bonus;
                carte.buffAtkBivalence -= 5 + bonus;
              }
        
              // Suppression de la source
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Rok’gar");
        
              // Si plus aucun buff actif, on désactive le flag global
              if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
                carte.bivalenceEffect = false;
              }
            }
          });
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
        img: "img/card30.png",
        imgMinia: "img/cardfight30.png",
        famille: "Croc-Noir",
        sousFamille : "Terrestre",
        texte: "Aura: +5 hp aux Croc-Noir. Aura Bivalente mer: +2 hp supp. Aura Bivalente terre: +4 atk supp.",
        aura: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.famille === "Croc-Noir") {
              carte.hp += 5;
              carte.buffHp += 5;
              carte.auraEffect = true;
            }
            
          });
        },
        auraSell: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.auraEffect === true && carte.famille === "Croc-Noir") {
              carte.hp -= 5;
              carte.buffHp -= 5;
              if(carte.buffHp === 0 && carte.buffAtk === 0){
                carte.auraEffect = false
              }        
            }
          });
        },
        auraUnique: (carte) => {
          if (carte.famille === "Croc-Noir") {
            carte.hp += 5;
            carte.buffHp += 5;
            carte.auraEffect = true; 
          }     
        },
        bivalence: (cartesBoard) => {
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
        },
        bivalenceSell: (cartesBoard) => {
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
        img: "img/card31.png",
        imgMinia: "img/cardfight31.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        piocherCarte: true,
        texte: "Cri: +4/+4 aux Croc-Noir présent sur le Board + invoque une carte Croc-Noir aléatoire.",
        criDeGuerre: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if(carte.famille === "Croc-Noir"){
              carte.atk += 4;
              carte.buffAtk +=4;
              carte.hp += 4;
              carte.buffHp +=4;
              carte._criDeGuerreAnim = true; // 👈 animation à déclencher
            }
          });
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
        img: "img/card32.png",
        imgMinia: "img/cardfight32.png",
        famille: "Croc-Noir",
        sousFamille : "Terrestre",
        texte: "Debut de combat: 4 dégats à tout le Board adverse. Aura bivalente mer: +4 atk aux Croc-Noir. Aura bivalente terre: +4 hp aux Croc-Noir.",
        aoeCible: (cartesBoardAdv) => {
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
        },
        bivalence: (cartesBoard) => {
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
        },
        bivalenceSell: (cartesBoard) => {
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
        img: "img/card33.png",
        imgMinia: "img/cardfight33.png",
        famille: "Croc-Noir",
        sousFamille : "Terrestre",
        texte: "Zog'Bar aussi inflige des dégats aux adv. adjacents. Aura Bivalente mer: +3 atk aux Croc-Noir. Aura Bivalente terre: +3 hp aux Croc-Noir.",
        degatsAdj: true,
        bivalence: (cartesBoard) => {
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
        },
        bivalenceSell: (cartesBoard) => {
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
        img: "img/card34.png",
        imgMinia: "img/cardfight34.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Aura Bivalente mer: les Croc-Noir ont +4/+2. Bivalence Terre: les Croc-Noir ont +2/+4. Si Rok'gar ets présent, Darka gagne +4/+2",
        effetDeCouple: {
          partenaire: "Rok'gar Croc-des-Mers",
          effetUnique: (carte) => {
            carte.atk += 4;
            carte.hp += 2;
            carte.buffAtk += 4;
            carte.buffHp += 2
          },
        },
        bivalence: (cartesBoard) => {
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
        },
        bivalenceSell: (cartesBoard) => {
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
        img: "img/card35.png",
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
        carteSpe: 30,
        piocherCarteSpe: true,
        bivalence: (cartesBoard) => {
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
        },
        bivalenceSell: (cartesBoard) => {
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
        },
      },
     
      {
        id: 9,
        nom: "Tor'Grag des Profondeurs",
        lvl: 7,
        hp: 4,
        baseHp: 4,
        atk: 6,
        atkDispo: false,
        img: "img/card37.png",
        imgMinia: "img/cardfight37.png",
        imgMiniaProvoc: "img/cardfight37-provoc.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Cri: Tor'Grag gagne +1/+1 pour chaque Croc-Noir présent sur le Board. Bivalence Mer: il gagne furie. Bivalence terre: il gagne provoc.",
        provocation: true,
        provocationUse: false,
        furie: true,
        furieUse: false,
        effetDeMass: (carte, board) => {
          const crocNoir = board.filter(c => c.famille === "Croc-Noir" && c.id !== carte.id);
          if (crocNoir.length > 0) {
            carte.atk += crocNoir.length;
            carte.hp += crocNoir.length; 
            carte.buffAtk += crocNoir.length;
            carte.buffHp += crocNoir.length;
          }     
        },
      },
      {
        id: 10,
        nom: "Urgak la Ravageuse",
        lvl: 5,
        hp: 5,
        baseHp: 5,
        atk: 4,
        atkDispo: false,
        img: "img/card38.png",
        imgMinia: "img/cardfight38.png",
        famille: "Croc-Noir",
        sousFamille : "Terrestre",
        texte: "Cri: +3/+3 aux Croc-Noir sur le Board. Bivalence mer: +3 atk supp. Bivalence terre: +3hp supp",
        criDeGuerre: (cartesBoard) => {
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
        },
    
      },
      {
        id: 11,
        nom: "Vrak'Nul le Hurleur des Cimes",
        lvl: 4,
        hp: 4,
        baseHp: 4,
        atk: 5,
        atkDispo: false,
        img: "img/card39.png",
        imgMinia: "img/cardfight39.png",
        famille: "Croc-Noir",
        sousFamille : "Terrestre",
        texte: "Aoe général: Inflige 2 dégats a TOUT le monde. Aura Bivalente mer: +4 atk aux Croc-Noir. Aura Bivalente terre: +4 hp aux Croc-Noir",
        degatsAdj: false,
        furie: true,
        furieUse: false,
        aoeCible: (cartesBoardAdv) => {
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
        },
        bivalence: (cartesBoard) => {
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
        },
        bivalenceSell: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (!carte.bivalenceSources) return;
            const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
            const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
            // Si la source est présente dans les effets appliqués
            if (carte.bivalenceSources.includes("Vrak'Nul")) {
        
              // Retrait des effets appliqués par cette source
              if (carte.bivalenceMarinEffect) {
                
                carte.atk -= 1 + bonus;
                carte.buffAtk -= 1 + bonus;
                carte.buffAtkBivalence -= 1 + bonus;
              }
        
              if (carte.bivalenceTerrestreEffect) {
                carte.hp -= 2 + bonus;
                carte.buffHp -= 2 + bonus;
                carte.buffHpBivalence -= 2 + bonus;
              }
        
              // Suppression de la source
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Vrak'Nul");
        
              // Si plus aucun buff actif, on désactive le flag global
              if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
                carte.bivalenceEffect = false;
              }
            }
          });
        },
      },
      {
        id: 12,
        nom: "Ka'Rasha la Lieuse d'Esprits",
        lvl: 4,
        hp: 6,
        baseHp: 6,
        atk: 3,
        atkDispo: false,
        img: "img/card40.png",
        imgMinia: "img/cardfight40.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Aura: les effets Bivalents sont doublés. Aura bivalente mer: +2/+1 aux Croc-Noir. Aura bivalente terre: +1/+2 aux Croc-Noir",
        bivalence: (cartesBoard) => {
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
        },
        bivalenceSell: (cartesBoard) => {
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
        },
      },
      {
        id: 13,
        nom: "Gor’Tul le Fendeur d’Écailles",
        lvl: 7,
        hp: 5,
        baseHp: 5,
        atk: 4,
        atkDispo: false,
        img: "img/card41.png",
        imgMinia: "img/cardfight41.png",
        imgProjectile: "img/projectile.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Début de combat: inflige 3 dégats à une cible aléatoire. Bivalence mer: 3 dégats supp. Bivalence terre: Gor’Tul à +3hp supp.",
        oneTicDebutCombat: (carteCible, carteSource) => {
          if(carteCible.bouclierUse){
            carteCible.hp -= 0;
            carteCible.degatsRecus = 0;
            carteCible.bouclierUse = false
          }else{
            if(carteSource.bivalenceMarinEffect){
              carteCible.hp -= 6;
            }else{
              carteCible.hp -= 3;
              carteSource.hp += 3;
            }
          }  
        },
      },
      {
        id: 14,
        nom: "Na'Kra des Cendres Brûlantes",
        lvl: 4,
        hp: 4,
        baseHp: 4,
        atk: 4,
        atkDispo: false,
        img: "img/card42.png",
        imgMinia: "img/cardfight42.png",
        famille: "Croc-Noir",
        sousFamille : "Terrestre",
        texte: "Début de combat: inflige 2 dégats à tous le Board adv. Aura bivalente terre: les Croc-Noir ont +2hp",
        aoeCible: (cartesBoardAdv) => {
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
        },
        bivalence: (cartesBoard) => {
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
        },
        bivalenceSell: (cartesBoard) => {
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
        },
      },
      {
        id: 15,
        nom: "Sha'Rok, la pisteuse furtive",
        lvl: 4,
        hp: 5,
        baseHp: 5,
        atk: 3,
        atkDispo: false,
        img: "img/card43.png",
        imgMinia: "img/cardfight43.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Cri: +2/+2 à un Croc-Noir aléatoire + Vous obtenez une carte Croc-Noir aléatoire de niveau inférieur à Sha'Rok",
        piocherCarteInf: true,
        criDeGuerreUnique: (carte) => {
    
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
    
        },
      },
      {
        id: 16,
        nom: "Trok'Ma, l'Écumeur Grinçant",
        lvl: 3,
        hp: 4,
        baseHp: 4,
        atk: 3,
        atkDispo: false,
        img: "img/card44.png",
        imgMinia: "img/cardfight44.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Cri: +2/+2 à un Croc-Noir aléatoire. Bivalence mer: +2 atk supp. Bivalence Terre: +2 hp supp.",
        criDeGuerreUnique: (carte) => {
    
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
    
        },
      },
      {
        id: 17,
        nom: "Muk'Zar la Ravineuse",
        lvl: 3,
        hp: 3,
        baseHp: 3,
        atk: 4,
        atkDispo: false,
        img: "img/card45.png",
        imgMinia: "img/cardfight45.png",
        famille: "Croc-Noir",
        sousFamille : "Terrestre",
        texte: "Cri: Muk'Zar gagne +1/+1 pour chaque Croc-Noir présent sur le Board. Bivalence Mer: +2 atk supp. Bivalence terre: +2 hp supp.",
        effetDeMass: (carte, board) => {
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
        },
      },
      {
        id: 18,
        nom: "Zug'Rok le Dresseur de Crabes",
        lvl: 4,
        hp: 5,
        baseHp: 5,
        atk: 2,
        atkDispo: false,
        img: "img/card46.png",
        imgMinia: "img/cardfight46.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Cri: Invoque 'Craby' 3/3 avec réincarnation. Si Bivalence mer: Craby gagne +2/+2",
        carteSpe: 31,
        piocherCarteSpe: true,
        bivalence: (cartesBoard) => {
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
        },
        bivalenceSell: (cartesBoard) => {
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
        },
      },
      {
        id: 19,
        nom: "Narka Brise-Roches",
        lvl: 7,
        hp: 5,
        baseHp: 5,
        atk: 3,
        atkDispo: false,
        img: "img/card47.png",
        imgMinia: "img/cardfight47.png",
        famille: "Croc-Noir",
        sousFamille : "Terrestre",
        texte: "Aura: Les Croc-Noir sur le Board gagne +1/+2. Bivalence mer: +2 atk supp. Bivalence Terre: +2 hp supp.",
        aura: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.famille === "Croc-Noir") {
              carte.atk += 1;
              carte.buffAtk += 1;
              carte.hp += 2;
              carte.buffHp += 2;
              carte.auraEffect = true;
            }
            
          });
        },
        auraSell: (cartesBoard) => {
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
        bivalence: (cartesBoard) => {
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
        },
        bivalenceSell: (cartesBoard) => {
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
        },
      },
      {
        id: 20,
        nom: "Ghar'Zûl l'Éclaireur Grondeur",
        lvl: 7,
        hp: 4,
        baseHp: 4,
        atk: 2,
        atkDispo: false,
        img: "img/card48.png",
        imgMinia: "img/cardfight48.png",
        imgProjectile: "img/projectile.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Debut de Combat: Inflige 2 dégats à une cible aléatoire puis gagne 1hp. Bivalence mer: 1 dégat supp. Bivalence terre: +1 hp supp.",
        oneTicDebutCombat: (carteCible, carteSource) => {
          if(carteCible.bouclierUse){
            carteCible.hp -= 0;
            carteCible.degatsRecus = 0;
            carteCible.bouclierUse = false
          }else{
            if(carteSource.bivalenceMarinEffect){
              carteCible.hp -= 3;
              carteCible.degatsRecus = 3;
              carteSource.hp += 1;
            }else{
              carteCible.hp -= 2;
              carteCible.degatsRecus = 2;
              carteSource.hp += 2;
              carteSource.buffHp += 2;
            }
          }  
        },
      },
      {
        id: 21,
        nom: "Krug le Moussaillon",
        lvl: 2,
        hp: 3,
        baseHp: 3,
        atk: 2,
        atkDispo: false,
        img: "img/card49.png",
        imgMinia: "img/cardfight49.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Cri: +2 atk à un Croc-Noir aléatoire. Bivalence mer: +1 atk supp. Bivalence Terre: +1 hp supp.",
        criDeGuerreUnique: (carte) => {
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
        },
      },
      {
        id: 22,
        nom: "Drozha l'essoreuse d'os",
        lvl: 2,
        hp: 2,
        baseHp: 2,
        atk: 3,
        atkDispo: false,
        img: "img/card50.png",
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
      },
      {
        id: 23,
        nom: "Zûn'Tul, le Mange-Racines",
        lvl: 2,
        hp: 5,
        baseHp: 5,
        atk: 1,
        atkDispo: false,
        img: "img/card51.png",
        imgMinia: "img/cardfight51.png",
        imgMiniaProvoc: "img/cardfight51-provoc.png",
        famille: "Croc-Noir",
        sousFamille : "Terrestre",
        texte: "Aura: +1 hp aux Croc-Noir du Board. Bivalence mer: il gagne furie. Bivalence Terre: il gagne Provocation",
        provocation: true,
        provocationUse: false,
        furie: true,
        furieUse: false,
        aura: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.famille === "Croc-Noir") {
              carte.hp += 1;
              carte.buffHp += 1;
              carte.auraEffect = true;
            }
          });
        },
        auraSell: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.auraEffect === true && carte.famille === "Croc-Noir") {
              carte.hp -= 1;
              carte.buffHp -= 1;
              if(carte.buffHp === 0 && carte.buffHp === 0){
                carte.auraEffect = false
              }        
            }
          });
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
        id: 24,
        nom: "Pok'Nar le Poissonneux",
        lvl: 7,
        hp: 3,
        baseHp: 3,
        atk: 1,
        atkDispo: false,
        img: "img/card52.png",
        imgMinia: "img/cardfight52.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Cri: Invoque 'Le Gluant' 2/2 avec réincarnation. Aura Bivalente mer: Le gluant gagne +1/+1",
        carteSpe: 32,
        piocherCarteSpe: true,
        bivalence: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (!carte.bivalenceSources) carte.bivalenceSources = [];
            const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
            const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        
            if (carte.famille === "Croc-Noir" && carte.sousFamille === "Marin" && carte.nom === "Le gluant") {
              if (carte.bivalenceMarinEffect && !carte.bivalenceSources.includes("Pok'Nar")) {
                carte.atk += 1 + bonus;
                carte.buffAtk += 1 + bonus;
                carte.buffAtkBivalence += 1 + bonus;
                carte.hp += 1 + bonus;
                carte.buffHp += 1 + bonus;
                carte.buffHpBivalence += 1 + bonus;
                carte.bivalenceEffect = true;
                carte.bivalenceSources.push("Pok'Nar");
              }
              if (!carte.bivalenceMarinEffect && carte.bivalenceSources.includes("Pok'Nar")) {
                carte.atk -= 1 + bonus;
                carte.buffAtk += 1 + bonus;
                carte.buffAtkBivalence -= 1 + bonus;
                carte.hp -= 1 + bonus;
                carte.buffHp -= 1 + bonus;
                carte.buffHpBivalence -= 1 + bonus;
                carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Pok'Nar");
                if(carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0){
                  carte.bivalenceEffect = false;
                }
              }
            }
          });
        },
        bivalenceSell: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (!carte.bivalenceSources) return;
            const karasha = cartesBoard.find(c => c.nom === "Ka'Rasha la Lieuse d'Esprits");
            const bonus = karasha ? 1 : 0; // Ka'Rasha amplifie
        
            // Si la source est présente dans les effets appliqués
            if (carte.bivalenceSources.includes("Pok'Nar")) {
        
              // Retrait des effets appliqués par cette source
              if (carte.bivalenceMarinEffect && carte.nom === "Le gluant") {
                
                carte.atk -= 1 + bonus;
                carte.buffAtkBivalence -= 1 + bonus;
              }
        
              if (carte.bivalenceTerrestreEffect) {
                carte.hp -= 0;
                carte.buffHpBivalence -= 0;
              }
        
              // Suppression de la source
              carte.bivalenceSources = carte.bivalenceSources.filter(src => src !== "Pok'Nar");
        
              // Si plus aucun buff actif, on désactive le flag global
              if (carte.buffHpBivalence === 0 && carte.buffAtkBivalence === 0) {
                carte.bivalenceEffect = false;
              }
            }
          });
        },
      },
      {
        id: 25,
        nom: "Khash la Piquante",
        lvl: 7,
        hp: 3,
        baseHp: 3,
        atk: 3,
        atkDispo: false,
        img: "img/card53.png",
        imgMinia: "img/cardfight53.png",
        imgProjectile: "img/projectile.png",
        famille: "Croc-Noir",
        sousFamille : "Terrestre",
        texte: "Debut de combat: inflige 1 dégat à une cible aléatoire. Bivalence Terre : inflige 1 dégat supplémentaire",
        oneTicDebutCombat: (carteCible, carteSource) => {
          if(carteCible.bouclierUse){
            carteCible.hp -= 0;
            carteCible.degatsRecus = 0;
            carteCible.bouclierUse = false
          }else{
            if(carteSource.bivalenceTerrestreEffect){
              carteCible.hp -= 2;
              carteCible.degatsRecus = 2;
            }else{
              carteCible.hp -= 1;
              carteCible.degatsRecus = 1;
            }
          }  
        },
      },
      {
        id: 26,
        nom: "Grik le Fangeux",
        lvl: 1,
        hp: 2,
        baseHp: 2,
        atk: 2,
        atkDispo: false,
        img: "img/card54.png",
        imgMinia: "img/cardfight54.png",
        famille: "Croc-Noir",
        sousFamille : "Terrestre",
        texte: "Si un Croc-Noir est présent sur le Board, Grik gagne +1 atk",
        effetDeMass: (carte, board) => {
          const crocNoir = board.filter(c => c.famille === "Croc-Noir" && c.id !== carte.id);
          if (crocNoir.length > 0) {
            carte.atk += 1; 
            carte.buffAtk +=1;
          }     
        },
      },
      {
        id: 27,
        nom: "Krosh l’Écailleuse",
        lvl: 1,
        hp: 3,
        baseHp: 3,
        atk: 1,
        atkDispo: false,
        img: "img/card55.png",
        imgMinia: "img/cardfight55.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Cri: +1 atk à un allié Croc-Noir aléatoire",
        criDeGuerreUnique: (carte) => {
          if(carte.famille === "Croc-Noir"){
            carte.atk += 1;
            carte.buffAtk +=1;
          }  
        },
      },
      {
        id: 28,
        nom: "Ur'Thok le Rampe-Sable",
        lvl: 1,
        hp: 1,
        baseHp: 1,
        atk: 3,
        atkDispo: false,
        img: "img/card56.png",
        imgMinia: "img/cardfight56.png",
        imgProjectile: "img/projectile.png",
        famille: "Croc-Noir",
        sousFamille : "Terrestre",
        texte: "Debut de combat: inflige 1 dégat à une cible aléatoire",
        oneTicDebutCombat: (carteCible, carteSource) => {
          if(carteCible.bouclierUse){
            carteCible.hp -= 0;
            carteCible.degatsRecus = 0;
            carteCible.bouclierUse = false
          }else{
            carteCible.hp -= 1; 
            carteCible.degatsRecus = 1;
          }
        },
      },
      {
        id: 29,
        nom: "Drush la Poissonneuse",
        lvl: 2,
        hp: 2,
        baseHp: 2,
        atk: 1,
        atkDispo: false,
        img: "img/card57.png",
        imgMinia: "img/cardfight57.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Cri: Invoque un Poisson Gris 1/1 avec réincarnation",
        carteSpe: 33,
        piocherCarteSpe: true,
      },
      {
        id: 30,
        nom: "Bag'Kûl le Grogneur",
        lvl: 7,
        hp: 3,
        baseHp: 3,
        atk: 1,
        atkDispo: false,
        img: "img/card58.png",
        imgMinia: "img/cardfight58.png",
        famille: "Croc-Noir",
        sousFamille : "Terrestre",
        texte: "GRUUAAAHHH ! Rien ne ce passe...",
      },
      {
        id: 31,
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
        id: 32,
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
        id: 33,
        nom: "Le gluant",
        lvl: 7,
        hp: 2,
        baseHp: 2,
        atk: 2,
        atkDispo: false,
        img: "img/card61.png",
        imgMinia: "img/cardfight61.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Reincarnation: revient 1x à la vie avec 1 hp",
        reincarnation: true,
      },
      {
        id: 34,
        nom: "Poisson gris",
        lvl: 7,
        hp: 1,
        baseHp: 1,
        atk: 1,
        atkDispo: false,
        img: "img/card62.png",
        imgMinia: "img/cardfight62.png",
        famille: "Croc-Noir",
        sousFamille : "Marin",
        texte: "Reincarnation: revient 1x à la vie avec 1 hp",
        reincarnation: true,
      },
]