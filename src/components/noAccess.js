/**
 * Created by nxy on 2018/1/15.
 */
import React, { Component } from 'react';
import Header from './header';

class NoAccess extends Component{
  constructor(props) {
    super(props);
  }

  back() {
    this.props.history.push('/home')
  }

  render() {
    return(
      <div className="noAccess">
        <Header content="" back={this.back.bind(this)}/>
        <img src={require('../static/devloping.png')} alt=""/>
      </div>
    )
  }
}

export default NoAccess;