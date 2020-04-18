import { Square, Values } from '../store'
import { calculateGettingStoneValues } from '../calculator'

interface TargetSquares {
  value: number
  squares: Square[]
}

export default {
  operate: (boardSquares: Square[][], turn: 'black' | 'white', putStones: Function): void => {
    const tmpBoardSquares = JSON.parse(JSON.stringify(boardSquares))
    const puttableSquares = tmpBoardSquares.reduce((squares: Square[], squareRow: Square[]) => {
      squareRow.forEach((square: Square) => { if (square.puttable) squares.push(square) })
      return squares
    }, [])
    const targetSquares = puttableSquares.reduce((targetSquares: TargetSquares, square: Square) => {
      const values: Values = calculateGettingStoneValues(tmpBoardSquares, { ...square, status: turn })
      if (targetSquares.value === values.count) {
        targetSquares.squares.push(square)
      } else if (targetSquares.value < values.count) {
        targetSquares.value = values.count
        targetSquares.squares = [square]
      }
      return targetSquares
    }, { value: 0, squares: [] })
    const targetSquare: Square | undefined = targetSquares.squares[Math.floor(Math.random() * targetSquares.squares.length)]
    if (targetSquare === undefined) throw new Error('NPC can\'t put stone anywhere')
    putStones(targetSquare.y, targetSquare.x)
  }
}
