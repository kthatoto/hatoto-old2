<template lang="pug">
.playing-card__back
  table.pattern
    tr.pattern__rows(v-for="_ in 20")
      td.pattern__square(v-for="_ in 15")
</template>

<style lang="stylus" scoped>
.playing-card__back
  width: 100%
  height: 100%
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  margin: auto
  z-index: 1
  backface-visibility: hidden
  transform: rotateX(180deg)
  border: 1px solid #999
  border-radius: 5%
  background-color: white
  .pattern
    width: 90%
    height: 90%
    margin: 7% auto 0
    border-collapse: collapse
    &__square
      border: 1px solid blue
</style>
