import { InjectionKey, ref, computed } from '@vue/composition-api'

import shuffle from '@/utils/shuffle.ts'

export type Difficulty = 'easy' | 'normal' | 'difficult'
type GameStatus = 'beforePlay' | 'playing' | 'gameover' | 'clear'

export interface Square {
  y: number
  x: number
  status: 'close' | 'open' | 'flag'
  mine: boolean
  nearMineNumber: number
}

interface Position {
  y: number
  x: number
}

export const buildStore = () => {
  const gameStatus = ref<GameStatus>('beforePlay')
  const difficulty = ref<Difficulty>('easy')
  const changeDifficulty = (newDifficulty: Difficulty) => {
    difficulty.value = newDifficulty
    startGame()
  }

  const boardSquares = ref<Square[][]>([])
  const verticalSquareCount = computed<number>(() => {
    if (difficulty.value === 'easy') return 9
    if (difficulty.value === 'normal') return 13
    if (difficulty.value === 'difficult') return 16
    return 0
  })
  const horizontalSquareCount = computed<number>(() => {
    if (difficulty.value === 'easy') return 9
    if (difficulty.value === 'normal') return 13
    if (difficulty.value === 'difficult') return 16
    return 0
  })
  const mineCount = computed<number>(() => {
    if (difficulty.value === 'easy') return 10
    if (difficulty.value === 'normal') return 30
    if (difficulty.value === 'difficult') return 70
    return 0
  })
  const startGame = () => {
    boardSquares.value = [...Array(verticalSquareCount.value)].reduce((rows: Square[][], _, y: number) => {
      const newRow = [...Array(horizontalSquareCount.value)].reduce((row: Square[], _, x: number) => {
        row.push({ y, x, status: 'close', mine: false, nearMineNumber: 0 })
        return row
      }, [])
      rows.push(newRow)
      return rows
    }, [])
    gameStatus.value = 'beforePlay'
  }

  const prepareTmpBoardSquares = (): Square[][] => (JSON.parse(JSON.stringify(boardSquares.value)))
  const setMines = (excludedNumber: number) => {
    const tmpBoardSquares: Square[][] = prepareTmpBoardSquares()
    const allNumbers: number[] = [...Array(verticalSquareCount.value * horizontalSquareCount.value).keys()].filter((n: number) => n !== excludedNumber)
    const shuffledNumbers: number[] = shuffle(allNumbers)
    shuffledNumbers.slice(0, mineCount.value).forEach((mineNumber: number) => {
      const y: number = Math.floor(mineNumber / horizontalSquareCount.value)
      const x: number = mineNumber % horizontalSquareCount.value
      const square = tmpBoardSquares[y][x]
      tmpBoardSquares[y][x] = { ...square, mine: true }
    });

    [...Array(verticalSquareCount.value).keys()].forEach((y: number) => {
      [...Array(horizontalSquareCount.value).keys()].forEach((x: number) => {
        const square: Square = tmpBoardSquares[y][x]
        if (square.mine) return
        let nearMineNumber: number = 0
        if (y > 0 && tmpBoardSquares[y - 1][x].mine) nearMineNumber++
        if (y > 0 && x < horizontalSquareCount.value - 1 && tmpBoardSquares[y - 1][x + 1].mine) nearMineNumber++
        if (x < horizontalSquareCount.value - 1 && tmpBoardSquares[y][x + 1].mine) nearMineNumber++
        if (y < verticalSquareCount.value - 1 && x < horizontalSquareCount.value - 1 && tmpBoardSquares[y + 1][x + 1].mine) nearMineNumber++
        if (y < verticalSquareCount.value - 1 && tmpBoardSquares[y + 1][x].mine) nearMineNumber++
        if (y < verticalSquareCount.value - 1 && x > 0 && tmpBoardSquares[y + 1][x - 1].mine) nearMineNumber++
        if (x > 0 && tmpBoardSquares[y][x - 1].mine) nearMineNumber++
        if (y > 0 && x > 0 && tmpBoardSquares[y - 1][x - 1].mine) nearMineNumber++
        tmpBoardSquares[y][x] = { ...square, nearMineNumber }
      })
    })
    boardSquares.value = tmpBoardSquares
  }
  const openablePositions: Position[] = []
  const checkedPositions: Position[] = []
  const searchOpenablePositions = (y: number, x: number) => {
    if (checkedPositions.find((p: Position) => p.y === y && p.x === x)) return
    checkedPositions.push({ y, x })
    const tmpBS: Square[][] = prepareTmpBoardSquares()
    const square: Square = tmpBS[y][x]
    const hCount: number = horizontalSquareCount.value
    const vCount: number = verticalSquareCount.value
    const recursiveSearch = (y: number, x: number) => {
      const position: Position | undefined = openablePositions.find((p: Position) => p.y === y && p.x === x)
      if (position === undefined) openablePositions.push({ y, x })
      searchOpenablePositions(y, x)
    }
    if (square.nearMineNumber > 0) return
    if (y > 0 && !tmpBS[y - 1][x].mine) recursiveSearch(y - 1, x)
    if (y > 0 && x < hCount - 1 && !tmpBS[y - 1][x + 1].mine) recursiveSearch(y - 1, x + 1)
    if (x < hCount - 1 && !tmpBS[y][x + 1].mine) recursiveSearch(y, x + 1)
    if (y < vCount - 1 && x < hCount - 1 && !tmpBS[y + 1][x + 1].mine) recursiveSearch(y + 1, x + 1)
    if (y < vCount - 1 && !tmpBS[y + 1][x].mine) recursiveSearch(y + 1, x)
    if (y < vCount - 1 && x > 0 && !tmpBS[y + 1][x - 1].mine) recursiveSearch(y + 1, x - 1)
    if (x > 0 && !tmpBS[y][x - 1].mine) recursiveSearch(y, x - 1)
    if (y > 0 && x > 0 && !tmpBS[y - 1][x - 1].mine) recursiveSearch(y - 1, x - 1)
  }
  const pushSquare = (y: number, x: number) => {
    if (gameStatus.value === 'gameover' || gameStatus.value === 'clear') return
    const square: Square = boardSquares.value[y][x]
    if (square.status === 'open') return
    const tmpBoardSquares = prepareTmpBoardSquares()
    if (square.status === 'flag') {
      tmpBoardSquares[y][x] = { ...square, status: 'close' }
      boardSquares.value = tmpBoardSquares
      return
    }
    tmpBoardSquares[y][x] = { ...square, status: 'open' }
    boardSquares.value = tmpBoardSquares
    if (square.mine) {
      gameStatus.value = 'gameover'
      return
    }
    if (gameStatus.value === 'beforePlay') {
      setMines(y * horizontalSquareCount.value + x)
      gameStatus.value = 'playing'
    }
    openablePositions.splice(0, openablePositions.length)
    checkedPositions.splice(0, checkedPositions.length)
    searchOpenablePositions(y, x)
    const preopenBoardSquares: Square[][] = prepareTmpBoardSquares()
    openablePositions.forEach((position: Position) => {
      preopenBoardSquares[position.y][position.x] = { ...preopenBoardSquares[position.y][position.x], status: 'open' }
    })
    boardSquares.value = preopenBoardSquares
  }

  startGame()
  return {
    gameStatus,
    difficulty,
    changeDifficulty,
    boardSquares,
    verticalSquareCount,
    horizontalSquareCount,
    startGame,
    pushSquare
  }
}

export type Store = ReturnType<typeof buildStore>
export const storeInjectionKey: InjectionKey<Store> = Symbol('games_002_store')
