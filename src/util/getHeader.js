/**
 * Created by nxy on 2018/1/11.
 */
import md5 from 'md5';

let token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
let time = (Date.parse(new Date())/1000).toString();
let key = md5(token + time, 16);
console.log(token);

let rHeader = {token,time,key};

export default rHeader


