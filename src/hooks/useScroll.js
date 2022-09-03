import { onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'underscore'

/**
 * 监听document滚动，变量方式 => 便于管理
 */
export default function useScroll() {
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollHeight = ref(0)
  const scrollTop = ref(0)

  // 节流
  const scrollListenHandler = throttle(() => {
    clientHeight.value = document.documentElement.clientHeight
    scrollHeight.value = document.documentElement.scrollHeight
    scrollTop.value = document.documentElement.scrollTop

    // 判断是否滚动到底部
    if (clientHeight.value + scrollTop.value + 1 >= scrollHeight.value) {
      isReachBottom.value = true
    }
  }, 100)

  onMounted(() => {
    window.addEventListener('scroll', scrollListenHandler)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListenHandler)
  })

  return { isReachBottom, clientHeight, scrollHeight, scrollTop }
}

/**
 * 监听document滚动，传回调函数 (多个回调不好管理)
 */
// export default function useScroll(callback) {
//   const scrollListenHandler = () => {
//     window.addEventListener('scroll', () => {
//       const clientHeight = document.documentElement.clientHeight
//       const scrollHeight = document.documentElement.scrollHeight
//       const scrollTop = document.documentElement.scrollTop

//       // 判断是否滚动到底部
//       console.log(clientHeight + scrollTop, scrollHeight)
//       if (clientHeight + scrollTop + 1 >= scrollHeight) {
//          callback && callback()
//       }
//     })
//   }
//   onMounted(() => {
//     window.addEventListener('scroll', scrollListenHandler)
//   })

//   onUnmounted(() => {
//     window.removeEventListener('scroll', scrollListenHandler)
//   })
// }
