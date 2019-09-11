// pages/add-review/add-review.js
const util = require('../../utils/util')
const db = require('../../utils/db.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    type: '0',
    reviewContent: '',
    myReview: {},
    userInfo: null,
    tempFilePath: null,
    recorderManager: wx.getRecorderManager()
  },
  
  setMovie(options){
    let type = options.type

    let movie = {
      movieId: options.movieId,
      movieName: options.name,
      movieImage: options.image
    }
    this.setData({
      movie,
      type
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

  onTextPreview(){
    const data = this.data

    wx.navigateTo({
      url: `/pages/preview/preview?movieId=${data.movie.movieId}&name=${data.movie.movieName}&image=${data.movie.movieImage}&content=${data.reviewContent}&username=${data.userInfo.nickName}&userimage=${data.userInfo.avatarUrl}&type=${'text'}`,
    })
  },

  onRecordPreview() {
    const data = this.data
    let path = encodeURIComponent(data.tempFilePath)
    console.log("record", path)

    wx.navigateTo({
      url: `/pages/preview/preview?movieId=${data.movie.movieId}&name=${data.movie.movieName}&image=${data.movie.movieImage}&path=${path}&username=${data.userInfo.nickName}&userimage=${data.userInfo.avatarUrl}&type=${'record'}`,
    })
  },

  handleTouchStart(){
    console.log("touch start")
  },

  handleTouchEnd() {
    console.log("touch end")
    this.data.recorderManager.stop();
    this.data.recorderManager.onStop((res) => {
      this.data.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
    })
  },

  handleLongPress() {
    console.log("long touch")
    const options = {
      duration: 10000,//指定录音的时长，单位 ms
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    this.data.recorderManager.start(options);
    this.data.recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    this.data.recorderManager.onError((res) => {
      console.log(res);
    })
  },

  matchReview(movieId){
    console.log(movieId)
    wx.showLoading({
      title: 'Loading...',
    })

    db.matchReview(movieId).then(result => {
      wx.hideLoading()

      const data = result.result
      const len = data.length
      
      if (data.length) {
        this.setData({
          myReview: data[len - 1]
        })
        
        const myReview = this.data.myReview
        wx.redirectTo({
          url: `/pages/review/review?id=${myReview._id}`,
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
  onLoad: function (options) {
    this.setMovie(options)
    this.matchReview(options.movieId)
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
})