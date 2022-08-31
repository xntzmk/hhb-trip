<script setup>
import { ref } from 'vue'

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

// 不开吸顶效果时处理索引高亮
// const currentIndex = ref('')
// const handleIndexChange = index => {
//   currentIndex.value = index
// }
</script>

<template>
  <div class="city-group">
    <van-index-bar :sticky="true" highlight-color="var(--theme-color)">
      <template v-for="{ cities, group } in groupData.cities" :key="group">
        <div class="group-item">
          <van-index-anchor class="group-title" :index="group" />
          <div class="group-list">
            <template v-for="{ cityId, cityName } in cities" :key="cityId">
              <van-cell :title="cityName" />
            </template>
          </div>
        </div>
      </template>
    </van-index-bar>
  </div>
</template>

<style lang="scss" scoped>
.city-group {
  position: relative;
  z-index: -1;
  .group-title {
    &.active {
      --van-index-anchor-text-color: var(--theme-color);
    }
  }
}
</style>
