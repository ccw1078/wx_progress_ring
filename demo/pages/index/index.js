// pages/progress/progress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blocks: [
      { name: 'a', estimated: 30000, start: 0},
      { name: 'b', estimated: 40000, start: 0 },
      { name: 'c', estimated: 60000, start: 0 },
      { name: 'd', estimated: 80000, start: 0 },
      { name: 'e', estimated: 100000, start: 0 }
    ]
  },
  add_img: function () {
    let that = this;
    console.log("add img tap");
    wx.chooseImage({
      count: 2,
      success: function (res) {
        console.log("add_img res", res);
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          imgPath: tempFilePaths
        });
        console.log("tempFilePaths", tempFilePaths);
      }
    });
    // wx.getSystemInfo({
    //   success: (result) => {
    //     console.log(result);
    //   },
    // })
  },
  next_page: function() {
    let count = this.data.blocks.length;
    wx.navigateTo({
      url: '../hello/hello?count=' + count,
    });
  },

  onLoad: function() {
    let that = this;
    init_blocks(that);
    console.log(Date.now());
  },

  onShow: function (options) {
    let that = this;
    wx.createSelectorQuery().select('.ring').boundingClientRect(rect => {
      console.log(rect);
      that.canvas_width = parseInt(rect.width / 2);
      that.canvas_height = parseInt(rect.height / 2);
      that.rings = that.data.blocks.map((item) => {
        return wx.createCanvasContext(item.name);
      });
      update_rings(that);
    }).exec();
  }

})

function update_rings(that) {
  that.rings.forEach((item, index) => {
    let block = that.data.blocks[index];
    let current = Date.now() - block.start;
    let x = that.canvas_width, y = that.canvas_height;
    let r = x - 5, start = -0.5 * Math.PI;
    item.setTextAlign("center");
    item.setTextBaseline("middle");
    item.setFontSize(16);
    if (current < block.estimated) {
      let percent = current / block.estimated;
      let num = (percent * 2 * Math.PI) + start;
      item.arc(x, y, r, start, num);
      item.setStrokeStyle("#f76260");
      item.setLineWidth("10");
      item.setLineCap("butt");
      item.stroke();
      item.beginPath();
      item.setFillStyle("#f76260");
      item.fillText(parseInt(percent*100) + "%", x, y);
    } else {
      item.setFillStyle("#2BA245");
      item.fillText("100%", x, y);
      item.finished = true;
    }
    item.draw();
  });
  setTimeout(() => {
    if (!that.rings.every(item => item.finished == true)) {
      update_rings(that)
    }
  }, 1000);
}



function init_blocks(that){
  let blocks = that.data.blocks;
  blocks.forEach(item => {
    item.start = Date.now();
  });
  that.setData({
    blocks: blocks
  });
}

