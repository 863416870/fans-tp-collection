<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

use think\facade\Cache;
use think\Db;
use app\common\util\ExceptionUtil;
// 应用公共文件


if (!function_exists('writeJson')) {
    /**
     * @param $code
     * @param $errorCode
     * @param $data
     * @param $msg
     * @return \think\response\Json
     */
    function writeJson($code, $data, $msg = 'ok', $errorCode = 0)
    {
        $data = [
            'error_code' => $errorCode,
            'result' => $data,
            'msg' => $msg
        ];
        return json($data, $code);
    }
}

if (!function_exists('sysconf')) {
    /**
     * 设备或配置系统参数
     * @param string $name 参数名称
     * @param boolean $value 无值为获取
     * @return string|boolean
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    function sysconf($name, $value = null)
    {
        static $data = [];
        list($field, $raw) = explode('|', "{$name}|");
        $key = md5(config('database.hostname') . '#' . config('database.database'));
        if ($value !== null) {
            Cache::tag('system')->rm("_sysconfig_{$key}");
            list($row, $data) = [['name' => $field, 'value' => $value], []];
            return \app\common\tools\Data::save('SystemConfig', $row, 'name');
        }
        if (empty($data)) {
            $data = Cache::tag('system')->get("_sysconfig_{$key}", []);
            if (empty($data)) {
                $data = Db::name('SystemConfig')->column('name,value');
                halt($data);
                Cache::tag('system')->set("_sysconfig_{$key}", $data, 60);
            }
        }
        return isset($data[$field]) ? (strtolower($raw) === 'raw' ? $data[$field] : htmlspecialchars($data[$field])) : '';
    }
}

if (!function_exists('format_datetime')) {
    /**
     * 日期格式标准输出
     * @param string $datetime 输入日期
     * @param string $format 输出格式
     * @return false|string
     */
    function format_datetime($datetime, $format = 'Y年m月d日 H:i:s')
    {
        if (empty($datetime)) return '--';
        if (is_numeric($datetime)) return date($format, $datetime);
        return date($format, strtotime($datetime));
    }
}

if (!function_exists('rand_char')) {
    /**
     * 随机字符串
     * @param int $length 字符串长度
     * @return null|string
     */
    function rand_char($length=16)
    {
        $str = null;
        $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
        $max = strlen($strPol) - 1;

        for ($i = 0; $i < $length; $i++) {
            $str .= $strPol[rand(0, $max)];
        }

        return $str;
    }
}

if (!function_exists('filter_comma')) {
    /**
     * 过滤逗号(去除字符串两边的逗号，并将中文逗号转换成英文逗号）
     * @param $str  字符串
     * @return string
     */
    function filter_comma($str)
    {
        return trim(str_replace("，", ",", $str), ",");
    }
}

if (!function_exists('get_file_ext')) {
    /**
     * 获取文件后缀
     * @param $name 文件名
     * @return mixed
     */
    function get_file_ext($name)
    {
        return pathinfo($name, PATHINFO_EXTENSION);
    }
}

if (!function_exists('make_url')) {
    /**
     * Make Url
     * @param $domain
     * @param null $pathname
     * @return mixed
     */
    function make_url($domain, $pathname = null)
    {
        $domain = rtrim($domain, '/');
        if (false === strpos($domain, 'https://') && false === strpos($domain, 'http://')) {
            $domain = 'http://' . $domain;
        }
        return str_replace('\\', '/', $domain . ($pathname ? '/' . $pathname : null));
    }
}

if (!function_exists('format_size')) {
    /**
     * 转换文件大小单位
     * @param $size
     * @param $array
     * @return string|array
     */
    function format_size($size, $array = false)
    {
        if (0 == $size) {
            return "0.00 Bytes";
        }
        $unit = ['', 'K', 'M', 'G', 'T', 'P'];
        $base = 1024;
        $i = floor(log($size, $base));
        $n = count($unit);
        if ($i >= $n) {
            $i = $n - 1;
        }
        if ($array) {
            return [sprintf("%.2f", $size / pow($base, $i)), $unit[$i] . 'B'];
        }

        return sprintf("%.2f", $size / pow($base, $i)) . ' ' . $unit[$i] . 'B';
    }
}

if (!function_exists('paginate')) {
    /**
     * @return array
     * @throws ParameterException
     */
    function paginate()
    {
        $count = intval(Request::get('count'));
        $start = intval(Request::get('page'));
        $count = $count >= 15 ? 15 : $count;
        $start = $start * $count;
        if ($start < 0 || $count < 0) throw new \app\lib\exception\BaseException(ExceptionUtil::ParameterExceptionMap());
        return [$start, $count];
    }
}