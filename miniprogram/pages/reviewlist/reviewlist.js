// pages/reviewlist/reviewlist.js
const db = require('../../utils/db')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reviewList: []
  },

  getReviews(movieId){
    db.getReviews(movieId).then(result => {
      const data = result.data
      if (data.length) {
        this.setData({
          reviewList: data
        })
      }
    }).catch(err => {
      console.error(err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReviews(options.movieId)
  },
})