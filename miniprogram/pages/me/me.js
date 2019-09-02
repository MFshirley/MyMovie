// pages/me/me.js
const util = require('../../utils/util')
const db = require('../../utils/db')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    favorList: []
  },

  getFavor(){
    wx.showLoading({
      title: 'Loading...',
    })

    db.getFavor().then(result => {
      wx.hideLoading()

      const data = result.result
      if(data.length){
        this.setData({
          favorList: data
        })
        //console.log(favorList)
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

  onTapLogin(event) {
    console.log(event.detail.userInfo)
    this.setData({
      userInfo: event.detail.userInfo
    })
    this.getFavor()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })

      this.getFavor()
    }).catch(err => {
      console.log('Not Authenticated yet')
    })
  },
})