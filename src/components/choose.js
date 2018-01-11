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

  choose(i, e) {
    let token = localStorage.getItem('token');
    axios({
      method: 'post',
      url: this.props.url,
      params: {
        token: token,
        type: 4,
        content: i
      }
    }).then( res => {
      if(res.data.status === 'success') {
        this.props.history.push('/userInfo');
      }
    })
  }

  render() {
    return(
      <div className="chooseComponent">
        {
          this.props.list.map((item, i) => {
            return <div key={i} className={`item ${(this.props.index) == i+1 ? 'active' : ''}`} onClick={this.choose.bind(this)}>{item}<span className="right"></span></div>
          })
        }
      </div>
    )
  }
}

export default Choose;