<script setup>
import useMainStore from '@/stores/modules/main'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const { isLoading } = storeToRefs(mainStore)

const handleLoading = () => {
  isLoading.value = false
}
</script>

<template>
  <div class="loading" v-show="isLoading" @click="handleLoading">
    <div class="cover">
      <img src="@/assets/img/common/loading.webp" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba($color: #000, $alpha: 0.5);

  .cover {
    margin-bottom: 30px;
    img {
      width: 150px;
    }
  }
}
</style>
