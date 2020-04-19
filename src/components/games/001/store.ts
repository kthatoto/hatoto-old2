import { InjectionKey, ref, computed } from '@vue/composition-api'

import { calculateGettingStoneValues } from './calculator'
import npclv1 from './npc/lv1'

export interface Square {
  y: number
  x: number
  status: 'empty' | 'black' | 'white'
  puttable?: boolean
}

export interface Values {
  count: number
  stones: Square[]
}

interface StoneCounts {
  black: number
  white: number
}

type Operating = 'you' | 'npclv1'

const initBoardSquares: Square[][] = [...Array(8).keys()].reduce((rows: Square[][], y: number) => {
  const newRow = [...Array(8).keys()].reduce((row: Square[], x: number) => {
    if ((y === 3 && x === 3) || (y === 4 && x === 4)) {
      row.push({ y, x, status: 'white' })
    } else if ((y === 3 && x === 4) || (y === 4 && x === 3)) {
      row.push({ y, x, status: 'black' })
    } else {
      row.push({ y, x, status: 'empty' })
    }
    return row
  }, [])
  rows.push(newRow)
  return rows
}, [])

const getStones = (boardSquares: Square[][], values: Values, turn: 'black' | 'white' | 'empty'): void => {
  values.stones.forEach((targetStone: Square) => {
    boardSquares[targetStone.y][targetStone.x] = { y: targetStone.y, x: targetStone.x, status: turn }
  })
}

export const buildStore = () => {
  const boardSquares = ref<Square[][]>(initBoardSquares)

  const turn = ref<'black' | 'white'>('black')
  const oppositeTurn = computed<'black' | 'white'>(() => turn.value === 'black' ? 'white' : 'black')
  const finished = ref<boolean>(false)

  const blackOperating = ref<Operating>('you')
  const whiteOperating = ref<Operating>('npclv1')
  const getOperatingByTurn = (turn: 'black' | 'white'): Operating => {
    if (turn === 'black') return blackOperating.value
    if (turn === 'white') return whiteOperating.value
    throw new Error('The turn is not found')
  }
  const getCurrentOperating = computed<Operating>(() => getOperatingByTurn(turn.value))
  const changeOperating = (turn: 'black' | 'white', operating: Operating): void => {
    if (turn === 'black') blackOperating.value = operating
    if (turn === 'white') whiteOperating.value = operating
  }
  const isYourTurn = computed<boolean>(() => getCurrentOperating.value === 'you')

  const checkPuttable = (): boolean => {
    let someSquarePuttable: boolean = false
    const tmpBoardSquares = [...Array(8)].reduce((res: Square[][], _, y: number) => {
      const squareRow = [...Array(8)].reduce((squareRow: Square[], _, x: number) => {
        const square: Square = boardSquares.value[y][x]
        let nearStone: boolean = false
        if (y > 0 && boardSquares.value[y - 1][x].status !== 'empty') nearStone = true
        if (y < 7 && boardSquares.value[y + 1][x].status !== 'empty') nearStone = true
        if (x > 0 && boardSquares.value[y][x - 1].status !== 'empty') nearStone = true
        if (x < 7 && boardSquares.value[y][x + 1].status !== 'empty') nearStone = true
        if (square.status !== 'empty' || !nearStone) {
          squareRow.push({ ...square, puttable: false })
          return squareRow
        }

        const values: Values = calculateGettingStoneValues(boardSquares.value, { y: square.y, x: square.x, status: turn.value })
        if (values.count > 0) {
          someSquarePuttable = true
          squareRow.push({ ...square, puttable: true })
          return squareRow
        } else {
          squareRow.push({ ...square, puttable: false })
          return squareRow
        }
      }, [])
      res.push(squareRow)
      return res
    }, [])
    boardSquares.value = tmpBoardSquares
    return someSquarePuttable
  }
  checkPuttable()

  const putStone = (y: number, x: number): void => {
    const tmpBoardSquares = JSON.parse(JSON.stringify(boardSquares.value))
    const square: Square = { y, x, status: turn.value }
    if (tmpBoardSquares[y][x].status === 'empty') {
      tmpBoardSquares[y][x] = square
    } else {
      return
    }

    const gettingStoneValues: Values = calculateGettingStoneValues(tmpBoardSquares, square)
    if (gettingStoneValues.count > 0) {
      getStones(tmpBoardSquares, gettingStoneValues, square.status)
    } else {
      return
    }
    turn.value = oppositeTurn.value
    boardSquares.value = tmpBoardSquares
    const somePuttable: boolean = checkPuttable()
    if (!somePuttable) {
      turn.value = oppositeTurn.value
      const oppositeSomePuttable: boolean = checkPuttable()
      if (!oppositeSomePuttable) {
        finished.value = true
      }
    }
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
  const winning = computed<'black' | 'white' | 'draw'>(() => {
    const blackCount: number = stoneCounts.value.black
    const whiteCount: number = stoneCounts.value.white
    if (blackCount > whiteCount) {
      return 'black'
    } else if (whiteCount > blackCount) {
      return 'white'
    } else {
      return 'draw'
    }
  })

  const clickAnywhere = (): void => {
    if (!isYourTurn.value) {
      const currentOperating: Operating = getCurrentOperating.value
      if (currentOperating === 'npclv1') npclv1.operate(boardSquares.value, turn.value, putStone)
    }
  }

  const restart = (): void => {
    boardSquares.value = initBoardSquares
    turn.value = 'black'
    finished.value = false
    checkPuttable()
  }

  return {
    turn,
    blackOperating,
    whiteOperating,
    changeOperating,
    boardSquares,
    putStone,
    stoneCounts,
    isYourTurn,
    clickAnywhere,
    finished,
    winning,
    restart
  }
}

export type Store = ReturnType<typeof buildStore>
export const storeInjectionKey: InjectionKey<Store> = Symbol('games_001_store')
