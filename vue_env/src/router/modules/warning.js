import Layout from '@/layout'

// 智能预警路由
const warning = {
  path: '/warning',
  component: Layout,
  redirect: '/warning/rule/list',
  name: 'IntelligentWarning',
  meta: {
    title: '智能预警',
    icon: 'warning'
  },
  children: [{
      path: 'rule/list',
      name: 'RuleList',
      component: () => import('@/views/warning/rule/RuleList'),
      meta: {
        title: '预警规则'
      }
    },
    {
      path: 'rule/add',
      name: 'RuleAdd',
      component: () => import('@/views/warning/rule/RuleForm'),
      hidden: true,
      meta: {
        title: '新建预警规则'
      }
    },
    {
      path: 'rule/update/:id',
      name: 'RuleUpdate',
      component: () => import('@/views/warning/rule/RuleForm'),
      hidden: true,
      meta: {
        title: '编辑预警规则'
      }
    },
    {
      path: 'info/list',
      name: 'InfoList',
      component: () => import('@/views/warning/info/InfoList'),
      meta: {
        title: '预警消息'
      }
    }
  ]
}

export default warning
