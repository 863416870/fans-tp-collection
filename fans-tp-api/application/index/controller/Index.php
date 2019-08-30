<?php
namespace app\index\controller;

use app\common\reflex\Reflex;

class Index
{
    public function index()
    {
        return '<style type="text/css">*{ padding: 0; margin: 0; } div{ padding: 4px 48px;} a{color:#2E5CD5;cursor: pointer;text-decoration: none} a:hover{text-decoration:underline; } body{ background: #fff; font-family: "Century Gothic","Microsoft yahei"; color: #333;font-size:18px;} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.6em; font-size: 42px }</style><div style="padding: 24px 48px;"> <h1>:) </h1><p> ThinkPHP V5.1<br/><span style="font-size:30px">12载初心不改（2006-2018） - 你值得信赖的PHP框架</span></p></div><script type="text/javascript" src="https://tajs.qq.com/stats?sId=64890268" charset="UTF-8"></script><script type="text/javascript" src="https://e.topthink.com/Public/static/client.js"></script><think id="eab4b9f840753f8e7"></think>';
    }

    /**
     * @route('查询一个权限组及其权限')
     * @param string $name
     * @return string
     */
    public function hello($name = 'ThinkPHP5')
    {
        $class = new \ReflectionClass("app\index\controller\Index");


        // 类下面的所有方法的数组
        $methods = $class->getMethods();
        var_dump($methods);
        // 类下面所有含有@auth注解的方法的注解内容数组

        // 类下面所有含有@auth注解的方法的注解内容数组
        $methodAuthList = $this->getMethodsDoc($class, $methods);

        return 'hello,' . $name;
    }

    /**
     * @param $class
     * @param $array
     * @return array
     * @throws \WangYu\exception\ReflexException
     */
    private function getMethodsDoc($class, $array)
    {
        $data = [];
        foreach ($array as $value) {
            $reflex = new Reflex($class, $value->name);
            $authAnnotation = $reflex->get('route');
            var_dump($authAnnotation);

        }
    }
}
