<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 搜索框功能
const searchValue = ref('')
const onCancel = () => {
  router.go(-1)
}

// 标签页切换
const tabActive = ref(0)
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
      <van-tab title="国内·港澳台" />
      <van-tab title="海外" />
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.city-index {
}
</style>
