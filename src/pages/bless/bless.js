/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import './bless.css';

class Bless extends Component{
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    // axios.post('',{
    //
    // }).then(res => {
    //   if(res.data.status === 'success') {
    //
    //   }
    // })
  }

  back() {
    this.props.history.push('/home');
  }

  render() {
    return (
      <div className="bless">
        <Header content="宾客祝福" back={this.back.bind(this)}/>
        <Link to="" className="toH5">我的活动 <span className="red">“我们结婚了”</span></Link>

        <p className="block"></p>
        <ul className="bless-list">
          <li className="bless-item">
            <div className="avatar"></div>
            <div className="right">
              <div className="name">小龙女</div>
              <p className="date">2018-10-20 13：14</p>
              <p className="msg">恭喜！请查收红包请查收红包请查收红包请查收红包请查收红包请查收红包请查收红包</p>
            </div>
          </li>
          <li className="bless-item">
            <div className="avatar"></div>
            <div className="right">
              <div className="name">小龙女</div>
              <p className="date">2018-10-20 13：14</p>
              <p className="msg">恭喜！请查收红包</p>
            </div>
          </li>
          <li className="bless-item">
            <div className="avatar"></div>
            <div className="right">
              <div className="name">小龙女</div>
              <p className="date">2018-10-20 13：14</p>
              <p className="msg">恭喜！请查收红包</p>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default Bless