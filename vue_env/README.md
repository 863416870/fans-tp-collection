# vue_env_fe 

- 环境介绍
- <a href="#环境目录">环境目录</a>
- <a href="#本地运行">本地运行</a>
- <a href="#手动装特殊包">手动装特殊包</a>
- <a href="#打包发布">打包发布</a>
- <a href="#commonInfo">关于commonInfo接口</a>
- <a href="#建议">建议</a>
- <a href="#浏览器支持">浏览器支持</a>

#### <a id="环境目录">环境项目</a>

```shell
├───mock // 模拟数据
├───public // 公共资源目录，该目录webpack原封打包
│    ├───favicon.ico // 本站favicon图片
│    │   index.html // template模板
├───src
│    ├───api // 所有请求模型层
│    ├───assets // 静态资源文件存放目录
│    ├───components // 布局组件及业务基础组件
│    │   ├───Base // 通用基础组件库（包含element-ui二次封装组件）
│    │   ├───BackToTop // 返回顶部组件
│    │   ├───Breadcrumb // 面包屑路由组件
│    │   ├───Hamburger //  自适应收缩侧边栏组件
│    │   ├───Notify //  消息提醒组件
│    │   ├───Screenfull //  全屏组件
│    │   ├───SvgIcon //  SvgIcon组件
│    │   ├───..... //  XXX扩展组件
│    ├───icons // 项目所有 svg icons
│    ├───layout // layout布局组件
│    ├───router // 前端路由
│    │   ├───modules // 每个业务模型的路由树
│    │   │   index.js // vue-router入口文件
│    ├───store // vuex状态管理文件
│    ├───styles // 全局样式管理文件
│    ├───utils // 各种工具函数
│    ├───views // 业务组件
│    │   App.vue // vue根组件
│    │   main.js // 入口文件 加载组件 初始化等
│    │   setting.js //初始化全局设置
│    │   setUrl.js //全局图片设置
│    └── permission.js //权限管理
│   babel.config.js // babel配置文件
│   .browserslistrc // 适配浏览器版本
│   .eslintrc.js // eslint配置文件
│   .gitignore // git上传忽略文件
│   .babelrc  // babel-loader 配置
│   .travis.yml  // 自动化CI配置
│   vue.config.js // vue-cli 配置
│   postcss.config.js// postcss 配置
└── package.json // package.json
```



#### <a id="#本地运行">Build Setup</a>
```bash
# install dependency
npm install

# develop
npm run dev
```
#### <a id="#手动装特殊包">Build Setup</a>
```bash
# 首页展示预警信息滚动
npm install vue-seamless-scroll --save

```

This will automatically open http://localhost:8080

#### <a id="#打包发布">Build</a>

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```
#### <a id="#打包发布">关于commonInfo接口</a>
```bash
//TODO 此处有好建议可更换 
# 装包
npm install --save vuex-persist
# 引入：
import VuexPersistence from 'vuex-persist'
# 先创建一个对象并进行配置：
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({ // eslint-disable-line
    commonInfo: state.app.commonInfo,
  }),
})
# 引入进vuex插件：
const store = new Vuex.Store({
  modules: {
  	app, 
  },
  getters,
  plugins: [vuexLocal.plugin],
})

# vuex [...action\getter\state\mutation 文件位置store/modules/app.js]
#页面使用
----js部分
import { mapGetters } from 'vuex'
export default {
	computed: {
    ...mapGetters([
      'commonInfo',
    ])
  },
}
----template部分 此处不上图文
  {{commonInfo['warnDeviceStatusMap'][1]}}
```


#### <a id="#建议">Advanced</a>

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

#### <a id="#浏览器支持">Browsers support</a>

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions


