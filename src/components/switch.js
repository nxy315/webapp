/**
 * Created by nxy on 2018/1/6.
 */
import React, { Component } from 'react';

class Switch extends Component{
  render() {
    return(
      <div className={this.props.open ? 'switch open' : 'switch'}>
        <div className="slider"></div>
      </div>
    )
  }
}

export default Switch;