/**
 * Created by nxy on 2018/1/3.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import { Link } from 'react-router-dom';
import Toast from '../../util/Toast'
import axios from '../../util/ajax';
import './css/login.css';

const phoneReg = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|16[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$|19[0-9]{9}$/;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      correct: false,
      errMsg: '',
      type: 1, //1密码登录2验证码登录
      code: '',
    }
  }
  phoneChange(e) {
    let telVal = e.target.value;

    this.setState({
      phone: telVal,
    });

  }

  passwordChange(e) {
    let pwdVal = e.target.value;

    this.setState({
      password: pwdVal,
    });
  }

  login() {
    if(this.state.phone === '' || this.state.password === '') {
      Toast({
        type: 'fail',
        msg: '手机或密码不能为空',
        duration: 2000
      })
    } else if(!this.state.phone.match(phoneReg)) {
      Toast({
        type: 'fail',
        msg: '手机格式不正确',
        duration: 2000
      })
    } else {
      // Toast({
      //   type: 'loading',
      //   typeStatus: 1,
      //   msg: '正在加载'
      // })
      axios({
        method: 'post',
        url: '/api/site/login',
        params: {
          phone: this.state.phone,
          type: 1,
          code: '',
          password: this.state.password
        }
      }).then(res => {
        if(res.data.status === 'success') {
          localStorage.setItem('token', res.data.data.token);
          this.props.history.push('/center');
        } else {
          Toast({
            type: 'fail',
            msg: res.data.msg,
            duration: 2000
          })
        }
      })
    }
  }

  render() {
    return (
      <div className="login-wrap">
        <Header content="登录"/>

        <div className="login-logo-wrap">
          <div className="login-logo"></div>
          <div className="login-text"></div>
          <div className="login-des"></div>
        </div>

        <div className="input-box">
          <div className="input-item user-input">
            <div className="input-icon" style={{backgroundImage: "url("+require('./images/user.png')+")"}}></div>
            <input type="text" value={this.state.phone} onChange={this.phoneChange.bind(this)} placeholder="用户手机号或用户ID号"/>
          </div>
          <div className="input-item pwd-input">
            <div className="input-icon" style={{backgroundImage: "url("+require('./images/pwd.png')+")"}}></div>
            <input type="password" value={this.state.password} onChange={this.passwordChange.bind(this)} placeholder="请输入密码"/>
          </div>
        </div>

        <div className="pwd-opera">
          {/*<div className="rmber-pwd">记住密码</div>*/}
          <Link to="/findPwd" className="forget-pwd">忘记密码？</Link>
        </div>

        <div className="login" onClick={this.login.bind(this)}>登录</div>
      </div>
    )
  }
}

export default Login;