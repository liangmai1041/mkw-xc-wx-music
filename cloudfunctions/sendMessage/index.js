// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const result = await cloud.openapi.templateMessage.send({
    touser: OPENID,
    page: `/pages/blog-comment/blog-comment?blogId=${event.blogId}`,
    data: {
      thing3: {
        value: event.content,
      },
      date4: {
        value: 'fake time',
      },
    },
    templateId: 'tCG0AHVgf7B_grssap0BBA8g6uqVxH55IprTsQIBrpQ',
    formId: event.formId,
  })
  return result
}