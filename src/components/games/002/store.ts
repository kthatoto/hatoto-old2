import { InjectionKey, ref } from '@vue/composition-api'

type Difficulty = 'easy' | 'normal' | 'difficult'

export const buildStore = () => {
  const difficulty = ref<Difficulty>('easy')
  const changeDifficulty = (newDifficulty: Difficulty) => { difficulty.value = newDifficulty }

  return {
    difficulty,
    changeDifficulty
  }
}

export type Store = ReturnType<typeof buildStore>
export const storeInjectionKey: InjectionKey<Store> = Symbol('games_002_store')
