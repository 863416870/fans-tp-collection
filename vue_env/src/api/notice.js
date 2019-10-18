import request from '@/utils/request'

// 列表
export function getList(data) {
  return request({
    url: '/warn/notice/list',
    method: 'get',
    data
  })
}
// 处理
export function handleStatus(data) {
  return request({
    url: '/warn/notice/deal',
    method: 'post',
    data
  })
}

