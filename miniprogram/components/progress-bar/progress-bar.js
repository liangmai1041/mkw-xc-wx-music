// components/progress-bar/progress-bar.js
let movableAreaWidth = 0
let movableViewWidth = 0
const backgroundAudioManager = wx.getBackgroundAudioManager()
let currentSec = -1 // 当前秒数
let duration = 0 // 当前歌曲的总时长，以秒为单位
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime: {
      currentTime: '00:00',
      totalTime: '00:00',
    },
    movableDis: 0,
    progress: 0,
  },
  
  lifetimes: {
    ready() {
      this._getMovableDis()
      this._bindBGMEvent()
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      // console.log(e);
      // 拖动
      if(e.detail.source === 'touch') {
        this.data.progress = e.detail.x / (movableAreaWidth - movableViewWidth) * 100
        this.data.movableDis = e.detail.x
      }
    },
    onTouchEnd(e) {
      console.log(e)
      const currentTimeFmt = this._dateFormat(Math.floor(backgroundAudioManager.currentTime))
      this.setData({
        progress: this.data.progress,
        movableDis: this.data.movableDis,
        ['showTime.currentTime']: `${currentTimeFmt.min}:${currentTimeFmt.sec}`,
      })
      backgroundAudioManager.seek(duration * this.data.progress / 100)
    },
    _getMovableDis() {
      const query = this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec((rect) => {
        // console.log(rect);
        movableAreaWidth = rect[0].width
        movableViewWidth = rect[1].width
        console.log(movableAreaWidth, movableViewWidth);
      })
    },
    _bindBGMEvent() {
      backgroundAudioManager.onPlay(() => {
        console.log('onPlay');
      })
      backgroundAudioManager.onStop(() => {
        console.log('onStop');
      })
      backgroundAudioManager.onPause(() => {
        console.log('onPause');
      })
      backgroundAudioManager.onWaiting(() => {
        console.log('onWaiting');
      })
      backgroundAudioManager.onCanplay(() => {
        console.log('onCanplay');
        console.log(backgroundAudioManager.duration)
        if(typeof backgroundAudioManager.duration !== 'undefined') {
          this._setTime()
        } else {
          setTimeout(() => {
            this._setTime()
          }, 1000)
        }
      })
      backgroundAudioManager.onTimeUpdate(() => {
        // console.log('onTimeUpdate');
        const currentTime = backgroundAudioManager.currentTime
        const duration = backgroundAudioManager.duration
        const sec = Math.floor(currentTime)
        if(sec !== currentSec) {
          // console.log(currentTime);
          const currentTimeFmt = this._dateFormat(currentTime)
          this.setData({
            movableDis: (movableAreaWidth - movableViewWidth) * currentTime / duration,
            progress: currentTime / duration * 100,
            ['showTime.currentTime']: `${currentTimeFmt.min}:${currentTimeFmt.sec}`,
          })
          currentSec = sec
        }
      })
      backgroundAudioManager.onEnded(() => {
        console.log('onEnded');
      })
      backgroundAudioManager.onError((res) => {
        console.error(res.errMsg);
        console.error(res.errCode);
        wx.showToast({
          title: '错误：' + res.errCode,
        })
      })
    },
    _setTime() {
      duration = backgroundAudioManager.duration
      console.log(duration);
      const durationFmt = this._dateFormat(duration)
      console.log(durationFmt);
      this.setData({
        ['showTime.totalTime']: `${durationFmt.min}:${durationFmt.sec}`,
      })
    },
    // 格式化时间
    _dateFormat(sec) {
      // 分钟
      const min = Math.floor(sec / 60)
      sec = Math.floor(sec % 60)
      return {
        min: this._parse0(min),
        sec: this._parse0(sec),
      }
    },
    // 补零
    _parse0(sec) {
      return sec < 10 ? '0' + sec : sec
    }
  },
})
