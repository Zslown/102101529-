// pages/Battle/Battle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dice:[],//期望表
    Rows:0,
    list1:[],//骰子随机序列
    list2:[],//骰子随机序列
    LockKeyPlayer1:[],//玩家1骰子锁定行为-索引数组
    LockKeyPlayer2:[],//玩家2骰子锁定行为-索引数组
    LockValuePlayer1:[],//玩家1骰子锁定行为-大小数组
    LockValuePlayer2:[],//玩家2骰子锁定行为-大小数组
    LockValueFinalPlayer1:[],//玩家1最终锁定数组
    LockValueFinalPlayer2:[],//玩家2最终锁定数组
    countPlayer1:0,//玩家1锁定个数
    countPlayer2:0,//玩家2锁定个数
    HiddenFlagRollPlayer1:[],//玩家1投掷区显示标记
    HiddenFlagLockPlayer1:[],//玩家1锁定区显示标记
    HiddenFlagRollPlayer2:[],//玩家1投掷区显示标记
    HiddenFlagLockPlayer2:[],//玩家1锁定区显示标记
    LockRowPlayer1:[],
    LockRowPlayer2:[],
    ChipPlayer1:1000,
    ChipPlayer2:1000,
    ScorePlayer1:0,
    ScorePlayer2:0,
    multiple:1,
    AddMulPlayer:0,
    HiddenFlagAddMul:1,
    HiddenFlagAddMul1:1,
    winscore:0,
    Name:'',
    Head:'/images/yelan.png',
    NamePlayer1:'Robot',//初始名字
    NamePlayer2:'小呆呆',//初始名字
    Round:1,//总局数
    RoundCurrent:0//当前局数
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '人机对战',
    })
    wx.showToast({
      title: '点击左下角获取头像',
      icon: 'none',
    });
    // if(options.chips != 0){
    //   this.setData({
    //     ChipPlayer1:options.chips,
    //     ChipPlayer2:options.chips
    //   })
    // }
    // if(options.round != 0){
    // this.setData({
    //   Round:options.round
    // })
    // }
    this.setData({
      dice: new Array(9331).fill(0)
    })
    this.dfs(0,0)
  },
  NextRow(){
    if(this.data.ChipPlayer1 < 0){
      wx.navigateTo({
        url: `/pages/FinalWin/FinalWin`,
      })
    }
    if(this.data.ChipPlayer2 < 0){
      wx.navigateTo({
        url: `/pages/FinalLose/FinalLose`,
      })
    }
    if(this.data.RoundCurrent == this.data.Round){
      if(this.data.ChipPlayer1 >this.data.ChipPlayer2){
        wx.navigateTo({
          url: `/pages/FinalLose/FinalLose`,
        })
      }
      else{
        wx.navigateTo({
          url: `/pages/FinalWin/FinalWin`,
        })
      }
    }
      this.setData({
      Rows:0,
      LockRowPlayer1:[],
      LockRowPlayer2:[],
      list1:[],//骰子随机序列
      list2:[],//骰子随机序列
      LockKeyPlayer1:[],//玩家1骰子锁定行为-索引数组
      LockKeyPlayer2:[],//玩家2骰子锁定行为-索引数组
      LockValuePlayer1:[],//玩家1骰子锁定行为-大小数组
      LockValuePlayer2:[],//玩家2骰子锁定行为-大小数组
      LockValueFinalPlayer1:[],//玩家1最终锁定数组
      LockValueFinalPlayer2:[],//玩家2最终锁定数组
      countPlayer1:0,//玩家1锁定个数
      countPlayer2:0,//玩家2锁定个数
      HiddenFlagRollPlayer1:[],//玩家1投掷区显示标记
      HiddenFlagLockPlayer1:[],//玩家1锁定区显示标记
      HiddenFlagRollPlayer2:[],//玩家1投掷区显示标记
      HiddenFlagLockPlayer2:[],//玩家1锁定区显示标记
      ScorePlayer1:0,
      ScorePlayer2:0,
      multiple:1,
      winscore:0,
      AddMulPlayer:0,
      HiddenFlagAddMul:1,
      })
      this.DiceRoll();
  },
