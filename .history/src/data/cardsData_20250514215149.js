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
    texte: "<i>Pote la !</i> <br><br> Quand un Hierels meurt <br><br> donne <color=red>+2/+1</color> à un autre <br><br><i>Début de tour</i> <br><br> gagne <color=red>+1/+1</color>",
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
]