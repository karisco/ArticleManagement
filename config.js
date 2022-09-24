//配置域名
// export const APPURL = 'http://www.we.com/api/';//本地
export const APPURL = 'https://wx.hezongyuncai.com/api/';

//获取用户最新的token
export function GetUserToken() {
  return {'XX-Token' : wx.getStorageSync('token') ?? '','xx-device-type': 'wxapp'};
};
//获取用户最新的经纬度
export function GetUserLocation() {
  //经度
  let latitude = wx.getStorageSync('latitude');
  //纬度
  let longitude = wx.getStorageSync('longitude');
  return {
    code      : ( latitude && longitude ) ? 1 : 0,
    latitude  : latitude ?? '',
    longitude : longitude ?? '',
  };
};


//获取用户最新的经纬度
export function GetUserCity() {
  //城市
  let city    = wx.getStorageSync('city');
  //详细地址
  let address = wx.getStorageSync('address');
  return {
    code      : ( city && address ) ? 1 : 0,
    city      : city ?? '',
    address   : address ?? '',
  };
};


//更新用户缓存
export function SetUserToken(token) {
  wx.setStorageSync('token', token);
}

//自动注册
export async function Register(){
  
  return  new Promise(async (resolve, reject)  => {
      //获取用户code
      var code = await GetCode();
      //自动注册
      var res = await HttpPost('/home/Login/Register', { code : code });
      console.log(res);
      if(res.code != 1){
        resolve({ code : 0 });
        //( res.constructor == Object ) ? wx_error(res.msg) : wx_error('请求超时');
      }else {
        var data = res.data;
        //登陆成功 缓存用户token
        SetUserToken(data.token);  
        resolve({ code : 1 });
      }
  });
  
}

/**
 * 更新缓存
 */
export function SetConfig(){
  return  new Promise(async (resolve, reject)  => {
    var res = await HttpPost('/home/Index/GetConfig');
    if(res.code != 1){
      ( res.constructor == Object ) ? wx_error(res.msg) : wx_error('请求超时');
    }else {
      let data = res.data;
      wx.setStorageSync('config', data);
      resolve(data);
    }
  });
}

//获取系统日期
export function GetDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return [ year, ( month > 10 ) ? month : '0' + month, day ].join('-');
}


/**
 * 
 * @param {*} param 
 * 弹窗 失败
 */
export function wx_error( param, icon = 'none') {
  try{
    wx.showToast({
      title     : param,
      icon      : icon,
      duration  : 2000
    });
    throw new Error("停止运行");
  } catch(err){
    throw new Error("停止运行");
  }
};

/**
 * @param {*} param 
 * 获取用户的经纬度
 */
export  function  wx_Location() {
  return new Promise((resolve, reject) => {
    //获取缓存中的经纬度
    let GetLocation = GetUserLocation();
    //如果经纬度不为空,就直接返回
    if(GetLocation.code == 1) {
      resolve(GetLocation);
    }else{
      //经纬度为空,重新授权获得经纬度
      wx.getLocation({
        type: 'gcj02', //wgs84/gcj02
        gltitude: true,
        isHighAccuracy: true,
        success: async function (res) {
          wx.setStorageSync('latitude', res.latitude);
          wx.setStorageSync('longitude', res.longitude);
          resolve({
            code      : 1,
            latitude  : res.latitude,
            longitude : res.longitude,
           });
        },
        error(err) {
          wx_error('获取失败');
        }
      });
    }
  });
};


/**
 * 
 * @param {*} latitude 
 * @param {*} longitude 
 * 
 * 获取用户详细地址
 */
export  async function wx_GetCity( latitude, longitude ) {

    let city = GetUserCity();
    if( city.code == 1 ) {
      return city;
    }else{
      let key = 'U3KBZ-DY26V-JIEPY-USLVD-PUQV7-2DFM7';
      let url = 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=' + key;
      var res = await HttpGet(url);
      if(res.status != 0){
        ( res.constructor == Object ) ? wx_error(res.msg) : wx_error('请求超时');
      }else {  
        let result = res.result;
        wx.setStorageSync('address', result.address);
        wx.setStorageSync('city', result.address_component.city);
        return {
          code    : 1,
          city    : result.address_component.city,
          address : result.address
        };
      }
    }
}

