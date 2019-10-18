import Layout from '@/layout'
// 个人中心
const personal = {
  path: '/user',
  component: Layout,
  children: [{
    path: 'personal',
    name: 'Personal',
    component: () => import('@/views/personal/index'),
    meta: {
      title: '个人中心',
      icon: 'icon-dashboard'
    },
  }],
  hidden: true
}

export default personal
