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
    texte: "<br><i>Début de tour</i> <br><br> Gagne<color=red>+1/+1</color><br><br> si Aurelie ou Cedric présent, <color=red>+2/+2</color>",
    aoeCibleApresCombat: (cartesBoard, draggedCard) => {
      if(draggedCard.estDoree){
        cartesBoard.forEach(carte => {
          if(carte.nom === "Cedric" || carte.nom === "Aurelie"){
            draggedCard.atk += 2 * 2;
            draggedCard.buffAtk += 2 * 2;
            draggedCard.hp += 2 * 2;
            draggedCard.buffHp += 2 * 2;
            draggedCard.animAoE = true; 
          }else{
            draggedCard.atk += 1 * 2;
            draggedCard.buffAtk += 1 * 2;
            draggedCard.hp += 1 * 2;
            draggedCard.buffHp += 1 * 2;
            draggedCard.animAoE = true;
          }

        });
      }else{
        cartesBoard.forEach(carte => {
          if(carte.nom === "Cedric" || carte.nom === "Aurelie"){
            draggedCard.atk += 2;
            draggedCard.buffAtk += 2;
            draggedCard.hp += 2;
            draggedCard.buffHp += 2;
            draggedCard.animAoE = true; 
          }else{
            draggedCard.atk += 1;
            draggedCard.buffAtk += 1;
            draggedCard.hp += 1;
            draggedCard.buffHp += 1;
            draggedCard.animAoE = true;
          } 
        });
      }
      
    },

  },
]