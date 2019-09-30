
import Layout from '@/layout'

// 设备管理路由
const device = {
  path: '/device',
  component: Layout,
  redirect: '/device/monitorPoint/list',
  name: 'Device',
  meta: { title: '设备管理', icon: 'device' },
  children: [
    {
      path: 'monitorPoint/list',
      name: 'MonitorPointList',
      component: () => import('@/views/device/MonitorPoint/list'),
      meta: { title: '监控点管理' }
    },
    {
      path: 'monitorPoint/add',
      name: 'MonitorPointAdd',
      component: () => import('@/views/device/MonitorPoint/add'),
      meta: { title: '新增监控点' },
      hidden: true
    },
    {
      path: 'device/list',
      name: 'List',
      component: () => import('@/views/device/Device/list'),
      meta: { title: '监控设备管理' }
    }
  ]
}

export default device
