
import Layout from '@/layout'
// 首页路由
const dashboard = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/Index'),
    meta: { title: '大屏展示', icon: 'dashboard' },
    hidden: true
  }]
}

export default dashboard
