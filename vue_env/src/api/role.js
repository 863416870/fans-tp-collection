/**角色模块 */
import request from '@/utils/request'

/**列表*/
export function roleList(data) {
  return request({
    url: '/audit/role/list',
    method: 'get',
    data
  })
}

/**增加*/
export function addRole(data) {
  return request({
    url: '/audit/role/add',
    method: 'post',
    data
  })
}

/**修改*/
export function modifyRole(data) {
  return request({
    url: '/audit/role/modify',
    method: 'post',
    data
  })
}

/**删除*/
export function deleteRole(data) {
  return request({
    url: '/audit/role/delete',
    method: 'post',
    data
  })
}

/**详情 */
export function getRoleDetail(data) {
  return request({
    url: '/audit/role/detail',
    method: 'get',
    data
  })
}


const menuList = [
  {
    'menuId': 1,
    'parentId': 0,
    'parentName': null,
    'name': '大屏展示',
    'url': "dashboard",
    'perms': null,
    'type': 0,
    'icon': 'system',
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 2,
    'parentId': 0,
    'parentName': null,
    'name': '大气数据',
    'url': null,
    'perms': null,
    'type': 0,
    'icon': 'system',
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 3,
    'parentId': 2,
    'parentName': "大气数据",
    'name': 'PM2.5数据',
    'url': "air/PM25",
    'perms': null,
    'type': 1,
    'icon': 'system',
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 4,
    'parentId': 3,
    'parentName': 'PM2.5数据',
    'name': '展示',
    'url': null,
    'perms': 'sys:air:show',
    'type': 2,
    'icon': null,
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 5,
    'parentId': 3,
    'parentName': 'PM2.5数据',
    'name': '对比',
    'url': null,
    'perms': 'sys:air:compare',
    'type': 2,
    'icon': null,
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 6,
    'parentId': 2,
    'parentName': "大气数据",
    'name': 'CO数据',
    'url': "air/CO",
    'perms': null,
    'type': 1,
    'icon': 'system',
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 7,
    'parentId': 6,
    'parentName': 'CO数据',
    'name': '展示',
    'url': null,
    'perms': 'sys:air:show',
    'type': 2,
    'icon': null,
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 8,
    'parentId': 6,
    'parentName': 'CO数据',
    'name': '对比',
    'url': null,
    'perms': 'sys:air:compare',
    'type': 2,
    'icon': null,
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 9,
    'parentId': 0,
    'parentName': null,
    'name': '设备管理',
    'url': null,
    'perms': null,
    'type': 0,
    'icon': null,
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 10,
    'parentId': 9,
    'parentName': "设备管理",
    'name': '设备列表',
    'url': null,
    'perms': null,
    'type': 0,
    'icon': null,
    'orderNum': 0,
    'open': null,
    'list': null
  }
]

// 后端返回当前角色的权限
const navDataList = [
  {
    'menuId': 1,
    'parentId': 0,
    'parentName': null,
    'name': '大屏展示',
    'url': "dashboard",
    'perms': null,
    'type': 0,
    'icon': 'system',
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 2,
    'parentId': 0,
    'parentName': null,
    'name': '大气数据',
    'url': null,
    'perms': null,
    'type': 0,
    'icon': 'system',
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 3,
    'parentId': 2,
    'parentName': "大气数据",
    'name': 'PM2.5数据',
    'url': "air/PM25",
    'perms': null,
    'type': 1,
    'icon': 'system',
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 6,
    'parentId': 2,
    'parentName': "大气数据",
    'name': 'CO数据',
    'url': "air/CO",
    'perms': null,
    'type': 1,
    'icon': 'system',
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 9,
    'parentId': 0,
    'parentName': null,
    'name': '设备管理',
    'url': null,
    'perms': null,
    'type': 0,
    'icon': null,
    'orderNum': 0,
    'open': null,
    'list': null
  },
  {
    'menuId': 10,
    'parentId': 9,
    'parentName': "设备管理",
    'name': '设备列表',
    'url': "device/list",
    'perms': null,
    'type': 0,
    'icon': null,
    'orderNum': 0,
    'open': null,
    'list': null
  }
]

// 获取菜单列表
export function getMenuList() {
  return menuList
}

// 获取导航菜单列表 / 权限
export function nav() {
  return {
    // isOpen: false,
    url: '/sys/menu/nav',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'menuList': navDataList,
      'permissions': [
        "sys:air:show",
        "sys:air:compare"
      ]
    }
  }
}
