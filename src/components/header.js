/**
 * Created by nxy on 2018/1/4.
 */
import React, { Component } from 'react';
// import { browserHistory } from 'react-router-dom';
// import history from '../util/history';
import createHistory from 'history/createBrowserHistory';


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
    // this.props.history.push('/home')
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