<script setup>
import { useRoute } from 'vue-router'
import TabBar from './components/tab-bar/tab-bar.vue'
import Loading from './components/loading/loading.vue'

const props = defineProps({})
const emits = defineEmits([])
const route = useRoute()
</script>

<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive includes="home-index">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <TabBar v-show="!route.meta.hideTabBar" />
    <loading />
  </div>
</template>

<style lang="scss" scoped></style>
