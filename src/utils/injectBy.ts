import { inject, InjectionKey } from '@vue/composition-api'

export default <T>(injectionKey: InjectionKey<T> | string) => {
  const x: void | T = inject(injectionKey)
  if (!x) throw `Not found provided object inject (${injectionKey})`
  return x
}
