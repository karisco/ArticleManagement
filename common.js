const  URL = 'http://';

/**
 * 
 * @param {*} title 标题
 * @param {*} state 状态
 * @param {*} time 延迟时间
 */
export function success( title = '成功', state = 'success', time = 1000){
    wx.showToast({
      title :  title,
      icon : state,
      duration : time
    })
}

/**
 * 
 * @param {*} title 标题
 * @param {*} content 内容
 * @param {*} confirmText 确认框文字 
 * @param {*} confirmColor 确认框颜色
 * @param {*} cancelText 取消框文字
 * @param {*} cancelColor 取消框颜色
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

export function getCode(){
    return new Promise(( resolve )=>{
        wx.login({
          success(res){
              resolve(res.code);
          }
        })
    })
}

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