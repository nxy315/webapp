/**
 * Created by nxy on 2018/1/8.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import { Link } from 'react-router-dom';
import Header from '../../components/header';

class AddCardStep1 extends Component{
  constructor(props) {
    super(props);

    this.state = {
      request: false,
      code: false,
      second: 90,
      phone: '',
      timer: null
    }
  }

  back() {
    this.props.history.push('/addCardStep2')
  }

  done() {
    axios.post('/api/withdrawals/bind-bank',{
      step: '',
      bank_no: '',
      name: '',
      id_card: '',
      phone: '',
      code: ''
    }).then(res => {
      if(res.data.status === 'success') {
        this.props.history.push('/cards');
      }
    })
  }

  clearTimer() {
    this.setState({
      second: 90,
      code: false
    })
    clearInterval(this.state.timer);
  }

  getCode() {
    axios({
      method: 'post',
      url: '/api/withdrawals/get-code',
      params: {
        type: 4,
        phone: this.state.phone
      }
    }).then(res => {
      if(res.data.status === 'success') {
        let second = 90;
        this.setState({
          code: true
        },() => {
          this.state.timer = setInterval(() => {
            second--;
            if(second <= 0) {
              this.clearTimer();
            } else {
              this.setState({
                second: second
              })
            }
          }, 1000);
        });
      }
    })
  }

  render() {
    return(
      <div className="addCardStep1 addCardStep">
        <Header content="验证手机号" back={this.back.bind(this)}/>

        <p className="step3-des">绑定银行卡需要短信确认，验证码已发送至手机：180****8757,请按提示操作。</p>

        <div className="step3-box">
          <input className="input" type="text" placeholder="请输入验证码"/>

          {
            this.state.code ? (
              <div className="getCode">{this.state.second}s后重新获取</div>
            ) : (
              <div className="getCode" onClick={this.getCode.bind(this)}>获取验证码</div>
            )
          }
        </div>
        {
          this.state.request ? (
            <div className="nextStep nextStepDisable">完成绑定</div>
          ) : (
            <div className="nextStep nextStepAble" onClick={this.done.bind(this)}>完成绑定</div>
          )
        }
      </div>
    )
  }
}

export default AddCardStep1;