import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  // process.env 属性返回包含用户环境的对象
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // 设置请求超时时间
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers:{'Content-Type': 'application/x-www-form-urlencoded'}
})
// 全局的请求次数，请求的间隙
service.defaults.retry = 4;
service.defaults.retryDelay = 1000;

// 请求拦截器，在请求或响应被then或catch处理前拦截它们
service.interceptors.request.use(
  // axios的请求配置config
  config => {
    // 在发送请求之前做些什么
    // step1: 容错处理
    console.log('step1开始')
    console.log('step1请求api链接is--' + config.url)
    if (!config.url) {
      /* eslint-disable-next-line */
      console.error('request need url')
      // 抛出自定义错误
      throw new Error({
        source: 'axiosInterceptors',
        message: '请求需要填写URL'
      })
    }
    // 默认使用 get 请求
    if (!config.method) {
      config.method = 'get'
    }
    // 大小写容错
    config.method = config.method.toLowerCase()
    console.log('step1请求方法is--' + config.method)
    // 检测post和get传数据时的字段

    if (config.method === 'get') {
      if (!config.params) { // 防止字段用错
        config.params = config.data || {}
      }
    } else if (config.method === 'post') {
      if (!config.data) { // 防止字段用错
        config.data = config.params || {}
      }
      // 检测是否包含文件类型, 若包含则进行 formData 封装
      // 检查子项是否有 Object 类型, 若有则字符串化
      let hasFile = false
      Object.keys(config.data).forEach((key) => {
        if (typeof config.data[key] === 'object') {
          const item = config.data[key]
          // instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
          if (item instanceof FileList || item instanceof File || item instanceof Blob) {
            hasFile = true
          } else if (Object.prototype.toString.call(item) === '[object Object]') {
            config.data[key] = JSON.stringify(config.data[key])
          }
        }
      })
      // 检测到存在文件使用 FormData 提交数据
      if (hasFile) {
        const formData = new FormData()
        Object.keys(reqConfig.data).forEach((key) => {
          formData.append(key, config.data[key])
        })
        config.data = formData
        console.log('step1请求参数is--' + config.data)
      } else {
        // 对 data 进行任意转换处理
         config.transformRequest = [(data) => {
          let src = ''
          for (const item in data) {
            src += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
          }
          console.log('step1请求参数is--' + src)
          return src
        }]
      }
    } else {
      // TODO: 其他类型请求数据格式处理
      /* eslint-disable-next-line */
      console.warn(`其他请求类型: ${reqConfig.method}, 暂无自动处理`)
    }
    // step2: auth 处理
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    console.log(error) // for debug
    return Promise.reject(error)
  }
)


// 响应式拦截器
service.interceptors.response.use(
  async(response) => {
    const res = response.data
    const config = response.config
    // 此处处理状态不为0的处理 根据业务代码处理
    if (res.code !== 0) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // 请求失败、错误处理回调
    var originalRequest = error.config;
    if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 && !originalRequest._retry){
      originalRequest._retry = true
      return service.request(originalRequest);
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
