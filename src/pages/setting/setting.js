/**
 * Created by nxy on 2018/1/3.
 */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import './css/setting.css';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  loginOut() {
    let token = localStorage.getItem('token');
    axios({
      method: 'post',
      url: '/api/site/logout',
      params: {
        token: token
      }
    }).then( res => {
      if(res.data.status === 'success') {
        localStorage.removeItem('token');
        this.props.history.push('/login')
      }
    })
  }

  render() {
    return(
      <div className="setting">
        <Header content="设置"/>
        <div className="set-wrap">
          <Link to="/safe" className="set-item">安全设置<span className="go"></span></Link>
          <Link to="/userInfo" className="set-item">个人信息<span className="go"></span></Link>
          <Link to="/about" className="set-item">关于我们<span className="go"></span></Link>
          <div className="set-item">版本信息 <span style={{color: '#999999'}}>V1.0.0</span></div>
        </div>
        <div className="logout" onClick={this.loginOut.bind(this)}>退出登录</div>
      </div>
    )
  }
}

export default Setting