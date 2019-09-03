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
  const favorRes = await db.collection('favor').doc(id).get()
  const favor = favorRes.data

  return favor
} 