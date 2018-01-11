/**
 * Created by nxy on 2018/1/3.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import './css/findPart.css'

class FindPart extends Component {
  render() {
    return(
      <div className="findPart">
        <Header content="绑定另一半"/>
        <div className="title-bg"></div>
        <div className="des-wrap">
          <h3 className="title">邀请注意事项<span></span></h3>
          <ul className="list">
            <li className="item">1.绑定后，双方活动、账单、钱包、将共享;</li>
            <li className="item">2.双方可随时查看对方活动，可创建、编辑、发送活动邀请;</li>
            <li className="item">3.双方可查看与好友的随礼来往明细;</li>
            <li className="item">4.成功绑定后，同一活动，可标注男女双方好友;</li>
          </ul>
          <Link to="/invitation" className="invitBtn">发起邀请</Link>
        </div>
      </div>
    )
  }
}

export default FindPart