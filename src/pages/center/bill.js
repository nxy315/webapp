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
      list: [],
      route: '',//1首页2个人中心
      loading: true
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    let id = this.props.match.params.id;
    let route = this.props.match.params.route;
    if(route) {
      this.setState({
        route
      })
    }

    if(id) {
      this.setState({
        id: id
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
  }

  back() {
    if(this.state.route == 1) {
      this.props.history.push('/home')
    } else {
      this.props.history.push('/billList')
    }
  }

  getList() {
    this.setState({
      loading: true
    });
    let token = localStorage.getItem('token');
    axios.post('/api/activity/bill',{
      token,
      activity_id: this.state.id,
      page: 1,
      size: 100
    }).then(res => {
      this.setState({
        loading: false
      });
      if(res.data.status === 'success') {
        this.setState({
          list: res.data.data
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
          <div className="noResultText">暂无收礼记录</div>
        </div>
      )
    } else if(!this.state.loading && this.state.list.length > 0) {
      block = (
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
      )
    }

    return(
      <div className="bill">

        <div className="header">
          账本详情
          <div className="search-box">
            <input className="search-input" type="text" placeholder="输入随礼人姓名或金额"/>
            <span className="search"></span>
          </div>
          <div className="backBtn" onClick={this.back.bind(this)} style={{position:'absolute',left:'0',top:'0',width:'3rem',height: '1.36rem'}}></div>
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
          {block}
        </div>
      </div>
    )
  }
}

export default Bill;