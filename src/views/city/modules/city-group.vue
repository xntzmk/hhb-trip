<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

// 获取城市组标题列表
const indexList = computed(() => [
  '#',
  ...props.groupData.cities.map(item => item.group)
])

// 不开吸顶效果时处理索引高亮
// const currentIndex = ref('')
// const handleIndexChange = index => {
//   currentIndex.value = index
// }
</script>

<template>
  <div class="city-group">
    <van-index-bar
      :sticky="true"
      highlight-color="var(--theme-color)"
      :index-list="indexList"
    >
      <!-- 热门数据 -->
      <div class="group-item-hot">
        <van-index-anchor class="group-title" index="热门" />
        <div class="group-list-hot">
          <template
            v-for="{ cityId, cityName } in groupData.hotCities"
            :key="cityId"
          >
            <div class="city-hot">
              {{ cityName }}
            </div>
          </template>
        </div>
      </div>

      <!-- 城市数据 -->
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
  .group-list-hot {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    padding-right: 25px;

    .city-hot {
      margin: 6px 0;
      width: 70px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border-radius: 14px;
      font-size: 12px;
      color: #000;
      background-color: #fff4ec;
    }
  }
  .group-title {
    &.active {
      --van-index-anchor-text-color: var(--theme-color);
    }
  }
}
</style>
