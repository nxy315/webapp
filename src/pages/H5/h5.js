/**
 * Created by nxy on 2018/1/5.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import { Link } from 'react-router-dom';
import Qiniu from 'qiniu';
import wx from 'weixin-js-sdk';
import './css/animate.css';
import './css/h5.css';

class H5 extends Component{
  constructor(props) {
    super(props);

    this.state = {
      edit: true,//是否是编辑状态
      startPoint: 0,//开始y轴坐标
      endPoint: 0,//结束y轴坐标
      scroll: false,//是否可以滚动
      seat: 0,//第几页
      pages: [],//
      i: null,
      j: null,
      imgId: null,
      img1:'',img2:'',img3:'',img4:'',img5:'',img6:'',img7:'',img8:'',img9:'',img10:''
    }
  }

  componentDidMount() {
    //微信初始化
    // wxinit(() => {
    //
    // });


    axios({
      method: 'get',
      url: '/api/share/get-data-by-template-id',
      params: {
        template_id: 1
      }
    }).then( res => {
      if(res.data.status === 'success') {
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

  qiniuUpload(e) {
    let file = e.target.files[0];
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
        if(file) {
          let data = new FormData();
          data.append('file', file);
          data.append('token', res.data.data.token);
          let config = {
            headers: {'Content-Type':'multipart/form-data'}
          };
          axios.post('http://upload.qiniu.com/', data, config).then(res => {
            if(res.status == 200) {
              let url = 'http://p2bkdmc4g.bkt.clouddn.com/'+res.data.hash;
              this.refs[this.state.i+'_'+this.state.j].setAttribute('src', url);
              axios({
                method: 'post',
                url: '/api/invitation/upt-image',
                params: {
                  ele_id: this.state.imgId,
                  img_path: url
                }
              }).then(res => {
                if(res.status === 'success') {
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })
  }

  editCover(i, j, id) {
    this.setState({
      i,
      j,
      imgId: id
    },() => {
      this.refs.file.click();
    })
  }

  //打开微信地图
  openLocation() {
    //打开地图
    //wx.openLocation({});
    console.log(1);
  }

  //获取位置
  getLocation() {
    //wx.getLocation()
  }

  render() {
    return(
      <div className="H5" id="h5">
        <div onClick={this.openLocation.bind(this)}>打开地图</div>
        <input type="file" ref="file" accept="image/*" onChange={this.qiniuUpload.bind(this)} style={{display: 'none'}}/>
        <div className="pageWrap" onTouchStart={this.moveStart.bind(this)} onTouchMove={this.moveIng.bind(this)} onTouchEnd={this.moveEnd.bind(this)}>
          {
            this.state.pages.map((item, i) => {
              return (
                <div key={i} className={`animated page page${i} ${Number(this.state.seat) === i ? 'active fadeIn' : 'fadeOut'}`}>
                  {
                    item.elements.map((itm, j) => {
                      return (
                        <div className={`ele_wrap ele_${i}_${j}`} key={j}>
                          <div className={`animated filp ele_wrap_${i}_${j}`}>
                            <img className="cover" src={itm.img} ref={i+'_'+j}/>
                          </div>
                          <div id={`editImg_${i}_${j}`} className='editImg' onClick={this.editCover.bind(this, i, j, itm.id)}>编辑</div>
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
          this.state.seat == 0 ? '' : (
            <div className="bless-foot">
              <div className="bless-input-wrap">
                请留下你的祝福
              </div>
              <div className="payBtn">
                <div className="xiicon"></div>
                <div>随礼</div>
              </div>
            </div>
          )
        }


        {
          // this.state.edit ? (
          //   <div className="footBar">
          //     <div className="sets">
          //       {/*<div className="set">*/}
          //       {/*<div className="icon" style={{backgroundImage: "url("+require('./images/set.png')+")"}}></div>*/}
          //       {/*<div className="des">排序/删除</div>*/}
          //       {/*</div>*/}
          //       <Link to="/music" className="set">
          //         <div className="icon" style={{backgroundImage: "url("+require('./images/music.png')+")"}}></div>
          //         <div className="des">音乐</div>
          //       </Link>
          //       <Link to="/h5set" className="set">
          //         <div className="icon" style={{backgroundImage: "url("+require('./images/set.png')+")"}}></div>
          //         <div className="des">设置</div>
          //       </Link>
          //       <Link to="/preview" className="set">
          //         <div className="icon" style={{backgroundImage: "url("+require('./images/preview.png')+")"}}></div>
          //         <div className="des">预览</div>
          //       </Link>
          //     </div>
          //     <div className="send">
          //       <div className="icon"></div>
          //       发送
          //     </div>
          //   </div>
          // ) : ''
        }
      </div>
    )
  }
}

export default H5;