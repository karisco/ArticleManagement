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
export function getRequest( url , param ){
    return new Promise((resolve)=>{
        wx.request({
            url : URL+url,
            data : param,
            method  : 'GET',
            success: function (res) {
              resolve(res.data);
            },
        })
    })
}

/**
 * http Post类型请求
 * @param {*} url 地址
 * @param {*} param 参数
 * @author liuhua 2022/09/25
 */
export function postRequest( url , header , param ){
    return new Promise((resolve)=>{
        wx.request({
            header : header,
            url : URL+url,
            data : param,
            method  : 'POST',
            success: function (res) {
              resolve(res.data);
            },
        })
    })
}

export function loginRequest(){
    try{
        return new Promise()
    }catch(e){

    }
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
              resolve(res.userInfo);
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

export async function register(){
    return new Promise( async (resolve, reject)=>{
        let code = await getCode();
        let res = await postRequest('wechat\\Login\\Register' , { 'code' :code });
        if(res.code !=1){
            res.constructor == Object ? success(res.msg,'none') : success('请求超时','');
            resolve({code : 0})
        }{
            setUserInfo(res.data.token);
            resolve({code : 1})
        }
    })
}

export function setUserInfo(key ,data){
    wx.setStorageSync( key , data )
}