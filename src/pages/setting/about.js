/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import './css/about.css'

class About extends Component{
  render() {
    return(
      <div className="about">
        <Header content="关于我们"/>
        <div className="logo"></div>
        <div className="logo-text"></div>

        <div className="brief">
          <h3 className="red">随礼记简介 <span></span></h3>
          <p>随礼记是一款可在线制作各类喜宴电子请帖，并支持好 友随礼并可以记录每一笔随礼，支持好友随礼直接提现 并能查看与好友的随礼来往记</p>
        </div>

        <div className="foot">
          <p className="name">上海颜团信息科技有限公司</p>
          <p className="url">WWW.SUILIJI.COM</p>
        </div>
      </div>
    )
  }
}

export default About;
