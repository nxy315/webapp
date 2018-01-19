/**
 * Created by nxy on 2018/1/5.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import Header from '../../components/header';
import './css/login.css';

class FindPwd extends Component{
  constructor(props) {
    super(props);
  }

  back() {
    this.props.history.push('/login');
  }

  render() {
    return(
      <div className="login-wrap">
        <Header content="找回密码" back={this.back.bind(this)}/>

        <div className="login-logo-wrap">
          <div className="login-logo"></div>
          <div className="login-text"></div>
          <div className="login-des"></div>
        </div>

        <div className="input-box">
          <div className="input-item user-input">
            <div className="input-icon" style={{backgroundImage: "url("+require('./images/user.png')+")"}}></div>
            <input type="text" placeholder="用户手机号或用户ID号"/>
          </div>
          <div className="input-item user-input">
            <div className="input-icon" style={{backgroundImage: "url("+require('./images/code.png')+")"}}></div>
            <input type="text" className="code" placeholder="输入验证码"/>
            <div className="getCode red">获取验证码</div>
          </div>
          <div className="input-item pwd-input">
            <div className="input-icon" style={{backgroundImage: "url("+require('./images/pwd.png')+")"}}></div>
            <input type="password" placeholder="设置密码"/>
          </div>
        </div>

        <div className="login">找回密码</div>
      </div>
    )
  }
}

export default FindPwd;