/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import Toast from '../../util/Toast';
import DatePicker from 'react-mobile-datepicker';
import axios from '../../util/ajax';
import './css/userInfo.css'

class UserInfo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      sex: '',
      time: '',
      head_image: '',
      nowDate: new Date(),
      isOpen: false,
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    axios.post('/api/user/get-user-detail',{
      token
    }).then(res => {
      if(res.data.status === 'success') {
        let obj = res.data.data;
        if(Number(obj.sex) === 1) {
          this.setState({
            sex: '男'
          })
        } else if(Number(obj.sex) === 2) {
          this.setState({
            sex: '女'
          })
        } else {
          this.setState({
            sex: '保密'
          })
        }
        this.setState({
          info: obj,
          time: obj.birthday,
          head_image: obj.head_image
        });
      }
    })
  }

  chooseSex() {
    this.props.history.push('/chooseSex')
  }

  chooseDate() {
    this.setState({ isOpen: true });
  }

  handleCancel = () => {
    this.setState({ isOpen: false });
  }

  handleSelect = (time) => {
    let token = localStorage.getItem('token');
    let d = new Date(time);

    let iWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.setState({ time: iWant, isOpen: false });

    axios({
      method: 'post',
      url: '/api/user/set-detail',
      params: {
        token,
        type: 5,
        content: iWant
      }
    }).then(res => {
      if(res.data.status === 'success') {

      }
    })
  }

  trigger() {
    this.refs.headImg.click();
  }
  upload(e) {
    let file = e.target.files[0]
    let token = localStorage.getItem('token');
    axios.post('/api/user/get-auth',{
      token,
      type: '1'
    }).then(res => {
      if(res.data.status === 'success') {
        if(file) {
          let data = new FormData();
          data.append('file', file);
          data.append('token', res.data.data.token);
          let config = {
            headers: {'Content-Type':'multipart/form-data'}
          };
          axios.post('http://upload.qiniu.com/', data, config).then(res => {
            if(res.status == 200) {
              let url = 'http://p2bkdmc4g.bkt.clouddn.com/'+res.data.hash;
              axios.post('/api/user/set-detail',{
                token,
                type: 1,
                content: url
              }).then(res => {
                if(res.data.status === 'success') {
                  this.setState({
                    head_image: url
                  })
                }
              })
            }
          })
        }
      }
    })
  }

  render() {
    return(
      <div className="userInfo">
        <Header content="个人信息"/>
        <input type="file" accept="image/*" ref="headImg" onChange={this.upload.bind(this)} style={{display: 'none'}}/>
        <div className="avator-wrap" onClick={this.trigger.bind(this)}>
          <span>点击可修改</span>
          <div className="avator" style={{backgroundImage: 'url('+this.state.head_image+')'}}></div>
        </div>
        <div className="set-wrap">
          <Link to="/nickName" className="set-item">
            昵称
            <div className="right-info">
              <span className="name">{this.state.info.nickname ? this.state.info.nickname : '(空)'}</span>
              <span className="go"></span>
            </div>
          </Link>
          <Link to="/chooseName" className="set-item">
            姓名
            <div className="right-info">
              <span className="name">{this.state.info.real_name ? this.state.info.real_name : '(空)'}</span>
              <span className="go"></span>
            </div>
          </Link>
          <Link to={`/chooseSex/${this.state.info.sex}`} className="set-item">
            性别
            <div className="right-info">
              <span className="name">{this.state.sex}</span>
              <span className="go"></span>
            </div>
          </Link>
          <div className="set-item" onClick={this.chooseDate.bind(this)}>
              生日
              <div className="right-info">
                  <span className="name">{this.state.time}</span>
                  <span className="go"></span>
              </div>
          </div>
          {/*<div className="set-item">生日</div>*/}
          {/*<div className="set-item" onClick={this.chooseDate.bind(this)}>生日</div>*/}
        </div>
        <DatePicker
            value={this.state.nowDate}
            isOpen={this.state.isOpen}
            onSelect={this.handleSelect}
            onCancel={this.handleCancel} />
      </div>
    )
  }
}

export default UserInfo