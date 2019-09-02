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

        wx.navigateTo({
          url: `/pages/add-review/add-review?movieId=${movie._id}&name=${movie.name}&image=${movie.image}`,
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
}