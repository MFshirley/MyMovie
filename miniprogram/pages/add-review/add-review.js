// pages/add-review/add-review.js
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    reviewContent: '',
    userInfo: null,
    recorderManager: wx.getRecorderManager()
  },
  
  setMovie(options){
    let movie = {
      movieId: options.movieId,
      movieName: options.name,
      movieImage: options.image
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
      url: `/pages/preview/preview?movieId=${data.movie.movieId}&name=${data.movie.movieName}&image=${data.movie.movieImage}&content=${data.reviewContent}&username=${data.userInfo.nickName}&userimage=${data.userInfo.avatarUrl}`,
    })
  },

  handleTouchStart(){
    console.log("touch start")
  },

  handleTouchEnd() {
    console.log("touch end")
    this.data.recorderManager.stop();
    this.data.recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setMovie(options)
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