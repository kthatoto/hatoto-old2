<template lang="pug">
.playing-card__back
</template>

<style lang="stylus" scoped>
.playing-card
  &__back
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 1
    backface-visibility: hidden
    transform: rotateX(180deg)
    border: 1px solid #999
    border-radius: 5%
    background-color: brown
</style>
