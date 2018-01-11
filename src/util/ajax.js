/**
 * Created by nxy on 2018/1/11.
 */
import axios from 'axios';
import CryptoJS from 'crypto-js';
import rHeader from './getHeader';

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.baseURL = 'https://api.suiliji.com';
axios.defaults.baseURL = 'http://172.16.102.172:8099';
axios.interceptors.request.use(
  (config) => {
    let key = CryptoJS.enc.Utf8.parse("9A6dfD308dd21730fdF3aa0ab1f744E2");
    let word = JSON.stringify({
      headers: rHeader,
      params: config.params
    });

    let encryptedData = CryptoJS.AES.encrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });

    config.params = {
      data: encryptedData.toString()
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;