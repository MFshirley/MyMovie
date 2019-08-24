// pages/list/list.js
const db = require('../../utils/db')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: []
  },

  getMovieList() {
    wx.showLoading({
      title: 'Still loading...',
    })

    db.getMovieList().then(result => {
      wx.hideLoading()

      const data = result.data
      if (data.length) {
        this.setData({
          movieList: data
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getMovieList()
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