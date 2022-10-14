<?php
namespace app\wechat\controller;

use think\Db;
use think\Exception;
use app\wechat\validate\ArticleValidate;
use think\Paginator;

class ArticleController extends WechatRequestController {

    protected $requestWay = [
        'getCol'                     =>        'get',
        'getArticle'                 =>        'get',
        'articleInfo'                =>        'get',
        'search'                     =>        'get',
    ];

    protected $field = [
        'getCol'                     =>        [''],
        'getArticle'                 =>        ['item','order','start'],
        'articleInfo'                =>        ['id'],
        'search'                     =>        ['keyword'],
    ];

    public function __construct(){
        parent::__construct();
//        ( $this->userId < 0 ) && $this->returns(0,'请登录');
    }

    public function index(){
        if (isset($this->param)) {
            dump($this->param);
        }
    }
    public function getCol(){
        try{
            $col = Db::name('article_item')->field('id , title')->where(['parent_id' => 0])->select();
            empty($col) && $this->Exception('系统错误');
            $this->returns(1,'success',$col);
        }catch(Exception $e){
            $this->returns(0,$e->getMessage());
        }

    }

    public function getArticle(){
        try{
            $param = $this->param;
            empty($param) && $this->Exception('系统错误');

            $validate = new ArticleValidate();
            $valiResult = $validate->scene('getArticle')->check($param);
            $valiResult || $this->Exception($validate->getError());

            $param['item'] < 1 ? $con = 'type !=0' : $con = 'type='.$param['item'];

            $data = Db::name('article')->alias('a')
                ->field('a.id,a.title,a.main_image,a.create_time,b.avatar,b.nickname')
                ->join('user b','a.user_id = b.id')
                ->where($con)
                ->order($param['order'])
                ->limit($param['start'],$param['start']+10)
                ->select();

            empty($data) || array_walk($data , function ($value , $key) use (&$data){
                $data[$key]['main_image'] = $this->imgtransform($data[$key]['main_image']);
                $data[$key]['avatar'] = $this->imgtransform($data[$key]['avatar']);
            });

            $this->returns(1,'success',$data);

        }catch(Exception $e){
            $this->returns(2001,$e->getMessage());
        }


    }

    public function articleInfo(){
        try{
            $param = $this->param;
            empty($param) && $this->Exception('系统错误');
            $param['id'] = (int)$param['id'];

            $validate = new ArticleValidate();
            $valiResult = $validate->scene('articleInfo')->check($param);
            $valiResult || $this->Exception($validate->getError());

            $data = Db::name('article')->alias('a')
                ->field('a.id,a.title,a.main_image,a.create_time,a.content,b.avatar,b.nickname')
                ->join('user b','a.user_id = b.id')
                ->where(['a.id' => $param['id']])
                ->find();

            $data['main_image'] = $this->imgtransform($data['main_image']);
            $data['avatar'] = $this->imgtransform($data['avatar']);

            $this->returns(1,'success',$data);

        }catch(Exception $e){
            $this->returns(2001,$e->getMessage());
        }
    }

    public function search(){
        $param = $this->param;
        empty($param) && $this->Exception('系统错误');

        $validate = new ArticleValidate();
        $valiResult = $validate->scene('search')->check($param);
        $valiResult || $this->Exception($validate->getError());

        $search = ['a.title','a.content'];
        $sql = $this->whereSearch($search ,$param['keyword']);
        $data = Db::name('article')->alias('a')
            ->field('a.id,a.title,a.main_image,a.create_time,a.content,b.avatar,b.nickname')
            ->join('user b','a.user_id = b.id')
            ->whereOr($sql)
            ->select();
//        dump($data);die;
        empty($data) || array_walk($data , function ($value , $key) use (&$data){
            $data[$key]['main_image'] = $this->imgtransform($data[$key]['main_image']);
            $data[$key]['avatar'] = $this->imgtransform($data[$key]['avatar']);
        });

        $this->returns(1,'success',$data);

    }
}