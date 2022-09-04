<script setup>
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => []
  }
})

// swipeData分组转换
const swipeGroup = {}
for (const item of props.swipeData) {
  const { enumPictureCategory } = item
  if (!swipeGroup.hasOwnProperty(enumPictureCategory)) {
    swipeGroup[enumPictureCategory] = []
  }
  swipeGroup[enumPictureCategory].push(item)
}
console.log(swipeGroup)

// 正则转换
const titleReg = /【(.*?)】/i
const getTitle = title => titleReg.exec(title)[1]
</script>

<template>
  <div class="detail-swipe">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <template
        v-for="(item, index) in swipeData"
        :key="index"
      >
        <van-swipe-item class="swipe-item">
          <img
            :src="item.url"
            alt=""
          />
        </van-swipe-item>
      </template>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">
          <template
            v-for="(value, key) in swipeGroup"
            :key="key"
          >
            <div
              class="item"
              :class="{
                active: swipeData[active]?.enumPictureCategory === parseInt(key)
              }"
            >
              <span>{{ getTitle(value[0].title) }}</span>
              <span
                class="position"
                v-if="swipeData[active]?.enumPictureCategory === parseInt(key)"
              >
                {{ value.findIndex(item => item === swipeData[active]) + 1 }}/{{
                  value.length
                }}
              </span>
            </div>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<style lang="scss" scoped>
.detail-swipe {
  .my-swipe {
    .swipe-item {
      img {
        width: 100%;
      }
    }

    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      display: flex;
      padding: 4px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      .item {
        margin: 0 3px;
        padding: 1px;

        &.active {
          padding: 2px 4px;
          border-radius: 5px;
          background-color: #fff;
          color: #111;
          letter-spacing: 1px;
        }
      }
    }
  }
}
</style>
