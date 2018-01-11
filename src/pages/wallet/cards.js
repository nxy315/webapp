/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import './css/cards.css'

class Cards extends Component{
  render() {
    return(
      <div className="myCards">
        <Header content="我的卡片"/>

        <Link to="/addCardStep1" className="addCards">
          <div className="t1">+</div>
          <div className="t2">添加银行卡</div>
        </Link>
        <div className="cards">
          <Link to="/getOut" className="card">
            <div className="info">
              <div className="cover">

              </div>
              <div className="des">
                <div className="title">招商银行</div>
                <div className="type">储值卡</div>
              </div>
            </div>
            <div className="num">
              <div className="item">****</div>
              <div className="item">****</div>
              <div className="item">****</div>
              <div className="item tail">8888</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Cards