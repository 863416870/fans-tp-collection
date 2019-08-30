<?php
/**
 * 异常常量定义
 * Created by PhpStorm
 * User: 范国洁
 * Date: 2019/8/31
 * Time: 15:57
 */

namespace app\common\util;


class ExceptionUtil
{

    const CODE = "code";
    const MESSAGE = "msg";
    const ERROR_CODE = "error_code";

    /**
     * 反射解析数据异常
     */
    public static $PARSE_EXCEPTION_MAP = array(
        self::CODE => 400,
        self::MESSAGE => "解析数据时出现错误，请检查类·方法注释抒写方式",
        self::ERROR_CODE => 66667,
    );

    /**
     * 反射的对象/方法注释错误
     * @var int
     */
    public static $REFLEX_EXCEPTION_MAP = array(
        self::CODE => 400,
        self::MESSAGE => "反射的对象/方法注释错误",
        self::ERROR_CODE => 66666,
    );

}