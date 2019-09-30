import request from '@/utils/request'

export function getDataList(data) {
  return request({
    url: '/dataquery/show',
    method: 'get',
    data
  })
}
export function getCompareDataList(data, type) {
  const compareUrl = type === '1' ? '/dataquery/comparisonbydate' : '/dataquery/comparisonbyzone'
  return request({
    url: compareUrl,
    method: 'post',
    data
  })
}
