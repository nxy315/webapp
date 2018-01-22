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
      activity_id: null,
      template_id: null,
      id: null,
      src: null,
      type: [],
      musicList: [],
      chooseId: null,
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    let musicId = this.props.match.params.musicId;
    let activity_id = this.props.match.params.aid;
    if(id) {
      this.setState({
        template_id: id,
        id: musicId,
        activity_id
      })
    }
    this.getMusic();
  }

  back() {
    this.props.history.push(`/H5/${this.state.template_id}/${this.state.activity_id}/1`)
  }

  getMusic(id, i) {
    axios.post('/api/music/get-search-music',{
      cate_id: '',
      page: 1,
      limit: 40
    }).then(res => {
      if(res.data.status === 'success') {
        this.setState({
          musicList: res.data.data.list
        });
      }
    })
  }

  chooseMusic(id, src) {
    this.setState({
      id,
      src
    },() => {
      this.refs.audio.play();
      axios.post('/api/invitation/upt-music', {
        template_id: this.state.template_id,
        music_id: id
      }).then(res => {
        if(res.data.status === 'success') {

        }
      })
    })
  }

  render() {
    return(
      <div className="music">
        <Header content="编辑音乐" back={this.back.bind(this)}/>
        <audio src={this.state.src} ref="audio"></audio>
        {/*<div className="music-tab">*/}
          {/*{*/}
            {/*this.state.type.map((item, i) => {*/}
              {/*return <div key={i} className={`item ${this.state.id == item.id ? 'active': ''}`} onClick={this.getMusic.bind(this, item.id)}>{item.cate_name}</div>*/}
            {/*})*/}
          {/*}*/}
        {/*</div>*/}

        <div className="music-list-wrap">
          <div className="title">音乐库</div>
          <div className="music-list">
            {
              this.state.musicList.length > 0 && this.state.musicList.map((item, i) => {
                return (<div className={`item ${this.state.id == item.id ? 'active':''}`} key={i} onClick={this.chooseMusic.bind(this, item.id, item.url)}>
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