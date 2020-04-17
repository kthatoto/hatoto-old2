<template lang="pug">
.index
  .index__internal
    h1 hato.to
    nuxt-link.link(to="/games") games
</template>

<style lang="stylus" scoped>
.index
  &__internal
    width: 500px
    margin: 20vh auto 0
    font-family: "Courier New",Consolas,monospace
  h1
    font-size: 28px
    margin-bottom: 20px
  .link
    font-size: 24px
    &:hover
      text-decoration: underline
</style>
