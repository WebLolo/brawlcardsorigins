import "../styles/SynergyHUD.css";
export default function SynergyHUD({  }){
    return(
        <div className="synergyHUD">
            <h1>Synergies :</h1>
            <img src="img/chounette_la_taverniere.png" className="hudPersoShop" alt="HUD Tavernière"/>
            <img type="button" onClick={ onLvlUp } className="hudLvlUp" src="img/bouton_lvlup_taverne.png" alt=""/>
            <div id="taverneCost" className="taverneCost">{ cout }</div>
        </div>
    )
}