/**
 * Created by nxy on 2018/1/3.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import axios from '../../util/ajax';
import { Link } from 'react-router-dom';
import './css/myActivity.css';

class MyActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true,
    }
  }

  componentDidMount() {

    axios({
      url: '/api/activity/get-user-activity-list',
      method: 'post',
      params: {
        page: 1,
        page_size: 40
      }
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
            <Link to={`/H5/${item.id}`} key={i} className="item">
              <div className="left-info">
                <div className="title-wrap">
                  <strong className="title">{item.title}</strong>
                  <span className="status">{item.status}</span>
                </div>

                <div className="love-name">
                  <div className="sex boy">{item.first_name}</div>
                  <i className="and">and</i>
                  <div className="sex girl">{item.second_name}</div>
                </div>

                <div className="address">
                  <p className="adrs">{item.address}</p>
                  <p className="date">{item.start_time}</p>
                </div>
              </div>
              <div className="activity-bg"></div>

              <div className="activity-icon"></div>
            </Link>
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

    return (
      <div className="myActivity">
        <Header content="我的活动" back={this.back.bind(this)}/>
        <ul className="activity-list">
          {block}
        </ul>
      </div>
    )
  }
}

export default MyActivity