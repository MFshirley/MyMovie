// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'moviecloud-0yjsg',
  traceUser: true,
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const id = event.id
  const movieRes = await db.collection('movie').doc(id).get()
  const movie = movieRes.data

  return movie
}