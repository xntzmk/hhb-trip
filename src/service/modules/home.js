import QYRequest from '../request'

export function fetchHomeSuggests() {
  return QYRequest.get({
    url: 'home/hotSuggests'
  })
}

export function fetchHomeCategories() {
  return QYRequest.get({
    url: 'home/categories'
  })
}
