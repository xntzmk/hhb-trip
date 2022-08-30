<script setup>
import HomeNavBar from './home-nav-bar.vue'
import HomeSearch from './home-search.vue'
</script>

<template>
  <div class="home-index">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search />
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
