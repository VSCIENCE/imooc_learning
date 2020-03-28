const app = getApp();

Page({

  data: {
    userInfo:{},
    userLogin:false,
    userNotLogin:true
  },

  onLoad() {
    var me = this;
    var userInfo= app.getGlobalUserInfo();
    if(userInfo!=null && userInfo!=undefined){
      me.setData({
        userInfo:userInfo,
        userLogin:true,
        userNotLogin:false
      });
      return;
    }

    my.getAuthCode({
      scopes:"auth_user",
      success: (res) => {
      if(res.authCode){
        console.log(res.authCode);
        var qq="466280658"
        my.httpRequest({
        url:app.serverUrl+'/team/login/'+res.authCode+'/'+qq,
        method:'POST',
        header:{'content-type':'application/json'},
        dataType:'json',

        success:function(res){
        console.log(res);
        var myData=res.data;
        if(myData.status == 200){
        var userInfo = myData.data;
        console.log("userInfo:")
        console.log(userInfo)
        // 把新的数据重新覆盖数据绑定中的原有的值
        me.setData({
        userInfo:userInfo,
        userLogin:true,
        userNotLogin:false
        });

        app.setGlobalUserInfo(userInfo);
        }
      },
    });
      }
      },

    });
  },

  login(){
  this.onLoad();
  }
});
