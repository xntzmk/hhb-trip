<script setup>
import { useRoute, useRouter } from 'vue-router'
import { fetchDetailInfos } from '@/service'
import { computed, ref, toRefs } from 'vue'

const route = useRoute()
const router = useRouter()
const houseId = route.params.id

// 详情数据
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
fetchDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})

const onClickLeft = () => {
  router.back()
}
</script>

<template>
  <div class="detail-index">
    <van-nav-bar
      title="房屋详情"
      left-text="首页"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<style lang="scss" scoped>
.detail-index {
}
</style>
