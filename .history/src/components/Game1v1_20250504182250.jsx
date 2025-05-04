import GameLayout1v1 from "./GameLayout1v1";

export default function Game1v1(){
    return (  
        <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]} >   
            <GameLayout1v1
                 
            />  
        </DndContext>        
    )
}