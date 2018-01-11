/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import './css/billList.css';

class BillList extends Component {
  render() {
    return(
      <div className="billlist">
        <Header content="随礼记账"/>

        <ul className="list-wrap">
          <li className="item">
            <div className="item-col title">
              <span className="des">活动&nbsp;/&nbsp;</span>
              <span className="black">我们结婚了</span>
              <span className="status now">活动进行中</span>
            </div>
            <div className="item-col count">
              <span className="des">金额&nbsp;/&nbsp;</span>
              <span className="red">93292.00元</span>
            </div>
            <div className="item-col date">
              <span className="des">金额&nbsp;/&nbsp;</span>
              <span className="black">2018年01月01日</span>
              <Link to="/bill" className="checkout red">查看账本</Link>
            </div>
          </li>
          <li className="item">
            <div className="item-col title">
              <span className="des">活动&nbsp;/&nbsp;</span>
              <span className="black">我们结婚了</span>
              <span className="status history">历史活动</span>
            </div>
            <div className="item-col count">
              <span className="des">金额&nbsp;/&nbsp;</span>
              <span className="red">93292.00元</span>
            </div>
            <div className="item-col date">
              <span className="des">金额&nbsp;/&nbsp;</span>
              <span className="black">2018年01月01日</span>
              <Link to="/bill" className="checkout red">查看账本</Link>
            </div>
          </li>
          <li className="item">
            <div className="item-col title">
              <span className="des">活动&nbsp;/&nbsp;</span>
              <span className="black">我们结婚了</span>
              <span className="status now">活动进行中</span>
            </div>
            <div className="item-col count">
              <span className="des">金额&nbsp;/&nbsp;</span>
              <span className="red">93292.00元</span>
            </div>
            <div className="item-col date">
              <span className="des">金额&nbsp;/&nbsp;</span>
              <span className="black">2018年01月01日</span>
              <Link to="/bill" className="checkout red">查看账本</Link>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default BillList;