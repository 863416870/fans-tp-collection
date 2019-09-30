import request from '@/utils/request'

export function getList(data) {

  
  return request({
    url: '/zone/list',
    method: 'get',
    data
  })
}


