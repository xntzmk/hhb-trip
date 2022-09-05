<script setup>
import { useRoute, useRouter } from 'vue-router'
import { fetchDetailInfos } from '@/service'
import { computed, ref, watch } from 'vue'
import DetailSwipe from './modules/detail-swipe.vue'
import DetailInfos from './modules/detail-infos.vue'
import DetailFacility from './modules/detail-facility.vue'
import DetailLandlord from './modules/detail-landlord.vue'
import DetailComment from './modules/detail-comment.vue'
import DetailNotive from './modules/detail-notive.vue'
import DetailMap from './modules/detail-map.vue'
import DetailIntro from './modules/detail-intro.vue'
import useScroll from '@/hooks/useScroll'

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

// 处理tab-control的显示
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const isShowTabControl = computed(() => scrollTop.value >= 310)

const activeIndex = ref('')

// 动态绑定子元素ref: 数组方式
// const refList = []
// const setChildRef = value => {
// refList.push(value.$el)
// console.log(value)
// }

const tabRef = ref()
const childRefMap = ref({})
const titleList = computed(() => Object.keys(childRefMap.value))
const setChildRef = value => {
  if (!value) {
    return // unMounted的时候，value为null
  }
  const title = value.$el.getAttribute('title') // 获取组件上的title属性
  childRefMap.value[title] = value.$el
}

const gap = computed(() => tabRef.value?.clientHeight || 0) // tab页的高度

// 控制点击后watch的监听
let tabClickFlag = false
let targetDistance = 0

const onClickTab = () => {
  const currentKey = Object.keys(childRefMap.value)[activeIndex.value] // 当前点击tab标签的key
  let distance = childRefMap.value[currentKey].offsetTop - gap.value // 默认定位需要去掉tab页高度
  activeIndex.value === 0 && (distance += gap.value)

  tabClickFlag = true
  targetDistance = distance

  detailRef.value.scrollTo({
    top: distance,
    behavior: 'smooth'
  })
  // tabClickFlag = false // 这个位置改变flag不对，此时可能还在滚动
}

const offsetTopList = computed(() =>
  Object.values(childRefMap.value).map(item => item.offsetTop)
)

/**
 * 监听滚动，设置tab-control的索引
 */
watch(scrollTop, () => {
  // 到达目标位置，开启监听
  if (Math.floor(scrollTop.value) === targetDistance) {
    tabClickFlag = false
  }

  if (!tabClickFlag) {
    /**
     * 匹配当前索引
     */
    let position = offsetTopList.value.length - 1 // 最大索引
    for (const index in offsetTopList.value) {
      let distance = offsetTopList.value[index]

      if (index > 0) {
        distance -= gap.value
      }
      // 如果找不到break的条件则取最大索引
      if (distance > scrollTop.value) {
        position = index - 1
        break
      }
    }

    if (activeIndex.value !== Math.max(0, position)) {
      activeIndex.value = Math.max(0, position)
    }

    // forEach不能跳出循环
    // offsetTopList.value.forEach((item, index) => {
    //   const distance = index === 0 ? item : item - 46
    //   if (scrollTop.value > distance) {
    //     activeIndex.value = index
    //   }
    // })
  }
})
</script>

<template>
  <div
    class="detail-index"
    ref="detailRef"
  >
    <div
      class="tab-control"
      ref="tabRef"
      v-if="isShowTabControl"
    >
      <van-tabs
        title-active-color="var(--theme-color)"
        v-model:active="activeIndex"
        @click-tab="onClickTab"
      >
        <van-tab
          :title="title"
          v-for="title in titleList"
        />
      </van-tabs>
    </div>

    <van-nav-bar
      title="房屋详情"
      left-text="首页"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- v-memo防止由于tab-control的v-if显示，导致setChildRef不断调用 -->
    <div
      class="main"
      v-memo="[mainPart]"
    >
      <template v-if="mainPart">
        <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
        <detail-infos
          title="描述"
          :ref="setChildRef"
          :top-infos="mainPart.topModule"
        />
        <detail-facility
          title="设施"
          :ref="setChildRef"
          :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
        />
        <detail-landlord
          title="房东"
          :ref="setChildRef"
          :landlord="mainPart.dynamicModule.landlordModule"
        />
        <detail-comment
          title="评论"
          :ref="setChildRef"
          :comment="mainPart.dynamicModule.commentModule"
        />
        <detail-notive
          title="须知"
          :ref="setChildRef"
          :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
        />
        <detail-map
          title="周边"
          :ref="setChildRef"
          :position="mainPart.dynamicModule.positionModule"
        />
        <detail-intro :price-intro="mainPart.introductionModule" />
      </template>
    </div>

    <div class="footer">
      <div class="text">你好呀</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-index {
  height: 100vh;
  overflow-y: auto; // window不滚动

  .tab-control {
    position: fixed;
    width: 100%;
    z-index: 10;
    height: 44px;
    background-color: #fff;
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 240px;

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
