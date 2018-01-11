/**
 * Created by nxy on 2018/1/5.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import './css/chooseTypes.css';


class ChooseTypes extends Component{
  render() {
    return(
      <div className="chooseTypes">
        <Header content="活动类型"/>
        <div className="items">
          <div className="item active">结婚<span className="right"></span></div>
          <div className="item">百日<span className="right"></span></div>
          <div className="item">乔迁<span className="right"></span></div>
          <div className="item">祝寿<span className="right"></span></div>
        </div>
      </div>
    )
  }
}

export default ChooseTypes