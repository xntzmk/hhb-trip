<script setup>
import { computed, ref } from 'vue'

import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'
import useHomeStore from '@/stores/modules/home'
import { storeToRefs } from 'pinia'

import { formatMonthDay, getDiffDays } from '@/utils/formatDate'

const router = useRouter()

const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

const handleCityClick = () => {
  router.push('/city')
}

// 获取当前地理位置
const fetchCurrentPostion = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
  navigator.geolocation.getCurrentPosition(
    res => {
      console.log(res)
    },
    err => {
      console.log(err)
    },
    options
  )
}

// 日期范围
const nowDate = new Date().getTime()
const startDate = ref(nowDate)
const endDate = ref(nowDate + 24 * 60 * 60 * 1000)
const dateGap = computed(() => getDiffDays(startDate.value, endDate.value))

// 日期范围组件的展示和回显
const showCalendar = ref(false)
const onConfirm = dateList => {
  showCalendar.value = false

  startDate.value = dateList[0]
  endDate.value = dateList[1]
}
</script>

<template>
  <div class="home-search">
    <!-- 位置信息 -->
    <div class="city-search bottom-gray-line">
      <div class="city" @click="handleCityClick">
        {{ currentCity.cityName || '福州' }}
      </div>
      <div class="position" @click="fetchCurrentPostion">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 日期选择 -->
    <div class="section date-range" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ formatMonthDay(startDate) }}</span>
        </div>
        <div class="stay">
          共
          <span style="padding: 0 1px">{{ dateGap }}</span>
          晚
        </div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ formatMonthDay(endDate) }}</span>
        </div>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      color="var(--theme-color)"
      type="range"
      @confirm="onConfirm"
    />

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-search {
  .city-search {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;
    .city {
      flex: 1;
      font-size: 15px;
      padding: 0 10px 0 0;
      color: #333;
    }

    .position {
      width: 74px;
      display: flex;
      align-items: center;

      .text {
        position: relative;
        top: 1.5px;
        font-size: 12px;
      }

      img {
        margin-left: 5px;
        width: 18px;
      }
    }
  }

  .section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
      flex: 1;
      display: flex;
      height: 44px;
      align-items: center;
    }
    .end {
      min-width: 30%;
      padding-left: 20px;
    }
  }

  .date-range {
    .stay {
      flex: 1;
      text-align: center;
      font-size: 13px;
      color: #666;
    }

    .date {
      display: flex;
      flex-direction: column;

      .tip {
        font-size: 12px;
        color: #999;
      }

      .time {
        margin-top: 3px;
        color: #333;
        font-size: 15px;
        font-weight: 500;
      }
    }
  }

  .price-counter {
    .start {
      border-right: 1px solid var(--line-color);
    }
  }

  .hot-suggests {
    margin: 10px 0;
    height: auto;

    .item {
      padding: 4px 8px;
      margin: 4px;
      border-radius: 14px;
      font-size: 12px;
      line-height: 1;
    }
  }
}
</style>
