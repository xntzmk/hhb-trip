import { defineStore } from 'pinia'
import {
  fetchHomeCategories,
  fetchHomeSuggests,
  fetchHomeHouseList
} from '@/service'

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],

    currentPage: 1, // 当前页
    hotPicks: [] // 热门精选
  }),
  actions: {
    async fetchHotSuggestsData() {
      const res = await fetchHomeSuggests()
      this.hotSuggests = res.data
    },

    async fetchHomeCategoriesData() {
      const res = await fetchHomeCategories()
      this.categories = res.data
    },

    async fetchHomeHouseListData() {
      const res = await fetchHomeHouseList(this.currentPage++)
      this.hotPicks.push(...res.data)
    }
  }
})

export default useHomeStore
