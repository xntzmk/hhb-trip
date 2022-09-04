import QYRequest from '../request'
export function fetchDetailInfos(houseId) {
  return QYRequest.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}
