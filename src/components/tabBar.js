/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TabBar extends Component {
  render() {
    return (
      <div className="tabbar">
        <Link to="/home" className={this.props.active === 'home' ? 'item active' : 'item'}>
          {
            this.props.active === 'home' ? (<div className="icon" style={{backgroundImage: "url(" + require('./images/home_active.png') + ")"}}></div>) :
              (<div className="icon" style={{backgroundImage: "url(" + require('./images/home.png') + ")"}}></div>)
          }
          首页
        </Link>
        {/*<Link to="/forum" className={this.props.active == 'forum' ? 'item active' : 'item'}>*/}
          {/*{*/}
            {/*this.props.active == 'forum' ? (<div className="icon" style={{backgroundImage: "url(" + require('./images/happy_active.png') + ")"}}></div>) :*/}
              {/*(<div className="icon" style={{backgroundImage: "url(" + require('./images/happy.png') + ")"}}></div>)*/}
          {/*}*/}
          {/*幸福说*/}
        {/*</Link>*/}
        <Link to="/beginMake" className={this.props.active === 'invitation' ? 'item active' : 'item'}>
          {
            this.props.active === 'invitation' ? (<div className="icon" style={{backgroundImage: "url(" + require('./images/invitation_active.png') + ")"}}></div>) :
              (<div className="icon" style={{backgroundImage: "url(" + require('./images/invitation.png') + ")"}}></div>)
          }
          请柬
        </Link>
        <Link to="/center" className={this.props.active === 'center' ? 'item active' : 'item'}>
          {
            this.props.active === 'center' ? (<div className="icon" style={{backgroundImage: "url(" + require('./images/mine_active.png') + ")"}}></div>) :
              (<div className="icon" style={{backgroundImage: "url(" + require('./images/mine.png') + ")"}}></div>)
          }
          我的
        </Link>
      </div>
    )
  }
}

export default TabBar;