// pages/progress/progress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blocks: [{
        name: 'a',
        speed: 2,
        start: 0,
        end: 100
      },
      {
        name: 'b',
        speed: 4,
        start: 0,
        end: 100
      },
      {
        name: 'c',
        speed: 6,
        start: 0,
        end: 100
      },
      {
        name: 'd',
        speed: 8,
        start: 0,
        end: 100
      },
      {
        name: 'e',
        speed: 10,
        start: 0,
        end: 100
      },
    ]
  },

  onLoad: function(options) {
    var that = this;
    that.rings = that.data.blocks.map((item, index) => {
      return wx.createCanvasContext(index.toString());
    })
    update_rings(that);
  }

})

function update_rings(that) {
  that.rings.forEach((item, index) => {
    let block = that.data.blocks[index];
    let current = item.current ? item.current : block.start;
    let x = 40, y = 40, r = 35, start = -0.5 * Math.PI;
    item.setTextAlign("center");
    item.setTextBaseline("middle");
    item.setFontSize(16);
    if (current < block.end) {
      let percent = current / block.end;
      let num = (percent * 2 * Math.PI) + start;
      item.arc(x, y, r, start, num);
      item.current = current + block.speed;
      item.setStrokeStyle("#f76260");
      item.setLineWidth("10");
      item.setLineCap("butt");
      item.stroke();
      item.beginPath();
      item.setFillStyle("#f76260");
      item.fillText(current + "%", x, y);
    } else {
      item.setFillStyle("#2BA245");
      item.fillText("100%", x, y);
    }
    item.draw();
  });
  setTimeout(() => {
    update_rings(that)
  }, 1000);
}

