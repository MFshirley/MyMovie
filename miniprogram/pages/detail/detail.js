// pages/detail/detail.js
const db = require("../../utils/db")
const util = require("../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}
  },

  onAddReview() {
    const movie = this.data.movie
    
    //shirley mark 
    wx.showActionSheet({
      itemList: ['文字', '音频'],
      success(res) {
        const index = res.tapIndex

        if (index === 0) {
          wx.navigateTo({
            url: `/pages/add-review/add-review?movieId=${movie._id}&name=${movie.movieName}&image=${movie.movieImage}&type=${index}`,
          })
        } else {
          wx.navigateTo({
            url: `/pages/add-review/add-review?movieId=${movie._id}&name=${movie.movieName}&image=${movie.movieImage}&type=${index}`,
          })
        }
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

    db.getMovieDetail(id).then(result => {
      wx.hideLoading()
      const data = result.result

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
    this.getMovieDetail(options.id)
  },

})