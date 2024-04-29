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
  GetInformation () {
    return request({
      url: '/user/Information',
      method: 'get'
    })
  },
  PostInformation (UserName, Avatar, Email, Mobile, Address, Birthday, gender, status) {
    let Gender
    if (gender === '男' || gender === '1') {
      Gender = 1
    } else if (gender === '女' || gender === '2') {
      Gender = 2
    } else {
      Gender = 3
    }
    let data = {
      UserName, Avatar, Email, Mobile, Address, Birthday, Gender, status
    }
    return request({
      url: '/user/Information',
      method: 'put',
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
  },
  GetCodes () {
    return request({
      url: '/code/GetCodes',
      method: 'get'
    })
  },
  SearchGetCodes (value) {
    let data = {value}
    return request({
      url: '/code/SearchGetCodes',
      method: 'post',
      data
    })
  },
  PostLike (CodeId) {
    let data = {CodeId}
    return request({
      url: '/code/PostLike',
      method: 'post',
      data
    })
  },
  PostCollect (CodeId) {
    let data = {CodeId}
    return request({
      url: '/code/PostCollect',
      method: 'post',
      data
    })
  },
  GetTopSlider () {
    return request({
      url: '/top/slider',
      method: 'get'
    })
  },
  GetTopHot (value) {
    let url
    if (value === 1) {
      url = '/top/hot'
    } else if (value === 2) {
      url = '/top/new'
    } else if (value === 3) {
      url = '/top/focus'
    }
    return request({
      url: url,
      method: 'get'
    })
  },
  GetTopNew () {
    return request({
      url: '/top/new',
      method: 'get'
    })
  },
  GetTopFocus () {
    return request({
      url: '/top/focus',
      method: 'get'
    })
  }
}

