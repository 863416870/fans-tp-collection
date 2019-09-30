// 首页路由
const showindex = {
  path: '/showindex',
  component: () => import('@/views/dashboard/ShowIndex'),
  redirect: '/showindex',
  children: [{
    path: 'showindex',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/ShowIndex'),
    meta: { title: '大屏展示', icon: 'dashboard' },
    target: '_blank'
  }]
}

export default showindex
