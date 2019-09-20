
import Layout from '@/layout'

//设备管理路由
const device =   {
  path: '/device',
  component: Layout,
  redirect: '/device/monitorPoint/list',
  name: 'Device',
  meta: { title: '设备管理',icon: 'device' },
  children: [
    {
      path: '/monitorPoint/list',
      name: 'MonitorPointList',
      component: () => import('@/views/device/MonitorPointList'),
      meta: { title: '监控点管理' }
    },
    {
      path: 'coordinate',
      name: 'Coordinate',
      component: () => import('@/views/device/Coordinate'),
      meta: { title: '坐标管理' }
    },
    {
      path: 'list',
      name: 'List',
      component: () => import('@/views/device/List'),
      meta: { title: '监控设备管理' }
    },
  ]
}

export default device
