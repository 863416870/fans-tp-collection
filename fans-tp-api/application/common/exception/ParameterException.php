<?php
/**
 * Created by PhpStorm
 * User: 范国洁
 * Date: 2019/8/31
 * Time: 15:32
 */

namespace app\common\exception;

class ParameterException extends BaseException
{
    public $code = 400;
    public $msg = '参数错误';
    public $error_code = 99999;
}