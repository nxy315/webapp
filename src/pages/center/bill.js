/**
 * Created by nxy on 2018/1/3.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import axios from '../../util/ajax';
import { Link } from 'react-router-dom';
import './css/bill.css';

class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      cover: {},
      list: []
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    this.setState({
      id:this.props.match.params.id
    },() => {
      axios.post('/api/activity/overview',{
        token,
        activity_id: this.state.id
      }).then(res => {
        if(res.data.status === 'success') {
          this.setState({
            cover: res.data.data
          })
        }
      })

      this.getList();
    });
  }

  back() {
    this.props.history.push('/billList')
  }

  getList() {
    let token = localStorage.getItem('token');
    axios.post('/api/activity/bill',{
      token,
      activity_id: this.state.id,
      page: 1,
      size: 100
    }).then(res => {
      if(res.data.status === 'success') {
        this.setState({
          list: res.data.data
        })
      }
    })
  }

  render() {
    return(
      <div className="bill">

        <div className="header">
          账本详情
          <div className="search-box">
            <input className="search-input" type="text" placeholder="输入随礼人姓名或金额"/>
            <span className="search"></span>
          </div>
        </div>
        <div className="cover">
          <div className="cover-1 red">{this.state.cover.title}</div>
          <div className="cover-2 gold">礼金总额 ( 元 )</div>
          <div className="cover-3">{this.state.cover.get_total}</div>
          <div className="cover-4">
            <span className="cover-5 gold">随礼份数：</span>
            <span className="cover-6">{this.state.cover.return_num}</span>
            <span className="cover-7 gold">/回礼总额：</span>
            <span className="cover-8">{this.state.cover.return_total}元</span>
          </div>
        </div>

        <div className="bill-list">
          {
            this.state.list.map((item, i) => {
              return (
                <div className="item">
                  <div className="info">
                    <div className="name-info">
                      <span className="name">{item.send_user_name}</span>
                      <span className="relation red">{item.relationship}</span>
                      {/*<span className="camp boy">男方</span>*/}
                      {/*<span className="camp girl">女方</span>*/}
                    </div>
                    <div className="money-info">
                      <span className="get-count">+{item.send_money}</span>
                      <span className="des">回礼</span>
                      <span className="give-count red">-{item.back_money}</span>
                    </div>
                  </div>
                  <div className="des-info">
                    {/*<p className="des">祝小龙女喜得贵子</p>*/}
                    <span className="des-date">{item.ctime}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Bill;