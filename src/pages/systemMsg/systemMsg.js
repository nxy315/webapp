/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import { Link } from 'react-router-dom';
import Header from '../../components/header';

import './systemMsg.css';

class SystemMsg extends Component{
  constructor(props) {
    super(props);

    this.state = {
      list: []
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    axios.post('/api/notice/list',{
      token,
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

  back() {
    this.props.history.push('/home')
  }

  render() {
    return (
      <div className="systemMsg">
        <Header content="活动通知" back={this.back.bind(this)}/>

        <div className="msg-list">
          {
            this.state.list.map((item, i) => {
              return (
                <Link to="" className="item">
                  <div className="avatar" style={{backgroundImage: `${item.head_image}`}}></div>
                  <div className="info">{item.relationship}<span style={{color: '#4366fe'}}>{item.really_name}</span>的活动<span className="red">“{item.title}”</span>邀请了你</div>
                </Link>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default SystemMsg