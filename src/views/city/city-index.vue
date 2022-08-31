<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { fetchCityAll } from '@/service'
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from 'pinia'

const router = useRouter()

// 搜索框功能
const searchValue = ref('')
const onCancel = () => {
  router.go(-1)
}

// 标签页切换
const tabActive = ref(0)

/**
 * 在组件内发送网络请求，有2个缺点:
 * 1. 如果网络请求太多，那么页面组件中就包含大量的对于网络请求和数据的处理逻辑
 * 2. 如果页面封装了很多的子组件且子组件需要这些数据，组件必须一步步将数据传递过去(props)
 */
// 请求城市数据
// const cityAll = ref({})
// fetchCityAll().then(res => {
//   cityAll.value = res.data
// })

// 使用pinia管理数据
const cityStore = useCityStore()
cityStore.fetchCityAllData()
const { allCities } = storeToRefs(cityStore)
</script>

<template>
  <div class="city-index">
    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      shape="round"
      show-action
      placeholder="城市/区域/位置"
      @cancel="onCancel"
    />

    <!-- 标签页 -->
    <van-tabs
      v-model:active="tabActive"
      color="var(--theme-color)"
      line-height="2"
    >
      <template v-for="(value, key) in allCities" :key="key">
        <van-tab :title="value.title" />
      </template>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.city-index {
}
</style>
