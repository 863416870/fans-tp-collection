<?php
/**
 * 常量定义
 * Created by PhpStorm
 * User: 范国洁
 * Date: 2019/8/31
 * Time: 15:55
 */

namespace app\common\util;


class ConstUtil
{
    //通用状态值
    const COMMON_STATUS_VALID = 1;
    const COMMON_STATUS_DELETE = 2;

    public static $COMMON_STATUS_MAP = array(
        self::COMMON_STATUS_VALID => "正常",
        self::COMMON_STATUS_DELETE => "删除",
    );

}