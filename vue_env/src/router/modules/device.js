import Layout from '@/layout'

// 设备管理路由
const device = {
  path: '/device',
  component: Layout,
  redirect: '/device/monitorPoint/list',
  name: 'Device',
  meta: {
    title: '设备管理',
    icon: 'device'
  },
  children: [{
      path: 'monitorPoint/list',
      name: 'MonitorPointList',
      component: () => import('@/views/device/MonitorPoint/List'),
      meta: {
        title: '监控点管理'
      }
    },
    {
      path: 'monitorPoint/add',
      name: 'MonitorPointAdd',
      component: () => import('@/views/device/MonitorPoint/Add'),
      meta: {
        title: '新增监控点'
      },
      hidden: true
    },
    {
      path: 'device/list',
      name: 'List',
      component: () => import('@/views/device/Device/List'),
      meta: {
        title: '监控设备管理'
      }
    },
    {
      path: 'device/add',
      name: 'deviceAdd',
      component: () => import('@/views/device/Device/Form'),
      meta: {
        title: '新增设备'
      },
      hidden: true
    },
    {
      path: 'device/modify/:id',
      name: 'deviceModify',
      component: () => import('@/views/device/Device/Form'),
      meta: {
        title: '修改设备'
      },
      hidden: true
    },
    {
      path: 'mapPoint',
      name: 'mapPoint',
      component: () => import('@/views/device/MapPoint/index'),
      meta: {
        title: '坐标管理'
      }
    },
  ]
}

export default device
