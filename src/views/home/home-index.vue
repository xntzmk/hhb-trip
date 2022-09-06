<script setup>
import useHomeStore from '@/stores/modules/home'

import HomeNavBar from './modules/home-nav-bar.vue'
import HomeSearch from './modules/home-search.vue'
import HomeCategory from './modules/home-category.vue'
import HomeHotPicks from './modules/home-hot-picks.vue'

import useScroll from '@/hooks/useScroll'
import { computed, onActivated, ref, watch } from 'vue'
import SearchBar from '@/components/search-bar/search-bar.vue'

const homeStore = useHomeStore()
homeStore.fetchHotSuggestsData()
homeStore.fetchHomeCategoriesData()
homeStore.fetchHomeHouseListData()

/**
 * 模拟滚动底部加载更多
 */
const loadMore = () => {
  return homeStore.fetchHomeHouseListData()
}

const { isReachBottom, scrollTop } = useScroll()

watch(isReachBottom, newValue => {
  if (newValue) {
    loadMore().then(() => {
      isReachBottom.value = false
    })
  }
})

const isShowSearchBar = computed(() => scrollTop.value >= 360)
onActivated(() => {
  window.scrollTo({
    top: scrollTop.value
  })
})
</script>

<template>
  <div class="home-index">
    <home-nav-bar />
    <div class="banner">
      <img
        src="@/assets/img/home/banner.webp"
        alt=""
      />
    </div>
    <home-search />
    <home-category />
    <div
      class="search-bar-contain"
      v-if="isShowSearchBar"
    >
      <search-bar />
    </div>
    <home-hot-picks />
    <van-button
      type="primary"
      @click="loadMore"
    >
      加载更多
    </van-button>
  </div>
</template>

<style lang="scss" scoped>
.home-index {
  .banner {
    img {
      width: 100%;
    }
  }

  .search-bar-contain {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
}
</style>
