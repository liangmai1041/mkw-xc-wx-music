// components/blog-ctrl/blog-ctrl.js
let userInfo = {}
const db = wx.cloud.database()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blogId: String,
    blog: Object,
  },
  externalClasses: ['iconfont', 'icon-pinglun', 'icon-fenxiang'],
  /**
   * 组件的初始数据
   */
  data: {
    // 登录组件是否显示
    loginShow: false,
    // 底部弹出层是否显示
    modalShow: false,
    content: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment(e) {
      // 判断用户是否授权
      wx.getSetting({
        success: res => {
          if(res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                userInfo = res.userInfo
                // 显示评论弹出层
                this.setData({
                  modalShow: true,
                })
              }
            })
          } else {
            this.setData({
              loginShow: true,
            })
          }
        }
      })
    },
    onLoginsuccess(e) {
      userInfo = e.detail
      // 授权框小时，评论框显示
      this.setData({
        loginShow: false,
      }, () => {
        this.setData({
          modalShow: true,
        })
      })
    },
    onLoginfail(e) {
      wx.showModal({
        title: '授权用户才能进行评价',
        content: '',
      })
    },
    onSend(e) {
      console.log(e)
      // 插入数据库
      let formId = e.detail.formId
      let content = e.detail.value.content
      if(content.trim() === '') {
        wx.showModal({
          title: '评论内容不能为空',
          content: '',
        })
        return
      }
      wx.showLoading({
        title: '评价中',
        mask: true,
      })
      db.collection('blog-comment').add({
        data: {
          content,
          createTime: db.serverDate(),
          blogId: this.properties.blogId,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
        },
      }).then(res => {

        // 推送模板消息
        wx.cloud.callFunction({
          name: 'sendMessage',
          data: {
            content,
            formId,
            blogId: this.properties.blogId,
          }
        }).then(res => {
          console.log(res)
        })
        
        wx.hideLoading()
        wx.showToast({
          title: '评论成功',
        })
        this.setData({
          modalShow: false,
          content: '',
        })

        // 父元素刷新评论页面
        this.triggerEvent('refreshCommentList')
      })
    },
  }
})
