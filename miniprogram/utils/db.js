const util = require('./util')

const db = wx.cloud.database({
  env: 'moviecloud-0yjsg'
})

module.exports = {
  getMovieList(){
    return db.collection('movie').get()
  },

  getMovieDetail(id){
    wx.cloud.callFunction({
      name: 'moviePage',
      data: {
        id
      }
    })
  }
}