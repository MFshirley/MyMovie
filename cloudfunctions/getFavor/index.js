// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'moviecloud-0yjsg',
  traceUser: true,
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID

  const favorRes = await db.collection('favor').where({
    user,
  }).get()
  const favorList = favorRes.data
  console.log(favorList)
  
  return favorList
}