<template lang="pug">
.index
  Title
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Title from '@/components/Title.vue'

export default defineComponent({
  components: { Title },
  setup (_, context) {
    return {}
  }
})
</script>

<style lang="stylus" scoped>
</style>
