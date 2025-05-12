export const retiredCards = [
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
        lvl: 7,
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
]