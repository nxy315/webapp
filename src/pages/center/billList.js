/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import './css/billList.css';

class BillList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cover: {},
      list: [],
      loading: true
    }
  }

  componentDidMount() {
    axios.post('/api/activity/activity-list-by-account',{
      page: 1,
      page_size: 40
    }).then(res => {
      this.setState({
        loading: false
      });

      if(res.data.status === 'success') {
        this.setState({
          list: res.data.data.list
        })
      }
    })
  }

  back() {
    this.props.history.push('/center')
  }

  render() {
    let block;
    if(this.state.list.length > 0 && !this.state.loading) {
      block = (
        this.state.list.map((item, i) => {
          return (
            <li className="item" key={i}>
              <div className="item-col title">
                <span className="des">活动&nbsp;/&nbsp;</span>
                <span className="black">{item.title}</span>
                <span className="status now">{item.status}</span>
              </div>
              <div className="item-col count">
                <span className="des">金额&nbsp;/&nbsp;</span>
                <span className="red">{item.get_total}元</span>
              </div>
              <div className="item-col date">
                <span className="des">日期&nbsp;/&nbsp;</span>
                <span className="black">{item.start_time}</span>
                <Link to={`/bill/${item.id}/2`} className="checkout red">查看账本</Link>
              </div>
            </li>
          )
        })
      )
    } else if(this.state.list.length === 0 && !this.state.loading) {
      block = (
        <div className="no-activity">
          <div className="no-des">
            <p style={{fontSize: '0.48rem', color: '#333'}}>您还没有创建活动</p>
            <p style={{fontSize: '0.4rem'}} className="red">请先创建一个活动</p>
          </div>
          <Link to="/templateInfo" className="create">马上创建</Link>
        </div>
      )
    }

    return(
      <div className="billlist">
        <Header content="随礼记账" back={this.back.bind(this)}/>
        <ul className="list-wrap">
          {block}
        </ul>
      </div>
    )
  }
}

export default BillList;