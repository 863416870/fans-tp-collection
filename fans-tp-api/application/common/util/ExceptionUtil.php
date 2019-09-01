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
    //定义常量
    const CODE = "code";
    const MESSAGE = "msg";
    const ERROR_CODE = "error_code";

    public static $param = [];

    /**
     * 反射解析数据异常
     */
    public static function ParseExceptionMap(
                        $message="解析数据时出现错误，请检查类·方法注释抒写方式",
                        $errorCode=66667,
                        $code=400
    ){
        self::setParam($message,$errorCode,$code);
    }
    /**
     * 反射的对象/方法注释错误
     */
    public static function ReflexExceptionMap(
                        $message="反射的对象/方法注释错误",
                        $errorCode=66666,
                        $code=400
    ){
        self::setParam($message,$errorCode,$code);
    }
    /**
     *日志信息
     */
    public static function LoggerExceptionMap(
                        $message="日志信息不能为空",
                        $errorCode=40001,
                        $code=400){
        self::setParam($message,$errorCode,$code);
    }

    public static function setParam($message,$errorCode,$code){
        self::$param[self::CODE] = $code;
        self::$param[self::MESSAGE] = $message;
        self::$param[self::ERROR_CODE] = $errorCode;
        return self::$param;
    }
}