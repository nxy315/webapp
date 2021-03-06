/**
 * Created by nxy on 2018/1/11.
 */
import axios from 'axios';
import qs from 'qs';
import CryptoJS from 'crypto-js';
import Toast from './Toast';
import rHeader from './getHeader';

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'https://api.suiliji.com';
// axios.defaults.baseURL = 'http://172.16.102.172:8099';
axios.interceptors.request.use(
  (config) => {
    Toast({
      type: 'loading',
      typeStatus: 1,
      msg: ''
    });
    // config.data = qs.stringify(config.data);
    if(config.url != 'http://upload.qiniu.com/') {
      const key = CryptoJS.enc.Utf8.parse("9A6dfD308dd21730fdF3aa0ab1f744E2");
      let word = JSON.stringify({
        headers: rHeader,
        params: config.data
      });

      let encryptedData = CryptoJS.AES.encrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });

      config.data = qs.stringify({
        data: encryptedData.toString()
      });
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    Toast({
      type: 'loading',
      typeStatus: 2,
      msg: '正在加载'
    });
    if(response.data.status === 'success') {

    } else {
      Toast({
        type: 'fail',
        msg: response.data.msg
      });
    }
    return response;
  },error => {
    Toast({
      type: 'loading',
      typeStatus: 2,
      msg: '正在加载'
    })
  })

export default axios;