// pages/blog-edit/blog-edit.js

// 输入文字最大的限制
const MAX_WORDS_NUM = 140
// 最大上传图片数量
const MAX_IMG_NUM = 9

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入的文字个数
    wordsNum: 0,
    footerBottom: 0,
    images: [],
    selectPhoto: true,  // 添加图片元素是否显示
  },

  onInput(e) {
    // console.log(e.detail.value);
    let wordsNum = e.detail.value.length
    if(wordsNum >= MAX_WORDS_NUM) {
      wordsNum = `最大字数为${MAX_WORDS_NUM}`
    }
    this.setData({
      wordsNum,
    })
  },
  onFocus(e) {
    // 模拟器获取的键盘高度为0
    console.log(e);
    this.setData({
      footerBottom: e.detail.height,
    })
  },
  onBlur(e) {
    this.setData({
      footerBottom: 0,
    })
  },
  onChooseImage() {
    // 还能再选几张图片
    let max = MAX_IMG_NUM - this.data.images.length
    wx.chooseImage({
      count: max,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res);
        this.setData({
          images: this.data.images.concat(res.tempFilePaths),
        })
        // 还能再选几张图片
        max = MAX_IMG_NUM - this.data.images.length
        this.setData({
          selectPhoto: max <= 0 ? false : true,
        })
      },
    })
  },
  onDelImage(e) {
    this.data.images.splice(e.target.dataset.index, 1)
    this.setData({
      images: this.data.images,
    })
    if(this.data.images.length <= MAX_IMG_NUM) {
      this.setData({
        selectPhoto: true,
      })
    }
  },
  onPreviewImage(e) {
    wx.previewImage({
      urls: this.data.images,
      current: e.target.dataset.imgsrc,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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