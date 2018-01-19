/**
 * Created by nxy on 2018/1/8.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import './css/addCardStep.css';

class AddCardStep1 extends Component{
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      bank_no: '',
      request: false
    }
  }

  componentDidMount() {

  }

  back() {
    this.props.history.push('/cards');
  }

  inputHandler(name, e) {
    let value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  nextStep() {
    axios.post('/api/withdrawals/bind-bank',{
      step: 1,
      bank_no: this.state.bank_no
    }).then(res => {
      if(res.data.status === 'success') {
        this.props.history.push('/addCardStep2');
      }
    })
  }

  render() {
    return(
      <div className="addCardStep1 addCardStep">
        <Header content="添加银行卡" back={this.back.bind(this)}/>

        <p className="title">请绑定持卡人本人银行卡</p>
        <div className="step-box">
          <div className="step-item">
            <span>持卡人</span>
            <input type="text" value={this.state.name} onChange={this.inputHandler.bind(this, 'name')} placeholder="请输入持卡人姓名"/>
          </div>
          <div className="step-item">
            <span>卡号</span>
            <input type="text" value={this.state.bank_no} onChange={this.inputHandler.bind(this, 'bank_no')} placeholder="请输入银行卡号"/>
          </div>
        </div>

        {
          this.state.request ? (
            <div className="nextStep nextStepDisable">下一步</div>
          ) : (
            <div className="nextStep nextStepAble" onClick={this.nextStep.bind(this)}>下一步</div>
          )
        }
      </div>
    )
  }
}

export default AddCardStep1;