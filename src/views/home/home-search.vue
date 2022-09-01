<script setup>
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { formatMonthDay } from '@/utils/formatDate'

const router = useRouter()

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

const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

// 日期范围
const nowDate = new Date().getTime()
const startDate = ref(formatMonthDay(nowDate))
const endDate = ref(formatMonthDay(nowDate + 24 * 60 * 60 * 1000))
</script>

<template>
  <div class="home-search">
    <!-- 位置信息 -->
    <div class="city-search">
      <div class="city" @click="handleCityClick">
        {{ currentCity.cityName || '福州' }}
      </div>
      <div class="position" @click="fetchCurrentPostion">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 日期选择 -->
    <div class="section date-range">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
        <div class="stay">共{{ 1 }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
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

    .stay {
      flex: 1;
      text-align: center;
      font-size: 12px;
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
}
</style>
