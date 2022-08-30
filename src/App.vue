<script setup>
import TabBar from './components/tab-bar/tab-bar.vue'

const props = defineProps({})
const emits = defineEmits([])
</script>

<template>
  <div class="app">
    <router-view></router-view>
    <TabBar />
  </div>
</template>

<style lang="scss" scoped></style>
