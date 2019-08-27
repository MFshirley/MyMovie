// pages/detail/detail.js
const db = require("../../utils/db")
const util = require("../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    movie:[]
  },

  onAddReview(){
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success(res) {
        const index = res.tapIndex

        wx.navigateTo({
          url: '/pages/add-review/add-review',
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  getMovieDetail(id){
    wx.showLoading({
      title: 'Loading...',
    })
    console.log(id)

    db.getMovieDetail(id).then(result => {
      wx.hideLoading()
      const data = result.result

      console.log(data)
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMovieDetail(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})