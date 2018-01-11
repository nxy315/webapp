/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import Header from '../../components/header';

import './marryRegister.css';

class MarryRegister extends Component{
  render() {
    return (
      <div className="marryRegister">
        <Header content="结婚登记"/>

        <div className="tab-btn">
          <div className="item">地图</div>
          <div className="item active">列表</div>
        </div>

        <ul className="register-list">
          <li className="item">
            <div>
              <div>结婚登记处名称</div>
              <div>松江区明南路520号</div>
              <div>咨询电话：011-120120192</div>
            </div>
            <div>
              <div>导航</div>
              <div>距离：288m</div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default MarryRegister