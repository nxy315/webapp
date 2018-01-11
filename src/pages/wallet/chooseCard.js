/**
 * Created by nxy on 2018/1/8.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import './css/chooseCard.css';

class ChooseCard extends Component{
  render() {
    return(
      <div className="chooseCard">
        <Header content="选择银行卡"/>
        <div className="items">
          <div className="item active">招商银行<span className="right"></span></div>
          <div className="item">浦发银行<span className="right"></span></div>
        </div>
      </div>
    )
  }
}

export default ChooseCard;