/**
 * Created by nxy on 2018/1/6.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../util/ajax';
import Header from '../../components/header';
import Switch from '../../components/switch';
import './css/h5Set.css';

class EditSet extends Component{
  constructor(props) {
    super(props);

    this.state = {
      activity_id: '',
      template_id: '',
      switch1: false,
      switch2: false,
      switch3: false,
      money: ''
    }
  }

  componentDidMount() {
    let template_id = this.props.match.params.id;
    let activity_id = this.props.match.params.activity;

    if(template_id) {
      this.setState({
        template_id,
        activity_id
      },() => {
        axios.post('/api/invitation/get-set-info',{
          template_id: this.state.template_id
        }).then(res => {
          if(res.data.status === 'success') {
            this.setState({
              switch1: res.data.data.barrage_open == 1 ? false:true,
              switch2: res.data.data.cash_set == 1 ? false:true,
              switch3: res.data.data.money_open == 1 ? false:true,
              money: res.data.data.money_set
            })
          }
        })
      })
    }
  }

  back() {
    this.props.history.push(`/H5/${this.state.template_id}/${this.state.activity_id}/1`);
  }

  barrageSwitch() {
    axios.post('/api/invitation/upt-barrage',{
      template_id: this.state.template_id,
      set_value: this.state.switch1 ? 1 : 2
    }).then(res => {
      if(res.data.status === 'success') {
        this.setState({
          switch1: !this.state.switch1
        })
      }
    })
  }

  getmoneySwitch() {
    axios.post('/api/invitation/upt-cash',{
      template_id: this.state.template_id,
      set_value: this.state.switch2 ? 1 : 2
    }).then(res => {
      if(res.data.status === 'success') {
        this.setState({
          switch2: !this.state.switch2
        })
      }
    })
  }

  sendmoneySwitch(save) {
    if(save == '2') {
      axios.post('/api/invitation/upt-money',{
        template_id: this.state.template_id,
        set_value: 2,
        money: this.state.money
      }).then(res => {
        if(res.data.status === 'success') {
          this.setState({
            switch3: true
          },() => {
            console.log(this.state.switch3);
          })
        }
      })
    } else if(save == '1') {
      axios.post('/api/invitation/upt-money',{
        template_id: this.state.template_id,
        set_value: this.state.switch3 ? 1 : 2,
        money: this.state.money
      }).then(res => {
        if(res.data.status === 'success') {
          this.setState({
            switch3: !this.state.switch3
          },() => {
            console.log(this.state.switch3);
          })
        }
      })
    }
  }

  inputMoney(e) {
    let value = e.target.value;
    this.setState({
      money: value
    })
  }

  render() {

    return(
      <div className="editSet">
        <Header content="设置" back={this.back.bind(this)}/>
        <div className="set-item">
          弹幕开关
          <Switch switch={this.barrageSwitch.bind(this)} open={this.state.switch1}/>
        </div>
        <div className="set-item">
          <div>
            <span>礼金&nbsp;</span>
            <span className="gray">(开启后，亲朋好友可直接包红包)</span>
          </div>
          <Switch switch={this.getmoneySwitch.bind(this)}  open={this.state.switch2}/>
        </div>
        <div className="set-item special">
          <div>
            <span>回礼&nbsp;</span>
            <span className="gray">(开启后，可设置回礼金额)</span>
          </div>
          <Switch switch={this.sendmoneySwitch.bind(this, '1')}  open={this.state.switch3}/>
        </div>
        {
          this.state.switch3 ? (
            <div className="set-money">
              <p className="title">设置回礼金额（元）</p>
              <div className="input-wrap">
                <span className="icon">￥</span>
                <input type="text" value={this.state.money} onChange={this.inputMoney.bind(this)} placeholder="请输入回礼金额"/>
                <div onClick={this.sendmoneySwitch.bind(this, '2')}>保存</div>
              </div>
              <p className="des">设置回礼后，好友发红包将会获得您的回礼红包</p>
            </div>
          ) : ''
        }
        <Link to={`/templateInfo/${this.state.activity_id}`} className="foot">
          基本信息修改
          <span className="go"></span>
        </Link>
      </div>
    )
  }
}

export default EditSet;