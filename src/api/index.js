import request from '../utils/request'

export default {
  login (username, password, captcha, idKey) {
    let data = {
      username, password, captcha, idKey
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
      username, password, captcha, idKey
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
      content, id
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
  },
  GetInformation () {
    return request({
      url: '/user/Information',
      method: 'get'
    })
  },
  PutInformation () {
    return request({
      url: '/user/Information',
      method: 'put'
    })
  },
  PostCode (content, category, description, title, tags, ExpireTime, authority, CodePassword) {
    let data = {
      content, category, description, title, tags, ExpireTime, authority, CodePassword
    }
    return request({
      url: '/code/PostCode',
      method: 'post',
      data
    })
  },
  GetMyCode () {
    return request({
      url: '/code/GetMyCode',
      method: 'get'
    })
  }
}

