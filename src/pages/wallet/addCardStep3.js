/**
 * Created by nxy on 2018/1/8.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';

class AddCardStep1 extends Component{
  render() {
    return(
      <div className="addCardStep1 addCardStep">
        <Header content="验证手机号"/>

        <p className="step3-des">绑定银行卡需要短信确认，验证码已发送至手 机：180****8757,请按提示操作。</p>

        <div className="step3-box">
          <input className="input" type="text" placeholder="请输入验证码"/>
          <div className="getCode">获取验证码</div>
        </div>
        <Link to="/cards" className="nextStep nextStepAble">完成绑定</Link>
        <div className="nextStep nextStepDisable">完成绑定</div>
      </div>
    )
  }
}

export default AddCardStep1;