/**
 * Created by nxy on 2018/1/5.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import Header from '../../components/header';
import Choose from '../../components/choose';
import './css/chooseSex.css';

class ChooseSex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '/api/user/set-detail',
      params: '',
      index: 0,
      sex: {
        1: '男',
        2: '女',
        3: '保密'
      },
      list: [
        '男','女','保密'
      ]
    }
  }

  componentDidMount() {
    this.setState({
      index: this.props.match.params.type
    });
  }

  componentWillUnmount() {
    localStorage.removeItem('sex');
  }

  render() {
    return(
      <div className="chooseSex">
        <Header content="修改性别"/>

        <Choose index={this.state.index} url={this.state.url} params={this.state.params} list={this.state.list}/>
      </div>
    )
  }
}

export default ChooseSex;