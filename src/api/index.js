import request from '../utils/request'

export default {
  getUsername () {
    return request({
      url: '/user/getUsername',
      method: 'get'
    })
  },
  login (username, password, captcha, idKey) {
    let data = {
      username,
      password,
      captcha,
      idKey
    }
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
  },
  exit () {
    return request({
      url: '/user/login/exit',
      method: 'get'
    })
  },
  captcha () {
    return request({
      url: '/user/captcha',
      method: 'get'
    })
  },
  register (username, password, captcha, idKey) {
    let data = {
      username,
      password,
      captcha,
      idKey
    }
    return request({
      url: '/user/register',
      method: 'post',
      data
    })
  },
  getAiKnow () {
    return request({
      url: '/aiKnow',
      method: 'get'
    })
  },
  putAiKnow (content, id) {
    let data = {
      content,
      id
    }
    return request({
      url: '/aiKnow',
      method: 'put',
      data
    })
  },
  DeleteAiKnowList () {
    return request({
      url: '/aiKnow/deleteList',
      method: 'delete'
    })
  }
}

