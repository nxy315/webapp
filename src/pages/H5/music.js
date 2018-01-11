/**
 * Created by nxy on 2018/1/5.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import './css/music.css';

class Music extends Component{
  render() {
    return(
      <div className="music">
        <Header content="编辑音乐"/>
        <div className="music-tab">
          <div className="item active">全部</div>
          <div className="item">华语</div>
          <div className="item">日韩</div>
          <div className="item">欧美</div>
        </div>

        <div className="music-list-wrap">
          <div className="title">音乐库</div>
          <div className="music-list">
            <div className="item active">
              <span className="checked"></span>
              咱们结婚吧
              <span className="new"></span>
            </div>
            <div className="item">
              <span className="checked"></span>
              咱们结婚吧
              <span className="hot"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Music;