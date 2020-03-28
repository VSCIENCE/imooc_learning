const app = getApp();

Page({
  data: {
    headerImagesArr:[],
    item:{},
    itemContentArr:[],

    animationInfo:{},
    animationOpacity:0,
    cartIco:"cart-empty",
  },

  onShow(){
    var animation= my.createAnimation();
    this.setData({
      animationInfo:animation.export()
    })

  },

  addToCart(){
    var me=this;
    me.setData({
      animationOpacity:1
    });
   me.showAddToCartAnimation();

  //  商品id存入购物车
  var itemId = me.data.item.id;
  me.cartItemIcrease(itemId);
  },

  // 跳转购物车页面
  goToCart(){
    my.switchTab({
      url: '/pages/shoppingCart/cart/cart', // 跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面）。注意：路径后不能带参数
    });
  },
  
  cartItemIcrease(itemId){
    var me = this;

    // 从缓存中拿到购物车数组对象
    var cartItemIdArray = my.getStorageSync({
      key: 'cartItemIdArray', // 缓存数据的key
    }).data;
    // 判断cartItemIdArray是否为空
    if(cartItemIdArray == null || cartItemIdArray == undefined){
      // 构建空的购物车数组对象
      cartItemIdArray=[];
    }

    // 定义标识用于判断购物车缓存中是否含有当前页的商品
    var isItemAdded = false;
    
    for (var i=0;i< cartItemIdArray.length;i++){
      var item = cartItemIdArray[i];
      if(item != null && item != undefined && item.itemId == itemId){
        // 删除原来的item
        cartItemIdArray.splice(i,1);
        var counts = item.counts+1;
        // 重新构建商品对象
        var cartItemNew =  app.cartItem(itemId,counts);
        cartItemIdArray.push(cartItemNew);
        isItemAdded = true;
        break;
      }
    }

    // 在没有添加过当前商品的时候，新创建一个对象放入数组
    if(!isItemAdded){
    // 构建新的商品对象
    var cartItem =  app.cartItem(itemId,1);
    // 把这个商品对象放入购物车
    cartItemIdArray.push(cartItem);
    }

    // 把cartItemIdArray存入缓存
    my.setStorageSync({
      key: 'cartItemIdArray', // 缓存数据的key
      data: cartItemIdArray, // 要缓存的数据
    });
  },

  showAddToCartAnimation(){
    var animation=my.createAnimation({
      duration:500
    });
    this.animation = animation;
    // rotate旋转
    this.animation.rotate(-180).translateX("296rpx").step();

    this.setData({
      animationInfo:this.animation.export(),
    })

    setTimeout(function(){
    this.setData({
      animationOpacity:0,
      cartIco:"cart-full",
    });

      setTimeout(function(){
        this.animation.rotate(0).translateX(0).step({
        duration:0
      });
        this.setData({
        animationInfo:this.animation.export()
      });
    }.bind(this),550);
  }.bind(this),600);
  },

  onLoad(params) {
    var me=this;
    // 获取上一个页面传过来的商品id主键
    var itemId = params.itemId;

    my.showNavigationBarLoading();
      my.showLoading({
      content:"疯狂加载中"
      });
    // 请求接口，查询商品详情
       my.httpRequest({
      url:app.serverUrl+'/items/searchById?itemId='+itemId,
      method:'POST',
      header:{'content-type':'application/json'},
      dataType:'json',
      success:function(res){
        console.log(res);
        var myData=res.data;
        if(myData.status == 200){
          var item = myData.data;
          console.log(item);
          var headerImagesStr=item.headerImages;
          var headerImagesArr=JSON.parse(headerImagesStr);
          console.log("headerImagesArr:"+headerImagesArr);

          var itemContentArr = JSON.parse(item.content)

          // 把新的数据重新覆盖数据绑定中的原有的值
          me.setData({
            headerImagesArr:headerImagesArr,
            item:item,
            itemContentArr:itemContentArr
          });
        }
      },             
     complete:function(res){
        my.hideNavigationBarLoading();
        my.hideLoading();
      }
    });

  },
  buyMe(){
    var me=this;
    // 构建预处理订单商品对象
    var preOrderItem = app.finalCartItem(me.data.item,1,null);
    var preOrderItemList =[];
    preOrderItemList.push(preOrderItem);
    my.setStorageSync({
      key:"preOrderItemList",
      data:preOrderItemList,
    });
    my.navigateTo({
      url:"/pages/orders/confirmOrder/confirmOrder"
    });
  }

});
