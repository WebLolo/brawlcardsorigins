const carte = [
    {
        id: 35,
        nom: "Myrrh Reine des Voiles",
        lvl: 6,
        hp: 7,
        baseHp: 7,
        atk: 5,
        atkDispo: false,
        img: "img/card63.png",
        imgMinia: "img/cardfight63.png",
        imgMiniaProvoc: "img/cardfight63-provoc.png",
        imgMiniaBouclier: "img/cardfight63-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Cri: Donne Voile de lune à TOUT les Sylphariels. Aura: +4 hp aux Sylphariels possédant Voile de lune",
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
        aura: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.famille === "Les Sylphariels" && carte.bouclierUse) {
              carte.hp += 4;
              carte.buffHp += 4;
              carte.auraEffect = true;
            }
          });
        },
        auraSell: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.auraEffect === true && carte.bouclierUse && carte.famille === "Les Sylphariels") {
              carte.hp -= 4;
              carte.buffHp -= 4;
              if(carte.buffHp === 0 && carte.buffHp === 0){
                carte.auraEffect = false
              }        
            }
          });
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
        id: 36,
        nom: "Nythéa la Sorcière des Brumes",
        lvl: 6,
        hp: 4,
        baseHp: 4,
        atk: 6,
        atkDispo: false,
        img: "img/card64.png",
        imgMinia: "img/cardfight64.png",
        imgMiniaProvoc: "img/cardfight64-provoc.png",
        imgMiniaBouclier: "img/cardfight64-bouclier.png",
        imgProjectile: "img/projectile3.png",
        famille: "Les Sylphariels",
        sousFamille : "Dark",
        bouclier: true,
        bouclierUse: true,
        texte: "Début de combat: Controle une carte adv aléatoire. Elle attaque 1 fois un allié adjacent. Donne +4 atk à chaque début de tour",
        oneTicDebutCombat: (carteCible, carteSource) => {
          carteCible.control = true;
        },
        criDeGuerreUniqueSelf: (carte, board) => {
          carte.bouclierUse = true  
        },
        aoeCibleApresCombat: (cartesBoard) => {
          cartesBoard.forEach(carte => {
              carte.atk += 4;
              carte.buffAtk +=4;
              carte.animAoE = true; 
          });
        },
        
      },
      {
        id: 37,
        nom: "Arwyn des Mille Reflets",
        lvl: 6,
        hp: 3,
        baseHp: 3,
        atk: 3,
        atkDispo: false,
        img: "img/card65.png",
        imgMinia: "img/cardfight65.png",
        imgMiniaProvoc: "img/cardfight65-provoc.png",
        imgMiniaBouclier: "img/cardfight65-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Début de tour: Les Sylphariels présents sur le Board gagnent +4 hp",
        aoeCibleApresCombat: (cartesBoard) => {
          cartesBoard.forEach(carte => {
              carte.hp += 4;
              carte.buffHp += 4;
              carte.animAoE = true; 
          });
        },
      },
      {
        id: 38,
        nom: "Tahl'Rin le Jugement Serein",
        lvl: 6,
        hp: 4,
        baseHp: 4,
        atk: 6,
        atkDispo: false,
        img: "img/card66.png",
        imgMinia: "img/cardfight66.png",
        imgMiniaProvoc: "img/cardfight66-provoc.png",
        imgMiniaBouclier: "img/cardfight66-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Cri et Evanescence mort: +4 atk aux Sylphariels présents sur le Board. Inflige aussi des dégats aux adversaires adjacents",
        degatsAdj: true,
        criDeGuerre: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if(carte.famille === "Les Sylphariels"){
              carte.atk += 4
              carte.buffAtk +=4;
            }
          });
        },
        criDeGuerreUniqueSelf: (carte, board) => {
          if(board.length === 0){
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
        
          cibles.forEach(cible => {
            // Appliquer les buffs
            cible.atk += 4;
            cible.buffAtk += 4;
            cible.buffatkTahlRin = (cible.buffatkTahlRin || 0) + 4;
    
            cible.tahlRinBuffEffect = true; // Pour tracking ou affichage
    
          })
        
    
        },
      },
      {
        id: 39,
        nom: "Lúmena La Dernière Lueur",
        lvl: 6,
        hp: 6,
        baseHp: 6,
        atk: 4,
        atkDispo: false,
        img: "img/card67.png",
        imgMinia: "img/cardfight67.png",
        imgMiniaProvoc: "img/cardfight67-provoc.png",
        imgMiniaBouclier: "img/cardfight67-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Cri et Evanescence vente : +5 hp aux Sylphariels ayant Voile de lune",
        criDeGuerre: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
              carte.hp += 5
              carte.buffHp += 5;
            }
          });
        },
        evanescence: (board) => {
          board.forEach(carte => {
            if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
              carte.atk += 5;
              carte.buffAtk +=5;
            }
          });
          const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
          if(vessalyn.length > 0){
            board.forEach(carte => {
              if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
                carte.atk += 5;
                carte.buffAtk +=5;
              }
            });
          }
        },
      },
      {
        id: 40,
        nom: "Elyssia le Miroir de l'Éclat",
        lvl: 5,
        hp: 6,
        baseHp: 6,
        atk: 4,
        atkDispo: false,
        img: "img/card68.png",
        imgMinia: "img/cardfight68.png",
        imgMiniaProvoc: "img/cardfight68-provoc.png",
        imgMiniaBouclier: "img/cardfight68-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Cri et Evanescence vente : +2/+4 aux Sylphariels ayant Voile de lune",
        criDeGuerre: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if(carte.famille === "Les Sylphariels" && carte.bouclierUse){
              carte.atk += 2;
              carte.buffAtk +=2;
              carte.hp += 4;
              carte.buffHp += 4;
            }
          });
        },
        evanescence: (board) => {
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
        },
      },
      {
        id: 41,
        nom: "Thalya des Courants Instables",
        lvl: 7,
        hp: 5,
        baseHp: 5,
        atk: 3,
        atkDispo: false,
        img: "img/card69.png",
        imgMinia: "img/cardfight69.png",
        imgMiniaProvoc: "img/cardfight69-provoc.png",
        imgMiniaBouclier: "img/cardfight69-bouclier.png",
        imgProjectile: "img/projectile2.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Debut de combat: echange l'atk et les pv d'une carte adv aléatoire. Evanescence mort : +4 hp à la Sylphe ayant le moins de pv",
        oneTicDebutCombat: (carteCible, carteSource) => {
          if(carteCible.bouclierUse){
            carteCible.hp -= 0;
            carteCible.degatsRecus = 0;
            carteCible.bouclierUse = false
          }else{
            const hp = carteCible.hp
            const atk = carteCible.atk
            carteCible.hp = atk; 
            carteCible.buffHp = atk; 
            carteCible.atk = hp;
            carteCible.buffAtk = hp;
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
        
          // Choisir une cible aléatoire
          const cible = cibles[0];
        
          // Appliquer les buffs selon la bivalence
          cible.hp += 4;
          cible.buffHp += 4;
          cible.buffHpThalya = (cible.buffHpThalya || 0) + 4;
    
          cible.thalyaBuffEffect = true; // Pour tracking ou affichage
        },
      },
      {
        id: 42,
        nom: "Virelys Porteuse de Lueurs",
        lvl: 3,
        hp: 4,
        baseHp: 4,
        atk: 4,
        atkDispo: false,
        img: "img/card70.png",
        imgMinia: "img/cardfight70.png",
        imgMiniaProvoc: "img/cardfight70-provoc.png",
        imgMiniaBouclier: "img/cardfight70-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "cri et Evanescence vente : vous obtenez une Lueur déferlante 6/8 avec Voile de lune et Provocation",
        carteSpe: 65,
        piocherCarteSpeApresVente: true,
        piocherCarteSpe: true,
        
      },
      {
        id: 43,
        nom: "Sillènne, l'Épine de Brume",
        lvl: 5,
        hp: 3,
        baseHp: 3,
        atk: 6,
        atkDispo: false,
        img: "img/card71.png",
        imgMinia: "img/cardfight71.png",
        imgMiniaProvoc: "img/cardfight71-provoc.png",
        imgMiniaBouclier: "img/cardfight71-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Dark",
        texte: "Debut de combat: 4 dégats au Board adv. Vengeance: 4 dégats à son boureau. Evanescence mort: +2 atk au sylphe ayant le moins de pv",
        aoeCible: (cartesBoardAdv) => {
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
        },
        oneTicPendantCombat: (carteCible, carteSource) => {
          if(carteCible.bouclierUse){
            carteCible.hp -= 0;
            carteCible.degatsRecus = 0;
            carteCible.bouclierUse = false
          }else{
            carteCible.hp -= 4; 
            carteCible.degatsRecus = 4;
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
        
          cibles.forEach(cible => {
            // Appliquer les buffs
            cible.atk += 2;
            cible.buffAtk += 2;
            cible.buffAtkSillenne = (cible.buffHpSillenne || 0) + 2;
    
            cible.sillenneBuffEffect = true; // Pour tracking ou affichage
    
          })
        },
      },
      {
        id: 44,
        nom: "Méllua la Feuille Dansante",
        lvl: 5,
        hp: 7,
        baseHp: 7,
        atk: 3,
        atkDispo: false,
        img: "img/card72.png",
        imgMinia: "img/cardfight72.png",
        imgMiniaProvoc: "img/cardfight72-provoc.png",
        imgMiniaBouclier: "img/cardfight72-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Debut de tour: les Sylphariels ont +2 hp. Aura: +4 hp pour les Sylphariels tant que Méllua est présente sur le Board",
        aura: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.famille === "Les Sylphariels") {
              carte.hp += 4;
              carte.buffHp += 4;
              carte.auraEffect = true;
            }
          });
        },
        auraSell: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.auraEffect === true && carte.famille === "Les Sylphariels") {
              carte.hp -= 4;
              carte.buffHp -= 4;
              if(carte.buffHp === 0 && carte.buffHp === 0){
                carte.auraEffect = false
              }        
            }
          });
        },
        auraUnique: (carte) => {
          if (carte.famille === "Les Sylphariels") {
            carte.hp += 4;
            carte.buffHp += 4;
            carte.auraEffect = true; 
          }     
        },
        aoeCibleApresCombat: (cartesBoard) => {
          cartesBoard.forEach(carte => {
              carte.hp += 2;
              carte.buffHp += 2;
              carte.animAoE = true; 
          });
        },
      },
      {
        id: 45,
        nom: "Syra des Feuilles Troublées",
        lvl: 4,
        hp: 5,
        baseHp: 5,
        atk: 4,
        atkDispo: false,
        img: "img/card73.png",
        imgMinia: "img/cardfight73.png",
        imgMiniaProvoc: "img/cardfight73-provoc.png",
        imgMiniaBouclier: "img/cardfight73-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Cri et Evanescence (vente et mort) : Les Sylphariels du Board ont +1/+3",
        criDeGuerre: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if(carte.famille === "Les Sylphariels"){
              carte.atk += 1;
              carte.buffAtk +=1;
              carte.hp += 3;
              carte.buffHp += 3;
            }
    
          });
        },
        evanescence: (board) => {
          board.forEach(carte => {
            if(carte.famille === "Les Sylphariels"){
              carte.atk += 1;
              carte.buffAtk +=1;
              carte.hp += 3;
              carte.buffHp += 3;
            }
          });
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
        },
      },
      {
        id: 46,
        nom: "Nym'Leth la Tisseuse d'Échos",
        lvl: 4,
        hp: 4,
        baseHp: 4,
        atk: 3,
        atkDispo: false,
        img: "img/card74.png",
        imgMinia: "img/cardfight74.png",
        imgMiniaProvoc: "img/cardfight74-provoc.png",
        imgMiniaBouclier: "img/cardfight74-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Evanescence (vente) : Obtient une carte Sylphariels aléatoire",
        piocherCarteApresVente: true,
      },
      {
        id: 47,
        nom: "Ivrana, l'Onde Retenue",
        lvl: 7,
        hp: 3,
        baseHp: 3,
        atk: 2,
        atkDispo: false,
        img: "img/card75.png",
        imgMinia: "img/cardfight75.png",
        imgMiniaProvoc: "img/cardfight75-provoc.png",
        imgMiniaBouclier: "img/cardfight75-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Evanescence (vente) et aura : +2 hp à toutes les Sylphariels du Board",
        evanescence: (board) => {
          board.forEach(carte => {
            if(carte.famille === "Les Sylphariels"){
              carte.hp += 2;
              carte.buffHp += 2;
            }
          });
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
        aura: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.famille === "Les Sylphariels") {
              carte.hp += 2;
              carte.buffHp += 2;
              carte.auraEffect = true;
            }
          });
        },
        auraSell: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.auraEffect === true && carte.famille === "Les Sylphariels") {
              carte.hp -= 2;
              carte.buffHp -= 2;
              if(carte.buffHp === 0 && carte.buffHp === 0){
                carte.auraEffect = false
              }        
            }
          });
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
        id: 48,
        nom: "Liraël la Douteuse",
        lvl: 4,
        hp: 2,
        baseHp: 2,
        atk: 5,
        atkDispo: false,
        img: "img/card76.png",
        imgMinia: "img/cardfight76.png",
        imgMiniaProvoc: "img/cardfight76-provoc.png",
        imgMiniaBouclier: "img/cardfight76-bouclier.png",
        imgProjectile: "img/projectile1.png",
        famille: "Les Sylphariels",
        sousFamille : "Dark",
        texte: "Cri: +4 atk pour toutes les fées du Board. Debut de combat: 2 dégats à une cible aléatoire. Vengeance: inflige 2 dégats à son boureau",
        criDeGuerre: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if(carte.famille === "Les Sylphariels"){
              carte.atk += 4;
              carte.buffAtk +=4;
            }
    
          });
        },
        oneTicDebutCombat: (carteCible, carteSource) => {
          if(carteCible.bouclierUse){
            carteCible.hp -= 0;
            carteCible.degatsRecus = 0;
            carteCible.bouclierUse = false
          }else{
            carteCible.hp -= 2; 
            carteCible.degatsRecus = 2;
          }
        },
        oneTicPendantCombat: (carteCible, carteSource) => {
          if(carteCible.bouclierUse){
            carteCible.hp -= 0;
            carteCible.degatsRecus = 0;
            carteCible.bouclierUse = false
          }else{
            carteCible.hp -= 2; 
            carteCible.degatsRecus = 2;
          }
        },
      },
      {
        id: 49,
        nom: "Vessalyn, Chuchoteuse d''Ailes",
        lvl: 4,
        hp: 5,
        baseHp: 5,
        atk: 3,
        atkDispo: false,
        img: "img/card77.png",
        imgMinia: "img/cardfight77.png",
        imgMiniaProvoc: "img/cardfight77-provoc.png",
        imgMiniaBouclier: "img/cardfight77-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Tant que Vessalyn est sur le Board, les effets d'Evanescence sont doublé",
      },
      {
        id: 50,
        nom: "Naëlia des Brumes Tournoyantes",
        lvl: 4,
        hp: 4,
        baseHp: 4,
        atk: 3,
        atkDispo: false,
        img: "img/card78.png",
        imgMinia: "img/cardfight78.png",
        imgMiniaProvoc: "img/cardfight78-provoc.png",
        imgMiniaBouclier: "img/cardfight78-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "cri et evanescence (mort): pose voile de lune sur une fée aléatoire. aura: les fées avec voile de lune ont +1/+1.",
        criDeGuerreUniqueBouclier: (cible) => {
    
          cible.bouclier = true;
          cible.bouclierUse = true;
          cible.atk += 1;
          cible.buffAtk += 1;
          cible.hp += 1;
          cible.buffHp += 1;
    
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
          cible.bouclier = true;
          cible.bouclierUse = true;
        },
        aura: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.bouclierUse) {
              carte.atk += 1;
              carte.buffAtk += 1;
              carte.hp += 1;
              carte.buffHp += 1;
              carte.auraNaeliaEffect = true;
            }
          });
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
        auraSell: (cartesBoard) => {
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
        },
      },
      {
        id: 51,
        nom: "Elwyn la Souffleuse de brume",
        lvl: 3,
        hp: 2,
        baseHp: 2,
        atk: 5,
        atkDispo: false,
        img: "img/card79.png",
        imgMinia: "img/cardfight79.png",
        imgMiniaProvoc: "img/cardfight79-provoc.png",
        imgMiniaBouclier: "img/cardfight79-bouclier.png",
        imgMiniaProvocBouclier: "img/cardfight79-provoc-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Dark",
        texte: "Debut de tour: les fées sur le Board ont +1 atk. Evanescence: +2 atk à la fée ayant le moins d'atk (vente et mort)",
        aoeCibleApresCombat: (cartesBoard) => {
          cartesBoard.forEach(carte => {
              carte.atk += 1;
              carte.buffAtk += 1;
              carte.animAoE = true; 
          });
        },
        evanescence: (board, card) => {      
          if(board.length > 1 ){
            const copies = board.filter(c => c.id !== card.id).filter(c => c.famille === "Les Sylphariels").sort((a, b) => a.atk - b.atk)
            let cible = copies[0]
            if(cible.famille === "Les Sylphariels"){
              cible.atk += 2;
              cible.buffAtk += 1;
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
        
          // Choisir une cible aléatoire
          const cible = cibles[0];
        
          // Appliquer les buffs selon la bivalence
          cible.atk += 2;
          cible.buffAtk += 2;
          cible.buffAtkElwyn = (cible.buffAtkElwyn || 0) + 2;
    
          cible.elwynBuffEffect = true; // Pour tracking ou affichage
        },
      },
      {
        id: 52,
        nom: "Vyntha Voix de la Canopée",
        lvl: 7,
        hp: 3,
        baseHp: 3,
        atk: 3,
        atkDispo: false,
        img: "img/card80.png",
        imgMinia: "img/cardfight80.png",
        imgMiniaProvoc: "img/cardfight80-provoc.png",
        imgMiniaBouclier: "img/cardfight80-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Cri: obtient une Lueur dansante 0/2. Aura: +2/+2 pour l'invocation",
        carteSpe: 64,
        piocherCarteSpe: true,
        aura: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.nom === "Lueur dansante") {
              carte.atk += 2;
              carte.buffAtk += 2;
              carte.hp += 2;
              carte.buffHp += 2;
              carte.auraVynthaEffect = true;
            }
          });
        },
        auraUnique: (carte) => {
          if (carte.nom === "Lueur dansante") {
            carte.atk += 2;
            carte.buffAtk += 2;
            carte.hp += 2;
            carte.buffHp += 2;
            carte.auraVynthaEffect = true; 
          }     
        },
        auraSell: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if (carte.auraVynthaEffect === true && carte.famille === "Les Sylphariels") {
              carte.atk -= 2;
              carte.buffAtk -= 2;
              carte.hp -= 2;
              carte.buffHp -= 2;
              if(carte.buffHp === 0 && carte.buffHp === 0){
                carte.auraVynthaEffect = false
              }        
            }
          });
        },
      },
      {
        id: 53,
        nom: "Nyssa l'Épine de Rosée",
        lvl: 3,
        hp: 2,
        baseHp: 2,
        atk: 4,
        atkDispo: false,
        img: "img/card81.png",
        imgMinia: "img/cardfight81.png",
        imgMiniaProvoc: "img/cardfight81-provoc.png",
        imgMiniaBouclier: "img/cardfight81-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Dark",
        texte: "Debut de combat: 1 dégat au Board adv. Evanescence: +2 atk à toutes les fées (vente et mort)",
        oneTicCible:  true,
        aoeCible: (cartesBoardAdv) => {
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
        },
        evanescence: (board) => {
          board.forEach(carte => {
            if(carte.famille === "Les Sylphariels"){
              carte.atk += 2;
              carte.buffAtk += 2;
            }
          });
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
        
          // Appliquer les buffs selon la bivalence
          cible.atk += 2;
          cible.buffAtk += 1;
          cible.buffAtkNyssa = (cible.buffAtkNyssa || 0) + 2;
    
          cible.nyssaBuffEffect = true; // Pour tracking ou affichage
        }
      },
      {
        id: 54,
        nom: "Sylène la Faiblissante",
        lvl: 3,
        hp: 4,
        baseHp: 4,
        atk: 2,
        atkDispo: false,
        img: "img/card82.png",
        imgMinia: "img/cardfight82.png",
        imgMiniaProvoc: "img/cardfight82-provoc.png",
        imgMiniaBouclier: "img/cardfight82-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Dark",
        texte: "Debut de combat: réduit de 1 l'atk du board adv. Evanescence: +1atk aux fées (vente/mort)",
        aoeCible: (cartesBoardAdv) => {
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
        },
        evanescence: (board) => {
          board.forEach(carte => {
            if(carte.famille === "Les Sylphariels"){
              carte.atk += 1;
              carte.buffAtk += 1;
            }
          });
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
          
          cibles.forEach(carte => {
            carte.atk += 1
            carte.buffAtk += 1;
            carte.buffAtkSylene = (carte.buffAtkSylene || 0) + 1;
            carte.syleneBuffEffect = true; // Pour tracking ou affichage
          })
        }
      },
      {
        id: 55,
        nom: "Fylia l'Évanouie",
        lvl: 2,
        hp: 3,
        baseHp: 3,
        atk: 2,
        atkDispo: false,
        img: "img/card83.png",
        imgMinia: "img/cardfight83.png",
        imgMiniaProvoc: "img/cardfight83-provoc.png",
        imgMiniaBouclier: "img/cardfight83-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Dark",
        texte: "Evanescence: confère +2atk à une fée aléatoire (vente/mort)",
        evanescence: (board, card) => {      
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
          cible.atk += 2;
          cible.buffAtk += 2;
          cible.buffAtkFylia = (cible.buffAtkFylia || 0) + 2;
          cible.fyliaBuffEffect = true; // Pour tracking ou affichage
        },
      },
      {
        id: 56,
        nom: "Silyne des Lueurs Tardives",
        lvl: 7,
        hp: 4,
        baseHp: 4,
        atk: 1,
        atkDispo: false,
        img: "img/card84.png",
        imgMinia: "img/cardfight84.png",
        imgMiniaProvoc: "img/cardfight84-provoc.png",
        imgMiniaBouclier: "img/cardfight84-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Cri: +1hp aux fées sur le Board. Evanescence: +1hp à 1 fée (vente/mort)",
        criDeGuerre: (cartesBoard) => {
          cartesBoard.forEach(carte => {
            if(carte.famille === "Les Sylphariels"){
              carte.hp += 1;
              carte.buffHp += 1;
            }
    
          });
        },
        evanescence: (board, card) => {      
          if(board.length > 1 ){
            const copies = board.filter(c => c.id !== card.id).filter(c => c.famille === "Les Sylphariels")
            if(copies.length > 0){
              let random = copies[Math.floor(Math.random() * copies.length)]
              if(random.famille === "Les Sylphariels"){
                random.hp += 1;
                random.buffHp += 1;
              }
              const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
              const copies1 = copies.filter(c => c.nom !== random.nom)
              if(copies1.length > 0){
                let random1 = copies[Math.floor(Math.random() * copies.length)]
                if(vessalyn.length > 0){
                  random1.hp += 1;
                  random1.buffHp += 1;
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
          const cible = cibles[Math.floor(Math.random() * cibles.length)];
          cible.hp += 1;
          cible.buffHp += 1;
          cible.buffHpSilyne = (cible.buffHpSilyne || 0) + 1;
          cible.silyneBuffEffect = true; // Pour tracking ou affichage
        },
    
      },
      {
        id: 57,
        nom: "Veya l'Inaperçue",
        lvl: 1,
        hp: 2,
        baseHp: 2,
        atk: 3,
        atkDispo: false,
        img: "img/card85.png",
        imgMinia: "img/cardfight85.png",
        imgMiniaProvoc: "img/cardfight85-provoc.png",
        imgMiniaBouclier: "img/cardfight85-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Si Veya est posée sur un Board vide, gagne +2 atk. Ce vend 1po supp.",
        gainOr: 1,
        criDeGuerreUniqueSelf: (carte, board) => {
          if(board.length === 0){
            carte.atk += 2;
            carte.buffAtk +=2;
          }   
        },
        
      },
      {
        id: 58,
        nom: "Linn d'Écorce Douce",
        lvl: 2,
        hp: 5,
        baseHp: 5,
        atk: 1,
        atkDispo: false,
        img: "img/card86.png",
        imgMinia: "img/cardfight86.png",
        imgMiniaProvoc: "img/cardfight86-provoc.png",
        imgMiniaBouclier: "img/cardfight86-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Evanescence : confère Voile de lune à une fée aléatoire (vente et mort)",
        evanescence: (board, card) => {      
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
          cible.bouclier = true;
          cible.bouclierUse = true;
        },
      },
      {
        id: 59,
        nom: "Elra la Clignotante",
        lvl: 2,
        hp: 2,
        baseHp: 2,
        atk: 2,
        atkDispo: false,
        img: "img/card87.png",
        imgMinia: "img/cardfight87.png",
        imgMiniaProvoc: "img/cardfight87-provoc.png",
        imgMiniaBouclier: "img/cardfight87-bouclier.png",
        imgProjectile: "img/projectile2.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Debut de combat : 1 dégat aléatoire. Evanescence : 1 atk fée dark ou 1 hp fée light",
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
        
          // Appliquer les buffs selon la bivalence
          if (cible.sousFamille === "Dark") {
            cible.atk += 1;
            cible.buffAtk += 1;
            cible.buffAtkElra = (cible.buffAtkElra || 0) + 1;
          } else if (cible.sousFamille === "Light") {
            cible.hp += 1;
            cible.buffHp += 1;
            cible.buffHpElra = (cible.buffHpElra || 0) + 1;
          }
        
          cible.elraBuffEffect = true; // Pour tracking ou affichage
        },
        
      },
      {
        id: 60,
        nom: "Fypi la Perdue",
        lvl: 7,
        hp: 3,
        baseHp: 3,
        atk: 1,
        atkDispo: false,
        img: "img/card88.png",
        imgMinia: "img/cardfight88.png",
        imgMiniaProvoc: "img/cardfight88-provoc.png",
        imgMiniaBouclier: "img/cardfight88-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Evanescence : donne +1 hp à une fée aléatoire (vente et mort)",
        evanescence: (board, card) => {      
          if(board.length > 1 ){
            const copies = board.filter(c => c.id !== card.id).filter(c => c.famille === "Les Sylphariels")
            if(copies.length > 0){
              let random = copies[Math.floor(Math.random() * copies.length)]
              if(random.famille === "Les Sylphariels"){
                random.hp += 1;
                random.buffHp += 1;
              }
              const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
              const copies1 = copies.filter(c => c.nom !== random.nom)
              if(copies1.length > 0){
                let random1 = copies[Math.floor(Math.random() * copies.length)]
                if(vessalyn.length > 0){
                  random1.hp += 1
                  random1.buffHp += 1;
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
          const cible = cibles[Math.floor(Math.random() * cibles.length)];
          cible.hp += 1;
          cible.buffHp += 1;
          cible.buffHpFypi = (cible.buffHpFypi || 0) + 1;
          cible.fypiBuffEffect = true; // Pour tracking ou affichage
        },
      },
      {
        id: 61,
        nom: "Louli des Lanternes",
        lvl: 7,
        hp: 4,
        baseHp: 4,
        atk: 1,
        atkDispo: false,
        img: "img/card89.png",
        imgMinia: "img/cardfight89.png",
        imgMiniaProvoc: "img/cardfight89-provoc.png",
        imgMiniaBouclier: "img/cardfight89-bouclier.png",
        imgMiniaProvocBouclier: "img/cardfight89-provoc-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Evanescence : obtient une Lueur dansante 0/2 avec provocation (vente)",
        carteSpe: 64,
        piocherCarteSpeApresVente: true,
      },
      {
        id: 62,
        nom: "Fiffa la Trébuchante",
        lvl: 1,
        hp: 2,
        baseHp: 2,
        atk: 2,
        atkDispo: false,
        img: "img/card90.png",
        imgMinia: "img/cardfight90.png",
        imgMiniaProvoc: "img/cardfight90-provoc.png",
        imgMiniaBouclier: "img/cardfight90-bouclier.png",
        imgProjectile: "img/projectile2.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "Debut de combat : 1 chance sur 3 de faire 1 dégat à une cible aléatoire",
        oneTicDebutCombat: (carteCible, carteSource) => {
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
        },
      },
      {
        id: 63,
        nom: "Clélie l'Oubliée",
        lvl: 7,
        hp: 1,
        baseHp: 1,
        atk: 1,
        atkDispo: false,
        img: "img/card91.png",
        imgMinia: "img/cardfight91.png",
        imgMiniaProvoc: "img/cardfight91-provoc.png",
        imgMiniaBouclier: "img/cardfight91-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Dark",
        texte: "Evanescence : ce vend 1po supplémentaire",
        gainOr: 1,
      },
      {
        id: 64,
        nom: "Zilla la Grincheuse",
        lvl: 1,
        hp: 1,
        baseHp: 1,
        atk: 3,
        atkDispo: false,
        img: "img/card92.png",
        imgMinia: "img/cardfight92.png",
        imgMiniaProvoc: "img/cardfight92-provoc.png",
        imgMiniaBouclier: "img/cardfight92-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Dark",
        texte: "Evanescence : donne +1 atk à une fée aléatoire (vente et mort)",
        evanescence: (board, card) => {      
          if(board.length > 1 ){
            const copies = board.filter(c => c.id !== card.id).filter(c => c.famille === "Les Sylphariels") 
            if(copies.length > 0){
              let random = copies[Math.floor(Math.random() * copies.length)]
              if(random.famille === "Les Sylphariels"){
                random.atk += 1;
                random.buffAtk +=1;
              }
              const vessalyn = board.filter(c => c.nom === "Vessalyn, Chuchoteuse d''Ailes")
              const copies1 = copies.filter(c => c.nom !== random.nom)
              if(copies1.length > 0){
                let random1 = copies[Math.floor(Math.random() * copies.length)]
                if(vessalyn.length > 0){
                  random1.atk += 1;
                  random1.buffAtk +=1;
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
          const cible = cibles[Math.floor(Math.random() * cibles.length)];
          cible.atk += 1;
          cible.buffAtk +=1;
          cible.buffAtkZilla = (cible.buffAtkZilla || 0) + 1;
          cible.zillaBuffEffect = true; // Pour tracking ou affichage
        },
      },
      {
        id: 65,
        nom: "Lueur dansante",
        lvl: 7,
        hp: 2,
        baseHp: 2,
        atk: 0,
        atkDispo: false,
        img: "img/card93.png",
        imgMinia: "img/cardfight93.png",
        imgMiniaProvoc: "img/cardfight93-provoc.png",
        imgMiniaBouclier: "img/cardfight93-bouclier.png",
        imgMiniaProvocBouclier: "img/cardfight93-provoc-bouclier.png",
        famille: "Les Sylphariels",
        sousFamille : "Light",
        texte: "",
        provocation: true,
        provocationUse: true,
      },
      {
        id: 66,
        nom: "Lueur déferlante",
        lvl: 7,
        hp: 4,
        baseHp: 4,
        atk: 0,
        atkDispo: false,
        img: "img/card93.png",
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
]