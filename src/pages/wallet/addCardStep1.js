/**
 * Created by nxy on 2018/1/8.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import './css/addCardStep.css';

class AddCardStep1 extends Component{
  render() {
    return(
      <div className="addCardStep1 addCardStep">
        <Header content="添加银行卡"/>

        <p className="title">请绑定持卡人本人银行卡</p>
        <div className="step-box">
          <div className="step-item">
            <span>持卡人</span>
            <input type="text" placeholder="请输入持卡人姓名"/>
          </div>
          <div className="step-item">
            <span>卡号</span>
            <input type="text" placeholder="请输入银行卡号"/>
          </div>
        </div>

        <Link to="/addCardStep2" className="nextStep nextStepAble">下一步</Link>
        <div className="nextStep nextStepDisable">下一步</div>
      </div>
    )
  }
}

export default AddCardStep1;