import { InjectionKey } from '@vue/composition-api'

interface GameList {
  [key: string]: GameItem
}

export interface GameItem {
  name: string
  width: string
  height: string
}

export const buildGameStore = () => {
  const gameList: GameList = {
    "001": { name: "othello", width: "500px", height: "500px" }
  }

  return { gameList }
}

export type GameStore = ReturnType<typeof buildGameStore>
export const gameStoreInjectionKey: InjectionKey<GameStore> = Symbol('gameStore')
