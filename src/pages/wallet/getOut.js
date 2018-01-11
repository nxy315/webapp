/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import './css/getOut.css'

class GetOut extends Component{
  render() {
    return(
      <div className="getOut">
        <Header content="提现"/>
        <Link to="/chooseCard" className="chooseCard">
          <div className="des-wrap">
            <div className="cover"></div>
            <div className="info">
              <div className="title">招商银行</div>
              <div className="type">尾号8888储蓄卡</div>
            </div>
          </div>

          <div className="go"></div>
        </Link>

        <div className="box">
          <div className="title">提现金额</div>
          <div className="input-wrap">
            <span>￥</span><input type="text"/>
          </div>
          <div className="des">
            <div className="info">可用余额888.88元</div>
            <div className="getAll red">全部提现</div>
          </div>
        </div>

        <div className="getBtn getBtnAble">马上提现</div>
        <div className="getBtn getBtnDisable">马上提现</div>
      </div>
    )
  }
}

export default GetOut