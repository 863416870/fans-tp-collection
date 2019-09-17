export default {
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
