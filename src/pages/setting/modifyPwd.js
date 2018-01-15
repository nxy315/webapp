/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import Header from '../../components/header';
import Toast from '../../util/Toast'
import './css/modifyPwd.css'

class ModifyPwd extends Component{
  constructor(props) {
    super(props)
    this.state = {
      ajax: false,
      old: '',
      new: '',
      repeat: ''
    }
  }
  componentDidMount() {
  }

  saveChange() {
    let that = this;

    Toast({
      type: "loading",
      typeStatus: 1,
      msg: "正在加载",
    })

    let token = localStorage.getItem('token');
    this.setState({
      ajax: true
    }, () => {
      axios({
        method: 'post',
        url: '/api/user/reset-password',
        params: {
          token,
          old: this.state.old,
          new: this.state.new,
          repeat_new: this.state.repeat
        }
      }).then(res => {
        this.setState({
          ajax: false
        })
        if(res.data.status === 'success') {
          Toast({
            type: "success",
            msg: "修改成功",
            duration: 2000,
            callback: function() {
              that.props.history.push('/safe')
            }
          })
        } else {
          Toast({
            type: "fail",
            msg: res.data.msg,
            duration: 2000
          })
        }
      })
    })
  }

  inputChange(key, e) {
    let value = e.target.value;
    this.setState({
      [key]: value
    })
  }

  render() {
    return(
      <div className="modify modifyPwd">
        <Header content="修改密码"/>

        <div className="input-box special">
          <input type="text" value={this.state.old} onChange={this.inputChange.bind(this, 'old')} placeholder="请输入正确的原密码"/>
        </div>
        <div className="input-wrap">
          <div className="input-box">
            <input type="text" value={this.state.new} onChange={this.inputChange.bind(this, 'new')} placeholder="请输入新密码"/>
          </div>
          <div className="input-box">
            <input type="text" value={this.state.repeat} onChange={this.inputChange.bind(this, 'repeat')} placeholder="请再次输入新密码"/>
          </div>
        </div>

        {
          this.state.ajax ? (
            <div className="confirmBtn confirmBtnDis">确认修改</div>
          ) : (
            <div className="confirmBtn confirmBtnAbl" onClick={this.saveChange.bind(this)}>确认修改</div>
          )
        }
      </div>
    )
  }
}

export default ModifyPwd;