import * as types from './mutation-types'

export default {

  [types.SET_LOGINED](state) {
    /* eslint no-param-reassign: 0 */
    state.logined = true
  },

  [types.REMOVE_LOGINED](state) {
    state.logined = false
    state.user = null
  },

  [types.SET_USER](state, payload) {
    state.user = payload
  },

  [types.ADD_READED_MESSAGE](state, payload) {
    state.readedMessages.push(payload)
  },

  [types.ADD_UNREAD_MESSAGE](state, payload) {
    // console.log('===:  ', payload)
    state.unreadMessages.push(payload)
  },

  [types.REMOVE_UNREAD_MESSAGE](state, payload) {
    // payload => message.id
    const { unreadMessages } = state
    const index = unreadMessages.findIndex(el => el.id === payload)
    unreadMessages.splice(index, 1)
  },

  [types.SET_USER_AUTHS](state, auths) {
    const _auths = []
    for (let i = 0; i < auths.length; i++) {
      for (const key in auths[i]) {
        // console.log(i, state.user.auths[i][key])
        for (let j = 0; j < auths[i][key].length; j++) {
          _auths.push(auths[i][key][j].auth)
        }
      }
    }
    state.auths = _auths
  },

  [types.SET_REFERSH_OPTION](state, option) {
    state.refreshOptions = option
  },


  reselt(state, msg) {
    console.log(msg) // 我执行了一次；
    state.goods.totalPrice = this.getters.totalPrice
    state.goods.totalNum = this.getters.totalNum
  },
  reduceGoods(state, index) {
    // 第一个参数为默认参数，即上面的state,后面的参数为页面操作传过来的参数
    state.goods.goodsData[index].num -= 1

    const msg = '我执行了一次'
    this.commit('reselt', msg)
  },
  addGoods(state, index) {
    state.goods.goodsData[index].num += 1

    const msg = '我执行了一次'
    this.commit('reselt', msg)
    /**
     想要重新渲染store中的方法，一律使用commit 方法
     你可以这样写 commit('reselt',{
                state: state
            })
     也可以这样写 commit({
                type: 'reselt',
                state: state
            })
     主要看你自己的风格
     * */
  },
}
