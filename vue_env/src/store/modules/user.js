import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

const state = {
  token: getToken(),
  logined: false, // 是否登录
  avatar: 'http://pic4.zhimg.com/50/v2-46c2eb18d011d3711617a2664844e5fd_hd.jpg',
  user: {}, // 当前用户
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },

  SET_USER: (state, user) => {
    state.user = user
  },
  SET_LOGINED: (state) => {
    state.logined = true
  },
  REMOVE_LOGINED: (state) => {
    state.logined = false
  }

}

const actions = {
  // 用户登录
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', 'zzd')
        commit('SET_LOGINED')
        localStorage.setItem('user', JSON.stringify(data.userInfo))
        setToken('zzd')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 此处是页面刷新获取用户信息的
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {
          data
        } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_USER', data)
        commit('SET_LOGINED')
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('REMOVE_LOGINED')
        commit('SET_USER', {})
        localStorage.clear();
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
