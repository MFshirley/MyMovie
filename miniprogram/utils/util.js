module.exports = {
  getUserInfo() {
    return new Promise((resolve, reject) => {
      this.isAuthenticated().then(() => {
        wx.getUserInfo({
          success(res) {
            const userInfo = res.userInfo
            resolve(userInfo)
          }
        })
      }).catch(() => {
        reject()
      })
    })
  },

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo'] === true) {
            resolve()
          } else {
            reject()
          }
        }
      })
    })
  },

  onAddReview(movie) {
    //const movie = this.data.movie

    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success(res) {
        const index = res.tapIndex
        
        if (index === 0) {
          wx.navigateTo({
            url: `/pages/add-review/add-review?movieId=${movie.movieId}&name=${movie.movieName}&image=${movie.movieImage}&type=0`,
          })
        } else {
          wx.navigateTo({
            url: `/pages/add-review/add-review?movieId=${movie.movieId}&name=${movie.movieName}&image=${movie.movieImage}&type=${index}`,
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

}