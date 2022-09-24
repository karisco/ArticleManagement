// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      img : [
        '../../static/img/1.jpg',
        '../../static/img/2.jpg',
        '../../static/img/3.jpg',
      ],
      item : [ '推荐' , '热点' , '娱乐' , '国际' , '热点' , '娱乐' , '国际' , '热点' , '娱乐' , '国际' ,'热点' , '娱乐' , '国际' , '热点' , '娱乐' , '国际']
    },

    async change(){
        console.log(1);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
})