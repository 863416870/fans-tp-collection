
import Layout from '@/layout'

//气象路由
const weather =   {
  path: '/weather',
  component: Layout,
  redirect: '/weather/temp',
  name: 'Weather',
  meta: { title: '气象数据',icon: 'weather' },
  children: [
    {
      path: 'temp',
      name: 'TEMP',
      component: () => import('@/views/weather/TEMP'),
      meta: { title: '温度数据' }
    },
    {
      path: 'humi',
      name: 'HUMI',
      component: () => import('@/views/weather/HUMI'),
      meta: { title: '湿度数据' }
    },
    {
      path: 'illum',
      name: 'ILLUM',
      component: () => import('@/views/weather/ILLUM'),
      meta: { title: '照度数据' }
    },
    {
      path: 'ws',
      name: 'WS',
      component: () => import('@/views/weather/WS'),
      meta: { title: '风速数据' }
    },
    {
      path: 'wd',
      name: 'WD',
      component: () => import('@/views/weather/WD'),
      meta: { title: '风力数据' }
    },

  ]
}

export default weather
