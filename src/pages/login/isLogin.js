/**
 * Created by nxy on 2018/1/20.
 */
import React, { Component } from 'react';
import './css/isLogin.css';

class IsLogin extends Component{
  constructor(props) {
    super(props);

  }

  go(route) {
    this.props.history.push(`/${route}`);
  }

  render() {
    return(
      <div className="isLogin">
        <div className="wrap">
          <div className="login btn" onClick={this.go.bind(this, 'login')}>登录</div>
          <div className="register btn" onClick={this.go.bind(this, 'register')}>注册</div>
        </div>
      </div>
    )
  }
}

export default IsLogin;