/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../util/ajax';
import Header from '../../components/header';
import './css/cards.css'

class Cards extends Component{
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    }
  }

  componentDidMount() {
    // axios.post('/api/withdrawals/get-user-bank-list',{
    //
    // }).then(res => {
    //   if(res.data.status === 'success') {
    //     this.setState({
    //       cards: res.data.data
    //     })
    //   }
    // })
  }

  back() {
    this.props.history.push('/wallet')
  }

  render() {
    return(
      <div className="myCards">
        <Header content="我的卡片" back={this.back.bind(this)}/>

        <Link to="/addCardStep1" className="addCards">
          <div className="t1">+</div>
          <div className="t2">添加银行卡</div>
        </Link>
        <div className="cards">

          {
            this.state.cards.map((item, i) => {
              return (
                <Link to={`/getOut${item.bank_cate_id}`} className="card">
                  <div className="info">
                    <div className="cover" style={{backgroundImage: 'url('+require(item.logo)+')'}}></div>
                    <div className="des">
                      <div className="title">招商银行</div>
                      {/*<div className="type">储值卡</div>*/}
                    </div>
                  </div>
                  <div className="num">
                    <div className="item">****</div>
                    <div className="item">****</div>
                    <div className="item">****</div>
                    <div className="item tail">{item.bank_no}</div>
                  </div>
                </Link>
              )
            })
          }

          <Link to={`/getOut`} className="card">
            <div className="info">
              <div className="cover"></div>
              <div className="des">
                <div className="title">招商银行</div>
              </div>
            </div>
            <div className="num">
              <div className="item">****</div>
              <div className="item">****</div>
              <div className="item">****</div>
              <div className="item tail">8888</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Cards