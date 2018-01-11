/**
 * Created by nxy on 2018/1/3.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import './css/invitation.css';

class Invitation extends Component {
  render() {
    return (
      <div className="invitation">
        <Header content="发起邀请"/>
        <div className="find-love">
          <div className="top">
            <div className="avt-wrap">
              <div className="avt myself" style={{backgroundImage: "url("+require('./images/record2.png')+")"}}></div>
              <div className="and"></div>
              <div className="avt who" style={{backgroundImage: "url("+require('./images/who.png')+")"}}></div>
            </div>
            <div className="title">请输入另一半的手机号或用户账号</div>
          </div>
          <input className="middle" type="text" placeholder="请在此输入"/>
          <div className="bottom">
            <div className="invitBtn">发起提交</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Invitation