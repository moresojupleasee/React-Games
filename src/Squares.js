import { useState } from 'react'

const Square = ({ value, squareClick }) => {
  return (
    <button className='square' onClick={squareClick}>
      {value}
    </button>
  )
}

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const playAgain = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  const squareClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return // returning early
    const nextSquares = squares.slice()
    if (xIsNext) nextSquares[i] = 'X'
    else nextSquares[i] = 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }
  const winner = calculateWinner(squares)
  let gameStatus
  if (winner) gameStatus = 'Winner is   ' + winner
  else gameStatus = 'Next Player : ' + (xIsNext ? 'X' : 'O')

  return (
    <div className='main'>
      <p>TIC TAC TOE</p>
      <div className='status'>{gameStatus}</div>
      <br />
      <div className='row'>
        <Square value={squares[0]} squareClick={() => squareClick(0)} />
        <Square value={squares[1]} squareClick={() => squareClick(1)} />
        <Square value={squares[2]} squareClick={() => squareClick(2)} />
      </div>
      <div className='row'>
        <Square value={squares[3]} squareClick={() => squareClick(3)} />
        <Square value={squares[4]} squareClick={() => squareClick(4)} />
        <Square value={squares[5]} squareClick={() => squareClick(5)} />
      </div>
      <div className='row'>
        <Square value={squares[6]} squareClick={() => squareClick(6)} />
        <Square value={squares[7]} squareClick={() => squareClick(7)} />
        <Square value={squares[8]} squareClick={() => squareClick(8)} />
      </div>
      <br />
      <div className='clearButton'>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  )
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default Board
