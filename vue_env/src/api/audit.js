import request from '@/utils/request'

/* 用户 start */
export function getUserList(data) {
  return request({
    url: '/user/list',
    method: 'get',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function modifyUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/delete',
    method: 'get',
    data
  })
}

export function getUserDetail(data) {
  return request({
    url: '/user/get',
    method: 'get',
    data
  })
}

// 日志
export function getSyslogList(data) {
  return request({
    url: '/syslog/list',
    method: 'get',
    data
  })
}

// 登录日志
export function getLoginlogList(data) {
  return request({
    url: '/loginlog/list',
    method: 'get',
    data
  })
}
