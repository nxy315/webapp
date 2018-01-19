/**
 * Created by nxy on 2018/1/6.
 */
import React, { Component } from 'react';

class Switch extends Component{
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {

  }

  changeSwitch() {

  }

  render() {
    return(
      <div className={this.props.open ? 'switch open' : 'switch'}>
        <div className="slider" onClick={this.props.switch}></div>
      </div>
    )
  }
}

export default Switch;