<script setup>
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
</script>

<template>
  <div class="home-search">
    <div class="city" @click="handleCityClick">福州</div>
    <div class="position" @click="fetchCurrentPostion">
      <span class="text">我的位置</span>
      <img src="@/assets/img/home/icon_location.png" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-search {
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
</style>
