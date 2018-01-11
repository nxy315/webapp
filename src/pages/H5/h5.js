/**
 * Created by nxy on 2018/1/5.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/h5.css';

class H5 extends Component{
  render() {
    return(
      <div className="H5">

        <div className="footBar">
          <div className="sets">
            <div className="set">
              <div className="icon" style={{backgroundImage: "url("+require('./images/set.png')+")"}}></div>
              <div className="des">排序/删除</div>
            </div>
            <Link to="/music" className="set">
              <div className="icon" style={{backgroundImage: "url("+require('./images/music.png')+")"}}></div>
              <div className="des">音乐</div>
            </Link>
            <Link to="/h5set" className="set">
              <div className="icon" style={{backgroundImage: "url("+require('./images/set.png')+")"}}></div>
              <div className="des">设置</div>
            </Link>
            <Link to="/preview" className="set">
              <div className="icon" style={{backgroundImage: "url("+require('./images/preview.png')+")"}}></div>
              <div className="des">预览</div>
            </Link>
          </div>
          <div className="send">
            <div className="icon"></div>
            发送
          </div>
        </div>
      </div>
    )
  }
}

export default H5;