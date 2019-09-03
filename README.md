# fans-tp-collection
用tp将基础业务功能实现-----java处理多线程任务
## 文件存储组件（ oss 及 qiniu 需要配置参数）
```php

// 配置默认存储方式    
sysconf('storage_type','文件存储类型');

// OSS存储配置
sysconf('storage_oss_domain', '文件访问域名');
sysconf('storage_oss_keyid', '接口授权AppId');
sysconf('storage_oss_secret', '接口授权AppSecret');
sysconf('storage_oss_bucket', '文件存储空间名称');
sysconf('storage_oss_is_https', '文件HTTP访问协议');
sysconf('storage_oss_endpoint', '文件存储节点域名');

// 七牛云存储配置
sysconf('storage_qiniu_region', '文件存储节点');
sysconf('storage_qiniu_domain', '文件访问域名');
sysconf('storage_qiniu_bucket', '文件存储空间名称');
sysconf('storage_qiniu_is_https', '文件HTTP访问协议');
sysconf('storage_qiniu_access_key', '接口授权AccessKey');
sysconf('storage_qiniu_secret_key', '接口授权SecretKey');


// 生成文件名称(链接url或文件md5)
$filename = \app\common\tools\File::name($url,$ext,$prv,$fun);

// 获取文件内容（自动存储方式）
$result = \app\common\tools\File::get($filename)

// 保存内容到文件（自动存储方式）
boolean \app\common\tools\File::save($filename,$content);

// 判断文件是否存在
boolean \app\common\tools\File::has($filename);

// 获取文件信息
$result = \app\common\tools\File::info($filename);

//指定存储类型（调用方法）
boolean \app\common\tools\File::instance('oss')->save($filename,$content);
boolean \app\common\tools\File::instance('local')->save($filename,$content);
boolean \app\common\tools\File::instance('qiniu')->save($filename,$content);

$result = \app\common\tools\File::instance('oss')->get($filename);
$result = \app\common\tools\File::instance('local')->get($filename);
$result = \app\common\tools\File::instance('qiniu')->get($filename);

boolean \app\common\tools\File::instance('oss')->has($filename);
boolean \app\common\tools\File::instance('local')->has($filename);
boolean \app\common\tools\File::instance('qiniu')->has($filename);

$resutl = \app\common\tools\File::instance('oss')->info($filename);
$resutl = \app\common\tools\File::instance('local')->info($filename);
$resutl = \app\common\tools\File::instance('qiniu')->info($filename);
```