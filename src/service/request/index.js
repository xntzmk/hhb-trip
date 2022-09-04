import useMainStore from '@/stores/modules/main'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { BASE_URL, TIMEOUT } from './config'

const mainStore = useMainStore()
const { isLoading } = storeToRefs(mainStore)

class QYRequest {
  constructor(baseURL, timeout = 6000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
    this.instance.interceptors.request.use(
      config => {
        isLoading.value = true
        return config
      },
      err => err
    )
    this.instance.interceptors.response.use(
      res => {
        isLoading.value = false
        return res
      },
      err => {
        isLoading.value = false
        return err
      }
    )
  }
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  }

  get(config) {
    return this.request({
      ...config,
      method: 'get'
    })
  }

  post(config) {
    return this.request({
      ...config,
      method: 'post'
    })
  }
}

export default new QYRequest(BASE_URL, TIMEOUT)