//算分函数
  WorkOut(lock_dice){
    var score = 0;
    var dices1 = [0,0,0,0,0,0,0];//记录每个点数的骰子有几个
    var dices11 = [0,0,0,0,0,0];
    for (let i = 0; i < 5; i++) {
        score += lock_dice[i];
        dices1[lock_dice[i]] += 1;
    }
    for (let i = 1; i < 7; i++) {
        dices11[dices1[i]] += 1;
    }
        if (dices11[5] === 1)//五连加100分
    {
        score += 100;
    }
    else if (dices11[4] === 1)//四连加40分
    {
        score += 40;
    }
    else if (dices11[3] === 1 && dices11[2] !== 1)//三连加10分
    {
        score += 10;
    }
    else if (dices11[3] === 1 && dices11[2] === 1)//葫芦加20分
    {
        score += 20;
    }
    else if (dices11[2] === 2)//双对加10分
    {
        score += 10;
    }
    else if (dices11[1] === 5)
    {
        if (dices1[1] === 0 || dices1[6] === 0)//大顺子加60分
        {
            score += 60;
        }
        else if (dices1[5] === 0 || dices1[2] === 0)//小顺子加30分
        {
            score += 30;
        }

    }
    else if (dices11[1] === 3 && dices11[2] === 1)//小顺子加30分
    {
        if (dices1[5] === 0 && dices1[6] === 0)
        {
            score += 30;
        }
        else if (dices1[1] === 0 && dices1[6] === 0)
        {
            score += 30;
        }
        else if (dices1[1] === 0 && dices1[2] === 0)
        {
            score += 30;
        }
    }
    return score
  },
