import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/audit/user/list',
    method: 'get',
    data
  })
}

