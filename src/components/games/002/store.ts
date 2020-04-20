import { InjectionKey, ref, computed, reactive, watch, onBeforeUnmount } from '@vue/composition-api'

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

  const surprised = reactive<{ flag: boolean, timerId: number }>({ flag: false, timerId: 0 })
  const surpriseSmiley = () => {
    clearTimeout(surprised.timerId)
    surprised.flag = true
    surprised.timerId = window.setTimeout(() => {
      surprised.flag = false
    }, 500)
  }

  const boardSquares = ref<Square[][]>([])
  const verticalSquareNumber = computed<number>(() => {
    if (difficulty.value === 'easy') return 9
    if (difficulty.value === 'normal') return 13
    if (difficulty.value === 'difficult') return 16
    return 0
  })
  const horizontalSquareNumber = computed<number>(() => {
    if (difficulty.value === 'easy') return 9
    if (difficulty.value === 'normal') return 13
    if (difficulty.value === 'difficult') return 16
    return 0
  })
  const mineNumber = computed<number>(() => {
    if (difficulty.value === 'easy') return 2
    if (difficulty.value === 'normal') return 30
    if (difficulty.value === 'difficult') return 70
    return 0
  })
  const startGame = () => {
    boardSquares.value = [...Array(verticalSquareNumber.value)].reduce((rows: Square[][], _, y: number) => {
      const newRow = [...Array(horizontalSquareNumber.value)].reduce((row: Square[], _, x: number) => {
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
    const allNumbers: number[] = [...Array(verticalSquareNumber.value * horizontalSquareNumber.value).keys()].filter((n: number) => n !== excludedNumber)
    const shuffledNumbers: number[] = shuffle(allNumbers)
    shuffledNumbers.slice(0, mineNumber.value).forEach((mineNumber: number) => {
      const y: number = Math.floor(mineNumber / horizontalSquareNumber.value)
      const x: number = mineNumber % horizontalSquareNumber.value
      const square = tmpBoardSquares[y][x]
      tmpBoardSquares[y][x] = { ...square, mine: true }
    });

    [...Array(verticalSquareNumber.value).keys()].forEach((y: number) => {
      [...Array(horizontalSquareNumber.value).keys()].forEach((x: number) => {
        const square: Square = tmpBoardSquares[y][x]
        if (square.mine) return
        let nearMineNumber: number = 0
        if (y > 0 && tmpBoardSquares[y - 1][x].mine) nearMineNumber++
        if (y > 0 && x < horizontalSquareNumber.value - 1 && tmpBoardSquares[y - 1][x + 1].mine) nearMineNumber++
        if (x < horizontalSquareNumber.value - 1 && tmpBoardSquares[y][x + 1].mine) nearMineNumber++
        if (y < verticalSquareNumber.value - 1 && x < horizontalSquareNumber.value - 1 && tmpBoardSquares[y + 1][x + 1].mine) nearMineNumber++
        if (y < verticalSquareNumber.value - 1 && tmpBoardSquares[y + 1][x].mine) nearMineNumber++
        if (y < verticalSquareNumber.value - 1 && x > 0 && tmpBoardSquares[y + 1][x - 1].mine) nearMineNumber++
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
    const hNumber: number = horizontalSquareNumber.value
    const vNumber: number = verticalSquareNumber.value
    const recursiveSearch = (y: number, x: number) => {
      const position: Position | undefined = openablePositions.find((p: Position) => p.y === y && p.x === x)
      if (position === undefined) openablePositions.push({ y, x })
      searchOpenablePositions(y, x)
    }
    if (square.nearMineNumber > 0) return
    if (y > 0 && !tmpBS[y - 1][x].mine) recursiveSearch(y - 1, x)
    if (y > 0 && x < hNumber - 1 && !tmpBS[y - 1][x + 1].mine) recursiveSearch(y - 1, x + 1)
    if (x < hNumber - 1 && !tmpBS[y][x + 1].mine) recursiveSearch(y, x + 1)
    if (y < vNumber - 1 && x < hNumber - 1 && !tmpBS[y + 1][x + 1].mine) recursiveSearch(y + 1, x + 1)
    if (y < vNumber - 1 && !tmpBS[y + 1][x].mine) recursiveSearch(y + 1, x)
    if (y < vNumber - 1 && x > 0 && !tmpBS[y + 1][x - 1].mine) recursiveSearch(y + 1, x - 1)
    if (x > 0 && !tmpBS[y][x - 1].mine) recursiveSearch(y, x - 1)
    if (y > 0 && x > 0 && !tmpBS[y - 1][x - 1].mine) recursiveSearch(y - 1, x - 1)
  }

  const timer = reactive<{ count: number, id: number }>({ count: 0, id: 0 })
  const pushSquare = (y: number, x: number) => {
    if (gameStatus.value === 'gameover' || gameStatus.value === 'clear') return
    const square: Square = boardSquares.value[y][x]
    if (square.status === 'open' || square.status === 'flag') return
    const tmpBoardSquares = prepareTmpBoardSquares()
    tmpBoardSquares[y][x] = { ...square, status: 'open' }
    boardSquares.value = tmpBoardSquares
    if (square.mine) {
      gameStatus.value = 'gameover'
      return
    }
    if (gameStatus.value === 'beforePlay') {
      setMines(y * horizontalSquareNumber.value + x)
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
    if (closedNotMineSquareNumber.value === 0) {
      gameStatus.value = 'clear'
      autoPutFlag()
    } else {
      surpriseSmiley()
    }
  }
  const putFlag = (y: number, x: number) => {
    if (gameStatus.value === 'gameover' || gameStatus.value === 'clear') return
    const square: Square = boardSquares.value[y][x]
    if (square.status === 'open') return
    const tmpBS: Square[][] = prepareTmpBoardSquares()
    if (square.status === 'close') {
      tmpBS[y][x] = { ...tmpBS[y][x], status: 'flag' }
    } else if (square.status === 'flag') {
      tmpBS[y][x] = { ...tmpBS[y][x], status: 'close' }
    }
    boardSquares.value = tmpBS
  }
  const autoPutFlag = () => {
    if (gameStatus.value !== 'clear') return
    const tmpBS: Square[][] = prepareTmpBoardSquares();
    [...Array(verticalSquareNumber.value).keys()].forEach((y: number) => {
      [...Array(horizontalSquareNumber.value).keys()].forEach((x: number) => {
        const square: Square = tmpBS[y][x]
        if (square.status === 'close') tmpBS[y][x] = { ...square, status: 'flag' }
      })
    })
    boardSquares.value = tmpBS
  }

  const closedNotMineSquareNumber = computed<number>(() => {
    return boardSquares.value.reduce((sum: number, squareRow: Square[]) => {
      squareRow.forEach((square: Square) => {
        if (square.status === 'close' && !square.mine) sum++
      })
      return sum
    }, 0)
  })
  const flagNumber = computed<number>(() => {
    return boardSquares.value.reduce((sum: number, squareRow: Square[]) => {
      squareRow.forEach((square: Square) => {
        if (square.status === 'flag') sum++
      })
      return sum
    }, 0)
  })
  const apparentlyMineNumber = computed<number>(() => (mineNumber.value - flagNumber.value))

  watch(gameStatus, (newStatus: GameStatus) => {
    switch (newStatus) {
      case 'beforePlay':
        timer.count = 0
        break
      case 'playing':
        timer.id = window.setInterval(() => { timer.count++ }, 1000)
        break
      case 'gameover':
      case 'clear':
        clearInterval(timer.id)
        break
    }
  })

  onBeforeUnmount(() => {
    clearInterval(timer.id)
  })

  startGame()
  return {
    gameStatus,
    difficulty,
    changeDifficulty,
    timer,
    boardSquares,
    verticalSquareNumber,
    horizontalSquareNumber,
    apparentlyMineNumber,
    startGame,
    pushSquare,
    putFlag,
    surprised
  }
}

export type Store = ReturnType<typeof buildStore>
export const storeInjectionKey: InjectionKey<Store> = Symbol('games_002_store')
