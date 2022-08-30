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
    <template
      v-for="({ image, imageActive, path, text }, index) in tabBarData"
      :key="image"
    >
      <div
        class="tab-bar-item"
        :class="{ active: curIndex === index }"
        @click="handleItemClick(index, path)"
      >
        <img
          :src="loadAssetsUrl(curIndex === index ? imageActive : image)"
          alt=""
        />
        <span class="text">{{ text }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  border-top: 1px solid #f3f3f3;

  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.active {
      color: var(--theme-color);
    }

    img {
      width: 36px;
    }

    .text {
      font-size: 12px;
      margin-top: 2px;
    }
  }
}
</style>
