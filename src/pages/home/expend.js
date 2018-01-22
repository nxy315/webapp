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
      total: 0,
      list: [],
      loading: true
    }
  }

  componentDidMount() {
    this.getList();
  }

  back() {
    this.props.history.push('/home');
  }

  getList() {
    this.setState({
      loading: true
    });
    let token = localStorage.getItem('token');
    axios.post('/api/activity/my-send', {
        token,
        page: 1,
        size: 200
      }
    ).then(res => {
      this.setState({
        loading: false
      });
      if(res.data.status === 'success') {
        this.setState({
          total: res.data.data.total,
          list: res.data.data.detail
        })
      }
    }).catch(err => {
      this.setState({
        loading: false
      });
    })

  }

  render() {
    let block;
    if(!this.state.loading && this.state.list.length == 0) {
      block = (
        <div className="noResultWrap">
          <div className="noResult"></div>
          <div className="noResultText">暂无随礼记录</div>
        </div>
      )
    } else if(!this.state.loading && this.state.list.length > 0) {
      block = (
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
      )
    }

    return(
      <div className="expend">
        <Header content="我的随礼" back={this.back.bind(this)}/>
        <div className="cover">
          <p className="title">我的随礼总金额(元)</p>
          <p className="count">{this.state.total}</p>
        </div>

        <div className="detail-list">
          <div className="title">随礼明细</div>
          <ul className="list">
            {block}
          </ul>
        </div>

      </div>
    )
  }
}

export default Expend;