<script setup>
import { useRoute } from 'vue-router'
import TabBar from './components/tab-bar/tab-bar.vue'

const props = defineProps({})
const emits = defineEmits([])
const route = useRoute()
</script>

<template>
  <div class="app">
    <router-view></router-view>
    <TabBar v-show="!route.meta.hideTabBar" />
  </div>
</template>

<style lang="scss" scoped></style>
