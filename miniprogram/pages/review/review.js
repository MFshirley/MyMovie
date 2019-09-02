// pages/review/review.js
const db = require("../../utils/db")
const util = require("../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    reviewList: {},
    favor:{}
  },

  onAddReview() {
    const movie = this.data.movie
    util.onAddReview(movie)
  },

  onAddFavor(){
    wx.showLoading({
      title: 'Loading...',
    })

    db.addToFavor(this.data.reviewList).then(result => {
      wx.hideLoading()

      const data = result.result
      //console.log(this.data.reviewList)
      if (data) {
        wx.showToast({
          title: 'Succeed',
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed',
      })
    })
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

  setReview(options){
    let reviewList = {
      avatar: options.avatar,
      content: options.content,
      nickName: options.nickname,
      movieId: options.movieId,
      movieName: options.moviename,
      movieImage: options.movieimage
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
    //console.log(options.id)
    //this.getMovieDetail(options.movieId)
    this.setReview(options)
  },

})