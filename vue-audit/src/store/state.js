
// import stageConfig from '@/config/stage' // 引入舞台配置
import AppConfig from '@/config/index' // 引入项目配置

export default {
  logined: false, // 是否登录
  user: null, // 当前用户
  sideBarLevel: AppConfig.sideBarLevel || 3,
  defaultRoute: AppConfig.defaultRoute || '/about',

  // 推送消息
  readedMessages: [],
  unreadMessages: [],
  auths: [], // 每个用户的所有权限
  // 舞台配置
  // stageConfig,
  // 当前页信息
  currentRoute: {
    config: null,
    treePath: [],
  },

  // 测试vuex
  goods: {
    totalPrice: 0,
    totalNum: 0,
    goodsData: [
      {
        id: '1',
        title: '好吃的苹果',
        price: 8.00,
        image: 'https://www.shangdian.com/static/pingguo.jpg',
        num: 0,
      },
      {
        id: '2',
        title: '美味的香蕉',
        price: 5.00,
        image: 'https://www.shangdian.com/static/xiangjiao.jpg',
        num: 0,
      },
    ],
  },
}
