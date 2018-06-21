const app = getApp();

Page({
  data: {
    etymon: {
      spelling: "",
      meaning: "",
      source: "",
      evolution: "",
      words: []
    }
  },

  onLoad: function(params) {
    this.setData({ 'etymon.spelling': params.spelling });
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