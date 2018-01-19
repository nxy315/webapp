/**
 * Created by nxy on 2018/1/8.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import Header from '../../components/header';
import './css/chooseCard.css';

class ChooseCard extends Component{
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      list: []
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if(id) {
      this.setState({
        id
      })
    }
  }

  getData() {
    axios.post('/api/withdrawals/get-user-bank-list',{

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
      <div className="chooseCard">
        <Header content="选择银行卡"/>
        <div className="items">
          {
            this.state.list.map((item, i) => {
              return (
                <div className={`item ${this.state.id == item.id ? 'active' : ''}`}>招商银行<span className="right"></span></div>
              )
            })
          }
          <div className="item active">招商银行<span className="right"></span></div>
          <div className="item">浦发银行<span className="right"></span></div>
        </div>
      </div>
    )
  }
}

export default ChooseCard;