/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';

import './systemMsg.css';

class SystemMsg extends Component{
  render() {
    return (
      <div className="systemMsg">
        <Header content="活动通知"/>

        <div className="msg-list">
          <Link to="" className="item">
            <div className="avatar"></div>
            <div className="info">好友<span style={{color: '#4366fe'}}>杨过</span>的活动<span className="red">“我们私奔了”</span>邀请了你</div>
          </Link>
          <Link to="" className="item">
            <div className="avatar"></div>
            <div className="info">好友<span style={{color: '#4366fe'}}>杨过</span>的活动<span className="red">“我们私奔了”</span>邀请了你</div>
          </Link>
          <Link to="" className="item">
            <div className="avatar"></div>
            <div className="info">好友<span style={{color: '#4366fe'}}>杨过</span>的活动<span className="red">“我们私奔了”</span>邀请了你</div>
          </Link>
          <Link to="" className="item">
            <div className="avatar"></div>
            <div className="info">好友<span style={{color: '#4366fe'}}>杨过</span>的活动<span className="red">“我们私奔了”</span>邀请了你</div>
          </Link>
          <Link to="" className="item">
            <div className="avatar"></div>
            <div className="info">好友<span style={{color: '#4366fe'}}>杨过</span>的活动<span className="red">“我们私奔了”</span>邀请了你</div>
          </Link>
        </div>
      </div>
    )
  }
}

export default SystemMsg