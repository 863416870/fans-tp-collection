import request from '@/utils/request'

// 预警列表
export function getList(data) {
  return request({
    url: '/warn/rule/list',
    method: 'get',
    data
  })
}

// 预警列表删除/ 关闭 / 开启
export function changeStatus(data) {
  return request({
    url: '/warn/rule/updatestatus',
    method: 'post',
    data
  })
}

// 报警类型
export function getDatatypeList() {
  return request({
    url: '/datatype/list',
    method: 'get',
  })
}

// 获取监控设备
export function getDeviceList(data) {
  return request({
    url: '/device/zone/list',
    method: 'post',
    data
  })
}

// 新增预警规则
export function addRules(data) {
  return request({
    url: '/warn/rule/add',
    method: 'post',
    data
  })
}

// 预警规则详情
export function detailRules(data) {
  return request({
    url: '/warn/rule/detail',
    method: 'post',
    data
  })
}

// 修改预警规则
export function updateRules(data) {
  return request({
    url: '/warn/rule/update',
    method: 'post',
    data
  })
}
