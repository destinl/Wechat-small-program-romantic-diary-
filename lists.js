// pages/lists/lists.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //text:[{}]
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

        wx.getStorageInfo({
          success: (option) => {
            this.setData({temp: option.keys})
            let list = [];
            for (var i = 0; i < this.data.temp.length; i++) {
                if(this.data.temp[i] != "num")
                {
                    let obj = {};
                    obj = wx.getStorageSync(this.data.temp[i]);
                    list.push(obj);
                } 
            }
            this.setData({text: list})
          },
        })
 
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