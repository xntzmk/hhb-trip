import QYRequest from '../request'

// 获取城市数据
export function fetchCityAll() {
  return QYRequest.get({
    url: 'city/all'
  })
}
