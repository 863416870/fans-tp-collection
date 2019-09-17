export const totalNum = (state) => {
  let aTotalNum = 0
  // eslint-disable-next-line no-unused-vars
  state.goods.goodsData.forEach((value, index) => {
    aTotalNum += value.num
  })
  return aTotalNum
}
export const totalPrice = (state) => {
  let aTotalPrice = 0
  // eslint-disable-next-line no-unused-vars
  state.goods.goodsData.forEach((value, index) => {
    aTotalPrice += value.num * value.price
  })
  return aTotalPrice.toFixed(2)
}
