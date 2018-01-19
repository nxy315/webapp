/**
 * Created by nxy on 2018/1/3.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import Header from '../../components/header';
import './css/billDetail.css';

class BillDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ''
    }
  }

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id
    },() => {
      axios.post('',{

      }).then(res => {
        if(res.data.status === 'success') {

        }
      })
    })
  }

  render() {
    return(
      <div className="billDetail">
        <Header content="来往记录"/>
        <div className="cover">
          <div className="avatar">
            <div className="head-cover" style={{backgroundImage: "url(" + require('./images/record1.png') + ")"}}></div>
            <span>我</span>
          </div>
          <div className="each"></div>
          <div className="avatar">
            <div className="head-cover" style={{backgroundImage: "url(" + require('./images/record1.png') + ")"}}></div>
            <span>小龙女</span>
          </div>
        </div>

        <ul className="detail-list">
          <li className="item">
            <div className="item-info">
              <div className="item-icon get"></div>
              <div className="info">
                <div className="info-title my-title">W的活动<strong style={{fontWeight: '900'}}> "小白百日"</strong></div>
                <div className="info-des">小龙女随礼<span className="red">500元</span>，回礼<span className="red">20元</span></div>
              </div>
            </div>
            <span className="item-date">2018-02-08</span>
          </li>
          <li className="item">
            <div className="item-info">
              <div className="item-icon give"></div>
              <div className="info">
                <div className="info-title other-title"><span className="red">TA的活动</span><strong style={{fontWeight: '900'}}>"我们结婚了"</strong></div>
                <div className="info-des">小龙女随礼<span className="red">500元</span>，回礼<span className="red">20元</span></div>
              </div>
            </div>
            <span className="item-date">2018-02-08</span>
          </li>
        </ul>
      </div>
    )
  }
}

export default BillDetail;