//app.js
App({
  onLaunch: function () {
    wx.login({
      success(res) {
        console.log(res.code);
      }
    });
  },
  globalData: {
    userInfo: null
  }
})