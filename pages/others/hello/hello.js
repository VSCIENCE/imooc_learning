const app = getApp();
Page({
  onLoad() {
    // 页面加载
    console.log("页面加载")
    console.log("=========== start ============")
    console.log(app.name);
    console.log(app.age);
    console.log(app.isBoy);
    console.log(app.course);
    console.log(app.sayHello());
   console.log("=========== end ============")
  },
  onReady() {
    // 页面加载完成
    console.log("页面加载完成")
  },
  onShow() {
    console.log("页面显示")
    // 页面显示
  },
  onHide() {
    console.log("页面隐藏")
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
    console.log("页面被关闭")
  },
  onTitleClick() {
    // 标题被点击
     console.log("标题被点击")
  },
  onPullDownRefresh() {
    // 页面被下拉
    console.log("页面被下拉")
  },
  onReachBottom() {
    // 页面被拉到底部
    console.log("页面被拉到底部")
  },
  onShareAppMessage() {
    // 返回自定义分享信息
     console.log("返回自定义分享信息")
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  close(){
    my.redirectTo({
      url: '/pages/index/index', // 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。参数规则如下：路径与参数之间使用
      success: (res) => {
        
      },
    });
  }
});
