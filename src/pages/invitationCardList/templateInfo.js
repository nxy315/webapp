/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import { Link } from 'react-router-dom';
import axios from '../../util/ajax';
import DatePicker from 'react-mobile-datepicker';
import './css/templateInfo.css';

class TemplateInfo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      head_image: '',
      nowDate: new Date(),
      isOpen: false,
      typeObj: {
        1: '结婚',
        2: '生日(成人)',
        3: '生日(儿童)'
      },
      typeText: '',
      type: null,
      title: '',
      first_name: '',
      second_name: '',
      third_name: '',
      address: '',
    }
  }

  componentDidMount() {
    let center = new window.qq.maps.LatLng(33.232, 120.232);
    let map = new window.qq.maps.Map(this.refs.templateMap, {
      panControl: false,
      zoomControl: false,
      center: center,
      zoom: 14
    })

    let marker = new window.qq.maps.Marker({
      position: center,
      map: map
    });

    let type = this.props.match.params.type;

    if(type) {
      this.setState({
        typeText: this.state.typeObj[type],
        type
      })
    } else {
      this.setState({
        type: 1,
        typeText: '结婚'
      })
    }
  }

  save() {
    axios.post('/api/activity/create-activity',{
      cate_id: this.state.type,
      title: this.state.title,
      start_time: this.state.time,
      address: this.state.address,
      first_name: this.state.first_name,
      second_name: this.state.second_name,
    }).then(res => {
      if(res.data.status === 'success') {
        this.props.history.push(`/h5/${res.data.data.template_id}/1`);
      }
    })
  }

  back() {
    this.props.history.push('/beginMake')
  }

  chooseDate() {
    this.setState({ isOpen: true });
  }

  inputName(name, e) {
    let value = e.target.value;

    this.setState({
      [name]: value
    })
  }

  handleCancel = () => {
    this.setState({ isOpen: false });
  };

  handleSelect = (time) => {
    let token = localStorage.getItem('token');
    let d = new Date(time);

    let iWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.setState({ time: iWant, isOpen: false });
  };

  chooseType() {
    this.props.history.push(`/chooseTypes/${this.state.type}`);
  }

  render() {
    let block;
    if(this.state.type == 1) {
      block = (
        <div className="cnm-wrap">
          <div className="bg-white-pd form3">
            <div className="name-wrap">
              <div className="name boy">新郎姓名</div>
              <input type="text" value={this.state.first_name} onChange={this.inputName.bind(this, 'first_name')} placeholder="请输入新郎姓名"/>
            </div>
            <div className="name-wrap">
              <div className="red name girl">新娘姓名</div>
              <input type="text" value={this.state.second_name} onChange={this.inputName.bind(this, 'second_name')} placeholder="请输入新娘姓名"/>
            </div>
          </div>
        </div>
      )
    } else if(this.state.type == 2) {
      block = (
        <div className="cnm-wrap">
          <div className="bg-white-pd form5">
            <span>寿星名字</span>
            <input type="text" value={this.state.first_name} onChange={this.inputName.bind(this, 'first_name')} placeholder="请输入姓名"/>
          </div>
        </div>
      )
    } else if(this.state.type == 3) {
      block = (
        <div className="cnm-wrap">
          <div className="bg-white-pd form6">
            <span>父亲名字</span>
            <input type="text" value={this.state.first_name} onChange={this.inputName.bind(this, 'first_name')} placeholder="请输入姓名"/>
          </div>
          <div className="bg-white-pd form6">
            <span>母亲名字</span>
            <input type="text" value={this.state.second_name} onChange={this.inputName.bind(this, 'second_name')} placeholder="请输入姓名"/>
          </div>
          <div className="bg-white-pd form6">
            <span>儿女名字</span>
            <input type="text" value={this.state.third_name} onChange={this.inputName.bind(this, 'third_name')} placeholder="请输入姓名"/>
          </div>
        </div>
      )
    }


    return (
      <div className="templateInfo">
        <Header content="请帖信息" save={this.save.bind(this)} back={this.back.bind(this)}/>

        <div className="info-form">
          <div onClick={this.chooseType.bind(this)} className="bg-white-pd form1">
            <span>请选择活动类型</span>
            <div className="right-flex">
              <span className="red">{this.state.typeText}</span>
              <span className="go"></span>
            </div>
          </div>
          <div className="bg-white-pd form2">
            <span>活动标题</span>
            <input type="text" value={this.state.title} onChange={this.inputName.bind(this, 'title')} placeholder="(例如：我们结婚了/我过生日了)"/>
          </div>
        </div>

        {block}
        <div className="bg-white-pd form4" onClick={this.chooseDate.bind(this)}>
          <span>婚礼时间</span>
          <div className="right-flex">
            <span className="date">{this.state.time ? this.state.time : '点击选择时间'}</span>
            <span className="go"></span>
          </div>
        </div>

        <div className="address bg-white-pd">
          <div className="title">婚礼地址</div>
          <input type="text" value={this.state.address} onChange={this.inputName.bind(this, 'address')} placeholder="请输入婚礼地址，或地图标记"/>
          {/*<Link to="/map" className="nail"></Link>*/}
        </div>

        <div ref="templateMap" className="map"></div>
        <DatePicker
          value={this.state.nowDate}
          isOpen={this.state.isOpen}
          onSelect={this.handleSelect}
          onCancel={this.handleCancel} />
      </div>
    )
  }
}

export default TemplateInfo;