//记忆搜索法
  dfs(x, floor) {
    if (this.data.dice[x] != 0) {
        return this.data.dice[x];
    }
    let ans = 0;
    if (floor < 5) {
        for (let index = 1; index < 7; index++) {
            ans += this.dfs(x * 6 + index, floor + 1) * (1 / 6);
        }
    } else {
        let t = x;
        let temp = new Array(5).fill(0);
        for (let index = 0; index < 5; index++) {
            temp[index] = t % 6;
            if (temp[index] === 0) {
                temp[index] = 6;
            }
            t -= temp[index];
            t = (t / 6);
        }
      
        ans = this.WorkOut(temp);
    }
    this.data.dice[x] = ans;
    return ans;
},
//投掷骰子行为
  DiceRoll(){
    this.setData({
      HiddenFlagAddMul:1,
      list2:[],
      list1:[],
      HiddenFlagRollPlayer1:[],
      HiddenFlagRollPlayer2:[],
    })
    var randomarray1 = [];
    var randomarray2 = [];
    var array1 = this.data.LockValueFinalPlayer1.slice();
    var array2 = this.data.LockValueFinalPlayer2.slice();
    var lockkey1 = this.data.LockKeyPlayer1.slice();
    var lockkey2 = this.data.LockKeyPlayer2.slice();
    var lockvalue1 = this.data.LockValuePlayer1.slice();
    var lockvalue2 = this.data.LockValuePlayer2.slice();
    var hidden1 = [];
    var hidden2 = [];
    if(this.data.Rows !=3){
      for(var i = 0;i < 5;i++){
        if(this.data.HiddenFlagRollPlayer1[i] == 1){
          array1.push(this.data.list1[i])
        }
        if(this.data.HiddenFlagRollPlayer2[i] == 1){
          array2.push(this.data.list2[i])
        }
      }
    }
    for(var i = 0; i<5-this.data.countPlayer1;i++){
      randomarray1.push(Math.floor(Math.random() * 6 + 1));
    }
    for(var i = 0; i<5-this.data.countPlayer2;i++){
      randomarray2.push(Math.floor(Math.random() * 6 + 1));
    }
    this.setData({
      list1:randomarray1,
      list2:randomarray2
    })
    if(this.data.Rows == 2){
      setTimeout(() => {
        for(var i = 0; i<5-this.data.countPlayer1;i++){
          lockkey1.push(i);
          lockvalue1.push(this.data.list1[i]);
          hidden1.push(1);
          array1.push(this.data.list1[i])
        }

        for(var i = 0; i<5-this.data.countPlayer2;i++){
          lockkey2.push(i);
          lockvalue2.push(this.data.list2[i]);
          hidden2.push(1);
          array2.push(this.data.list2[i])
        }
        var score1 = this.WorkOut(array1);
        var score2 = this.WorkOut(array2);
        this.setData({
          LockKeyPlayer1:lockkey1,
          LockKeyPlayer2:lockkey2,
          LockValuePlayer1:lockvalue1,
          LockValuePlayer2:lockvalue2,
          HiddenFlagRollPlayer1:hidden1,
          HiddenFlagRollPlayer2:hidden2,
          LockValueFinalPlayer1:array1,
          LockValueFinalPlayer2:array2,
          ScorePlayer1:score1,
          ScorePlayer2:score2,
          RoundCurrent:this.data.RoundCurrent+1
        })


        var winscore1 = 0;
        if(score1 >= score2)
        {
          winscore1 = (score1-score2)*this.data.multiple;
          this.setData({
            winscore:winscore1,
            ChipPlayer1:this.data.ChipPlayer1+winscore1,
            ChipPlayer2:this.data.ChipPlayer2-winscore1,
          })
          wx.showToast({
            title: this.data.NamePlayer1+'赢了'+winscore1+'筹码',
            icon:"none",
          })
        }
        else{
          winscore1 = (score2-score1)*this.data.multiple;
          this.setData({
            winscore:winscore1,
            ChipPlayer1:this.data.ChipPlayer1-winscore1,
            ChipPlayer2:this.data.ChipPlayer2+winscore1,
        })
        wx.showToast({
          title: this.data.NamePlayer2+'赢了'+winscore1+'筹码',
          icon:"none"
        })
        }
        return
      }, 1000);
    }
    this.setData({
      LockValueFinalPlayer1:array1,
      LockValueFinalPlayer2:array2,
    });
    if(this.data.Rows == 2){
      setTimeout(() => {
        this.setData({
          Rows:this.data.Rows + 1
        })
      }, 999);
    }
    else{
      this.setData({
        Rows:this.data.Rows + 1
      })
    }
    setTimeout(() => {
      if(this.data.Rows != 3){
        this.setData({
          HiddenFlagAddMul1:0
        })
      }
      else{
        this.setData({
          HiddenFlagAddMul1:1
        })
      }
    }, 1000);
    setTimeout(() => {
      this.LockPlayer1();
    }, 1000);
  },
  LockPlayer1(){
    // 数据锁定
    if(this.data.countPlayer1 == 0){
      this.AIjudge1(this.data.list1);
  }
    else if(this.data.Rows != 3){
      this.AIjudge2(this.data.LockValueFinalPlayer1);
    };


  },
  LockPlayer2(e){
    //数据锁定
    if(this.data.HiddenFlagAddMul == 0){
      wx.showToast({
        title: '回合已结束',
        icon:'error'
      })
      return
    }
    if(this.data.Rows == 3){
      return
    }
    var lockkey = this.data.LockKeyPlayer2.slice(); // 使用 slice() 创建一个副本
    var lockvalue = this.data.LockValuePlayer2.slice(); // 使用 slice() 创建一个副本
    var lockr = this.data.LockRowPlayer2.slice();
    lockkey.push(e.target.dataset.key);
    lockvalue.push(e.target.dataset.value);
    lockr.push(this.data.Rows)
    this.setData({
      LockKeyPlayer2:lockkey,
      LockValuePlayer2:lockvalue,
      LockRowPlayer2:lockr,
      countPlayer2:this.data.countPlayer2+1,
      [`HiddenFlagRollPlayer2.${e.target.dataset.key}`]: 1
    })
  },
  UnlockPlayer2(e){
    if(this.data.HiddenFlagAddMul == 0){
      wx.showToast({
        title: '已锁定',
        icon:'error'
      })
      return
    }
    if(this.data.Rows == 3){
      wx.showToast({
        title: '已锁定',
        icon:'error'
      })
      return
    }
    if(this.data.Rows > this.data.LockRowPlayer2[e.target.dataset.key]){
      wx.showToast({
        title: '已锁定',
        icon:'error'
      })
      return
    }
    if(this.data.countPlayer2 > 0){
      this.setData({
        countPlayer2:this.data.countPlayer2-1
      })
    }
    this.setData({
      [`HiddenFlagRollPlayer2.${e.target.dataset.value}`]: 0,
      [`HiddenFlagLockPlayer2.${e.target.dataset.key}`]: 1
    })
  },
  AddMul0(){
    this.setData({
      HiddenFlagAddMul:0,
      HiddenFlagAddMul1:1,
      multiple:this.data.multiple+0,
    })
},
  AddMul1(){
      this.setData({
        HiddenFlagAddMul:0,
        HiddenFlagAddMul1:1,
        multiple:this.data.multiple+1,
      })
  },
  AddMul2(){
    this.setData({
      HiddenFlagAddMul:0,
      HiddenFlagAddMul1:1,
      multiple:this.data.multiple+2,
    })
  },
  AddMul3(){
    this.setData({
      HiddenFlagAddMul:0,
      HiddenFlagAddMul1:1,
      multiple:this.data.multiple+3,
    })
  },
  AIjudge1(temp_dice){
    // console.log('ai1')
      let transform = [0, 0, 0, 0, 0];
      let location = [0, 0, 0, 0, 0];
      let max_score = 0;
      for (let a = 0; a < 2; a++) {
          for (let b = 0; b < 2; b++) {
              for (let c = 0; c < 2; c++) {
                  for (let d = 0; d < 2; d++) {
                      for (let e = 0; e < 2; e++) {
                          transform[0] = a;
                          transform[1] = b;
                          transform[2] = c;
                          transform[3] = d;
                          transform[4] = e;
                          let t = 0;
                          for (let i = 0; i < 5; i++) {
                              if (transform[i] != 0) {
                                  t = t * 6 + temp_dice[i];
                              }
                          }
  
                          if (max_score < this.data.dice[t]) {
                              max_score = this.data.dice[t];
                              for (let i = 0; i < 5; i++) {
                                  location[i] = transform[i];
                              }
                          }
                      }
                  }
              }
          }
      }
      let rate = 0;
     if (max_score > 35)
          rate = 3;
      else if (max_score > 30)
          rate = 2;
      else if (max_score > 25)
          rate = 1;
      else
          rate = 0;
      console.log(rate)
      var lockkey = [];
      var lockvalue = [];
      var hidden = [];
      var count = 0;
      for(let i = 0;i<5;i++){
        if(location[i] == 1){
          lockkey.push(i);
          lockvalue.push(this.data.list1[i]);
          hidden[i] = 1;
          count++;
        }
      }
      this.setData({
        LockKeyPlayer1:lockkey,
        LockValuePlayer1:lockvalue,
        LockValueFinalPlayer1:lockvalue,
        HiddenFlagRollPlayer1:hidden,
        countPlayer1:count,
        multiple:this.data.multiple+rate
      })
  },
  AIjudge2(lock_dice){
    // console.log('ai2')
    let max_score = 0;
    let transform = [0, 0, 0, 0, 0];//临时数组
    let location = [0, 0, 0, 0, 0];//最终数组
    let size = 0; // 未锁定数
    let unlock_dice = this.data.list1.slice(); // 投掷区
    let res = 0; // 存上一轮的位置
    let lockkey = this.data.LockKeyPlayer1.slice();
    let lockvalue = this.data.LockValuePlayer1.slice();
    let count = this.data.countPlayer1;
    let hidden = []
    size = 5-count;
    for (let i = 0; i < count; i++) {
        res = res * 6 + lock_dice[i];
    }
    if (size == 1) {
        for (let a = 0; a < 2; a++) {
            let t = res;
            transform[0] = a;
            if (transform[0] != 0) {
                t = t * 6 + unlock_dice[0];
            }
            if (max_score < this.data.dice[t]) {
                max_score = this.data.dice[t];
                location[0] = transform[0];
            }
        }
        
    } else if (size == 2) {
        for (let a = 0; a < 2; a++) {
            for (let b = 0; b < 2; b++) {
                let t = res;
                transform[0] = a;
                transform[1] = b;
                for (let i = 0; i < size; i++) {
                    if (transform[i] != 0) {
                        t = t * 6 + unlock_dice[i];
                    }
                }
                if (max_score < this.data.dice[t]) {
                    max_score = this.data.dice[t];
                    for (let i = 0; i < size; i++) {
                        location[i] = transform[i];
                    }
                }
            }
        }

    } else if (size == 3) {

        for (let a = 0; a < 2; a++) {
            for (let b = 0; b < 2; b++) {
                for (let c = 0; c < 2; c++) {
                    let t = res;
                    transform[0] = a;
                    transform[1] = b;
                    transform[2] = c;
                    for (let i = 0; i < size; i++) {
                        if (transform[i] != 0) {
                            t = t * 6 + unlock_dice[i];
                        }
                    }
                    if (max_score < this.data.dice[t]) {
                        max_score = this.data.dice[t];
                        for (let i = 0; i < size; i++) {
                            location[i] = transform[i];
                        }
                    }
                }
            }
        }
    } else if (size == 4) {
        for (let a = 0; a < 2; a++) {
            for (let b = 0; b < 2; b++) {
                for (let c = 0; c < 2; c++) {
                    for (let d = 0; d < 2; d++) {
                        let t = res;
                        transform[0] = a;
                        transform[1] = b;
                        transform[2] = c;
                        transform[3] = d;
                        for (let i = 0; i < size; i++) {
                            if (transform[i] != 0) {
                                t = t * 6 + unlock_dice[i];
                            }
                        }
                        if (max_score < this.data.dice[t]) {
                            max_score = this.data.dice[t];
                            for (let i = 0; i < size; i++) {
                                location[i] = transform[i];
                            }
                        }
                    }
                }
            }
        }
    }
    let rate = 0;
    if (max_score > 35)
         rate = 3;
     else if (max_score > 30)
         rate = 2;
     else if (max_score > 25)
         rate = 1;
     else
         rate = 0;
    console.log(rate)
    for(let i = 0;i<size;i++){
      if(location[i] == 1){
        lockkey.push(i);
        lockvalue.push(this.data.list1[i]);
        hidden[i] = 1;
        count++;
      }
      this.setData({
        LockKeyPlayer1:lockkey,
        LockValuePlayer1:lockvalue,
        LockValueFinalPlayer1:lockvalue,
        HiddenFlagRollPlayer1:hidden,
        countPlayer1:count,
        multiple:this.data.multiple+rate
      })
    }
  },
  getUserProfile(){
    wx.getUserProfile({
      desc: '展示用户信息',
      success:(res)=>{
        console.log(res)
        {
          this.setData({
            NamePlayer2:res.userInfo.nickName,
            Head:res.userInfo.avatarUrl,
            hiddeninfo:0
          })
        }
      }
    })
  },
  /**,
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