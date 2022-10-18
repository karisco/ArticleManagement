import { ask , getCode, getUserProfile, postRequest } from '../../common.js'
// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      userInfo : '',
      code : ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.setData({
        userInfo : wx.getStorageSync('userInfo')
      })
    },
    async login(){
        let that = this;
      await ask('确定登录吗？');
      let userInfo = await getUserProfile();
      let token = wx.getStorageSync('token');
      var data = {
        nickName      : userInfo.nickName,
        avatarUrl     : userInfo.avatarUrl
      };
      var res = await postRequest('/wechat/Login/SetUserInfo',{'xx-token':token},data);
        if(res.code != 1){
          //       ( res.constructor == Object ) ? wx_error(res.msg) : wx_error('请求超时');
          //这是写错误代码
        }else {
          //缓存用户登陆进度
          wx.setStorageSync('userInfo',res.data);  
            that.setData({
                userInfo: res.data
            })
        }
    },

    async getPhoneNumber (e)  {
      let that = this;
  
      // 用户拒绝授权
      if(e.detail.errMsg == "getPhoneNumber:fail user deny") {
        wx.showToast({
          icon: "none",
          title: '请允许获取手机号，或者自己填写，否则功能不可用！',
        })
        return
      }
      console.log(e);
      /// 用户允许授权
      //提交后台
      let res = await postRequest('wechat/Login/SetUserPhone',{'xx-token': wx.getStorageSync('token')},{ 'code' : that.data.code , 'encryptedData' : e.detail.encryptedData , 'iv' : e.detail.iv});
      if(res.code != 1){
        // 这里写错误代码
      }else {
        let data = res.data;
        this.setData({
          phone : data.phone
        })
      }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    async onShow() {
      let that = this;
      let code = await getCode();
      that.setData({
          code : code
        })
      setInterval(async function () {
        let code = await getCode();
        that.setData({
          code : code
        })
        }, 10000)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})