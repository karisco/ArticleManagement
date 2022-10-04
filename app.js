// app.js
import { getCode , success , postRequest , setUserInfo} from './common.js'
App({
  onLaunch() {
      this.register();
  },

  globalData: {
    userInfo: null
  },

  async register(){
    let code = await getCode();
    let res = await postRequest('wechat\\Login\\Register' , { 'code' :code });
    if(res.code !=1){
        res.constructor == Object ? success(res.msg,'none') : success('请求超时','');
    }{
        setUserInfo( 'token' , res.data.token );
        setUserInfo( 'userInfo' , res.data.userInfo );
    }
  },
})
