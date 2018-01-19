/**
 * Created by nxy on 2018/1/5.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import axios from '../../util/ajax';
import Toast from '../../util/Toast'
import './css/login.css';

const phoneReg = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|16[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$|19[0-9]{9}$/;

class Register extends Component{
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

  back() {
    this.props.history.push('/center')
  }

  codeChange(e) {
    let codeVal = e.target.value;

    this.setState({
      code: codeVal,
    });
  }

  phoneChange(e) {
    let telVal = e.target.value;

    if(telVal.match(phoneReg)) {
      this.setState({
        correct: true,
        phone: telVal,
      });
    } else {
      this.setState({
        correct: false,
        phone: telVal,
      });
    }
  }

  passwordChange(e) {
    let pwdVal = e.target.value;

    this.setState({
      password: pwdVal,
    });
  }

  getCode() {
    if(this.state.correct) {
      axios.post('/api/site/get-code',{
        phone: this.state.phone,
        type: 1
      }).then(res => {
        if(res.data.status === 'success') {

        }
      })
    } else {
      Toast({
        type: 'fail',
        msg: '手机格式不正确',
        duration: 2000
      })
    }
  }

  register() {
    axios.post('/api/site/register',{
      phone: this.state.phone,
      password: this.state.password,
      code: this.state.code
    }).then(res => {
      if(res.data.status === 'success') {
        localStorage.setItem("token", res.data.data.token);
        console.log('注册成功');
        this.props.history.push('/center')
      }
    })
  }

  render() {
    return(
      <div className="login-wrap">
        <Header content="注册" back={this.back.bind(this)}/>

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
          <div className="input-item user-input">
            <div className="input-icon" style={{backgroundImage: "url("+require('./images/code.png')+")"}}></div>
            <input type="text" value={this.state.code} onChange={this.codeChange.bind(this)} className="code" placeholder="输入验证码"/>
            <div className="getCode red" onClick={this.getCode.bind(this)}>获取验证码</div>
          </div>
          <div className="input-item pwd-input">
            <div className="input-icon" style={{backgroundImage: "url("+require('./images/pwd.png')+")"}}></div>
            <input type="password" value={this.state.password} onChange={this.passwordChange.bind(this)} placeholder="设置密码"/>
          </div>
        </div>

        <div className="login" onClick={this.register.bind(this)}>提交注册</div>
      </div>
    )
  }
}

export default Register;