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
        <Header content="添加银行卡"/>

        <p className="title">请选择卡片类型</p>
        <div className="step-item">
          <span>卡片类型</span>
          <input type="text" placeholder="请输入持卡人姓名"/>
        </div>
        <p className="title">填写银行预留本人身份证信息</p>
        <div className="step-item">
          <span>身份证</span>
          <input type="text" placeholder="请输入持卡人姓名"/>
        </div>
        <p className="title">请填写银行预留信息，需保障手机号可用</p>
        <div className="step-item">
          <span>手机号</span>
          <input type="text" placeholder="请输入持卡人姓名"/>
        </div>
        <div className="wrap">
          <div className="remeber active"><div className="remeberBox"></div>同意<span className="gray">《用户协议》</span></div>
        </div>
        <p className="red" style={{marginBottom: '0.35rem',fontSize: '0.38rem',textAlign: 'center'}}>以上信息加密处理，仅用于银行验证</p>
        <Link to="/addCardStep3" className="nextStep nextStepAble">下一步</Link>
        <div className="nextStep nextStepDisable">下一步</div>
      </div>
    )
  }
}

export default AddCardStep1;