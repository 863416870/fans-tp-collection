/**
 * 存储commoninfo
 * @param {Object} commoninfo
 */
export function saveCommonInfo(commoninfo) {
  localStorage.setItem('commoninfo', commoninfo)
}


/**
 * 获得commoninfo
 * @param {string} key
 */
export function getCommonInfo(key) {
  return localStorage.getItem(key)
}

/**
 * 移除commoninfo
 */
export function removeCommonInfo() {
  localStorage.removeItem('commoninfo')
}
