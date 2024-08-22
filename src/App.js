import { useState } from "react";
import { Square } from "./componentes/Square";
import { TURNS, WINNER_COMBOS } from "./constantes";
import { WinnerModal } from "./componentes/WinnerModal";
function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  //null es que no hay ganador, flase es que hay empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
  //revisamos las combianciones ganadoras para ver quien gano
  for(const combo of WINNER_COMBOS){
    const [a, b, c] = combo
    if(
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ){
      return boardToCheck[a]
    }
  }
  //si no hay ganador
  return null
  }

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) =>{
    //si ya hay un valor en esa casilla, no hacemos nada
    if(board[index] || winner) return
    //una copia para evitar modificar el original
    //actualizamos el tabler0
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    //camniamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //revismos si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false) //empate
    }
  }

  return (
    <main className="board">
      <h1>TIC TAC TOE</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">  
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
            )
          }
          )
        }
      </section>
      <section className="turn">  
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>  
          {TURNS.O}
        </Square> 
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  );
}

export default App;
