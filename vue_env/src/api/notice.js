import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/warn/notice/list',
    method: 'get',
    data
  })
}

