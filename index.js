// index.js
// 获取应用实例
// 获取应用实例
var common = require('../../utils/common.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //幻灯片素材
    swiperImg: [
      {src: '../../images/44.jpg'},
      {src: '../../images/22.png'},
      {src: '../../images/55.jpg'}
    ],
    titletemp:'',

    address:{},
    now:{
      temp:0,
      text:'未知',
      icon:'999',
      hunidity:0,
      pressure:0,
      vis:0,
      windDir:'未知',
      windSpeed:0,
      windScale:0
    }
  },


  DeleteText:function(e){
    var temp = e.currentTarget.dataset.title
    wx.removeStorage({
      key: temp
    })
  
  },


  onNewItem: function (e) {
    wx.navigateTo({
        url: "/pages/detail/detail",
    })
},

  goToDetail:function(e){
    let title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '../fix/fix?title=' + title,
    })
},


  getWeather:function(cc){
    var that = this;
    wx.request({
      url:'https://geoapi.qweather.com/v2/city/lookup',
      data:{
        location:cc,
        key:'ac9fe19311ef43aeaad0d97e04a0bb6c'
      },
      success:function(res){
        console.log(res.data);
        that.getinfo(res.data.location[0].id);
      }
    })
  },


  getinfo:function(id){
    var that = this;

    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      data:{
        location:id,
        key:'ac9fe19311ef43aeaad0d97e04a0bb6c'
      },

      success:function(res){
        console.log(res.data);
        that.setData({now:res.data.now});
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var that = this;
    // 获取当前的地理位置
    wx.getLocation({
      
      success(res) {
        const latitude = res.latitude
        // 经度
        const longitude = res.longitude
        // 请求腾讯地图逆地址解析接口
        wx.request({
            url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=YO5BZ-F366P-KDGDE-LGOHW-YV2SF-M5B5C`,
            success(res) {
                console.log(res)
                that.setData({address:res.data.result.address_component});
                that.getWeather(res.data.result.address_component.city);
                
            }
        })
        
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  check: function(e){
    this.setData({
      titletemp:e.detail.value
    })
    var temp = wx.getStorageSync(this.data.titletemp);
    this.setData({text:temp})

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that = this
    //  获取全局参数，在上一个页面赋值的
    var a= app.globalData.title;
    //判断是否带参数，带的话执行里边逻辑
    if (a!= null || a!= '' || a!= undefined) {
      //设置到页面data中，其他地方就可以使用了
      that.setData({titletemp: a});
      var temp = wx.getStorageSync(this.data.titletemp);
      this.setData({text:temp})
    }
    // 记得，一定要还原全局数据
    app.globalData.title= ''

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
    