// pages/home/home.js
const db = require('../../utils/db')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieDetail: {},
    reviewLength: 0,
    reviewUser:{}
  },

  onTapDetail() {
    let review = this.data.reviewUser
    let movie = this.data.movieDetail

    wx.navigateTo({
      url: `/pages/review/review?id=${review._id}&nickname=${review.username}&avatar=${review.avatar}&content=${review.content}&movieId=${review.movieId}&moviename=${movie.name}&movieimage=${movie.image}`,
    })
  },

  onTapHot() {
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },

  onTapMe(){
    wx.navigateTo({
      url: '/pages/me/me',
    })
  },

  onPullDownRefresh() {
    this.getMovieList(() => {
      wx.stopPullDownRefresh()
    })
  },

  getMovieList(){
    wx.showLoading({
      title: 'Still loading...',
    })

    db.getMovieList().then(result => {
      //console.log(result)
      wx.hideLoading()

      const data = result.data
      let movieLength = data.length
      const randomIndex = Math.floor(Math.random() * movieLength)

      if(data.length){
        this.setData({
          movieDetail: data[randomIndex]
        })
      }
      const movieId = this.data.movieDetail._id
      //console.log(movieId)
      this.getReview(movieId)
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },

  getReview(movieId) {
    wx.showLoading({
      title: 'still loading...',
    })
    
    db.getReviews(movieId).then(result => {
      wx.hideLoading()
      const data = result.data
      let reviewLength = data.length
      //console.log(reviewLength)
      const randomIndex = Math.floor(Math.random() * reviewLength)
      //console.log(data[randomIndex])
      if (data.length) {
        this.setData({
          reviewUser: data[randomIndex]
        })
      }
      //console.log(this.data.reviewUser)
    }).catch(err => {
      wx.hideLoading()
      console.error(err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMovieList()
  },
})