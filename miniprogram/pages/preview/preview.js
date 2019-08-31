// pages/preview/preview.js
const db = require('../../utils/db')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    userInfo: null,
    reviewContent: ""
  },

  setInfo(options) {
    let movie = {
      movieId: options.movieId,
      name: options.name,
      image: options.image
    }
    let content = options.content
    let userInfo = {
      nickName: options.username,
      avatarUrl: options.userimage
    }

    this.setData({
      movie,
      reviewContent: content,
      userInfo,
    })
  },

  onTapBack(){
    wx.navigateBack()
  },

  addReview(event){
    let content = this.data.reviewContent
    let movieId = this.data.movie.movieId
    console.log(movieId)
    if (!content) return

    wx.showLoading({
      title: 'send...',
    })

    db.addReview({
      username: this.data.userInfo.nickName,
      avatar: this.data.userInfo.avatarUrl,
      content,
      movieId,
    }).then(result => {
      wx.hideLoading()

      const data = result.result
      const options = this.data

      if (data) {
        wx.showToast({
          title: 'Succeed'
        })

        console.log("shirley " + movieId)
        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/reviewlist/reviewlist?movieId=${movieId}`,
          })
        }, 1500)
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setInfo(options)
    console.log(options.movieId)
  },
})