const app = getApp();

Page({

  data: {
    userInfo:{},
    userLogin:false,
    userNotLogin:true,
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
      success: (res) => 
      {
        if(res.authCode)
        {
          console.log(res.authCode);
          var qq="466280658"
          my.httpRequest
          ({
            url:app.serverUrl+'/team/login/'+res.authCode+'/'+qq,
            method:'POST',
            header:{'content-type':'application/json'},
            dataType:'json',
            success:function(res)
            {
              console.log(res);
              var myData=res.data;
              if(myData.status == 200)
              {
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
  },

  logout(){
    var me=this;
    my.showActionSheet({
      
      items: ['退出','支付','人脸识别','实名认证','实人认证'], // 菜单按钮文字数组
      cancelButtonText:'确认取消',
      destructiveBtnIndex: '0', // （iOS特殊处理）指定按钮的索引号，从0开始，使用场景：需要删除或清除数据等类似场景，默认红色
      badges:[
        {index:0,type:'none'},
        {index:1,type:'point'},
        {index:2,type:'num',text:'8'},
        {index:3,type:'text',text:'推荐'},
        {index:4,type:'more'}],
      success: (res) => {
        if(res.index==0){
          my.clearStorageSync();
           me.setData({
            userInfo:{},
            userLogin:false,
            userNotLogin:true
            });
        }
      },
    });
  }
});
