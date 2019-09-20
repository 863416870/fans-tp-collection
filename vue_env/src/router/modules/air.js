
import Layout from '@/layout'

//大气路由
const air =   {
  path: '/air',
  component: Layout,
  redirect: '/air/pm25',
  name: 'Air',
  meta: { title: '大气数据', icon: 'air' },
  children: [
    {
      path: 'pm25',
      name: 'PM25',
      component: () => import('@/views/air/PM25'),
      meta: { title: 'PM2.5数据' }
    },
    {
      path: 'pm10',
      name: 'PM10',
      component: () => import('@/views/air/PM10'),
      meta: { title: 'PM10数据' }
    },
    {
      path: 'so2',
      name: 'SO2',
      component: () => import('@/views/air/SO2'),
      meta: { title: 'SO2数据' }
    },
    {
      path: 'no',
      name: 'NO',
      component: () => import('@/views/air/NO'),
      meta: { title: 'NO数据' }
    },
    {
      path: 'o3',
      name: 'O3',
      component: () => import('@/views/air/O3'),
      meta: { title: 'O3数据' }
    },
    {
      path: 'co',
      name: 'CO',
      component: () => import('@/views/air/CO'),
      meta: { title: 'CO数据' }
    },
  ]
}

export default air
