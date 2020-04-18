import { Square, Values } from './store'

export interface SquareLines {
  top: Square[]
  topRight: Square[]
  right: Square[]
  bottomRight: Square[]
  bottom: Square[]
  bottomLeft: Square[]
  left: Square[]
  topLeft: Square[]
}

const calculateSquareLines = (boardSquares: Square[][], square: Square): SquareLines => {
  const squareLines: SquareLines = {
    top: [],
    topRight: [],
    right: [],
    bottomRight: [],
    bottom: [],
    bottomLeft: [],
    left: [],
    topLeft: []
  }
  squareLines.top = [...Array(square.y)].reduce((arr: Square[], _, i: number) => {
    arr.push(boardSquares[square.y - i - 1][square.x])
    return arr
  }, [])
  squareLines.topRight = [...Array(Math.min(square.y, 7 - square.x))].reduce((arr: Square[], _, i: number) => {
    arr.push(boardSquares[square.y - i - 1][square.x + i + 1])
    return arr
  }, [])
  squareLines.right = [...Array(7 - square.x)].reduce((arr: Square[], _, i: number) => {
    arr.push(boardSquares[square.y][square.x + i + 1])
    return arr
  }, [])
  squareLines.bottomRight = [...Array(Math.min(7 - square.y, 7 - square.x))].reduce((arr: Square[], _, i: number) => {
    arr.push(boardSquares[square.y + i + 1][square.x + i + 1])
    return arr
  }, [])
  squareLines.bottom = [...Array(7 - square.y)].reduce((arr: Square[], _, i: number) => {
    arr.push(boardSquares[square.y + i + 1][square.x])
    return arr
  }, [])
  squareLines.bottomLeft = [...Array(Math.min(7 - square.y, square.x))].reduce((arr: Square[], _, i: number) => {
    arr.push(boardSquares[square.y + i + 1][square.x - i - 1])
    return arr
  }, [])
  squareLines.left = [...Array(square.x)].reduce((arr: Square[], _, i: number) => {
    arr.push(boardSquares[square.y][square.x - i - 1])
    return arr
  }, [])
  squareLines.topLeft = [...Array(Math.min(square.y, square.x))].reduce((arr: Square[], _, i: number) => {
    arr.push(boardSquares[square.y - i - 1][square.x - i - 1])
    return arr
  }, [])
  return squareLines
}

export const calculateGettingStoneValues = (boardSquares: Square[][], square: Square): Values => {
  const squareLines: SquareLines = calculateSquareLines(boardSquares, square)
  const currentTurn: 'black' | 'white' | 'empty' = square.status
  if (currentTurn === 'empty') throw new Error('the square must not be emtpy')
  const oppositeTurn: 'black' | 'white' = currentTurn === 'black' ? 'white' : 'black'

  const values: Values = {
    count: 0,
    stones: []
  }

  Object.entries(squareLines).forEach(([_key, line]) => {
    const currentTurnIndex: number = line.findIndex((s: Square) => s.status === currentTurn)
    if (currentTurnIndex >= 1 && line.slice(0, currentTurnIndex).every((s: Square) => s.status === oppositeTurn)) {
      values.count += currentTurnIndex
      values.stones = values.stones.concat(line.slice(0, currentTurnIndex))
    }
  })

  return values
}
