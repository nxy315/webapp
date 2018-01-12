/**
 * Created by nxy on 2018/1/2.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../util/ajax';
import TabBar from '../../components/tabBar'
import './css/center.css'

class Center extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {
        // head_image: '',
        // nickname: '',
        // real_name: '',
        // birthday: '',
        // sex: ''
      }
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    axios({
      method: 'post',
      url: '/api/user/get-user-detail',
      params: {
        token: token
      }
    }).then(res => {
      if(res.data.status === 'success') {
        this.setState({
          info: res.data.data
        });
      }
    })
  }

  render() {
    const token = localStorage.getItem('token');

    return (
      <div>
        <div className="cover-wrap">
          <div className="head-bar">
            <Link to="/setting" className="set"></Link>
            {/*<Link to="/" className="msg"></Link>*/}
          </div>
          <div className="head-cover"></div>

          <div className="user-cover" style={{backgroundImage: "url("+require('./images/user_cover.png')+")"}}>
            {
              token ? (
                <Link to="/login" className="name-info">
                  <div className="nick-name">请登录</div>
                  <div className="tel">登陆后电子请帖免费使用</div>
                </Link>
              ) : (
                <div className="name-info">
                  <div className="nick-name">{this.state.info.nickname ? this.state.info.nickname : '昵称(空)'}</div>
                  <div className="tel">{this.state.info.nickname ? this.state.info.nickname : '(空)'}</div>
                </div>
              )
            }


            {/*<div className="ofen-used">*/}
              {/*<Link to="/myActivity" className="ofen ofen1">*/}
                {/*<div className="ofen-icon" style={{backgroundImage: "url("+require('./images/used1.png')+")"}}></div>*/}
                {/*我的活动*/}
              {/*</Link>*/}
              {/*<Link to="/wallet" className="ofen ofen2">*/}
                {/*<div className="ofen-icon" style={{backgroundImage: "url("+require('./images/used2.png')+")"}}></div>*/}
                {/*我的钱包*/}
              {/*</Link>*/}
            {/*</div>*/}
          </div>
        </div>

        <div className="records">
          <Link to="/myActivity" className="record">
            <div className="record-icon" style={{backgroundImage: "url("+require('./images/activity.png')+")"}}></div>
            <div className="record-title">我的活动</div>
            <div className="record-des">进出人情账单随手记</div>
          </Link>
          <Link to="/wallet" className="record">
            <div className="record-icon" style={{backgroundImage: "url("+require('./images/wallet.png')+")"}}></div>
            <div className="record-title">我的钱包</div>
            <div className="record-des">邀请/答谢等即时通知</div>
          </Link>
        </div>

        <ul className="menus">
          {/*<Link to="/myArticle" className="menu">*/}
            {/*<i className="menu-icon" style={{backgroundImage: "url("+require('./images/menu1.png')+")"}}></i>*/}
            {/*我的帖子*/}
            {/*<i className="go-icon" style={{backgroundImage: "url("+require('./images/go.png')+")"}}></i>*/}
          {/*</Link>*/}
          <Link to="/bill" className="menu">
            <i className="menu-icon" style={{backgroundImage: "url("+require('./images/menu2.png')+")"}}></i>
            随礼记账
            <i className="go-icon" style={{backgroundImage: "url("+require('./images/go.png')+")"}}></i>
          </Link>
          <Link to="/myArticle" className="menu">
            <i className="menu-icon" style={{backgroundImage: "url("+require('./images/menu3.png')+")"}}></i>
            常见问题
            <i className="go-icon" style={{backgroundImage: "url("+require('./images/go.png')+")"}}></i>
          </Link>
        </ul>

        <TabBar active="center"/>
      </div>
    )
  }
}

export default Center;