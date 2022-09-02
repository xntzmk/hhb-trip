<script setup>
import HomeNavBar from './modules/home-nav-bar.vue'
import HomeSearch from './modules/home-search.vue'

import useHomeStore from '@/stores/modules/home'
import HomeCategory from './modules/home-category.vue'
import HomeHotPicks from './modules/home-hot-picks.vue'

const homeStore = useHomeStore()
homeStore.fetchHotSuggestsData()
homeStore.fetchHomeCategoriesData()
homeStore.fetchHomeHouseListData()

/**
 * 模拟滚动底部加载更多
 */
const loadMore = () => {
  homeStore.fetchHomeHouseListData()
}
</script>

<template>
  <div class="home-index">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search />
    <home-category />
    <home-hot-picks />
    <van-button type="primary" @click="loadMore">加载更多</van-button>
  </div>
</template>

<style lang="scss" scoped>
.home-index {
  .banner {
    img {
      width: 100%;
    }
  }
}
</style>
