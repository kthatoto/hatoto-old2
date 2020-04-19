import { InjectionKey } from '@vue/composition-api'

interface GameList {
  [key: string]: GameItem
}

export interface GameItem {
  numberKey: string
  name: string
  width: string
  height: string
  thumbnail: string
  howtoplayTotalPage: number
}

export const buildGameStore = () => {
  const gameList: GameList = {
    '001': { numberKey: '001', width: '500px', height: '500px', thumbnail: '001.png', howtoplayTotalPage: 1, name: 'othello' },
    '002': { numberKey: '002', width: '450px', height: '500px', thumbnail: '002.png', howtoplayTotalPage: 1, name: 'minesweeper' }
  }
  const findGame = (gameName: string): GameItem => {
    const targetNumberKey: string | undefined = Object.keys(gameList).find((numberKey: string) => {
      const game: GameItem = gameList[numberKey]
      return game.name === gameName
    })
    if (targetNumberKey === undefined) throw new Error(`${gameName} is not found`)
    return gameList[targetNumberKey]
  }

  return { gameList, findGame }
}

export type GameStore = ReturnType<typeof buildGameStore>
export const gameStoreInjectionKey: InjectionKey<GameStore> = Symbol('gameStore')
