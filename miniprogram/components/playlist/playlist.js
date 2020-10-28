// components/playlist/playlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playlist: {
      type: Object,
    }
  },

  observers: {
    ['playlist.playCount'](count) {
      // console.log(count);
      this.setData({
        _count: this._tranNumber(count, 2)
      })
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _count: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _tranNumber(num, point) {
      let numStr = num.toString().split('.')[0],
          _len = numStr.length
      if(_len < 6) {
        return numStr
      } else if(_len >= 6 && _len <= 8) {
        // let decimal = numStr.substring(_len - 4, _len - 4 + point)
        // return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
        return parseFloat(numStr.slice(0, -4) + '.' + numStr.slice(-4, -4 + point)) + '万'
      } else if(_len > 8){
        // let decimal = numStr.substring(_len - 8, _len - 8 + point)
        // return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
        return parseFloat(numStr.slice(0, -8) + '.' + numStr.slice(-8, -8 + point)) + '亿'
      }
    }
  }
})
