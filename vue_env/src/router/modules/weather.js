import Layout from '@/layout'

// 气象路由
const weather = {
  path: '/weather',
  component: Layout,
  redirect: '/weather/index/TEMP',
  name: 'Weather',
  meta: {
    title: '气象数据',
    icon: 'weather'
  },
  children: [{
      path: 'index/TEMP',
      name: 'TEMP',
      component: () => import('@/views/air/index'),
      meta: {
        title: '温度数据'
      }
    },
    {
      path: 'index/HUMI',
      name: 'HUMI',
      component: () => import('@/views/air/index'),
      meta: {
        title: '湿度数据'
      }
    },
    {
      path: 'index/ILLUM',
      name: 'ILLUM',
      component: () => import('@/views/air/index'),
      meta: {
        title: '照度数据'
      }
    },
    {
      path: 'index/WS',
      name: 'WS',
      component: () => import('@/views/air/index'),
      meta: {
        title: '风速数据'
      }
    },
    {
      path: 'index/WD',
      name: 'WD',
      component: () => import('@/views/air/index'),
      meta: {
        title: '风力数据'
      }
    },
    {
      path: 'compare/TEMP',
      name: 'CTEMP',
      component: () => import('@/views/air/compare'),
      meta: {
        title: '温度数据'
      },
      hidden: true
    },
    {
      path: 'compare/HUMI',
      name: 'CHUMI',
      component: () => import('@/views/air/compare'),
      meta: {
        title: '湿度数据'
      },
      hidden: true
    },
    {
      path: 'compare/ILLUM',
      name: 'CILLUM',
      component: () => import('@/views/air/compare'),
      meta: {
        title: '照度数据'
      },
      hidden: true
    },
    {
      path: 'compare/WS',
      name: 'CWS',
      component: () => import('@/views/air/compare'),
      meta: {
        title: '风速数据'
      },
      hidden: true
    },
    {
      path: 'compare/WD',
      name: 'CWD',
      component: () => import('@/views/air/compare'),
      meta: {
        title: '风力数据'
      },
      hidden: true
    }

  ]
}

export default weather
