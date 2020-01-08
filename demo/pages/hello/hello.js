// pages/hello/hello.js
Page({
  data: {
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled'
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    let count = this.data.count;
    if (-count < num) {
      num--
    }
    var minusStatus = num <= (-count) ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    let count = this.data.count;
    // 不作过多考虑自增1
    if (num < (9 - count)) {
      num++;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= (-count) ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  }, 
  submit: function() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    let num = this.data.num;
    let blocks = prevPage.data.blocks;
    if (num >= 0) {
      prevPage.setData({
        blocks: blocks.concat(create_blocks(num))
      });
    } else {
      blocks.splice(0, -num);
      prevPage.setData({
        blocks: blocks
      });
    }
    wx.navigateBack({
      delta: 1
    });

  },
  onLoad: function(options) {
    this.setData({
      count: options.count
    });
  }
})


function create_blocks(qty) {
  let result = [];
  for (let i = 0; i < qty; i++ ) {
    result.push({
      name: Math.random().toString(36),
      estimated: 30000,
      start: Date.now()
    });
  }
  return result;
}