import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/authentication/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/me',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/authentication/logout',
    method: 'post'
  })
}
