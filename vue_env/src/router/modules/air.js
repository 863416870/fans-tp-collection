
import Layout from '@/layout'

// 大气路由
const air = {
  path: '/air',
  component: Layout,
  redirect: '/air/index/PM25',
  name: 'Air',
  meta: { title: '大气数据', icon: 'air' },
  children: [
    {
      path: 'index/PM25',
      name: 'PM25',
      component: () => import('@/views/air/index'),
      meta: { title: 'PM2.5数据' }
    },
    {
      path: 'index/PM10',
      name: 'PM10',
      component: () => import('@/views/air/index'),
      meta: { title: 'PM10数据' }
    },
    {
      path: 'index/SO2',
      name: 'SO2',
      component: () => import('@/views/air/index'),
      meta: { title: 'SO2数据' }
    },
    {
      path: 'index/NO',
      name: 'NO',
      component: () => import('@/views/air/index'),
      meta: { title: 'NO数据' }
    },
    {
      path: 'index/O3',
      name: 'O3',
      component: () => import('@/views/air/index'),
      meta: { title: 'O3数据' }
    },
    {
      path: 'index/CO',
      name: 'CO',
      component: () => import('@/views/air/index'),
      meta: { title: 'CO数据' }
    },
    {
      path: 'compare/PM25',
      name: 'CPM25',
      component: () => import('@/views/air/compare'),
      meta: { title: 'PM2.5数据' },
      hidden: true
    },
    {
      path: 'compare/PM10',
      name: 'CPM10',
      component: () => import('@/views/air/compare'),
      meta: { title: 'PM10数据' },
      hidden: true
    },
    {
      path: 'compare/SO2',
      name: 'CSO2',
      component: () => import('@/views/air/compare'),
      meta: { title: 'SO2数据' },
      hidden: true
    },
    {
      path: 'compare/NO',
      name: 'CNO',
      component: () => import('@/views/air/compare'),
      meta: { title: 'NO数据' },
      hidden: true
    },
    {
      path: 'compare/O3',
      name: 'CO3',
      component: () => import('@/views/air/compare'),
      meta: { title: 'O3数据' },
      hidden: true
    },
    {
      path: 'compare/CO',
      name: 'CCO',
      component: () => import('@/views/air/compare'),
      meta: { title: 'CO数据' },
      hidden: true
    }
  ]
}

export default air
