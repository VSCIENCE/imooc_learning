const app= getApp();

Page({
  data: {
    titleName:"",
    itemList:[]
  },
  
  onLoad(params) {
    var searchType=params.searchType;
    var itemName=params.itemName;
    var me=this;
    // console.log("searchType："+searchType);
    // console.log("itemName："+itemName);

    var catId=params.catId;
    var catName = params.catName;
    // console.log("catId:"+catId);
    // console.log("catName:"+catName);



    // 根据类型查询结果值
    if(searchType=="cat"){
      my.showNavigationBarLoading();
      my.showLoading({
      content:"疯狂加载中"
      });
      my.httpRequest({
      url:app.serverUrl+'/items/searchByCat?catId='+catId,
      method:'POST',
      header:{'content-type':'application/json'},
      // data:{name:'jack',age:'18'},
      dataType:'json',
      success:function(res){
        console.log(res);
        var myData=res.data;
        if(myData.status == 200){
          var itemList = myData.data;
          console.log(itemList)
          // 把新的数据重新覆盖数据绑定中的原有的值
          me.setData({
            titleName:catName,
            itemList:itemList
          });
        }
      },
      complete:function(res){
        my.hideNavigationBarLoading();
        my.hideLoading();
      }
    });
    }
    else if(searchType="words"){
      my.showNavigationBarLoading();
      my.showLoading({
      content:"疯狂加载中"
      });
       my.httpRequest({
      url:app.serverUrl+'/items/search',
      method:'POST',
      header:{'content-type':'application/json'},
      data:{itemName:itemName},
      dataType:'json',
      success:function(res){
        console.log(res);
        var myData=res.data;
        if(myData.status == 200){
          var itemList = myData.data;
          console.log(itemList)
          // 把新的数据重新覆盖数据绑定中的原有的值
          me.setData({
            titleName:"搜索结果",
            itemList:itemList
          });
        }
      },
     complete:function(res){
        my.hideNavigationBarLoading();
        my.hideLoading();
      }
    });
    }
  },
});
