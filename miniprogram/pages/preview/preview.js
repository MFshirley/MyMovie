// pages/preview/preview.js
const db = require('../../utils/db')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    userInfo: null,
    reviewContent: "",
    type: "",
    tempFilePath: ""
  },

  setInfo(options) {
    let movie = {
      movieId: options.movieId,
      movieName: options.name,
      movieImage: options.image
    }
    
    let type = options.type
    console.log(type)
    let userInfo = {
      nickName: options.username,
      avatarUrl: options.userimage
    }
    if(type == 'text'){
      let content = options.content
      this.setData({
        movie,
        type,
        reviewContent: content,
        userInfo
      })
    } else {
      let tempFilePath = decodeURIComponent(options.path)
      console.log("preview ", tempFilePath + ", " + options.path)
      this.setData({
        movie,
        type,
        tempFilePath,
        userInfo
      })
    }
  },

  onPlay(){
    var filePath = this.data.tempFilePath
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = filePath
    innerAudioContext.play();
  },

  onTapBack(){
    wx.navigateBack()
  },

  addReview(){
    let content = this.data.reviewContent
    let path = this.data.tempFilePath
    let type = this.data.type
    let movieId = this.data.movie.movieId
    
    if (!content && !path) return

    wx.showLoading({
      title: 'send...',
    })

    db.addReview({
      nickName: this.data.userInfo.nickName,
      avatar: this.data.userInfo.avatarUrl,
      type,
      recordPath: path,
      content,
      movieId,
      movieName: this.data.movie.movieName,
      movieImage: this.data.movie.movieImage,
    }).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        wx.showToast({
          title: 'Succeed'
        })

        setTimeout(() => {
          wx.navigateTo({
            url: `/pages/reviewlist/reviewlist?movieId=${movieId}`,
          })
        }, 1500)
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("preview path " , options.path)
    this.setInfo(options)
  },
})