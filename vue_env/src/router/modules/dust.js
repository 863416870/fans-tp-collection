
import Layout from '@/layout'
//扬尘数据路由
const dust =   {
  path: '/dust',
  component: Layout,
  redirect: '/dust/tsp',
  name: 'Dust',
  meta: { title: '扬尘数据', icon: 'air' },
  children: [
    {
      path: 'tsp',
      name: 'TSP',
      component: () => import('@/views/dust/TSP'),
      meta: { title: 'TSP数据' }
    },
    {
      path: '',
    },

  ]
}

export default dust
