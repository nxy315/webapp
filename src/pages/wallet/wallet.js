/**
 * Created by nxy on 2018/1/2.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import { Link } from 'react-router-dom';
import Header from '../../components/header'
import './css/wallet.css';

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      money: '',
      send_phone: ''
    }
  }

  componentDidMount() {
    axios.post('/api/withdrawals/get-user-money',{}).then(res => {
      if(res.data.status === 'success') {
        this.setState({
          money: res.data.data.money,
          send_phone: res.data.data.send_phone
        })
      }
    })
  }

  back() {
    this.props.history.push('/center')
  }

  render() {
    return (
      <div className="account-wrap">
        <Header content="我的钱包" back={this.back.bind(this)}/>
        <div className="cover-wrap">
          <div className="title">账户金额 (￥)</div>
          <div className="count">{this.state.money}</div>
          <Link to="/cards" className="get">提现</Link>
        </div>

        {/*<div className="red-wrap">*/}
          {/*<div className="red">*/}
            {/*<i className="menu-icon" style={{backgroundImage: "url("+require('./images/menu.png')+")"}}></i>*/}
            {/*<span>随礼记红包</span>*/}
            {/*<span className="count">9个</span>*/}
            {/*<i className="go-icon" style={{backgroundImage: "url("+require('./images/go.png')+")"}}></i>*/}
          {/*</div>*/}
        {/*</div>*/}
      </div>
    )
  }
}

export default Wallet;