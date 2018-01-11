/**
 * Created by nxy on 2018/1/6.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TabBar from '../../components/tabBar'
import './css/beginMake.css';

class BeginMake extends Component{
  render() {
    return(
      <div className="beginMake">
        <div className="border-bg">
          <div className="begin-bg">
            <Link to="/templateInfo" className="makeBtn"></Link>
          </div>
        </div>

        <TabBar active="invitation"/>
      </div>
    )
  }
}

export default BeginMake;