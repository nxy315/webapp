/**
 * Created by nxy on 2018/1/16.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import './map.css';

// let searchService = new qq.maps.SearchService({
//   complete : function(results){
//     var pois = results.detail.pois;
//     for(var i = 0,l = pois.length;i < l; i++){
//       var poi = pois[i];
//       latlngBounds.extend(poi.latLng);
//       var marker = new qq.maps.Marker({
//         map:map,
//         position: poi.latLng
//       });
//
//       marker.setTitle(i+1);
//
//       markers.push(marker);
//     }
//     map.fitBounds(latlngBounds);
//   }
// });

class Map extends Component{
  constructor(props) {
    super(props);

    this.state = {
      html: '',
      lat: '',
      lng: '',
      search: '',
      map: null,
      searchService: null,
      marker: null,
      list: []
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
          this.state.map = new window.qq.maps.Map(this.refs.mapPage, {
            panControl: false,
            zoomControl: false,
            center: new window.qq.maps.LatLng(this.state.lat, this.state.lng),
            zoom: 15
          })
          this.state.marker = new window.qq.maps.Marker({
            position: new window.qq.maps.LatLng(this.state.lat, this.state.lng),
            map: this.state.map
          })
        })
      });
    }
  }

  searchHandle() {
    axios.get(`http://apis.map.qq.com/jsapi?qt=poi&wd=${encodeURIComponent(this.state.search)}&pn=0&rn=10&rich_source=qipao&rich=web&nj=0&c=1&output=jsonp&pf=jsapi&ref=jsapi&cb=qq.maps._svcb5.search_service_10`).then(res => {
      console.log(res)
    })
  }

  inputSearch(e) {
    let value = e.target.value;
    this.setState({
      search: value
    }, () => {

      // if(this.state.search) {
      //   this.state.map = null
      //   this.state.searchService = null
      //   setTimeout(() => {
      //     console.log(typeof this.state.searchService)
      //     if(this.state.searchService === null) {
      //       this.state.searchService = new window.qq.maps.SearchService({
      //         panel: this.refs.maplist,
      //         map : this.state.map
      //       });
      //     }
      //     this.state.searchService.search(this.state.search);
      //   }, 0);
      // }

    })
  }

  render() {
    return(
      <div className="mapPage">
        <div className="searchWrap">
          <input type="text" onChange={this.inputSearch.bind(this)} value={this.state.search} placeholder="请输入地址"/>
          <div id="mapSearch" onClick={this.searchHandle.bind(this)}>搜索</div>
        </div>
        {
          this.state.search ? (
            <div id="search-list" ref="maplist"></div>
          ) : ''
        }

        <div className="mapContainer" ref="mapPage"></div>
      </div>
    )
  }
}

export default Map