/**
 * Created by nxy on 2018/1/5.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import './css/chooseTypes.css';


class ChooseTypes extends Component{
  constructor(props) {
    super(props);

    this.state = {
      index: null,
      list: [
        {
          id: 1,
          name: '结婚'
        },
        {
          id: 2,
          name: '生日(成人)'
        },
        {
          id: 3,
          name: '生日(儿童)'
        }
      ]
    }
  }

  componentDidMount() {
    let type = this.props.match.params.type;

    if(type) {
      this.setState({
        index: type
      })
    } else {
      this.setState({
        index: this.state.list[0].id
      })
    }
  }

  back() {
    if(this.state.index) {
      this.props.history.push(`/templateInfo/${this.state.index}`);
    } else {
      this.props.history.push('/templateInfo');
    }
  }

  chooseHandle(i) {
    this.setState({
      index: i
    }, () => {
      this.props.history.push('/templateInfo/'+this.state.index);
    })
  }

  render() {
    return(
      <div className="chooseTypes">
        <Header content="活动类型" back={this.back.bind(this)}/>
        <div className="items">
          {
            this.state.list.map((item, i) => {
              return (

                <div key={i} className={`item ${(i+1) == this.state.index ? 'active' : ''}`} onClick={this.chooseHandle.bind(this, i+1)}>{item.name}<span className="right"></span></div>
              )
            })
          }
          {/*<div className="item">乔迁<span className="right"></span></div>*/}
          {/*<div className="item">祝寿<span className="right"></span></div>*/}
        </div>
      </div>
    )
  }
}

export default ChooseTypes