/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
// import { browserHistory } from 'react-router-dom';
// import history from '../util/history';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  componentDidMount() {

  }



  back() {
    window.history.go(-1)
    // history.push('/home')
  }
  render() {
    return(
      <div className="header">
        {this.props.content}
        <div className="touchBack" onClick={this.back.bind(this)}></div>
        {this.props.save ? (<span className="saveChange" onClick={this.props.save}>保存</span>) : ''}
      </div>
    )
  }
}

export default Header;