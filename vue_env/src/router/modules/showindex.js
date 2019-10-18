// 大屏显示路由
const showindex = {
  path: '/showindex',
  component: () => import('@/views/dashboard/ShowIndex'),
  meta: {
    title: '大屏展示',
    icon: 'large-screen'
  },
  target: "_blank"
}

export default showindex
