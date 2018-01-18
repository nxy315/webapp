/**
 * Created by nxy on 2018/1/8.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import Header from '../../components/header';
import './expend.css';

class Expend extends Component{
  constructor(props) {
    super(props);
    this.state = {
      total: '',
      list: []
    }
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    let token = localStorage.getItem('token');

    axios({
      method: 'post',
      url: '/api/activity/my-send',
      params: {
        token,
        page: 1,
        size: 200
      }
    }).then(res => {
      this.setState({
        list: res.data.data.detail
      })
    })
  }

  render() {
    return(
      <div className="expend">
        <Header content="我的随礼"/>
        <div className="cover">
          <p className="title">我的随礼总金额(元)</p>
          <p className="count">{this.state.total}</p>
        </div>

        <div className="detail-list">
          <div className="title">随礼明细</div>
          <ul className="list">
            {
              this.state.list.map((item, i) => {
                return (
                  <li key={i} className="item">
                    <div className="row1">
                      <div className="name">{item.title}</div>
                      <div className="total">随礼<span className="red">{item.send_money}</span></div>
                    </div>
                    <div className="row2">
                      <div className="date gray">时间：{item.ctime}</div>
                      <div className="detail">
                        <div className="coupon">回礼<span className="red">-{item.back_money}</span></div>
                        <div className="actual">实际支付<span className="green"> {item.really_money}</span></div>
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>

      </div>
    )
  }
}

export default Expend;