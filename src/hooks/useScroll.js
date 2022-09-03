import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 监听document滚动，变量方式 => 便于管理
 */
export default function useScroll() {
  const isReachBottom = ref(false)
  const scrollListenHandler = () => {
    window.addEventListener('scroll', () => {
      const clientHeight = document.documentElement.clientHeight
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop

      // 判断是否滚动到底部
      if (clientHeight + scrollTop + 1 >= scrollHeight) {
        isReachBottom.value = true
      }
    })
  }
  onMounted(() => {
    window.addEventListener('scroll', scrollListenHandler)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListenHandler)
  })

  return { isReachBottom }
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
//         callback()
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
