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
  const movieId = event._id

  const favorRes = await db.collection('favor').where({
    movieId,
    user,
  }).get()

  const favorList = favorRes.data

  if (!favorList.favor) {
    await db.collection('favor').add({
      data: {
        movieId,
        user,
        content: event.content,
        avatar: event.avatar,
        nickName: event.nickName,
        movieImage: event.movieImage,
        movieName: event.movieName,
        favor: true,
      },
    })
  } else {
    console.log(favored)
  }

  return {}
}