// pages/add-review/add-review.js
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    reviewContent: '',
    userInfo: null
  },
  
  setMovie(options){
    let movie = {
      movieId: options.movieId,
      name: options.name,
      image: options.image
    }
    this.setData({
      movie,
    })
  },

  onInput(event){
    this.setData({
      reviewContent: event.detail.value.trim()
    })
  },

  addReview(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setMovie(options)
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