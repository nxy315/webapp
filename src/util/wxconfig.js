/**
 * Created by nxy on 2018/1/15.
 */
import wx from 'weixin-js-sdk';
import axios from './ajax';

export default wxinit = function(callback) {
  axios({
    url: '',
    method: 'post',
    params: {
      url: ''
    }
  }).then(res => {
    if(res.data.status == 'success') {
      wx.config({
        debug: true,
        appId: '',
      });

      wx.ready(() => {
        if(typeof callback != 'undefined'){
          callback();
        }
      })
    }
  });
};