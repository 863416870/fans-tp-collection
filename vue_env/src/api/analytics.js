import request from '@/utils/request'

export function getAnalyticsData(data) {
  return request({
    url: '/analysis/result',
    method: 'post',
    data
  })
}
