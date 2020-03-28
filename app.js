App({
  //定义常量
  serverUrl:"https://www.imoocdsp.com",
  name:"imooc",
  age:18,
  isBoy:true,
  course:{
    lesson:"小程序",
    teacher:"风间影月"
  },
  //自定义方法
  sayHello(){
    console.log("hello imooc~")
  },

  // 构建全局购物车商品对象，{商品ID，购买数}
  cartItem(itemId,counts){
    var cartItem = new Object();
    cartItem.itemId = itemId;
    cartItem.counts = counts;
    return cartItem;
  },
  // 构建全局不可变商品对象,{商品对象，购买数，是否选中}
  finalCartItem(item,counts,isSelect){
    var finalCartItem = new Object();
    finalCartItem.item=item;
    finalCartItem.counts=counts;
    finalCartItem.isSelect=isSelect;
    return finalCartItem;
  },

  fetchItemCounts(cartItemIdArray,itemId){
    for(var i=0;i<cartItemIdArray.length;i++){
      var item = cartItemIdArray[i];
      if(item != null && item != undefined && itemId == item.itemId){
        return item.counts;
      }
    }
  },
// 获取购物车中某个商品是否选中的状态
    fetchItemIsSelect(finalCartItemList,itemId){
    for(var i=0;i<finalCartItemList.length;i++){
      var item = finalCartItemList[i].item;
      if(item != null && item != undefined && itemId == item.id){
        return finalCartItemList[i].isSelect;
      }
    }
  },
  // 获取购物车中的某个商品对象信息
    fetchItemFromFinalList(finalCartItemList,itemId){
    for(var i=0;i<finalCartItemList.length;i++){
      var item = finalCartItemList[i].item;
      if(item != null && item != undefined && itemId == item.id){
        return item;
      }
    }
  },

    getGlobalUserInfo() {
        // return null;
        var userInfo = my.getStorageSync({ key: 'globalUserInfo' }).data;
        return userInfo;
    },

  setGlobalUserInfo(userInfo){
    my.setStorageSync({
      key: 'globalUserInfo', // 缓存数据的key
      data:userInfo // 要缓存的数据
    });
    
  },

  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
