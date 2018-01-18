/**
 * Created by nxy on 2018/1/15.
 */
import wx from 'weixin-js-sdk';
import axios from 'axios';

let wxinit = function(callback) {

  // axios({
  //   url: '/api/pay/init-wx?url='+encodeURIComponent(window.location.href.split('#')[0])+'&time='+Math.random(),
  //   method: 'post',
  // }).then(res => {
  //   if(res.data.status == 'success') {
  //     wx.config({
  //       debug: true,
  //       appId: res.data.data.appId,
  //       timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
  //       nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
  //       signature: res.data.data.signature,// 必填，签名，见附录1
  //       jsApiList: [
  //         'onMenuShareTimeline','chooseWXPay'
  //       ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  //     });
  //
  //     wx.ready(function() {
  //       if(typeof callback != 'undefined'){
  //         callback();
  //       }
  //     })
  //
  //   }
  // });



};
export default wxinit;