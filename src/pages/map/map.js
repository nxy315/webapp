/**
 * Created by nxy on 2018/1/16.
 */
import React, { Component } from 'react';
import './map.css';

class Map extends Component{
  constructor(props) {
    super(props);

    this.state = {
      html: '',
      lat: '',
      lng: '',
      search: ''
    }
  }

  showPosition(pos) {
    this.setState({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    })
  }

  componentDidMount() {
    const lat = this.props.match.params.lat;
    const lng = this.props.match.params.lng;
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos => {
        this.setState({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }, () => {
          let map = new window.qq.maps.Map(this.refs.mapPage, {
            panControl: false,
            zoomControl: false,
            center: new window.qq.maps.LatLng(this.state.lat, this.state.lng),
            zoom: 15
          })
        })
      });
    } else {
      this.setState({
        html: '浏览器不支持地理定位'
      })
    }
  }

  inputSearch(e) {
    let value = e.target.value;
    this.setState({
      search: value
    })
  }

  render() {
    return(
      <div className="mapPage">
        <div className="searchWrap">
          <input type="text" onChange={this.inputSearch.bind(this)} value={this.state.search} placeholder="请输入地址"/>
        </div>
        <div className="mapContainer" ref="mapPage"></div>
      </div>
    )
  }
}

export default Map