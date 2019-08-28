const util = require('./util')

const db = wx.cloud.database({
  env: 'moviecloud-0yjsg'
})

module.exports = {
  getMovieList(){
    return db.collection('movie').get()
  },

  getMovieDetail(id){
    return wx.cloud.callFunction({
      name: 'movieDetail',
      data: {
        id
      }
    })
  }
}