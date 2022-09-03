import { getDiffDays } from '@/utils/formatDate'
import { defineStore } from 'pinia'

const startDate = new Date()
const endDate = new Date().getTime() + 24 * 60 * 60 * 1000

const useMainStore = defineStore('main', {
  state: () => ({
    token: '',

    startDate,
    endDate
  }),
  getters: {
    /**
     * 返回时间差值
     */
    dateGap(state) {
      return getDiffDays(state.startDate, state.endDate)
    }
  },
  actions: {}
})

export default useMainStore
