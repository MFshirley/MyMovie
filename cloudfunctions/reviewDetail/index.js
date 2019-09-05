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
  const reviewRes = await db.collection('review').doc(id).get()
  const review = reviewRes.data

  return review
}