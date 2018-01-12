/**
 * Created by nxy on 2018/1/5.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import Header from '../../components/header';
import Choose from '../../components/choose';
import './css/chooseSex.css';

class ChooseSex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      params: '',
      index: 0,
      sex: {
        1: '男',
        2: '女',
        3: '保密'
      },
      list: [
        '男','女','保密'
      ]
    }
  }

  componentDidMount() {
    this.setState({
      index: this.props.match.params.type
    });
  }

  componentWillUnmount() {
    localStorage.removeItem('sex');
  }

  choose(i) {
    let token = localStorage.getItem('token');

    axios({
      method: 'post',
      url: '/api/user/set-detail',
      params: {
        token: token,
        type: 4,
        content: i
      }
    }).then( res => {
      if(res.data.status === 'success') {
        this.props.history.push('/userInfo');
      }
    })
  }

  render() {
    return(
      <div className="chooseSex">
        <Header content="修改性别"/>

        <div className="chooseComponent">
          {
            this.state.list.map((item, i) => {
              return <div key={i} className={`item ${(this.state.index) == i+1 ? 'active' : ''}`} onClick={this.choose.bind(this, i+1)}>{item}<span className="right"></span></div>
            })
          }
        </div>
      </div>
    )
  }
}

export default ChooseSex;