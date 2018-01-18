/**
 * Created by nxy on 2018/1/15.
 */
import React, { Component } from 'react';
import Header from './header';

class NoAccess extends Component{
  render() {
    return(
      <div className="noAccess">
        <Header content=""/>
        <img src={require('../static/devloping.png')} alt=""/>
      </div>
    )
  }
}

export default NoAccess;