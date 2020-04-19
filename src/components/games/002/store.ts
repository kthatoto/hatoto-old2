import { InjectionKey } from '@vue/composition-api'

export const buildStore = () => {
  return {
  }
}

export type Store = ReturnType<typeof buildStore>
export const storeInjectionKey: InjectionKey<Store> = Symbol('games_002_store')
