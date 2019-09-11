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

  await db.collection('review').add({
    data: {
      user,
      nickName: event.nickName,
      avatar: event.avatar,
      content: event.content,
      movieId: event.movieId,
      movieName: event.movieName,
      movieImage: event.movieImage,
      recordPath: event.recordPath,
      type: event.type
    },
  })

  return {}
}