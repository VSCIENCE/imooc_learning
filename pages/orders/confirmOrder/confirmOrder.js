const app=getApp();

Page({
  data: {
    preOrderItemList:[],
    checkAllTotalAmount:0,

    addressEmpty:false,
    addressFull:true,
    },
  onLoad() {},
  onShow(){
    var me=this;
    // 从缓存中获取预处理订单数据列表
    var preOrderItemList = my.getStorageSync({
      key: 'preOrderItemList', // 缓存数据的key
    }).data;
    var checkAllTotalAmount=0;
    for(var i=0;i<preOrderItemList.length;i++){
      var item = preOrderItemList[i].item;
      var itemCounts=preOrderItemList[i].counts;
      checkAllTotalAmount+=Number(item.priceDiscountYuan)*itemCounts
    }

    me.setData({
      preOrderItemList:preOrderItemList,
      checkAllTotalAmount:checkAllTotalAmount
    })
  },
  setRemark(e){
    var remark = e.detail.value;
    this.setData({
      orderRemark:remark,
    });
    console.log(remark)
  },

  // 清理购物车缓存 和 预处理订单数据列表
  clearItemCache(){
    var cartItemIdArray=my.getStorageSync({
      key: 'cartItemIdArray', // 缓存数据的key
    }).data;
    var preOrderItemList = my.getStorageSync({
      key: 'preOrderItemList', // 缓存数据的key
    }).data;

    if(cartItemIdArray!=null&&cartItemIdArray!=undefined
    &&preOrderItemList!=null&&preOrderItemList!=undefined){
      for(var i =0;i<preOrderItemList.length;i++){
        var itemId=preOrderItemList[i].item.id;
        for(var j=0;j<cartItemIdArray.length;j++){
          if(itemId==cartItemIdArray[j].itemId){
            cartItemIdArray.splice(j,1);
            break;
          }
        }
      }
      if(cartItemIdArray.length>0){
        // 更新缓存
        my.setStorageSync({
          key: 'cartItemIdArray', // 缓存数据的key
          data: cartItemIdArray, // 要缓存的数据
        });
        }else{
        my.removeStorageSync({
          key: 'cartItemIdArray', // 缓存数据的key
        });
      }
    }

     my.removeStorageSync({
          key: 'preOrderItemList', // 缓存数据的key
        });
  },
  submitOrder(){
    var me = this;
    var preOrderItemList=my.getStorageSync({
      key: 'preOrderItemList', // 缓存数据的key
    }).data;

    // 循环list，构建商品str
    var itemStr="";
    var checkAllTotalAmount=0;
    for(var i=0;i<preOrderItemList.length;i++){
      var itemId = preOrderItemList[i].item.id;
      var itemCounts = preOrderItemList[i].counts;
      var singleItem=itemId+"|"+itemCounts+",";
      itemStr+=singleItem;
    }
    // 拼接完成后，发送数据到后端，调用接口，生成待付款订单
    var buyerId ="temp-buyerId";
    var remark = me.data.orderRemark;
    var addressId="temp-addressId";

     // 发送请求到后端
      my.showNavigationBarLoading();
      my.showLoading({
      content:"疯狂加载中"
      });
    // 请求接口，查询商品详情
       my.httpRequest({
      url:app.serverUrl+'/order/createOrder?itemStr='+itemStr
                                         +"&buyerId="+buyerId
                                       +"&addressId="+addressId,
      data:{
        remark:(remark==undefined?"":remark)
      },
      method:'POST',
      header:{'content-type':'application/json'},
      dataType:'json',
      success:function(res){
        // 获得代付款订单状态的id
        var myData=res.data;
        console.log(myData)
        if(myData.status == 200){
          var orderId = myData.data;
          console.log(orderId);

          // 清理缓存
          me.clearItemCache();
      }
      },             
     complete:function(res){
        my.hideNavigationBarLoading();
        my.hideLoading();
      }
    });
  }
});
