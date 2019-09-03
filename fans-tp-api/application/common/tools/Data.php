<?php
/**
 *
 * Created by PhpStorm
 * User: 范国洁
 * Date: 2019/9/3
 * Time: 15:51
 */

namespace app\common\tools;

use think\Db;
use think\db\Query;

class Data
{
    /**
     * 数据增量保存
     * @param Query|string $dbQuery 数据查询对象
     * @param array $data 需要保存或更新的数据
     * @param string $key 条件主键限制
     * @param array $where 其它的where条件
     * @return boolean|integer
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public static function save($dbQuery, $data, $key = 'id', $where = [])
    {
        $db = is_string($dbQuery) ? Db::name($dbQuery) : $dbQuery;
        list($table, $value) = [$db->getTable(), isset($data[$key]) ? $data[$key] : null];
        $map = isset($where[$key]) ? [] : (is_string($value) ? [[$key, 'in', explode(',', $value)]] : [$key => $value]);
        if (is_array($info = Db::table($table)->master()->where($where)->where($map)->find()) && !empty($info)) {
            return Db::table($table)->strict(false)->where($where)->where($map)->update($data) !== false ? $info[$key] : false;
        }
        return Db::table($table)->strict(false)->insertGetId($data);
    }
}