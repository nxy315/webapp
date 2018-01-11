/**
 * Created by nxy on 2018/1/5.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import Header from '../../components/header';
import './css/changeInput.css';

class ChooseName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  inputChange(e) {
    let value = e.target.value;

    this.setState({
      value: value
    })
  }

  save() {
    let token = localStorage.getItem('token');
    axios({
      method: 'post',
      url: '/api/user/set-detail',
      params: {
        token: token,
        type: 3,
        content: this.state.value
      }
    }).then( res => {
      if(res.data.status === 'success') {
        this.props.history.push('/userInfo');
      }
    })
  }

  render() {
    return(
      <div className="changeWrap">
        <Header content="修改名字" save={this.save.bind(this)}/>
        <input className="changeInput" value={this.state.value} onChange={this.inputChange.bind(this)} type="text"/>
      </div>
    )
  }
}

export default ChooseName;