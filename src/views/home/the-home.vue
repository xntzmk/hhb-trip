<script setup>
import HomeNavBar from './home-nav-bar.vue'
</script>

<template>
  <div class="the-home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.the-home {
  .banner {
    img {
      width: 100%;
    }
  }
}
</style>
