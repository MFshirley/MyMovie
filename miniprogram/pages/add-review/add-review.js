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

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
  },

  onInput(event){
    this.setData({
      reviewContent: event.detail.value.trim()
    })
  },

  onPreview(){
    const data = this.data

    wx.navigateTo({
      url: `/pages/preview/preview?movieId=${data.movie.movieId}&name=${data.movie.name}&image=${data.movie.image}&content=${data.reviewContent}&username=${data.userInfo.nickName}&userimage=${data.userInfo.avatarUrl}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setMovie(options)
    console.log(options)
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
    }).catch(err => {
      console.log('Not Authenticated yet')
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