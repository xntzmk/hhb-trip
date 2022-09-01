<script setup>
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

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
}
</style>
