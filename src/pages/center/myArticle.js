/**
 * Created by nxy on 2018/1/3.
 */
import React, { Component } from 'react';
import Header from '../../components/header'
import './css/myArticle.css'

class MyArticle extends Component {
  render() {
    return(
      <div className="myArticle">
        <Header content="我的帖子"/>
        <ul className="forum-list">
          <li className="article">
            <div className="article-title"><img className="head-cover" src={require('./images/entry1.png')} alt="头像"/>mmmp</div>
            <div className="article-content">
              <div className="content-title"><span className="excellent">优</span>婚礼结束，慢慢回忆</div>
              <p className="content-intro">婚礼结束，慢慢回忆婚礼结束，慢慢回忆婚礼结束，慢慢回忆婚礼礼结束，慢慢回忆婚礼结束，慢慢回忆</p>
              <ul className="covers">
                <li className="cover">
                  <div className="cover-img" style={{backgroundImage: 'url('+require('./images/entry1.png')+')'}}></div>
                </li>
                <li className="cover">
                  <div className="cover-img" style={{backgroundImage: 'url('+require('./images/entry1.png')+')'}}></div>
                </li>
                <li className="cover">
                  <div className="cover-img" style={{backgroundImage: 'url('+require('./images/entry1.png')+')'}}></div>
                </li>
              </ul>
              <div className="article-footer">
                {/*<div className="from">来自：知乎网</div>*/}
                <div className="operas">
                  <div className="opera edit">编辑</div>
                  <div className="opera del">删除</div>
                </div>
                <div className="hot">
                  <div className="right-icon up" style={{backgroundImage: 'url('+require('./images/praise.png')+')'}}>250</div>
                  <div className="right-icon msg" style={{backgroundImage: 'url('+require('./images/msg.png')+')'}}>250</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default MyArticle;