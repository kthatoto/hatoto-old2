import { InjectionKey } from '@vue/composition-api'

interface GameList {
  [key: string]: GameItem
}

export interface GameItem {
  numberKey: string
  name: string
  width: string
  height: string
}

export const buildGameStore = () => {
  const gameList: GameList = {
    '001': { numberKey: '001', name: 'othello', width: '500px', height: '500px' },
    '002': { numberKey: '001', name: 'othello', width: '500px', height: '500px' },
    '003': { numberKey: '001', name: 'othello', width: '500px', height: '500px' },
    '004': { numberKey: '001', name: 'othello', width: '500px', height: '500px' },
    '005': { numberKey: '001', name: 'othello', width: '500px', height: '500px' },
    '006': { numberKey: '001', name: 'othello', width: '500px', height: '500px' },
    '007': { numberKey: '001', name: 'othello', width: '500px', height: '500px' }
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
