/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import './css/modifyPwd.css'

class ModifyPwd extends Component{
  render() {
    return(
      <div className="modify modifyPwd">
        <Header content="修改密码"/>

        <div className="input-box special">
          <input type="text" placeholder="请输入正确的原密码"/>
        </div>
        <div className="input-wrap">
          <div className="input-box">
            <input type="text" placeholder="请输入新密码"/>
          </div>
          <div className="input-box">
            <input type="text" placeholder="请再次输入新密码"/>
          </div>
        </div>

        <div className="confirmBtn confirmBtnAbl">确认修改</div>
        <div className="confirmBtn confirmBtnDis">确认修改</div>
      </div>
    )
  }
}

export default ModifyPwd;