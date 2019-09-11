// pages/me/me.js
const util = require('../../utils/util')
const db = require('../../utils/db')

const reviewMap = {
  favor: '收藏的影评V',
  mine: '我的影评V'
}

Page({
  data: {
    tab: 'favor',
    userInfo: null,
    reviewMap,
    reviewTab:['favor', 'mine'],
    favorList: []
  },

  onTapType(event) {
    let tab = event.currentTarget.dataset.cat
    this.setData({
      tab: tab
    })
    
    if (tab == 'favor'){
      this.getFavor()
    }else{
      this.getMyReview()
    }
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
        console.log(this.data.favorList)
      } else {
        favorList: []
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

  getMyReview(){
    wx.showLoading({
      title: 'Loading...',
    })

    db.getMyReview().then(result => {
      wx.hideLoading()

      const data = result.result
      if (data.length) {
        this.setData({
          favorList: data
        })
      } else {
        favorList: []
      }
      //console.log("myreview", this.data.favorList)
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
    this.setData({
      userInfo: event.detail.userInfo
    })
    this.getFavor()
  },

  onTapReview:function(event){
    console.log(event.currentTarget.dataset)
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/review/review?id=' + id,
    })
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