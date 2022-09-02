import { defineStore } from 'pinia'
import { fetchHomeCategories, fetchHomeSuggests } from '@/service'

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: []
  }),
  actions: {
    async fetchHotSuggestsData() {
      const res = await fetchHomeSuggests()
      this.hotSuggests = res.data
    },

    async fetchHomeCategoriesData() {
      const res = await fetchHomeCategories()
      this.categories = res.data
    }
  }
})

export default useHomeStore
