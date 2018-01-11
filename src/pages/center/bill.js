/**
 * Created by nxy on 2018/1/3.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/bill.css';

class Bill extends Component {
  render() {
    return(
      <div className="bill">
        <div className="header">
          账本详情
          <div className="search-box">
            <input className="search-input" type="text" placeholder="输入随礼人姓名或金额"/>
            <span className="search"></span>
          </div>
        </div>
        <div className="cover">
          <div className="cover-1 red">小白百日宴</div>
          <div className="cover-2 gold">礼金总额 ( 元 )</div>
          <div className="cover-3">2983203.00</div>
          <div className="cover-4">
            <span className="cover-5 gold">随礼份数：</span>
            <span className="cover-6">343</span>
            <span className="cover-7 gold">/回礼总额：</span>
            <span className="cover-8">34934元</span>
          </div>
        </div>

        <div className="bill-list">
          <Link to="/billDetail" className="item">
            <div className="info">
              <div className="name-info">
                <span className="name">杨过</span>
                <span className="relation red">兄弟</span>
                <span className="camp boy">男方</span>
                <span className="camp girl">女方</span>
              </div>
              <div className="money-info">
                <span className="get-count">+500</span>
                <span className="des">回礼</span>
                <span className="give-count red">-20</span>
              </div>
            </div>
            <div className="des-info">
              <p className="des">祝小龙女喜得贵子</p>
              <span className="des-date">2018-02-08</span>
            </div>
          </Link>
          <Link to="/billDetail" className="item">
            <div className="info">
              <div className="name-info">
                <span className="name">杨过</span>
                <span className="relation red">兄弟</span>
                <span className="camp boy">男方</span>
                <span className="camp girl">女方</span>
              </div>
              <div className="money-info">
                <span className="get-count">+500</span>
                <span className="des">回礼</span>
                <span className="give-count red">-20</span>
              </div>
            </div>
            <div className="des-info">
              <p className="des">祝小龙女喜得贵子</p>
              <span className="des-date">2018-02-08</span>
            </div>
          </Link>
          <Link to="/billDetail" className="item">
            <div className="info">
              <div className="name-info">
                <span className="name">杨过</span>
                <span className="relation red">兄弟</span>
                <span className="camp boy">男方</span>
                <span className="camp girl">女方</span>
              </div>
              <div className="money-info">
                <span className="get-count">+500</span>
                <span className="des">回礼</span>
                <span className="give-count red">-20</span>
              </div>
            </div>
            <div className="des-info">
              <p className="des">祝小龙女喜得贵子</p>
              <span className="des-date">2018-02-08</span>
            </div>
          </Link>
          <Link to="/billDetail" className="item">
            <div className="info">
              <div className="name-info">
                <span className="name">杨过</span>
                <span className="relation red">兄弟</span>
                <span className="camp boy">男方</span>
                <span className="camp girl">女方</span>
              </div>
              <div className="money-info">
                <span className="get-count">+500</span>
                <span className="des">回礼</span>
                <span className="give-count red">-20</span>
              </div>
            </div>
            <div className="des-info">
              <p className="des">祝小龙女喜得贵子</p>
              <span className="des-date">2018-02-08</span>
            </div>
          </Link>
          <Link to="/billDetail" className="item">
            <div className="info">
              <div className="name-info">
                <span className="name">杨过</span>
                <span className="relation red">兄弟</span>
                <span className="camp boy">男方</span>
                <span className="camp girl">女方</span>
              </div>
              <div className="money-info">
                <span className="get-count">+500</span>
                <span className="des">回礼</span>
                <span className="give-count red">-20</span>
              </div>
            </div>
            <div className="des-info">
              <p className="des">祝小龙女喜得贵子</p>
              <span className="des-date">2018-02-08</span>
            </div>
          </Link>
          <Link to="/billDetail" className="item">
            <div className="info">
              <div className="name-info">
                <span className="name">杨过</span>
                <span className="relation red">兄弟</span>
                <span className="camp boy">男方</span>
                <span className="camp girl">女方</span>
              </div>
              <div className="money-info">
                <span className="get-count">+500</span>
                <span className="des">回礼</span>
                <span className="give-count red">-20</span>
              </div>
            </div>
            <div className="des-info">
              <p className="des">祝小龙女喜得贵子</p>
              <span className="des-date">2018-02-08</span>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Bill;