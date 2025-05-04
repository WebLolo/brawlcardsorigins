import GameLayout1v1 from "./GameLayout1v1";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { arrayMove } from "@dnd-kit/sortable";
import { coutLvlTaverne, getCartesPourShop, getCartesAleatoires, getNombreCartesShop, clonerCarte, actualiserBoutique, lvlUpTaverne, coutLvlTavernePlayer2, jouerCarteDepuisDeck, vendreCarteDuBoard, acheterCarte, fusionnerCartesIdentiques, addBoardPosition, boardPositionSell} from "@/utils/shopUtils";
import DropZone from "./DropZone";
import ShopHUD from "./ShopHUD";
import ShopBoard from "./ShopBoard";
export default function Game1v1(){
    const [phase, setPhase] = useState("shopPlayer1");
    const [previewCard, setPreviewCard] = useState(null);
    const [carteAttaquantId, setCarteAttaquantId] = useState(null);
    const [carteDefenseurId, setCarteDefenseurId] = useState(null);
    const [actualPlayer, setActualPlayer] = useState(1);
    const [fusionAnim, setFusionAnim] = useState(null);
    const navigate = useNavigate();
    const [volume, setVolume] = useState(0.4); // Valeur par défaut
    const [muted, setMuted] = useState(false)
    const [soundVolume, setSoundVolume] = useState(1); // volume effets sonores
    const [bonusTourbillonDeSable, setBonusTourbillonDeSable] = useState(0);
    const [bonusAtkElem, setBonusAtkElem] = useState(0);
    const [marinsCount, setMarinsCount] = useState(0);
    const [terrestresCount, setTerrestresCount] = useState(0);
    const [projectileAnim, setProjectileAnim] = useState(null);
    const [animAoEVisuelle, setAnimAoEVisuelle] = useState(false);
    const [griffeEffects, setGriffeEffects] = useState([]);
    const [popupMessage, setPopupMessage] = useState(null);

    //joueur 1
    const [lvlTaverne, setLvlTaverne] = useState(1);
    const [deck, setDeck] = useState([]);
    const [gold, setGold] = useState(100);
    const [playerPv, setplayerPv] = useState(50);
    const [boardPlayer, setBoardPlayer] = useState([]);
    const [boardCombat, setBoardCombat] = useState([]);
    const [goldTour1, setgoldTour1] = useState(3);

    //joueur2
    const [deckPlayer2, setDeckPlayer2] = useState([]);
    const [lvlTavernePlayer2, setLvlTavernePlayer2] = useState(1);
    const [goldPlayer2, setGoldPlayer2] = useState(100);
    const [player2Pv, setplayer2Pv] = useState(50);
    const [boardPlayer2, setBoardPlayer2] = useState([]);
    const [boardCombatPlayer2, setBoardCombatPlayer2] = useState([]);

    let [shopCards, setShopCards] = useState(() => {
        if (actualPlayer === 1){
            const tirage = getCartesPourShop(lvlTaverne);
            const cartesAleatoires = getCartesAleatoires(tirage, getNombreCartesShop(lvlTaverne));
            return cartesAleatoires.map(carte => clonerCarte({ carte, camp: "joueur" }));
        }
        if (actualPlayer === 2){
            const tirage = getCartesPourShop(lvlTavernePlayer2);
            const cartesAleatoires = getCartesAleatoires(tirage, getNombreCartesShop(lvlTavernePlayer2));
            return cartesAleatoires.map(carte => clonerCarte({ carte, camp: "joueur" }));
        }

    });
    const handleDragEnd = (event) => {

    }
    return (  
        <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]} >   
            <GameLayout1v1
                ShopHUD={
                    phase === "shopPlayer1" ? (
                        <DropZone id="header" className="drop-header">
                            <ShopHUD cout={coutLvlTaverne[lvlTaverne]} onRefresh={() => actualiserBoutique({ lvlTaverne, setShopCards, gold, setGold, actualPlayer, setPopupMessage })} onLvlUp={() => lvlUpTaverne({ gold, lvlTaverne, setGold, setLvlTaverne, setShopCards, actualPlayer, setPopupMessage })}/>
                        </DropZone>
                    ) : phase === "shopPlayer2" ? (
                        <DropZone id="header" className="drop-header">
                            <ShopHUD cout={coutLvlTavernePlayer2[lvlTavernePlayer2]} onRefresh={() => actualiserBoutique({ lvlTavernePlayer2, setShopCards, goldPlayer2, setGoldPlayer2, actualPlayer, setPopupMessage })}onLvlUp={() => lvlUpTaverne({ goldPlayer2, lvlTavernePlayer2, setGoldPlayer2, setLvlTavernePlayer2, setShopCards, actualPlayer, setPopupMessage })}/>
                        </DropZone>
                    ) : (
                        <Player2HUDFight goldPlayer2 = {goldPlayer2} lvlTavernePlayer2 = {lvlTavernePlayer2} player2Pv = {player2Pv}/>
                    )    
                }
                ShopBoard={
                    phase === "shopPlayer1" || phase === "shopPlayer2" ? (
                        <ShopBoard cards={shopCards} origin="shop" onPreview={setPreviewCard}/>
                    ) : (
                        <Player2BoardFight cards={ boardCombatPlayer2 } origin="board" onPreview={setPreviewCard} phase={phase} carteAttaquantId={carteAttaquantId} carteDefenseurId={carteDefenseurId}/>
                    )
                }
                 
            />  
        </DndContext>        
    )
}