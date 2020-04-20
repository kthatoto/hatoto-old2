<template lang="pug">
.index
  .index__internal
    h1
      span hato.to
      img.favicon(src="@/assets/favicon.skelton.png")
    nuxt-link.link(to="/games") games
</template>

<style lang="stylus" scoped>
.index
  &__internal
    width: 400px
    margin: 20vh auto 0
    monospaced-font()
  h1
    font-size: 28px
    margin-bottom: 20px
    position: relative
    .favicon
      position: absolute
      width: 30%
      max-width: 120px
      height: auto
      right: 0
      bottom: 0
  .link
    font-size: 24px
    &:hover
      text-decoration: underline

@media (max-width: 540px)
  .index
    &__internal
      width: 300px
@media (max-width: 340px)
  .index
    &__internal
      width: 260px
</style>
