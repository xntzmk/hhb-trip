<script setup>
import tabBarData from '@/assets/data/tabbar'
import { loadAssetsUrl } from '@/utils/loadAssets'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const curIndex = ref(0)
const route = useRoute()
// 路由跳转bug修复
watch(route, newRoute => {
  const index = tabBarData.findIndex(item => item.path === newRoute.path)
  index > 0 && (curIndex.value = index)
})
</script>

<template>
  <div class="tab-bar">
    <van-tabbar route v-model="curIndex" active-color="#ff9854">
      <template
        v-for="({ image, imageActive, path, text }, index) in tabBarData"
        :key="image"
      >
        <van-tabbar-item :to="path">
          <template #icon>
            <img
              :src="loadAssetsUrl(curIndex === index ? imageActive : image)"
              alt=""
            />
          </template>
          <span class="text">{{ text }}</span>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped>
.tab-bar {
  height: 50px;
  // 局部修改ui库变量
  // --van-tabbar-item-font-size: 30px;
  .van-tabbar-item__icon img {
    height: 24px;
  }
}
</style>
