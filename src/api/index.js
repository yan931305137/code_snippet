import request from '../utils/request'

export default {
  login (username, password) {
    let data = {
      username,
      password
    }
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
  },
  register (newUsername, newPassword) {
    let data = {
      newUsername,
      newPassword
    }
    return request({
      url: '/user/register',
      method: 'post',
      data
    })
  }
}

