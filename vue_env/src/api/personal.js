import request from '@/utils/request'

// 修改信息
export function infoDataSubmit(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}
// 修改密码
export function pwdDataSubmit(data) {
  return request({
    url: '/user/updatepassword',
    method: 'post',
    data
  })
}

