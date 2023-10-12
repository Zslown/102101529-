// pages/Battle/Battle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc:'/images/_925533671__5574739bc8fde09d7a829d721a1d1eec_-46278340_IMG_20231008_213035_0_xg_0.jpg',
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
    LockRowPlayer1:[],//玩家1轮次数组
    LockRowPlayer2:[],//玩家2轮次数组
    ChipPlayer1:1000,//筹码
    ChipPlayer2:1000,//筹码
    ScorePlayer1:0,//玩家1分数
    ScorePlayer2:0,//玩家2分数
    multiple:1,//对局倍率
    HiddenFlagAddMul:1,//隐藏红K
    HiddenFlagAddMul1:1,//隐藏玩家1加倍
    HiddenFlagAddMul2:1,//隐藏玩家2加倍
    winscore:0,//筹码
    NamePlayer1:'猪猪侠',//初始名字
    NamePlayer2:'小呆呆',//初始名字
    Round:1,//总局数
    RoundCurrent:0//当前局数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    wx.setNavigationBarTitle({
      title: '双人对战',
    })
    if(options.chips != 0){
      this.setData({
        ChipPlayer1:options.chips,
        ChipPlayer2:options.chips,
      })
    }
    if(options.round != 0){
    this.setData({
      Round:options.round
    })
    }
    if(options.name1 !=''){
      this.setData({
        NamePlayer1:options.name1
      })
    }
    if(options.name2 != ''){
      this.setData({
        NamePlayer2:options.name2
      })
    }
  },
  NextRow(){
    if(this.data.ChipPlayer1 < 0){
      wx.navigateTo({
        url: `/pages/FinalWinCouple/FinalWinCouple?winner=${this.data.NamePlayer1}&loser=${this.data.NamePlayer2}&chipwin=${this.data.ChipPlayer1}&chiplose=${this.data.ChipPlayer2}`,
      })
    }
    if(this.data.ChipPlayer2 < 0){
      wx.navigateTo({
        url: `/pages/FinalWinCouple/FinalWinCouple?winner=${this.data.NamePlayer2}&loser=${this.data.NamePlayer1}&chipwin=${this.data.ChipPlayer2}&chiplose=${this.data.ChipPlayer1}`,
      })
    }
    if(this.data.RoundCurrent == this.data.Round){
      if(this.data.ChipPlayer1 >this.data.ChipPlayer2){
        wx.navigateTo({
          url: `/pages/FinalWinCouple/FinalWinCouple?winner=${this.data.NamePlayer1}&loser=${this.data.NamePlayer2}&chipwin=${this.data.ChipPlayer1}&chiplose=${this.data.ChipPlayer2}`,
        })
      }
      else{
        wx.navigateTo({
          url: `/pages/FinalWinCouple/FinalWinCouple?winner=${this.data.NamePlayer2}&loser=${this.data.NamePlayer1}&chipwin=${this.data.ChipPlayer2}&chiplose=${this.data.ChipPlayer1}`,
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
    ScorePlayer1:0,//玩家1分数
    ScorePlayer2:0,//玩家2分数
    multiple:1,//倍率
    winscore:0,//筹码
    RoudnCurrent:this.data.RoudnCurrent+1
    })
    this.DiceRoll();
  },
  //投掷骰子行为
  DiceRoll(){
    this.setData({
      HiddenFlagAddMul:2,
    })
    if(this.data.Rows != 2){
      this.setData({
      HiddenFlagAddMul1:0,
      HiddenFlagAddMul2:0, 
      })
    }
    else{
        this.setData({
          HiddenFlagAddMul1:1,
          HiddenFlagAddMul2:1, 
          })
        } 
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
    this.setData({
      list2:[],
      list1:[],
      HiddenFlagRollPlayer1:[],
      HiddenFlagRollPlayer2:[],
      LockValueFinalPlayer1:array1,
      LockValueFinalPlayer2:array2
    })
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
      var winscore1 = 0;
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
          ScorePlayer1:score1,
          ScorePlayer2:score2,
          RoundCurrent:this.data.RoundCurrent+1
        })
        
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
      Rows:this.data.Rows + 1, 
    });
  },
  LockPlayer1(e){
    // 数据锁定
    if(this.data.HiddenFlagAddMul1 == 1){
      wx.showToast({
        title: '回合已结束',
        icon:'error'
      })
      return
    }
    var lockkey = this.data.LockKeyPlayer1.slice(); // 使用 slice() 创建一个副本
    var lockvalue = this.data.LockValuePlayer1.slice(); // 使用 slice() 创建一个副本
    var lockr = this.data.LockRowPlayer1.slice();
    lockkey.push(e.target.dataset.key);
    lockvalue.push(e.target.dataset.value);
    lockr.push(this.data.Rows)
    this.setData({
      LockKeyPlayer1:lockkey,//锁定的骰子区
      LockValuePlayer1:lockvalue,//锁定骰子值
      LockRowPlayer1:lockr,//轮次数组，用于判断骰子第几轮被锁定
      countPlayer1:this.data.countPlayer1+1,//每一次点击都要锁定锁住的骰子数量
      [`HiddenFlagRollPlayer1.${e.target.dataset.key}`]: 1
    })
  },
  LockPlayer2(e){
    if(this.data.HiddenFlagAddMul2 == 1){
      wx.showToast({
        title: '回合已结束',
        icon:'error'
      })
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
  UnlockPlayer1(e){
    if(this.data.HiddenFlagAddMul1 == 1){
      wx.showToast({
        title: '已锁定',
        icon:'error'
      })
      return
    }
    if(this.data.Rows > this.data.LockRowPlayer1[e.target.dataset.key]){
      wx.showToast({
        title: '已锁定',
        icon:'error'
      })
      return
    }
    if(this.data.countPlayer1 > 0){
      this.setData({
        countPlayer1:this.data.countPlayer1-1,
        [`HiddenFlagRollPlayer1.${e.target.dataset.value}`]: 0,
        [`HiddenFlagLockPlayer1.${e.target.dataset.key}`]: 1
      })
    }
  },
  UnlockPlayer2(e){
    if(this.data.HiddenFlagAddMul2 == 1){
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
        countPlayer2:this.data.countPlayer2-1,
        [`HiddenFlagRollPlayer2.${e.target.dataset.value}`]: 0,
        [`HiddenFlagLockPlayer2.${e.target.dataset.key}`]: 1
      })
    }
  },
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
    return score;
  },
  AddMul10(){
  this.setData({
    multiple:this.data.multiple+0,
    HiddenFlagAddMul1:this.data.HiddenFlagAddMul1+1,
    HiddenFlagAddMul:this.data.HiddenFlagAddMul+1,
  })
  },
  
  AddMul11(){
    this.setData({
      multiple:this.data.multiple+1,
      HiddenFlagAddMul1:this.data.HiddenFlagAddMul1+1,
      HiddenFlagAddMul:this.data.HiddenFlagAddMul+1,
    })
  },
  AddMul12(){
    this.setData({
      multiple:this.data.multiple+2,
      HiddenFlagAddMul1:this.data.HiddenFlagAddMul1+1,
      HiddenFlagAddMul:this.data.HiddenFlagAddMul+1,
    })
  },
  AddMul13(){
    this.setData({
      multiple:this.data.multiple+3,
      HiddenFlagAddMul1:this.data.HiddenFlagAddMul1+1,
      HiddenFlagAddMul:this.data.HiddenFlagAddMul+1,
    })
  },
  AddMul20(){
    this.setData({
      multiple:this.data.multiple+0,
      HiddenFlagAddMul2:this.data.HiddenFlagAddMul2+1,
      HiddenFlagAddMul:this.data.HiddenFlagAddMul+1,
    })
  },
  AddMul21(){
    this.setData({
      multiple:this.data.multiple+1,
      HiddenFlagAddMul2:this.data.HiddenFlagAddMul2+1,
      HiddenFlagAddMul:this.data.HiddenFlagAddMul+1,
    })
  },
  AddMul22(){
    this.setData({
      multiple:this.data.multiple+2,
      HiddenFlagAddMul2:this.data.HiddenFlagAddMul2+1,
      HiddenFlagAddMul:this.data.HiddenFlagAddMul+1,
    })
  },
  AddMul23(){
    this.setData({
      multiple:this.data.multiple+3,
      HiddenFlagAddMul2:this.data.HiddenFlagAddMul2+1,
      HiddenFlagAddMul:this.data.HiddenFlagAddMul+1,
    })
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