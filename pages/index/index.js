const app = getApp();

Page({

  data:{
    carousels:[],
    featuresList:[],
    newItemList:[]
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
      url:app.serverUrl+'/index/carousels',
      method:'POST',
      header:{'content-type':'application/json'},
      // data:{name:'jack',age:'18'},
      dataType:'json',
      success:function(res){
        console.log(res);
        var myData=res.data;
        if(myData.status == 200){
          var carousels = myData.data;
          // 把新的数据重新覆盖数据绑定中的原有的值
          me.setData({
            carousels:carousels
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
    // 请求推荐商品列表
    my.httpRequest({
      url:app.serverUrl+'/index/items/rec',
      method:'POST',
      header:{'content-type':'application/json'},
      dataType:'json',
      success:function(res){
        console.log(res);
        var myData=res.data;
        if(myData.status == 200){
          var featuresList = myData.data;
          // 把新的数据重新覆盖数据绑定中的原有的值
          me.setData({
            featuresList:featuresList
          });
        }
      },
    });
    // 请求新品列表
     my.httpRequest({
      url:app.serverUrl+'/index/items/new',
      method:'POST',
      header:{'content-type':'application/json'},
      dataType:'json',

      success:function(res){
        console.log(res);
        var myData=res.data;
        if(myData.status == 200){
          var newItemList = myData.data;
          // 把新的数据重新覆盖数据绑定中的原有的值
          me.setData({
            newItemList:newItemList
          });
        }
      },
    });
  },

  showItem(e){
    var itemId = e.target.dataset.itemId;
    my.navigateTo({
      url:"/pages/query/item/item?itemId="+itemId
    })
  },

  showItemList(e){
    var itemId= e.target.dataset.itemId;
    var catId= e.target.dataset.catId;
    var searchType= e.target.dataset.searchType;

    if(searchType == 1){
      my.navigateTo({
        url:"/pages/query/item/item?itemId="+itemId
      });
    }
    else if(searchType == 2)
    {
      my.navigateTo({
        url:"/pages/query/list/list?searchType=cat&catId="+catId+"&catName=搜索结果"
      })
    }
  },

  onShow(){
    // my.clearStorage();
     var cartItemIdArray = my.getStorageSync({
      key: 'cartItemIdArray', // 缓存数据的key
    }).data;
    console.log('====== start ======')
    console.log(cartItemIdArray)
    console.log('======  end  ======')
  }
});