/**
 * 
 * @param {*} param 
 * 弹窗 成功
 */
export function wx_success( param, icon = 'success' ) {
  try{
    wx.showToast({
      title     : param,
      icon      : icon,
      duration  : 2000
    });
    
  } catch(err){
    throw new Error("停止运行");
  }
};

/**
 * 
 * @param {*} param 
 * 询问框
 */
export function wx_ask(msg, cancelColor = '#000036', confirmColor = '#fe5671'){
  return new Promise((resolve, reject) => {
    wx.showModal({
      content       : msg,
      cancelColor   : cancelColor,
      confirmColor  : confirmColor,
      success (res) {
        if (res.cancel) {
          throw new Error("用户点击取消");
        }else{
          resolve(1);
        }
      },
      error(err) {
        throw new Error("用户点击取消");
      }
    });
  });
};


export function CreateUrl( path, param ){
 let url = '';
  for(let key in param ){
    url += ( url == '' ) ? ( '?' + key + '=' + param[key] ) : ( '&' + key + '=' + param[key] );
  }
  return path + url;
};

//判断手机号是否合法
export function PhoneInput( phone = '' ) {
  ( phone == '' || phone == null ) && wx_error('请输入手机号');
  let regex = /^1[3-9][0-9]\d{8}$/;
  // let regex = /^1[3-9][0-9]\d{8}$/;
  ( phone.length != 11 ) && wx_error('手机号长度有误');
  (phone.length !== 0 && !regex.test(phone)) && wx_error('请输入正确的手机号');

}
/**
 * 
 * @param {*} res 
 * 支付
 */
export function PayOrder(res){
  try{
    return  new Promise((resolve, reject) => {
      wx.requestPayment({
           'timeStamp'  : res.timeStamp,
           'nonceStr'   : res.nonceStr,
           'package'    : res.package,
           'signType'   : res.signType,
           'paySign'    : res.paySign, 
           'success'    :function(res){
              //支付成功
              resolve(true);
           },
           'fail':function(ret){
          console.log(ret);
              //支付失败
              resolve(false);
           }
      });
    });
  } catch(err){
      return false;
  }
};

//获取用户code
export function GetCode(){
  return  new Promise((resolve, reject) => {
    wx.login({
      success: async (res) => {
          resolve(res.code);
      },
      fail: function (error) {
        reject('');
      }
    });
  });
};

//获取用户信息
export function GetUserProfile(){
  return  new Promise((resolve, reject) => {
    wx.getUserProfile({
      lang: "zh_CN",
      desc: "获取你的昵称，头像，地区及性别",
      async success(res) {
        var data = {
          nickName      : res.userInfo.nickName,
          avatarUrl     : res.userInfo.avatarUrl
        };
        resolve(data);
      },
      fail: function (error) {
        reject('');
      }
    })

  });
};



//######POST请求
export function  HttpPost( url, params){
  try{
    console.log(APPURL + url);
    return  new Promise((resolve, reject) => {
      wx.request({
        url     : APPURL + url,
        data    : params,
        method  : 'POST',
        header  : GetUserToken(),
        success: async function (res) {
          //用户未登陆 跳转到登陆页面
          if ( res.data.code != 10001 ) {
            resolve(res.data);
          }else{
            wx_success('请登陆后重试','none');
            console.log('退出登陆');
            let status = await Register();
            console.log(status);

            if( status.code == 1 ){
              var pages = getCurrentPages();
              if( pages[0].route == 'pages/my_profile/my_profile' ){
                pages[0].onShow()
                throw new Error("停止运行");

              }else{
                pages[0].onLoad({ })
                throw new Error("停止运行");
              }
            }
          }
        },
        fail: (err) => {
          console.log(err);
          reject(err);
        }
      });
    });
  } catch(err){
      return false;
  }
};
//######GET请求
export function HttpGet(url,params = ''){
  try{
    return new Promise((resolve, reject) => {
      wx.request({
        url     : url,
        data    : params,
        method  : 'GET',
        header  : GetUserToken(),
        success: function (res) {
          resolve(res.data);
        },
      });
    });
  } catch(err){
  }
};

 // 修改手机号中间4位
 export function editPhoneNumber(m){
  if( m == '' || m == null || !m ){
    return '';
  }
 let mobile = m.split('');
 mobile.splice(3,4,'****');
 mobile = mobile.join('');
 return mobile;
}

 //转义方法
