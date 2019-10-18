import Layout from '@/layout'
// 扬尘数据路由
const dust = {
  path: '/dust',
  component: Layout,
  redirect: '/dust/index/TSP',
  name: 'Dust',
  meta: {
    title: '扬尘数据',
    icon: 'dust'
  },
  children: [{
      path: 'index/TSP',
      name: 'TSP',
      component: () => import('@/views/air/index'),
      meta: {
        title: 'TSP数据'
      }
    },
    {
      path: 'compare/TSP',
      name: 'CTSP',
      component: () => import('@/views/air/compare'),
      meta: {
        title: 'TSP数据'
      },
      hidden: true
    }

  ],
  alwaysShow: true
}

export default dust
