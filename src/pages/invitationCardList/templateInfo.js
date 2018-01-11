/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/templateInfo.css';

class TemplateInfo extends Component{
  render() {
    return (
      <div className="templateInfo">
        <div className="header">
          请帖信息
          <Link to="/h5" style={{color: '#fff'}}>保存</Link>
        </div>

        <div className="info-form">
          <Link to="/chooseTypes" className="bg-white-pd form1">
            <span>请选择活动类型</span>
            <div className="right-flex">
              <span className="red">结婚</span>
              <span className="go"></span>
            </div>
          </Link>
          <div className="bg-white-pd form2">
            <span>活动标题</span>
            <input type="text" placeholder="(例如：我们结婚了)"/>
          </div>
          <div className="bg-white-pd form3">
            <div className="name-wrap">
              <div className="name boy">新郎姓名</div>
              <input type="text" placeholder="请输入新郎姓名"/>
            </div>
            <div className="name-wrap">
              <div className="red name girl">新娘姓名</div>
              <input type="text" placeholder="请输入新娘姓名"/>
            </div>
          </div>
          <div className="bg-white-pd form4">
            <span>婚礼时间</span>
            <div className="right-flex">
              <span className="date">请选择时间</span>
              <span className="go"></span>
            </div>
          </div>
        </div>


        <div className="address bg-white-pd">
          <div className="title">婚礼地址</div>
          <input type="text" placeholder="请输入婚礼地址，或地图标记"/>
          <span className="nail"></span>
        </div>
      </div>
    )
  }
}

export default TemplateInfo;