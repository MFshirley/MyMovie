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
  },
  
  addReview(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'addReview',
          data,
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First',
        })
        return {}
      })
  },

  getReviews(movieId){
    return db.collection('review').where({
      movieId,
    }).get()
  }
}