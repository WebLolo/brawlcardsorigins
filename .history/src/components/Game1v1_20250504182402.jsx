import GameLayout1v1 from "./GameLayout1v1";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

export default function Game1v1(){
    const handleDragEnd = (event) => {

    }
    return (  
        <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]} >   
            <GameLayout1v1
                 
            />  
        </DndContext>        
    )
}