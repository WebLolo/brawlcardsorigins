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
    id: 127,
    nom: "La petite famille",
    lvl: 5,
    hp: 10,
    baseHp: 10,
    atk: 2,
    atkDispo: false,
    img: "img/card15.png",
    imgMinia: "img/cardfight15.png",
    imgMiniaProvoc: "img/cardfight15-provoc.png",
    famille: "Les Hierels",
    sousFamille: "Les N",
    texte: "<br><i>Les protecteurs</i> <br><br><br> gagne <color=red>+2 Hp</color> à chaque fois qu'un Hierel est joué. doublé si c'est un N",
    provocation: true,
    provocationUse: true,
    upSelf: true,
  },
]