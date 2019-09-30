import request from '@/utils/request'

export function getZoneList(data) {
  return request({
    url: '/zone/list',
    method: 'get',
    data
  })
}
