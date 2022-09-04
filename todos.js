Page({
    data:{

        input :'',

        todos:[
         { 
              name : '学习', //任务名称
              complete: true //任务完成状态
          },
           { 
                name : '运动', 
                complete: false 
            }, 
             { 
                name : '吃饭', 
                 complete: false
                },
                { 
                  name : '打游戏', 
                   complete: false 
                  }
             ],
       leftCount:3
    },


    
    addTodoHandle:function(){
      if(!this.data.input) return
      var todos=this.data.todos
      todos.push({ 
                  name:this.data.input, 
                  complete:false, 
                  allComplete:false 
        })

      wx.setStorage({
                    key:"todos",
                    data:todos
      })
      console.log(wx.getStorageSync('todos'))
      
      this.setData({
                  todos:todos,
                  input:'',
                  leftCount: this.data.leftCount+1
      })
    },



    
    inputChangeHandle:function(e){
     // console.log(e.detail)
     this.setData({ 
         input:e.detail.value
        })
    },


    toggleToHandle:function(e){
      
      //console.log(e.currentTarget)
    var item=this.data.todos[e.currentTarget.dataset.index]
    item.complete=!item.complete

    var leftCount=this.data.leftCount+(item.complete?-1:1)
    //console.log(item)
    this.setData({todos:this.data.todos,leftCount:leftCount})
    },



    DeleteHandle:function(e){
  
      console.log(e.currentTarget)
      var todos=this.data.todos
      //item就是splice方法中删除掉的元素
      var item=todos.splice(e.currentTarget.dataset.index,1)[0] //删除数组中对象的方法，1是从固定下标开始删除几个数组元素
      var leftCount=this.data.leftCount-(item.complete?0:1)

      this.setData({todos:todos,leftCount:leftCount})
    },



    toggleAllHandle:function(){ 
     
      this.data.allComplete=!this.data.allComplete
      var todos=this.data.todos
      var that=this
      todos.forEach(function(item){ //for循环  
      item.complete=that.data.allComplete
      })
      var leftCount=this.data.allComplete?0:this.data.todos.length
      this.setData({todos:todos,leftCount:leftCount})
     },



     clearHandle:function(){
       var todos=[]  //定义空数组
       
       this.data.todos.forEach(function(item){
        if(!item.complete){
          todos.push(item)  //把所有未完成的任务存储到一个新的数组
        }  
      })

      this.setData({ todos:todos  })
    }
})
    