// vite里加载图片的方法，webpack直接在模板中使用require函数
export const loadAssetsUrl = image => {
  // 参数一: 相对路径
  // 参数二: 当前路径的url
  return new URL('../assets/img/' + image, import.meta.url).href
}
