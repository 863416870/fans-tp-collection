const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  commonInfo: state => state.app.commonInfo,
  token: state => state.user.token,
  user: state => state.user.user,
  avatar: state => state.user.avatar,
  logined: state => state.user.logined,

}
export default getters
