import request from '@/utils/request'

export function getDeviceList(data) {
  return request({
    url: '/device/list',
    method: 'get',
    data
  })
}

export function updateDeviceStatus(data) {
  return request({
    url: '/device/statusupdate',
    method: 'post',
    data
  })
}

export function getDeviceTypeList(data) {
  return request({
    url: '/devicetype/list',
    method: 'get',
    data
  })
}

export function addDevice(data) {
  return request({
    url: '/device/addpost',
    method: 'post',
    data
  })
}

export function modifyDevice(data) {
  return request({
    url: '/device/modifypost',
    method: 'post',
    data
  })
}

export function getDeviceDetail(data) {
  return request({
    url: '/device/detail',
    method: 'post',
    data
  })
}

// 监控点api
export function addMonitor(data) {
  return request({
    url: '/zone/addpost',
    method: 'post',
    data
  })
}

export function detailMonitor(data) {
  return request({
    url: '/zone/detail',
    method: 'get',
    data
  })
}

export function updateMonitor(data) {
  return request({
    url: '/zone/modifypost',
    method: 'post',
    data
  })
}

export function deleteMonitor(data) {
  return request({
    url: '/zone/delete',
    method: 'get',
    data
  })
}

