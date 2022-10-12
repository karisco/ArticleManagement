import { slide , getRequest, getCode } from '../../common.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //页面轮播图
        img : [
            '../../static/img/1.jpg',
            '../../static/img/3.jpg',
        ],

        //首页文章板块
        item : [
            {'id' : 1 , 'title' : ''},
            {'id' : 2 , 'title' : ''},
            {'id' : 3 , 'title' : ''},
            {'id' : 4 , 'title' : ''},
            {'id' : 5 , 'title' : ''},
            {'id' : 6 , 'title' : ''},
        ],

        //现在的板块，默认推荐,栏目id
        plate : -1,
        //现在的推荐方式  0：最热  1：最新 
        flushType : 0,
        //板块移动的距离
        scrollLeft: 0,
    },
    async getCol(){
        let that = this;
        let code = await getCode();
        let res = await getRequest('wechat/article/getCol');
        if(res.code == 1){
            that.setData({
                item : res.data
            })
        }
    },

    async getArticle(){
        let param = new Array;      
        this.data.flushType == 0 ?  param['order'] = 'like desc' : param['order'] = 'create_time desc';
        this.data.plate == ~1 ? param['item'] = null : param['item'] = this.data.plate
        
        let res = await getRequest('wechat/article/getArticle',param);

        wx.stopPullDownRefresh();
    },

    /**
     * 下拉刷新
     */
    onPullDownRefresh:  function () {
       this.getArticle();
    },

    /**
     * 生命周期函数--监听页面加载
     */

    onLoad(options) {
      this.getCol();
    },

    /**
     * 顶部切换为点击的板块
     * @param {*} e 点击的元素
     * @author liuhua 2022/09/25
     */
    async selected(e){
        let that = this;

        //判断点击是否是当前板块
        that.data.plate == e.currentTarget.dataset.id?1:await this.changeselected(e.currentTarget.dataset.id);
        //页面变化
        //滑动到顶端
        slide(150 , 500);
        //默认获取最热信息
        that.setData({flushType:0});

        //点击节点移动到中间
        let index = e.currentTarget.dataset.index;
        let maxindex = that.data.item.length-3;
        console.log(index);
        console.log(maxindex);
        if( index>1 && index<maxindex){

            let sel = '#'+'item'+e.currentTarget.dataset.index
            wx.createSelectorQuery().select(sel).boundingClientRect(function (rect) {

                //获取屏幕的宽度的一半
                let screen = wx.getSystemInfoSync().windowWidth/2;
                //获取点击item的左边坐标
                let left = rect.left;
                //获取item的宽度de 一半
                let subhalfwidth= rect.width/2
                //需要scrollview 移动的距离是
                let distance = left-screen+subhalfwidth

                that.setData({
                  scrollLeft:distance+=that.data.scrollLeft
                })
              }).exec()
        }
        
        // 前三个
        if( index<=1 ){
            // console.log(index);
            that.setData({
                scrollLeft:~that.data.scrollLeft
            })
        }

        //后三个
        if(index>=maxindex){
            let length = that.data.item.length * 62 ;
            let distance = parseInt(length/wx.getSystemInfoSync().windowWidth);
            that.setData({
                scrollLeft : that.data.scrollLeft +=length-distance*390-that.data.scrollLeft+31+62
            })
        }

    },
    scrollmove(e){
        // console.log(e.detail.scrollLeft)
        var scrollLeft = e.detail.scrollLeft;
        this.data.scrollLeft = scrollLeft
    },
    /**
     * 当用户切换了板块，系统更改当前板块id
     * @param {*} e 当前节点
     * @author liuhua 2022/09/25
     */
    changeselected(e){
        return new Promise((resolve)=>{
            let that = this;
            that.setData({
                plate : e,      
            })
            setTimeout(resolve(), 200);
        })
        
    },

    /**
     * 更改推荐方式 最新或最热，不做判断，两个方式直接切换
     */
    changeway(){
        let that = this;
        that.setData({
            flushType : that.data.flushType == 0 ? 1 : 0
        })
    },

    /**
     * 获取当前屏幕的位置
     * @param {*} e 
     */
    onPageScroll:function(e){ 
        this.setData({ 
            scrollTop: e.scrollTop 
        }) 
    }, 

    //跳转文章详情页
    routing(e){
        let id  = e.currentTarget.dataset.rticleid;
        wx.navigateTo({
          url: '/pages/article/article?id='+id,
        })
    },
})