export function escape2Html(params = '') {
    if(params == null || params == ''){
      return '';
    }
    var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
    return params.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; }).replace(/<section/g, '<div').replace(/\<img/g, '<img class="imgStyle" ').replace(/<u>/g,'').replace(/<u style="">/g,'').replace(/<\/u>/g,'');
};

//判读用户是否登录

export function isLogin() {
    if(USERINFO()){
      Popup('未登录');
      setTimeout(function() {
        wx.switchTab({
          url: '/pages/my/my'
        })
     }, 3000);
    }
};

/* 图片上传 图片来源 : [手机相册,拍照] */

export function UploadImg( count = 1 ){
  return  new Promise((resolve, reject) => {
    wx.chooseImage({
      count       : count,
      sizeType    : ['original', 'compressed'],
      sourceType  : ['album', 'camera'],
      success (res) {
        //img标签的src属性显示图片
        resolve(res.tempFiles[0]);
      },
      fail (ret) {
        wx_error('上传失败');
      }
    })
  });
};


//将图片上传至服务器
//path   : 图片路径
export function UploadFilePath( Path ){
  return  new Promise((resolve, reject) => {
    wx.uploadFile({
      url       : APPURL + '/user/upload/one',
      header    : GetUserToken(),
      filePath  : Path,
      name      : 'file',
      success(res) {
        let result = JSON.parse(res.data);
        ( result.code != 1 ) && wx_error('上传失败'); 
        resolve({
          path  : result.data.filepath,
          url   : result.data.url,
        });
      },
      fail :function(ret){
        wx_error('上传失败');
      }
    })
  });
};

/* 视频上传 */
export function UploadVideo(){
  return  new Promise((resolve, reject) => {
    wx.chooseMedia({
      count       : 1,
      mediaType   : ['video'],
      sourceType  : ['album', 'camera'],
      camera      : 'back',
      success(res) {
        resolve(res.tempFiles[0]);
      },
      fail (ret) {
        Tips('上传失败');
      }
    })
  });
};

/* 文件上传 */
export function UploadFile(){
  return  new Promise((resolve, reject) => {
    wx.chooseMessageFile({
      count     : 1,      //上传文件的数量
      type      : 'all',
      extension : ['png'], // 根据文件拓展名过滤
      success(res) {
        resolve(res.tempFiles[0]);
      },
      fail (ret) {
        Tips('上传失败');
      }
    })
  });
};

/* 授权订阅消息  */ 
/* send_id : [] */ 
export function UsersSend(send_id){
  return  new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds: send_id,//消息模板id  
      success(res) {
        //获取共同时授权多少个订阅消息
        let count = send_id.length;
        let success = 0;
        for(let i = 0;i < count;i++){
          success += ( res[send_id[i]] == 'accept' ) ? 1 : 0;
        }
        resolve((success == count) ? true : false);
      },
      fail (ret) {
        resolve(false);
      }
    })
  });
}


/**
 * 
 * @param {*} array 
 * @param {*} value 
 * 获取数组中需要对应元素
 */
export function GetArrayFilter(array,value)
{
  var data = {};
  for(var i = 0;i < value.length;i++){
    if(value[i] in array){
       data[value[i]] = array[value[i]];
    }
  }
  return data;
};




