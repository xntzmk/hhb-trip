<script setup>
import { storeToRefs } from 'pinia'
import useHomeStore from '@/stores/modules/home'

import HouseItemType9 from '@/components/house-items/house-item-type9.vue'
import HouseItemType3 from '@/components/house-items/house-item-type3.vue'

const homeStore = useHomeStore()
const { hotPicks } = storeToRefs(homeStore)
</script>

<template>
  <div class="home-hot-picks">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template
        v-for="{ data, discoveryContentType } in hotPicks"
        :key="data.houseId"
      >
        <house-item-type9 v-if="discoveryContentType === 9" :item-data="data" />
        <house-item-type3 v-if="discoveryContentType === 3" :item-data="data" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-hot-picks {
  padding: 10px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
