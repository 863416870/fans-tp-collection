import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/warn/rule/list',
    method: 'get',
    data
  })
}

