import { fetchCityAll } from '@/service'
import { defineStore } from 'pinia'

const useCityStore = defineStore('city', {
  state: () => ({
    allCities: {},
    currentCity: {}
  }),
  actions: {
    async fetchCityAllData() {
      const res = await fetchCityAll()
      this.allCities = res.data
    }
  }
})

export default useCityStore
