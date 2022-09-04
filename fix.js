var app = getApp()
Page({

    data: {
        inputtitle:'',
        inputcontent:'',
        inputcount:1,
        temptitle:'',
        temp:{},
        text:[{
        }
        ],

        num:0
    },

    inputChange:function(e){
        this.setData({inputtitle:e.detail.value})
    },
   
    inputchangeTextHandle:function(e){
        this.setData({inputcontent:e.detail.value})
    },

    inputchangeCount:function(e){
        this.setData({inputcount:e.detail.value})
    },

    SSave:function(){
        wx.removeStorage({
            key: this.data.temptitle
        })
        var id = wx.getStorageSync('num')
        this.setData({
          "temp.id":id,
          "temp.title":this.data.inputtitle,
          "temp.content":this.data.inputcontent,
          "temp.count":this.data.inputcount
        })
  
        wx.setStorage({
          key:this.data.temp.title,
          data:this.data.temp
        })
  
  
        wx.setStorage({
          key:'num',
          data:id+1
        })
  
        app.globalData.title = this.data.inputtitle
  
        wx.switchTab({
          url: "../index/index",
        })
    },


      



    onLoad:function(options) {
        if(!options) return
        let ttile = options.title
        if(ttile) 
        {
            var article = wx.getStorageSync(ttile)
            if(article != ''){
                this.setData({
                    flag:1,
                    temp:article,
                    temptitle:ttile
                })
            }       
        }
        
    },
})
