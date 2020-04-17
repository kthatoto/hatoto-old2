<template lang="pug">
h1.title {{ title }}
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup (_, context) {
    const title = ref<string>("hatoto");
    return { title }
  }
})
</script>

<style lang="stylus" scoped>
</style>
