import GameLayout1v1 from "./GameLayout1v1";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

export default function Game1v1(){
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
                 
            />  
        </DndContext>        
    )
}