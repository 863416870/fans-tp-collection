import defaultSettings from '@/settings'
import defaultSetUrl from '@/setUrl'

const { showSettings, fixedHeader, sidebarLogo, navbarHeaderContent } = defaultSettings
const { sidebarLogoIcon, sidebarLogoImg } = defaultSetUrl

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  sidebarLogoIcon: sidebarLogoIcon,
  sidebarLogoImg: sidebarLogoImg,
  navbarHeaderContent: navbarHeaderContent
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

