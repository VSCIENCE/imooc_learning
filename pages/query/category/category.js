const app = getApp();

Page({

  data:{
    catItem:[]
  },

  onLoad(){

  },

  onPullDownRefresh(){
    this.initData();
  },

  onReady(){
    this.initData();
  },

  initData(){
    var me = this;
    my.httpRequest({
      url:app.serverUrl+'/cats',
      method:'POST',
      header:{'content-type':'application/json'},
      dataType:'json',
      success:function(res){
        console.log(res);
        var myData=res.data;
        if(myData.status == 200){
          var catItem = myData.data;
          // 把新的数据重新覆盖数据绑定中的原有的值
          me.setData({
            catItem:catItem
          });
        }
      },
      fail:function(res){
        console.log("发生错误："+res)
      },
      complete:function(res){
        console.log("最终执行complete"+res)
      },
    });
    
  },

  searchItems(e){
    console.log(e);
    var itemName=e.detail.value;
    // 由于后端对itemName为空进行了推荐列表的处理，所以这里判断可以省略
    // if(itemName!=null&&itemName!=""&&itemName!=undefined)
    // {
      my.navigateTo({
        url:"/pages/query/list/list?searchType=words&itemName="+itemName
        });
    // }

    // else{
    //   return;
    // }
  }
});

