const  URL = 'http://8.130.35.147/';

/**
 * 提示弹出框
 * @param {*} title 标题
 * @param {*} state 状态
 * @param {*} time 延迟时间
 * @author liuhua 2022/09/25
 */
export function success( title = '成功', state = 'success', time = 1000){
    wx.showToast({
      title :  title,
      icon : state,
      duration : time
    })
}

/**
 * 询问弹出框
 * @param {*} title 标题
 * @param {*} content 内容
 * @param {*} confirmText 确认框文字 
 * @param {*} confirmColor 确认框颜色
 * @param {*} cancelText 取消框文字
 * @param {*} cancelColor 取消框颜色
 * @author liuhua 2022/09/25
 */
export function ask(title = '提示', content = '' , confirmText = '确认', confirmColor = '', cancelText = '取消', cancelColor =''){
    return new Promise(( resolve ) => {
       wx.showModal({
         title : title ,
         content : content ,
         confirmText : confirmText ,
         confirmColor : confirmColor ,
         cancelText : cancelText ,
         cancelColor : cancelColor ,
         success(res){
             if(res.confirm){
                 resolve();
             }else{
                throw new Error("停止运行");
             }
         }
       })
    })
}

/**
 * 获取用户的官方code
 * @returns {number} code
 * @author liuhua 2022/09/25
 */
export function getCode(){
    return new Promise(( resolve )=>{
        wx.login({
          success(res){
              resolve(res.code);
          }
        })
    })
}

/**
 * http get类型请求
 * @param {*} url 地址
 * @param {*} param 参数
 * @author liuhua 2022/09/25
 */
export function requestGet( url , param ){
    return new Promise((resolv)=>{
        wx.request({
            url : url,
            data : param,
            method  : 'GET',
            success: function (res) {
              resolve(res.data);
            },
        })
    })
}

/**
 * 获取用户身份信息
 * @author liuhua 2022/09/25
 */
export function getUserProfile(){
    return new Promise( ( resolve )=> {
        wx.getUserProfile({
          desc: '获取你的昵称，头像，地区及性别',
          success(res){
              resolve(1);
          }
        })
    })
}

/**
 * 屏幕滑动到指定位置
 * @param {*} location 屏幕位置
 * @param {*} time 滑动时间
 * @author liuhua 2022/09/25
 */
export function slide(location , time){
    return new Promise((resolve)=>{
        wx.pageScrollTo({
            scrollTop : location,
            duration : time,
            success(res){
                resolve(1);
            }
        })
    })
}