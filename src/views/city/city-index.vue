<script setup></script>

<template>
  <div class="city-index">
    <h1>city-index</h1>
    <template v-for="item in 100">
      <div>item{{ item }}</div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.city-index {
}
</style>
