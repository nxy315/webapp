/**
 * Created by nxy on 2018/1/5.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import Header from '../../components/header';
import './css/music.css';

class Music extends Component{
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      type: [],
      musicList: [],
      chooseId: null,
    }
  }

  componentDidMount() {
    axios.post('/api/music/get-music-cate',{}).then(res => {
      if(res.data.status === 'success') {
        this.setState({
          type: res.data.data
        });
        this.getMusic(res.data.data[0].id);
      }
    })
  }

  getMusic(id, i) {
    this.setState({
      id: id
    }, () => {
      axios.post('/api/music/get-search-music',{
        cate_id: Number(this.state.id),
        page: 1,
        limit: 40
      }).then(res => {
        if(res.data.status === 'success') {
          this.setState({
            musicList: res.data.data.list
          });
        }
      })
    })
  }

  render() {
    return(
      <div className="music">
        <Header content="编辑音乐"/>
        <div className="music-tab">
          {
            this.state.type.map((item, i) => {
              return <div key={i} className={`item ${this.state.id == item.id ? 'active': ''}`} onClick={this.getMusic.bind(this, item.id)}>{item.cate_name}</div>
            })
          }
        </div>

        <div className="music-list-wrap">
          <div className="title">音乐库</div>
          <div className="music-list">
            {
              this.state.musicList.length > 0 && this.state.musicList.map((item, i) => {
                return (<div className="item" key={i}>
                  <span className="checked"></span>
                  {item.name}
                  <span className="hot"></span>
                </div>)
              })
            }
            {/*<div className="item active">*/}
              {/*<span className="checked"></span>*/}
              {/*咱们结婚吧*/}
              {/*<span className="new"></span>*/}
            {/*</div>*/}
            {/*<div className="item">*/}
              {/*<span className="checked"></span>*/}
              {/*咱们结婚吧*/}
              {/*<span className="hot"></span>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    )
  }
}

export default Music;