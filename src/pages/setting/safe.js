/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import './css/safe.css';

class Safe extends Component{
  render() {
    return (
      <div className="safePage">
        <Header content="安全设置"/>

        <ul className="safe-wrap">
          <Link to="/modifyPwd" className="safe-item">修改密码<span className="go"></span></Link>
          {/*<Link to="/modifyTel" className="safe-item">修改手机号<span className="go"></span></Link>*/}
          {/*<li className="safe-item">设置密码保护<span className="go"></span></li>*/}
          {/*<li className="safe-item">紧急锁定账户<span className="go"></span></li>*/}
        </ul>
      </div>
    )
  }
}

export default Safe;