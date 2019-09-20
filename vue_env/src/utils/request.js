import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // step1: 容错处理
    console.log('step1开始')
    console.log('step1请求api链接is--'+config.url)
    if (!config.url) {
      /* eslint-disable-next-line */
      console.error('request need url')
      throw new Error({
        source: 'axiosInterceptors',
        message: '请求需要填写URL',
      })
    }
    // 默认使用 get 请求
    if (!config.method) {
      config.method = 'get'
    }
    // 大小写容错
    config.method = config.method.toLowerCase()
    console.log('step1请求方法is--'+config.method)
    // 参数容错
    if (config.method === 'get') {
      config.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
      if (!config.params) { // 防止字段用错
        config.params = config.data || {}
      }
    } else if (config.method === 'post') {
      config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
      if (!config.data) { // 防止字段用错
        config.data = config.params || {}
      }


      // 检测是否包含文件类型, 若包含则进行 formData 封装
      // 检查子项是否有 Object 类型, 若有则字符串化
      let hasFile = false
      Object.keys(config.data).forEach((key) => {
        if (typeof config.data[key] === 'object') {
          const item = config.data[key]
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
        console.log('step1请求参数is--'+ config.data )
      }else{
        config.transformRequest = [function (data) {
          let src = ''
          for (let item in data) {
            src += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
          }
          console.log('step1请求参数is--'+src)
          return  src

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
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  async (response) => {
    const res = response.data
    // 此处处理状态不为0的处理 根据业务代码处理
    if (res.errno !== 0) {
      Message({
        message: res.errmsg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
