import request from '@/utils/request'

export function getCommonInfo() {
  return request({
    url: '/common/info',
    method: 'get',
  })
}
