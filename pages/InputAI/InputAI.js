// pages/InputAI/InputAI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Round:0,
    Chips:0,
    imgsrc:'/images/_925533671__5574739bc8fde09d7a829d721a1d1eec_-46278340_IMG_20231008_213035_0_xg_0.jpg',
    hiddeninfo:1,
    userInfo:{},
    Name:'',
    Head:''
  },
  InputChip(e){
    this.setData({
      Chips:e.detail.value
    })
  },
  InputRound(e){
    this.setData({
      Round:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})