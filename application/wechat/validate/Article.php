<?php
namespace app\wechat\validate;

use think\Validate;

class Article extends Validate{
    protected $rule = [
        'code'      =>    'require|num',
        'id'        =>    'require|num',
        'codes'     =>    'require|num',
    ];

    protected $msg = [
        'code.num'  =>    '112',
    ];

    protected $scene = [
        'LoginController.php'     =>    ['code','id' , 'codes'],
    ];
}