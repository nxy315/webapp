/**
 * Created by nxy on 2018/1/11.
 */
import React, { Component } from 'react';

class Choose extends Component{
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <div className="chooseComponent">
        {
          this.props.list.map((item, i) => {
            return <div key={i} className={`item ${(this.props.index) == i+1 ? 'active' : ''}`} onClick={this.props.choose(i+1)}>{item}<span className="right"></span></div>
          })
        }
      </div>
    )
  }
}

export default Choose;