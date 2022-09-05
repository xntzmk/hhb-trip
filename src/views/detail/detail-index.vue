<script setup>
import { useRoute, useRouter } from 'vue-router'
import { fetchDetailInfos } from '@/service'
import { computed, ref } from 'vue'
import DetailSwipe from './modules/detail-swipe.vue'
import DetailInfos from './modules/detail-infos.vue'
import DetailFacility from './modules/detail-facility.vue'
import DetailLandlord from './modules/detail-landlord.vue'
import DetailComment from './modules/detail-comment.vue'
import DetailNotive from './modules/detail-notive.vue'
import DetailMap from './modules/detail-map.vue'
import DetailIntro from './modules/detail-intro.vue'

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
    <template v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos :top-infos="mainPart.topModule" />
      <detail-facility
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <detail-landlord :landlord="mainPart.dynamicModule.landlordModule" />
      <detail-comment :comment="mainPart.dynamicModule.commentModule" />
      <detail-notive
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <detail-map :position="mainPart.dynamicModule.positionModule" />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </template>
    <div class="footer">
      <div class="text">你好呀</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-index {
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
      width: 123px;
    }

    .text {
      margin-top: 12px;
      font-size: 20px;
      color: #7688a7;
    }
  }
}
</style>
