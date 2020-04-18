import { InjectionKey, ref, computed } from '@vue/composition-api'

interface Square {
  y: number
  x: number
  status: 'empty' | 'black' | 'white'
  puttable: boolean
}

interface SquareLines {
  top: Square[]
  topRight: Square[]
  right: Square[]
  bottomRight: Square[]
  bottom: Square[]
  bottomLeft: Square[]
  left: Square[]
  topLeft: Square[]
}

type LineKey = keyof SquareLines

interface Values {
  count: number
  stones: Square[]
}

interface StoneCounts {
  black: number
  white: number
}

const initBoardSquares: Square[][] = [...Array(8).keys()].reduce((rows: Square[][], y: number) => {
  const newRow = [...Array(8).keys()].reduce((row: Square[], x: number) => {
    if ((y === 3 && x === 3) || (y === 4 && x === 4)) {
      row.push({ y, x, status: 'white', puttable: false })
    } else if ((y === 3 && x === 4) || (y === 4 && x === 3)) {
      row.push({ y, x, status: 'black', puttable: false })
    } else {
      row.push({ y, x, status: 'empty', puttable: false })
    }
    return row
  }, [])
  rows.push(newRow)
  return rows
}, [])

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

const calculateGettingStoneValues = (squareLines: SquareLines, _boardSquares: Square[][], square: Square): Values => {
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

const getStones = (boardSquares: Square[][], values: Values, square: Square): void => {
  values.stones.forEach((targetStone: Square) => {
    boardSquares[targetStone.y][targetStone.x] = { y: targetStone.y, x: targetStone.x, status: square.status, puttable: false }
  })
}

export const buildStore = () => {
  const boardSquares = ref<Square[][]>(initBoardSquares)

  const turn = ref<'black' | 'white'>('black')
  const oppositeTurn = computed<'black' | 'white'>(() => turn.value === 'black' ? 'white' : 'black')

  const putStone = (y: number, x: number) => {
    const tmpBoardSquares = JSON.parse(JSON.stringify(boardSquares.value))
    const square: Square = { y, x, status: turn.value, puttable: false }
    if (tmpBoardSquares[y][x].status === 'empty') {
      tmpBoardSquares[y][x] = square
    } else {
      return
    }

    const squareLines: SquareLines = calculateSquareLines(tmpBoardSquares, square)
    const gettingStoneValues: Values = calculateGettingStoneValues(squareLines, tmpBoardSquares, square)
    if (gettingStoneValues.count > 0) {
      getStones(tmpBoardSquares, gettingStoneValues, square)
    } else {
      return
    }
    turn.value = oppositeTurn.value
    boardSquares.value = tmpBoardSquares
  }

  const stoneCounts = computed<StoneCounts>(() => {
    return boardSquares.value.reduce((counts: StoneCounts, squareRow: Square[]) => {
      squareRow.forEach((square: Square) => {
        if (square.status === 'black') counts.black++
        if (square.status === 'white') counts.white++
      })
      return counts
    }, { black: 0, white: 0 })
  })

  return {
    turn,
    boardSquares,
    putStone,
    stoneCounts
  }
}

export type Store = ReturnType<typeof buildStore>
export const storeInjectionKey: InjectionKey<Store> = Symbol('store')
