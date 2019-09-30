import request from '@/utils/request'


//左侧接口
export function getCurrentWeather() {
  return request({
    url: '/homepage/currentweather',
    method: 'get',
  })
}

export function getWeatherData() {
  return request({
    url: '/homepage/weatherdata',
    method: 'get',
  })
}

export function getAirDataList() {
  return request({
    url: '/homepage/airanddustdata',
    method: 'get',
  })
}
//中间地图接口
export function getFactoryDevicePoint() {
  return request({
    url: '/homepage/pollutemap',
    method: 'get',
  })
}

//右侧接口
export function getAirCalendarDataList() {
  return request({
    url: '/api/day/list',
    method: 'get',
  })
}
export function getNoticeList(data) {
  return request({
    url: '/homepage/notices',
    method: 'get',
    data
  })
}
