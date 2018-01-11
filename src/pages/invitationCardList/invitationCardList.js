/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TabBar from '../../components/tabBar'

import './css/invitationCardList.css';

class InvitationCardList extends Component {
  render() {
    return(
      <div className="invitationCardList">
        <div className="header-invitation">
          <span className="share"></span>
          电子请帖
          <Link to="/templateInfo" className="add red">创建活动</Link>
        </div>
        <ul className="types">
          <li className="item active">结婚<span></span></li>
          <li className="item">生子<span></span></li>
          <li className="item">百日<span></span></li>
          <li className="item">周岁<span></span></li>
          <li className="item">乔迁<span></span></li>
          <li className="item">高中<span></span></li>
          <li className="item">其他<span></span></li>
        </ul>
        <div className="tpt-list">
          <Link to="/H5" className="item" style={{backgroundImage: "url(http://qnm.hunliji.com/o_1c05vi4vm11aj2qq2101j2c1oggn.jpg)"}}></Link>
          <Link to="/H5" className="item" style={{backgroundImage: "url(http://qnm.hunliji.com/o_1c05vi4vm11aj2qq2101j2c1oggn.jpg)"}}></Link>
          <Link to="/H5" className="item" style={{backgroundImage: "url(http://qnm.hunliji.com/o_1c05vi4vm11aj2qq2101j2c1oggn.jpg)"}}></Link>
          <Link to="/H5" className="item" style={{backgroundImage: "url(http://qnm.hunliji.com/o_1c05vi4vm11aj2qq2101j2c1oggn.jpg)"}}></Link>
          <Link to="/H5" className="item" style={{backgroundImage: "url(http://qnm.hunliji.com/o_1c05vi4vm11aj2qq2101j2c1oggn.jpg)"}}></Link>
          <Link to="/H5" className="item" style={{backgroundImage: "url(http://qnm.hunliji.com/o_1c05vi4vm11aj2qq2101j2c1oggn.jpg)"}}></Link>
        </div>
        <TabBar active="invitation"/>
      </div>
    )
  }
}

export default InvitationCardList;