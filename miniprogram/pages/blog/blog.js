// pages/blog/blog.js
// 搜索的关键字
let keyword = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制底部弹出层是否显示
    modalShow: false,
    blogList: [],
  },

  // 发布功能
  onPublish() {
    // 判断用户是否授权
    wx.getSetting({
      success: (res) => {
        console.log(res);
        if(res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              // console.log(res);
              this.onLoginSuccess({
                detail: res.userInfo
              })
            },
          })
        } else {
          this.setData({
            modalShow: true,
          })
        }
      }
    })
  },
  onLoginSuccess(e) {
    console.log(e)
    const detail = e.detail
    wx.navigateTo({
      url: `../blog-edit/blog-edit?nickName=${detail.nickName}&avatarUrl=${detail.avatarUrl}`,
    })
  },
  onLoginFail(e) {
    wx.showModal({
      title: '授权用户才能发布',
      content: '',
    })
  },
  _loadBlogList(start = 0 ) {
    wx.showLoading({
      title: '拼命加载中',
    })
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        keyword,
        start,
        count: 6,
        $url: 'list',
      }
    }).then(res => {
      this.setData({
        blogList: this.data.blogList.concat(res.result),
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  goComment(e) {
    wx.navigateTo({
      url: '../../pages/blog-comment/blog-comment?blogId=' + e.target.dataset.blogid ,
    })
  },
  onSearch(e) {
    // console.log(e.detail.keyword);
    this.setData({
      blogList: [],
    })
    keyword = e.detail.keyword
    this._loadBlogList(0)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.scene)
    this._loadBlogList()

    // // 小程序端调用云数据库
    // const db = wx.cloud.database()
    // db.collection('blog').orderBy('createTime', 'desc').get().then(res => {
    //   console.log(res);
    //   const data = res.data
    //   for(let i = 0, len = data.length; i < len; i++) {
    //     data[i].createTime = data[i].createTime.toString()
    //   }
    //   this.setData({
    //     blogList: data,
    //   })
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    this.setData({
      blogList: [],
    })
    this._loadBlogList(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._loadBlogList(this.data.blogList.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    console.log(e);
    let blogObj = e.target.dataset.blog
    return {
      title: blogObj.content,
      path: `/pages/blog-comment/blog-comment?blogId=${blogObj._id}`,
      // imageUrl: '',
    }
  }
})