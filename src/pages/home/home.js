/**
 * Created by nxy on 2018/1/2.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TabBar from '../../components/tabBar'
import './home.css'


class Home extends Component {
  render() {
    return(
      <div className="home">
        <div className="entrance-wrap">
          <div className="title-info"></div>
          <div className="swiper"></div>

          <div className="topics">
            <Link to="/bless" className="topic">
              <img className="topic-icon" src={require('./images/entry1.png')} alt="宾客祝福"/>
              <span>宾客祝福</span>
            </Link>
            <Link to="/systemMsg" className="topic">
              <img className="topic-icon" src={require('./images/entry2.png')} alt="活动通知"/>
              <span>活动通知</span>
            </Link>
            <Link to="/noAccess" className="topic">
              <img className="topic-icon" src={require('./images/entry3.png')} alt="结婚登记"/>
              <span>结婚登记</span>
            </Link>
            <Link to="/noAccess" className="topic">
              <img className="topic-icon" src={require('./images/entry4.png')} alt="黄道吉日"/>
              <span>黄道吉日</span>
            </Link>
          </div>
        </div>

        <div className="my-money">
          <div className="my-money-item">
            <h4 className="money-name">我的随礼</h4>
            <div className="money">
              <span className="m">￥</span>
              0.00
            </div>
            <Link to="/expend" className="money-detail">查看详情</Link>
          </div>
          <div className="my-money-item">
            <h4 className="money-name">我的收礼</h4>
            <div className="money">
              <span className="m">￥</span>
              0.00
            </div>
            <Link to="/bill" className="money-detail">查看详情</Link>
          </div>
        </div>

        <Link to="/templateInfo" className="activity-wrap">
          <div className="activity">
            <img src={require('./images/add.png')} alt="创建活动"/>
            <div className="no-at">创建活动</div>
            <p className="no-at-info">首次创建活动，可获得平台贺喜红包</p>
          </div>
        </Link>

        <TabBar active="home"/>
      </div>
    )
  }
}

export default Home;