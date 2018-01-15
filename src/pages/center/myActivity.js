/**
 * Created by nxy on 2018/1/3.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import axios from '../../util/ajax';
import Toast from '../../util/Toast';
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
      }, () => {
        Toast({
          type: 'loading',
          typeStatus: 2,
          msg: '正在加载'
        })
      })

      if(res.data.status === 'success') {
        console.log(res)
        this.setState({
          list: res.data.data.list
        })
      } else {
        Toast({
          type: 'fail',
          msg: res.data.msg,
          duration: 2000
        })
      }
    }).catch(err => {
      Toast({
        type: 'loading',
        typeStatus: 2,
        msg: '正在加载'
      })
    })
  }

  render() {
    return (
      <div className="myActivity">
        <Header content="我的活动"/>
        {
          (this.state.list.length > 0 && !this.state.loading) ? (
            <ul className="activity-list">
              <li className="item">
                <div className="left-info">
                  <div className="title-wrap">
                    <strong className="title">我们结婚了</strong>
                    <span className="status">进行中</span>
                  </div>

                  <div className="love-name">
                    <div className="sex boy">杨过</div>
                    <i className="and">and</i>
                    <div className="sex girl">小龙女</div>
                  </div>

                  <div className="address">
                    <p className="adrs">上海浦东区陆家嘴最牛逼酒店</p>
                    <p className="date">2018年10月01日</p>
                  </div>
                </div>
                <div className="activity-bg"></div>

                <div className="activity-icon"></div>
              </li>
            </ul>
          ) : (
            <div className="no-activity">
              <div className="no-des">
                <p style={{fontSize: '0.48rem', color: '#333'}}>您还没有创建活动</p>
                <p style={{fontSize: '0.4rem'}} className="red">请先创建一个活动</p>
              </div>
              <Link to="/templateInfo" className="create">马上创建</Link>
            </div>
          )
        }
      </div>
    )
  }
}

export default MyActivity