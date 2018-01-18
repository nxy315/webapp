/**
 * Created by nxy on 2018/1/6.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../util/ajax';
import Header from '../../components/header';
import Switch from '../../components/switch';
import './css/h5Set.css';

class EditSet extends Component{
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  barrageSwitch() {
    axios({
      method: 'post',
      url: '',
      params: {

      }
    }).then(res => {

    })
  }

  getmoneySwitch() {
    axios({
      method: 'post',
      url: '',
      params: {

      }
    }).then(res => {

    })
  }

  sendmoneySwitch() {
    axios({
      method: 'post',
      url: '',
      params: {

      }
    }).then(res => {

    })
  }

  render() {

    return(
      <div className="editSet">
        <Header content="设置"/>
        <div className="set-item">
          弹幕开关
          <Switch/>
        </div>
        <div className="set-item">
          <div>
            <span>礼金&nbsp;</span>
            <span className="gray">(开启后，亲朋好友可直接包红包)</span>
          </div>
          <Switch open/>
        </div>
        <div className="set-item special">
          <div>
            <span>回礼&nbsp;</span>
            <span className="gray">(开启后，可设置回礼金额)</span>
          </div>
          <Switch open/>
        </div>
        <div className="set-money">
          <p className="title">设置回礼金额（元）</p>
          <div className="input-wrap">
            <span className="icon">￥</span>
            <input type="text" placeholder="请输入回礼金额"/>
          </div>
          <p className="des">设置回礼后，好友发红包将会获得您的回礼红包</p>
        </div>

        <Link to="/templateInfo" className="foot">
          基本信息修改
          <span className="go"></span>
        </Link>
      </div>
    )
  }
}

export default EditSet;