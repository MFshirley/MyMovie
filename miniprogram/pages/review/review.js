// pages/review/review.js
const db = require("../../utils/db")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    reviewList: {}
  },

  getMovieDetail(id) {
    wx.showLoading({
      title: 'Loading...',
    })

    db.getMovieDetail(id).then(result => {
      wx.hideLoading()
      const data = result.result

      if (data) {
        this.setData({
          movie: data
        })
      } else {
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      setTimeout(() => {
        wx.navigateBack()
      }, 2000)
    })
  },

  /*getReview(movieId) {
    wx.showLoading({
      title: 'Loading...',
    })

    db.getReviews(movieId).then(result => {
      const data = result.data

      if (data.length) {
        this.setData({

        })
      }
    }).catch(err => {
      console.error(err)
    })
  },*/

  setReview(options){
    let reviewList = {
      image: options.image,
      content: options.content,
      name: options.name
    }
    console.log(reviewList)
    this.setData({
      reviewList,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.movieId)
    //console.log(options.reviewId)
    this.getMovieDetail(options.movieId)
    this.setReview(options)
    //this.getReview(options.reviewId)
  },

})