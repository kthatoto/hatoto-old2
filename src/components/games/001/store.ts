import { InjectionKey, ref } from '@vue/composition-api'

interface Square {
  status: 'empty' | 'black' | 'white'
}

export const buildStore = () => {
  const boardSquares = ref<Square[][]>(
    [...Array(8).keys()].reduce((rows: Square[][], i: number) => {
      const newRow = [...Array(8).keys()].reduce((row: Square[], j: number) => {
        if ((i === 3 && j === 3) || (i === 4 && j === 4)) {
          row.push({ status: 'white' })
        } else if ((i === 3 && j === 4) || (i === 4 && j === 3)) {
          row.push({ status: 'black' })
        } else {
          row.push({ status: 'empty' })
        }
        return row
      }, [])
      rows.push(newRow)
      return rows
    }, [])
  )
  const putStone = (color: 'white' | 'black', y: number, x: number) => {
    boardSquares.value = boardSquares.value.reduce((rows: Square[][], currentRow: Square[], i: number) => {
      const newRow = currentRow.reduce((row: Square[], currentSquare: Square, j: number) => {
        if (i === y && j === x) {
          row.push({ status: color })
        } else {
          row.push(currentSquare)
        }
        return row
      }, [])
      rows.push(newRow)
      return rows
    }, [])
  }

  return {
    boardSquares,
    putStone
  }
}

export type Store = ReturnType<typeof buildStore>
export const storeInjectionKey: InjectionKey<Store> = Symbol('store')
