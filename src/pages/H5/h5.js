/**
 * Created by nxy on 2018/1/5.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import { Link } from 'react-router-dom';
import wx from 'weixin-js-sdk';
import wxinit from '../../util/wxconfig';
import './css/animate.css';
import './css/h5.css';

class H5 extends Component{
  constructor(props) {
    super(props);

    this.state = {
      templateId: null,
      edit: true,//是否是编辑状态
      startPoint: 0,//开始y轴坐标
      endPoint: 0,//结束y轴坐标
      scroll: false,//是否可以滚动
      seat: 0,//第几页
      pages: [],//
      i: null,
      j: null,
      imgId: null,
      test: ''
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;

    let center = new window.qq.maps.LatLng(33.232, 120.232);
    let map = new window.qq.maps.Map(this.refs.map, {
      center: center,
      zoom: 12
    })

    let marker = new window.qq.maps.Marker({
      position: center,
      map: map
    })
    let mapM = document.getElementById("mapM");
    // let citylocation = new window.qq.maps.CityService({
    //   complete: function(res) {
    //     map.setCenter(res.detail.latLng);
    //   }
    // })

    // citylocation.searchLocalCity();

    wxinit()
    // wxinit(() => {
    //   wx.onMenuShareTimeline({
    //     title: '朋友圈测试标题', // 分享标题
    //     link: 'http://blog.csdn.net/xin1243790377/article/details/51767573', // 分享链接
    //     imgUrl: 'http://avatar.csdn.net/0/A/A/1_xin1243790377.jpg', // 分享图标
    //     success: function () {
    //       // 用户确认分享后执行的回调函数
    //     },
    //     cancel: function () {
    //       console.log('cancel')
    //       // 用户取消分享后执行的回调函数
    //     }
    //   })
    // });


    // axios({
    //   method: 'get',
    //   url: '/api/share/get-data-by-template-id',
    //   params: {
    //     template_id: 1
    //   }
    // }).then( res => {
    //   if(res.data.status === 'success') {
    //     this.setState({
    //       pages: res.data.data.page,
    //       img1: res.data.data.page[0].elements[0].img
    //     },() => {
    //       // this.setState({
    //       //   img1: res.data.data.page
    //       // })
    //       // console.log(this.state.pages[0].elements[0].img)
    //     });
    //
    //   }
    // })
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
  pay() {
    axios({
      method: 'post',
      url: '/pay/example/jsapi.php'
    }).then(res => {
      // wx.chooseWXPay({
      //   appId: 'wx23841cce7185b550',
      //   timestamp: '1461300911', // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      //   nonceStr: '5719aeafb587f', // 支付签名随机串，不长于 32 位
      //   package: 'prepay_id=wx20160422125512b7d2205c9c0913643939', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      //   signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      //   paySign: '5DAB1DDABE1AD34E8FF3386AE971B727', // 支付签名
      //   success: function(res) {
      //     // 支付成功后的回调函数
      //     if (res.errMsg == "chooseWXPay:ok") {
      //       //支付成功
      //       alert('支付成功');
      //     } else {
      //       alert(res.errMsg);
      //     }
      //   },
      //   cancel: function(res) {
      //     //支付取消
      //     alert('支付取消');
      //   }
      // });
      window.location.href = res.data;
      // if(res.data.status == 'success') {
      // wx.config({
      //   debug: true,
      //   appId: res.data.data.appId,
      //   timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
      //   nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
      //   signature: res.data.data.signature,// 必填，签名，见附录1
      //   jsApiList: [
      //     'onMenuShareTimeline','chooseWXPay'
      //   ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      // });
      //
      // wx.ready(function() {
      //   if(typeof callback != 'undefined'){
      //     callback();
      //   }
      // })

      // }
    }).catch(err => {
      alert(err)
    });
    // axios({
    //   url: '/api/pay/make-order',
    //   method: 'post',
    //   // params: {
    //   //   activity_id: '',
    //   //   pay_name: '尼宵阳',
    //   //   pay_phone: '13938012302',
    //   //   all_money: 500,
    //   //   relation_ship: 1,
    //   //   is_dinner: 3,
    //   //   dinner_person: 3
    //   // }
    // }).then(res => {
    //   if(res.data.status == 'success') {
    //     wx.chooseWXPay({
    //       // timestamp: res.data.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    //       // nonceStr:  res.data.data.nonceStr, // 支付签名随机串，不长于 32 位
    //       // package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
    //       // signType: 'SHA1', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    //       // paySign:  res.data.data.signature, // 支付签名
    //       // success: function (res) {
    //       //   // 支付成功后的回调函数
    //       // }
    //     });
    //   }
    // });
  }

  render() {
    return(
      <div className="H5" id="h5">
        <div ref="map" style={{width: '400px', height: '400px'}}></div>
        <div onClick={this.pay.bind(this)}>支付</div>
        <div onClick={this.openLocation.bind(this)}>打开地图</div>
        {this.state.test}
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