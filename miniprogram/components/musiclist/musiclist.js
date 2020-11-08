// components/musiclist/musiclist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playingId: -1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(e) {
      // 事件源 时间处理函数 事件对象 事件类型
      // console.log(e.currentTarget.dataset.musicid)
      const ds = e.currentTarget.dataset
      const musicid = ds.musicid
      this.setData({
        playingId: musicid,
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${musicid}&index=${ds.index}`,
      })
    },
  }
})
