import axios from 'axios'

import {Loading, Message} from 'element-ui' // 项目中我用了element-ui组件库，Message是一个消息弹框，Loading是加载图,按需导入

export const BaseURL = 'http://localhost:8063/api'

const service = axios.create({
  baseURL: BaseURL, // 修改为后端服务的端口号, // api 的 base_url, url = base_url + request_url
  timeout: 50000 // request timeout
})

let loading // 定义loading变量

function startLoading () { // 使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading () { // 使用Element loading-close 方法
  loading.close()
}

// 请求拦截  设置统一header
service.interceptors.request.use(
  config => {
    // 加载
    startLoading()
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截  401 token过期处理
service.interceptors.response.use(
  response => {
    endLoading()
    return response
  },
  error => {
    // 错误提醒
    endLoading()
    const {status} = error.response
    if (status === 401) {
      // 清除本地值
      localStorage.clear()
    }
    return Message.error('请先登录再进行操作!')
  }
)

export default service
