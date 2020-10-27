// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var a = 5
    // let const
    // for(let i = 0; i < 5; i++) {

    // }
    // console.log(i)
    // const a = 5
    // let a = 6

    // const obj = {}
    // const arr = []

    // const userName = 'dingyi'
    // const person = {
    //   userName,
    //   age: 23,
    // }
    wx.cloud.callFunction({
      name: 'login',
    }).then((res) => {
      console.log(res)
      this.setData({
        openid: res.result.openid
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})