/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import './bless.css';

class Bless extends Component{
  render() {
    return (
      <div className="bless">
        <Header content="宾客祝福"/>
        <Link to="" className="toH5">我的活动 <span className="red">“我们结婚了”</span></Link>

        <p className="block"></p>
        <ul className="bless-list">
          <li className="bless-item">
            <div className="avatar"></div>
            <div className="right">
              <div className="name">小龙女</div>
              <p className="date">2018-10-20 13：14</p>
              <p className="msg">恭喜！请查收红包请查收红包请查收红包请查收红包请查收红包请查收红包请查收红包</p>
            </div>
          </li>
          <li className="bless-item">
            <div className="avatar"></div>
            <div className="right">
              <div className="name">小龙女</div>
              <p className="date">2018-10-20 13：14</p>
              <p className="msg">恭喜！请查收红包</p>
            </div>
          </li>
          <li className="bless-item">
            <div className="avatar"></div>
            <div className="right">
              <div className="name">小龙女</div>
              <p className="date">2018-10-20 13：14</p>
              <p className="msg">恭喜！请查收红包</p>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default Bless