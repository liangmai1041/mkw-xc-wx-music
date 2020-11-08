// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// const rp = require('request-promise')

const axios = require('axios')

const URL = 'https://apis.imooc.com/personalized?icode=63C6A5B9F195BA7B'

const playlistCollection = db.collection('playlist')

// 云函数入口函数
exports.main = async (event, context) => {
  const list = await playlistCollection.get()

  const { data } = await axios.get(URL)
  if(data.code >= 1000) {
    console.log(data.msg)
    return 0
  }
  const playlist = data.result
  
  const newData = []
  for(let i = 0, len1 = playlist.length; i < len1; i++) {
    let flag = true
    for(let j = 0, len2 = list.data.length; j < len2; j++) {
      if(playlist[i].id === list.data[j].id) {
        flag = false
        break
      }
    }
    if(flag) {
      newData.push(playlist[i])
    }
  }

  if(newData.length > 0) {
    await playlistCollection.add({
      data: [...newData]
    }).then((res) => {
      console.log('插入成功')
    }).catch((err) => {
      console.error('插入失败')
    })
  }

  return newData.length
}