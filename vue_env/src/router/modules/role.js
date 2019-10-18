import Layout from '@/layout'

// 系统设置路由
const role = {
  path: '/role',
  component: Layout,
  redirect: '/role/list',
  name: 'Role',
  meta: {
    title: '角色管理',
    icon: 'role'
  },
  children: [{
      path: 'list',
      name: 'RoleList',
      component: () => import('@/views/audit/role/RoleList'),
      meta: {
        title: '角色列表'
      }
    },
    {
      path: 'add',
      name: 'RoleAdd',
      component: () => import('@/views/audit/role/RoleForm'),
      meta: {
        title: '新增角色'
      },
      hidden: true
    },
    {
      path: 'modify/:id',
      name: 'RoleEdit',
      component: () => import('@/views/audit/role/RoleForm'),
      meta: {
        title: '修改角色'
      },
      hidden: true
    },
    {
      path: 'privilege',
      name: 'Privilege',
      component: () => import('@/views/audit/role/RolePrivilege'),
      meta: {
        title: '权限管理'
      },
      hidden: true
    },
  ],
  alwaysShow: true
}

export default role
