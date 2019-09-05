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
      movieName: options.name,
      movieImage: options.image
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

  addReview(){
    let content = this.data.reviewContent
    let movieId = this.data.movie.movieId
    
    if (!content) return

    wx.showLoading({
      title: 'send...',
    })

    db.addReview({
      nickName: this.data.userInfo.nickName,
      avatar: this.data.userInfo.avatarUrl,
      content,
      movieId,
      movieName: this.data.movie.movieName,
      movieImage: this.data.movie.movieImage,
    }).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        wx.showToast({
          title: 'Succeed'
        })

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
  },
})