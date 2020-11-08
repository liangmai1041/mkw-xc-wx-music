// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// const rp = require('request-promise')

const axios = require('axios')

const URL = 'https://apis.imooc.com/personalized?icode=63C6A5B9F195BA7B'

// 云函数入口函数
exports.main = async (event, context) => {
  const { data } = await axios.get(URL)
  if(data.code >= 1000) {
    console.log(data.msg)
    return 0
  }
  const playlist = data.result
  
  if(playlist.length > 0) {
    await db.collection('playlist').add({
      data: [...playlist]
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.error('插入失败')
    })
  }
}