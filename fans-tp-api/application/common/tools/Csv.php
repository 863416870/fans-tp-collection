<?php
/**
 * CSV 导出工具
 * Created by PhpStorm
 * User: 范国洁
 * Date: 2019/9/3
 * Time: 15:57
 */

namespace app\common\tools;


class Csv
{
    /**
     * 写入CSV文件头部
     * @param string $filename 导出文件
     * @param array $headers CSV 头部(一级数组)
     */
    public static function header($filename, array $headers)
    {
        header('Content-Type: application/octet-stream');
        header("Content-Disposition: attachment; filename=" . iconv('utf-8', 'gbk//TRANSLIT', $filename));
        $handle = fopen('php://output', 'w');
        foreach ($headers as $key => $value) $headers[$key] = iconv("utf-8", "gbk//TRANSLIT", $value);
        fputcsv($handle, $headers);
        if (is_resource($handle)) fclose($handle);
    }

    /**
     * 写入CSV文件内容
     * @param array $list 数据列表(二维数组或多维数组)
     * @param array $rules 数据规则(一维数组)
     */
    public static function body(array $list, array $rules)
    {
        $handle = fopen('php://output', 'w');
        foreach ($list as $data) {
            $rows = [];
            foreach ($rules as $rule) $rows[] = self::parseKeyDotValue($data, $rule);
            fputcsv($handle, $rows);
        }
        if (is_resource($handle)) fclose($handle);
    }

    /**
     * 根据数组key查询(可带点规则)
     * @param array $data 数据
     * @param string $rule 规则，如: order.order_no
     * @return mixed
     */
    public static function parseKeyDotValue(array $data, $rule)
    {
        list($temp, $attr) = [$data, explode('.', trim($rule, '.'))];
        while ($key = array_shift($attr)) $temp = isset($temp[$key]) ? $temp[$key] : $temp;
        return (is_string($temp) || is_numeric($temp)) ? @iconv('utf-8', 'gbk//TRANSLIT', "{$temp}") : '';
    }
}