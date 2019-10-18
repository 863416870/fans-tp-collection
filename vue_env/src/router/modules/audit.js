import Layout from '@/layout'

// 系统设置路由
const audit = {
  path: '/audit',
  component: Layout,
  redirect: '/audit/user/list',
  name: 'Audit',
  meta: {
    title: '系统管理',
    icon: 'system'
  },
  children: [{
      path: 'user/list',
      name: 'UserList',
      component: () => import('@/views/audit/user/UserList'),
      meta: {
        title: '用户管理'
      }
    },
    {
      path: 'user/add',
      name: 'UserAdd',
      component: () => import('@/views/audit/user/UserForm'),
      meta: {
        title: '新增用户'
      },
      hidden: true
    },
    {
      path: 'user/modify/:id',
      name: 'UserModify',
      component: () => import('@/views/audit/user/UserForm'),
      meta: {
        title: '修改用户'
      },
      hidden: true
    },
    {
      path: 'syslog/list',
      name: 'syslogList',
      component: () => import('@/views/audit/syslog'),
      meta: {
        title: '日志列表'
      }
    },
  ]
}

export default audit
