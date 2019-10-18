import Layout from '@/layout'

// 智能分析路由
const analytics = {
  path: '/analytics',
  component: Layout,
  redirect: '/analytics/index',
  name: 'Dust',
  meta: {
    title: '趋势分析',
    icon: 'analytics'
  },
  children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/analytics/Index'),
      meta: {
        title: '智能分析'
      }
    },
    {
      path: 'forecast',
      name: 'forecast',
      component: () => import('@/views/analytics/Index'),
      meta: {
        title: '趋势预测'
      }
    }
  ]
}

export default analytics
