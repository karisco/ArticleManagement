<?php
namespace app\wechat\validate;

use think\Validate;

class ArticleValidate extends Validate{
    protected $rule = [

        'item'              =>        'require',
        'order'             =>        'require',

        'id'                =>        'require',
        'keyword'           =>        'require',
    ];

    protected $message = [

        'item.require'      =>        '系统错误',
        'order.require'     =>        '系统错误',

        'id.require'        =>        '系统错误',

        'keyword.require'   =>        '系统错误',

    ];

    protected $scene = [
        'getArticle'        =>        ['item','order'],
        'articleInfo'       =>        ['id'],
        'search'            =>        ['keyword']
    ];
}