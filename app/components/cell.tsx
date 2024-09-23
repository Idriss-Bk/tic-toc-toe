import { Dispatch, SetStateAction } from "react";

type CellProps = {
    id: number;
    go: string;
    setGo:   Dispatch<SetStateAction<string>>;
    cells: string[];
    setCells:   Dispatch<SetStateAction<string[]>>;
    cell : string;
    winningMessage: string;
}

const Cell = ({go, setGo, id, cells, setCells, cell, winningMessage}: CellProps) => {


    

    const handelClick = () => {
        if(winningMessage){
            return
        }
        const noTaken  = !cells[id]
        if(noTaken){

            if(go === "circle") {
                handleCellChange("circle")
                setGo("cross")
              }else if  (go === "cross" ){
                handleCellChange("cross")
                setGo("circle")
              }
            
        }
       
        
    }


    const handleCellChange = (cellToChange : string) => {
        const newCells = [...cells];
        newCells[id] = cellToChange;
        setCells(newCells);
        
        
    }
   return  <div className='square' onClick={handelClick}>
    <div className={cell}>{cell ? (cell === "circle" ? "O" : "X") : ""}</div>
   </div>;
};
export default Cell;