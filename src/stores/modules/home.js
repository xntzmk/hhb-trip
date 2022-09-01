import { defineStore } from 'pinia'
import { fetchHomeSuggests } from '@/service'

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: []
  }),
  actions: {
    async fetchHotSuggestsData() {
      const res = await fetchHomeSuggests()
      this.hotSuggests = res.data
    }
  }
})

export default useHomeStore
