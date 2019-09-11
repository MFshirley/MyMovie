// pages/review/review.js
const db = require("../../utils/db")
const util = require("../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    reviewList: {},
    favor:{}
  },

  onPlayRecord(){
    var filePath = this.data.reviewList.recordPath
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = filePath
    innerAudioContext.play();
  },

  onAddReview() {
    const movie = this.data.reviewList
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

  getReviewDetail(favorId) {
    wx.showLoading({
      title: 'Loading...',
    })

    db.getReviewDetail(favorId).then(result => {
      wx.hideLoading()

      const data = result.result
      if (data) {
        this.setData({
          reviewList: data
        })
      }
      //console.log("review ", this.data.reviewList)
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed',
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReviewDetail(options.id)
  },

  onShow: function () {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
      console.log("review login", this.data.userInfo)
    }).catch(err => {
      console.log('Not Authenticated yet')
    })
  },

})