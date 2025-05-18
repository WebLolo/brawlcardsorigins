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
    texte: "<br><i>Effet de couple et aura</i> <br><br> si Patrick est présent <br><br><color=red>+2/+2</color> aux Hierels<br><br> Bonus doublé pour les L",
    effetDeCouple: {
      partenaire: "Patrick",
      effet: (cartesBoard) => {
        cartesBoard.forEach(carte => {
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
          }
        });
      },
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
]