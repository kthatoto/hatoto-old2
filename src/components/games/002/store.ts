import { InjectionKey, ref, computed } from '@vue/composition-api'

export type Difficulty = 'easy' | 'normal' | 'difficult'

interface Square {
  y: number
  x: number
  status: 'close' | 'open' | 'flag'
  bomb: boolean
  nearBombNumber: number
}

export const buildStore = () => {
  const difficulty = ref<Difficulty>('easy')
  const changeDifficulty = (newDifficulty: Difficulty) => {
    difficulty.value = newDifficulty
    startGame()
  }

  const boardSquares = ref<Square[][]>([])
  const edgeSquareRowCount = computed<number>(() => {
    if (difficulty.value === 'easy') return 9
    if (difficulty.value === 'normal') return 13
    if (difficulty.value === 'difficult') return 16
    return 0
  })
  const edgeSquareColumnCount = computed<number>(() => {
    if (difficulty.value === 'easy') return 9
    if (difficulty.value === 'normal') return 13
    if (difficulty.value === 'difficult') return 16
    return 0
  })
  const startGame = () => {
    boardSquares.value = [...Array(edgeSquareRowCount.value)].reduce((rows: Square[][], y: number) => {
      const newRow = [...Array(edgeSquareColumnCount.value)].reduce((row: Square[], x: number) => {
        row.push({ y, x, status: 'close', bomb: false, nearBombNumber: 0 })
        return row
      }, [])
      rows.push(newRow)
      return rows
    }, [])
  }
  startGame()

  return {
    difficulty,
    changeDifficulty,
    boardSquares,
    edgeSquareRowCount,
    edgeSquareColumnCount,
    startGame
  }
}

export type Store = ReturnType<typeof buildStore>
export const storeInjectionKey: InjectionKey<Store> = Symbol('games_002_store')
