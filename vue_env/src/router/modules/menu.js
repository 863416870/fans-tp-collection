import Layout from '@/layout'
// 菜单管理
const menu = {
  path: '/menu',
  component: Layout,
  redirect: '/menu/list',
  name: 'Dust',
  meta: {
    title: '菜单管理',
    icon: 'menu'
  },
  children: [{
    path: 'list',
    name: 'MenuList',
    component: () => import('@/views/menu/MenuList.vue'),
    meta: {
      title: '菜单列表'
    }
  }],
  alwaysShow: true
}
export default menu
