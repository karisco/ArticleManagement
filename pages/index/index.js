import { slide } from '../../common.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //页面轮播图
        img : [
            '../../static/img/1.jpg',
            '../../static/img/2.jpg',
            '../../static/img/3.jpg',
        ],

        //首页文章板块
        item : [
            {'id' : 0 , 'name' : '推荐'},
            {'id' : 1 , 'name' : '推荐'},
            {'id' : 2 , 'name' : '推荐'},
            {'id' : 3 , 'name' : '推荐'},
            {'id' : 4 , 'name' : '推荐'},
            {'id' : 5 , 'name' : '推荐'},
            {'id' : 6 , 'name' : '推荐'},
            {'id' : 7 , 'name' : '推荐'},
            {'id' : 8 , 'name' : '推荐'},
            {'id' : 9 , 'name' : '推荐'},
        ],

        //现在的板块，默认推荐
        plate : 0
    },

    async selected(e){
        let that = this;

        //判断点击是否是当前板块
        that.data.plate == e.currentTarget.dataset.id?1:this.changeselected(e.currentTarget.dataset.id);
        //滑动到顶端
        await slide(150 , 500);

        //
        that.setData({
            
        })
    },

    async changeselected(e){
        this.setData({
            plate : e,
        })
    },

    onPageScroll:function(e){
        this.setData({
            scrollTop: e.scrollTop
          })
      },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
})