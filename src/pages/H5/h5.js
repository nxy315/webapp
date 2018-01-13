/**
 * Created by nxy on 2018/1/5.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import { Link } from 'react-router-dom';
import Qiniu from 'qiniu';
import './css/animate.css';
import './css/h5.css';

class H5 extends Component{
  constructor(props) {
    super(props);

    this.state = {
      edit: false,//是否是编辑状态
      startPoint: 0,//开始y轴坐标
      endPoint: 0,//结束y轴坐标
      scroll: false,//是否可以滚动
      seat: 0,//第几页
      pages: [],
      img1:'',img2:'',img3:'',img4:'',img5:'',img6:'',img7:'',img8:'',img9:'',img10:''
    }
  }

  // setStateAsync(state) {
  //   return new Promise((resolve) => {
  //     this.setState(state, resolve)
  //   });
  // }
  // async componentDidMount() {
  //   // await this.setStateAsync({count: 1});
  //   // console.log(this.state.count);//输出count=1
  // }

  componentDidMount() {
    console.log(Qiniu);

    axios({
      method: 'get',
      url: '/api/share/get-data-by-template-id',
      params: {
        template_id: 1
      }
    }).then( res => {
      if(res.data.status === 'success') {
        console.log(res.data.data.page[0].elements[0].img)
        this.setState({
          pages: res.data.data.page,
          img1: res.data.data.page[0].elements[0].img
        },() => {
          // this.setState({
          //   img1: res.data.data.page
          // })
          // console.log(this.state.pages[0].elements[0].img)
        });

      }
    })
  }

  moveStart(e) {
    this.setState({
      startPoint: e.touches[0].pageY,
      endPoint: e.touches[0].pageY,
      scroll: false
    });
  }
  moveIng(e) {
    this.setState({
      endPoint: e.touches[0].pageY
    });
  }
  moveEnd() {
    if(Math.abs(this.state.startPoint - this.state.endPoint) > 180) {

      if(this.state.startPoint - this.state.endPoint > 0 && this.state.seat !== (this.state.pages.length - 1)) {
        //向下滑
        this.setState({
          scroll: true,
          seat: this.state.seat+1
        }, () => {
          this.setState({
            startPoint: null,
            endPoint: null,
            scroll: false
          })
        })
      } else if(this.state.startPoint - this.state.endPoint < 0 && this.state.seat !== 0) {
        //向上滑
        this.setState({
          scroll: true,
          seat: this.state.seat-1
        }, () => {
          this.setState({
            startPoint: null,
            endPoint: null,
            scroll: false
          })
        })
      } else {
        //没有触发滑动
        this.setState({
          scroll: false
        })
      }
    }
  }

  qiniuUpload(token) {

  }

  editCover(i, j, id) {
    let token = localStorage.getItem('token');

    axios({
      method: 'get',
      url: '/api/user/get-auth',
      params: {
        token,
        type: '1'
      }
    }).then( res => {
      if(res.data.status === 'success') {
        console.log(res.data);
        this.qiniuUpload(res.data.data.token)
        //4p6OdJXaB9m1rbEeXwUmxzdzeOpPyQJ5_FDIptYg:e8r01HdzQTFxSF2cr6qAzibxU9g=:eyJzY29wZSI6InNsai1pbWFnZXMtcHVibGljIiwiZGVhZGxpbmUiOjE1MTU3NTIyMTF9
      }
    })
  }

  render() {
    return(
      <div className="H5" id="h5">
        <div className="pageWrap" onTouchStart={this.moveStart.bind(this)} onTouchMove={this.moveIng.bind(this)} onTouchEnd={this.moveEnd.bind(this)}>
          {
            this.state.pages.map((item, i) => {
              return (
                <div key={i} className={`animated page page${i} ${Number(this.state.seat) === i ? 'active fadeIn' : 'fadeOut'}`}>
                  {
                    item.elements.map((itm, j) => {
                      return (
                        <div className={`animated flip ele_${i}_${j}`} key={j}>
                          <img className="cover" src={itm.img}/>
                          <button id={`editImg_${i}_${j}`} className='editImg' onClick={this.editCover.bind(this, i, j, itm.id)}>编辑</button>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>

        {
          this.state.edit ? (
            <div className="footBar">
              <div className="sets">
                {/*<div className="set">*/}
                {/*<div className="icon" style={{backgroundImage: "url("+require('./images/set.png')+")"}}></div>*/}
                {/*<div className="des">排序/删除</div>*/}
                {/*</div>*/}
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
          ) : ''
        }
      </div>
    )
  }
}

export default H5;