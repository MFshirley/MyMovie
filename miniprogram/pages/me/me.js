// pages/me/me.js
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    favorList: [{
      avatar: "https://wx.qlogo.cn/mmopen/vi_32/JUxl1nttCEgPGO1oqTCxYxh1l13k82aqZ5kADMmFfmWzoUqq9X1FkRw62PtNviaqL2HKRkia6ibicEHfomibEBmvlzg/132",
      username: "mimi",
      movieId: "CoTvhHk1IbnAVWz8ZIVWcGcHIff3UnSDl6hzupj7QMg3WGyk",
      content: "gooooooooooooooooooooooooooood"
    }, {
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/JUxl1nttCEgPGO1oqTCxYxh1l13k82aqZ5kADMmFfmWzoUqq9X1FkRw62PtNviaqL2HKRkia6ibicEHfomibEBmvlzg/132",
        username: "mimi",
        movieId: "CoTvhHk1IbnAVWz8ZIVWcGcHIff3UnSDl6hzupj7QMg3WGyk",
        content: "nicccccccccccccccccccccce"
    }]
  },

  onTapLogin(event) {
    console.log(event.detail.userInfo)
    this.setData({
      userInfo: event.detail.userInfo
    })
  },

  onBackHome(){
    wx.navigateTo({
      url: '/pages/home/home',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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