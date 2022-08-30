<script setup>
import tabBarData from '@/assets/data/tabbar'
import { loadAssetsUrl } from '@/utils/loadAssets'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const curIndex = ref(0)
const router = useRouter()
const handleItemClick = (index, path) => {
  curIndex.value = index
  router.push(path)
}
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="curIndex" active-color="#ff9854">
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
  // 局部修改ui库变量
  // --van-tabbar-item-font-size: 30px;
  .van-tabbar-item__icon img {
    height: 24px;
  }
}
</style>
