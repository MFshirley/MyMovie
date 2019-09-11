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
  },

  getReviewDetail(id) {
    return wx.cloud.callFunction({
      name: 'reviewDetail',
      data: {
        id
      }
    })
  },

  addToFavor(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'addToFavor',
          data,
        })
      })
      .catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First1',
        })
        return {}
      })
  },

  getFavor() {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'getFavor',
        })
      })
      .catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First',
        })
        return {}
      })
  },

  getMyReview() {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'getMyReview',
        })
      })
      .catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First',
        })
        return {}
      })
  },

  getFavorDetail(favorId) {
    return wx.cloud.callFunction({
      name: 'favorDetail',
      data: {
        id: favorId
      }
    })
  },

  matchReview(movieId){
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'matchReview',
          data:{
            movieId
          }
        })
      })
      .catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First',
        })
        return {}
      })
  }
}