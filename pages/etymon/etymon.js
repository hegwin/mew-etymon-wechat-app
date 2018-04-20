const app = getApp();

Page({
  data: {
    etymon: {
      spelling: "trans-",
      meaning: "横向；通过；超过",
      source: "Latin",
      evolution: "本词根意味着 \"across, beyond, through, on the other side of, to go beyond\"，来自拉丁语中的trans (prep.) \"across, over, beyond\"，很可能源自 trare- 的分词结构 \"to cross\"， 始于原始印欧语中的 *tra-，即*tere的变体 \"cross over, pass through, overcome.\"\n在化学中，这个词根用来表示一个化合物中的两个官能团位于分子中轴的对侧。",
      words: [
        {
          spelling: "transcript",
          meaning: "n. 成绩单；抄本，副本；文字记录"
        },
        {
          spelling: "transverse",
          meaning: "adj. 横向的；横断的；贯轴的 n. 横断面；贯轴；横肌"
        }
      ]
    }
  },

  onLoad: function(params) {
    this._loadEtymon(params);
  },

  _loadEtymon: function(params) {
    let id = params.id;
    let queryString = `
      query {
        etymon(id: ${id}) {
          spelling
          source
          meaning
          evolution
          words {
            spelling
            meaning
          }
        }
      }
    `;

    wx.request({
      url: app.config.graphURL,
      data: {
        query: queryString
      },
      method: 'POST',
      dataType: "json",
      success: (res) => {
        let etymon = res.data.data.etymon;
        this.setData({
          etymon
        })
      }
    })
  }
})