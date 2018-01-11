/**
 * Created by nxy on 2018/1/8.
 */
import React, { Component } from 'react';
import Header from '../../components/header';

class ModifyTel extends Component{
  render() {
    return(
      <div className="modify modifyTel">
        <Header content="修改手机号"/>

        <div className="input-box special">
          <input type="text" placeholder="请输入原手机号码"/>
        </div>
        <div className="code-box">
          <input className="input" type="text" placeholder="请输入验证码"/>
          <div className="getCode">获取验证码</div>
        </div>
        <div className="input-box input-wrap">
          <input type="text" placeholder="请输入有效的新手机号码"/>
        </div>

        <div className="confirmBtn confirmBtnAbl">确认修改</div>
        <div className="confirmBtn confirmBtnDis">确认修改</div>
      </div>
    )
  }
}

export default ModifyTel;