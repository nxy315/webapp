/**
 * Created by nxy on 2018/1/8.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import Toast from '../../util/Toast';
import { Link } from 'react-router-dom';
import Header from '../../components/header';

class AddCardStep1 extends Component{
  constructor(props) {
    super(props);

    this.state = {
      agree: true,
      type: '',
      typeObj: {
        1: '信用卡',
        2: '储蓄卡'
      },
      id_card: '',
      phone: '',
      request: false,
    }
  }

  componentDidMount() {
    let cardInfo = JSON.parse(localStorage.getItem('cardStorage'));
    if(cardInfo) {

    }

    let type = this.props.match.params.type;
    if(type) {
      this.setState({
        type
      })
    }
  }

  back() {
    this.props.history.push('/addCardStep1')
  }

  inputHandler(name, e) {
    let value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  nextStep() {
    if(!this.state.id_card) {
      Toast({
        type: 'fail',
        msg: '身份证为空'
      })
    } else if(!this.state.phone) {
      Toast({
        type: 'fail',
        msg: '手机号为空'
      })
    } else {
      this.setState({
        request: true
      }, () => {
        axios.post('/api/withdrawals/bind-bank',{
          step: 2,
          id_card: this.state.id_card,
          phone: this.state.phone
        }).then(res => {
          this.setState({
            request: false
          });

          if(res.data.status === 'success') {
            this.props.history.push('/addCardStep3');
          }
        }).catch(err => {
          this.setState({
            request: false
          })
        })
      })
    }
  }

  render() {
    return(
      <div className="addCardStep1 addCardStep">
        <Header content="添加银行卡" back={this.back.bind(this)}/>

        <p className="title">请选择卡片类型</p>
        <div className="step-item">
          <span>卡片类型</span>
          <div style={{flex: '1',color: '#ccc',fontSize: '0.42rem'}}>请选择卡片类型</div>
          {/*<input type="text" placeholder="请输入持卡人姓名"/>*/}
        </div>
        <p className="title">填写银行预留本人身份证信息</p>
        <div className="step-item">
          <span>身份证</span>
          <input type="text" value={this.state.id_card} onChange={this.inputHandler.bind(this, 'id_card')} placeholder="请输入持卡人姓名"/>
        </div>
        <p className="title">请填写银行预留信息，需保障手机号可用</p>
        <div className="step-item">
          <span>手机号</span>
          <input type="text" value={this.state.phone} onChange={this.inputHandler.bind(this, 'phone')} placeholder="请输入持卡人姓名"/>
        </div>
        <div className="wrap">
          <div className="remeber active"><div className="remeberBox"></div>同意<span className="gray">《用户协议》</span></div>
        </div>
        <p className="red" style={{marginBottom: '0.35rem',fontSize: '0.38rem',textAlign: 'center'}}>以上信息加密处理，仅用于银行验证</p>
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