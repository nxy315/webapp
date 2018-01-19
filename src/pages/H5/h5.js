/**
 * Created by nxy on 2018/1/5.
 */
import React, { Component } from 'react';
import axios from '../../util/ajax';
import { Link } from 'react-router-dom';
import wx from 'weixin-js-sdk';
import util from '../../util/util';
import wxinit from '../../util/wxconfig';
import './css/animate.css';
import './css/h5.css';

class H5 extends Component{
  constructor(props) {
    super(props);

    this.state = {
      templateId: null,
      edit: false,//是否是编辑状态1编辑2预览
      startPoint: 0,//开始y轴坐标
      endPoint: 0,//结束y轴坐标
      scroll: false,//是否可以滚动
      seat: 0,//第几页
      pages: [],//
      i: null,//第i页
      j: null,//第i页的第j个元素
      imgId: null,//图片id
      code: '',//公众号code用来跟后台交换支付参数
      red_part: false,//弹出随礼红包
      send_money: false,//弹出回礼红包
      open: false,
      openEnd: false,
      qrcodePage: false,
    }
  }

  componentDidMount() {
    // wxinit();
    let id = this.props.match.params.id;
    let edit = this.props.match.params.edit;
    if(edit) {
      if(edit == 1) {
        this.setState({
          edit: true
        })
      } else if(edit == 2) {
        this.setState({
          edit: false
        })
      }
    }
    if(id) {
      this.setState({
        templateId: id
      }, () => {
        axios.post('/api/share/get-data-by-template-id',{
          template_id: 1
        }).then(res => {
          if(res.data.status === 'success') {
            this.setState({
              pages: res.data.data.page,
            });
          }
        })
      })
    }
    // let code = util.queryString('code');
    // if(code) {
    //   this.setState({
    //     code
    //   })
    // } else {
    //   window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
    //     + 'wxc4d4986ff1b104df'
    //     + "&redirect_uri=" + encodeURIComponent(window.location.href)
    //     + "&response_type=code"
    //     + "&scope=snsapi_userinfo"
    //     + "&state=weiapppay#wechat_redirect";
    // }

    // window.location.href = ''
    // let id = this.props.match.params.id;
    //
    // let center = new window.qq.maps.LatLng(33.232, 120.232);
    // let map = new window.qq.maps.Map(this.refs.map, {
    //   center: center,
    //   zoom: 12
    // })
    //
    // let marker = new window.qq.maps.Marker({
    //   position: center,
    //   map: map
    // })
    // let mapM = document.getElementById("mapM");
    // let citylocation = new window.qq.maps.CityService({
    //   complete: function(res) {
    //     map.setCenter(res.detail.latLng);
    //   }
    // })

    // citylocation.searchLocalCity();

    // wxinit()
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
    axios.post('/api/user/get-auth',{
      token,
      type: '1'
    }).then(res => {
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
      method: 'get',
      url: `/api/pay/make-order?code=${this.state.code}`,
    }).then(res => {
      if(res.data.status === 'success') {
        let config = res.data.data;

        wxinit(() => {
          wx.chooseWXPay({
            appId: config.appId,
            timestamp: config.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: config.nonceStr, // 支付签名随机串，不长于 32 位
            package: config.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: config.paySign, // 支付签名
            success: function(res) {
              // 支付成功后的回调函数
              if (res.errMsg == "chooseWXPay:ok") {
                //支付成功
                alert('支付成功');
              } else {
                alert(res.errMsg);
              }
            },
            cancel: function(res) {
              //支付取消
              alert('支付取消');
            }
          });
        })
      }
    })
  }

  openPay() {
    this.setState({
      red_part: true
    })
  }

  closeRed() {
    this.setState({
      red_part: false
    })
  }

  openRed() {
    this.setState({
      open: true
    },() => {
      setTimeout(() => {
        this.setState({
          openEnd: true
        })
      }, 500)
    })
  }

  render() {
    return(
      <div className="H5" id="h5">
        {/*<div onClick={this.pay.bind(this)}>支付</div>*/}
        {/*<div onClick={this.openLocation.bind(this)}>打开地图</div>*/}
        {/*<audio src="http://p15nw7thi.bkt.clouddn.com/music/sys_music/911 - I Do.mp3" autoplay="autoplay"></audio>*/}
        <input type="file" ref="file" accept="image/*" onChange={this.qiniuUpload.bind(this)} style={{display: 'none'}}/>
        <div className="firstPage">

        </div>
        <div className={`pageWrap ${(this.state.red_part || this.state.send_money || this.state.qrcodePage) ? 'blur':''}`} onTouchStart={this.moveStart.bind(this)} onTouchMove={this.moveIng.bind(this)} onTouchEnd={this.moveEnd.bind(this)}>
          {
            this.state.pages.map((item, i) => {
              return (
                <div key={i} className={`animated page page${i} ${Number(this.state.seat) === i ? 'active fadeIn' : 'fadeOut'}`}>
                  {
                    item.elements.map((itm, j) => {
                      return (
                        <div className={`ele_wrap ele_${i}_${j}`} key={j}>
                          <div className={`ele_wrap_item animated ele_wrap_${i}_${j}`}>
                            <img className="cover" src={itm.img} ref={i+'_'+j}/>
                          </div>
                          {
                            (this.state.edit == 2) ? (
                              <div id={`editImg_${i}_${j}`} className='editImg' onClick={this.editCover.bind(this, i, j, itm.id)}>编辑</div>
                            ) : ''
                          }
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
          {/*<div className="lastPage">*/}
            {/*<div className="contentWrap">*/}
              {/*<h1 className="t1">WELCOME</h1>*/}
              {/*<p className="t2">2018年01月01日</p>*/}
              {/*<p className="t3">上海陆家嘴大酒店</p>*/}
              {/*<div ref="sharemap" className="map"></div>*/}
              {/*<h4 className="t4">是否赴宴</h4>*/}
              {/*<ul className="statusWrap">*/}
                {/*<li className="statusItem active">赴宴</li>*/}
                {/*<li className="statusItem">待定</li>*/}
                {/*<li className="statusItem">有事</li>*/}
              {/*</ul>*/}
              {/*<div className="t5">*/}
                {/*<div className="c1">导航</div>*/}
                {/*<div className="c2">*/}
                  {/*<div className="xiicon"></div>*/}
                  {/*随礼*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}
          {/*</div>*/}
        </div>
        {
          // (this.state.seat == 0 || this.state.seat == (this.state.pages.length - 1) && this.state.edit == 2) ? '' : (
          //   <div className="bless-foot">
          //     <div className="bless-input-wrap">
          //       请留下你的祝福
          //     </div>
          //     <div className="payBtn" onClick={this.openPay.bind(this)}>
          //       <div className="xiicon"></div>
          //       <div>随礼</div>
          //     </div>
          //   </div>
          // )
        }
        {/*<div className="bless-foot">*/}
          {/*<div className="bless-input-wrap">*/}
            {/*请留下你的祝福*/}
          {/*</div>*/}
          {/*<div className="payBtn">*/}
            {/*<div className="xiicon"></div>*/}
            {/*<div>随礼</div>*/}
          {/*</div>*/}
        {/*</div>*/}


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
                <Link to={`/h5set/${this.state.templateId}`} className="set">
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

        {
          (this.state.red_part || this.state.send_money || this.state.qrcodePage) ? (
            <div className="redMask"></div>
          ) : ''
        }
        {
          this.state.red_part ? (
            <div className="redPart animated bounceIn">

              <div className="statisticForm">
                <div className="form-item">
                  <div className="name"><span className="red">*</span>随礼人:</div>
                  <input type="text" placeholder="请输入您的姓名"/>
                </div>
                <div className="form-item">
                  <div className="name"><span className="red">*</span>随礼金:</div>
                  <input type="text" placeholder="请输入礼金金额"/>
                </div>
                <div className="form-item">
                  <div className="name"><span className="red">*</span>手机号:</div>
                  <input type="text" placeholder="输入号码以便通知联系"/>
                </div>
                <div className="form-item">
                  <div className="name">关系:</div>
                  <input type="text" placeholder="请输入你们的关系"/>
                </div>
              </div>
              <div className="getMoney" onClick={this.pay.bind(this)}>塞钱进红包随礼</div>
              <div className="close" onClick={this.closeRed.bind(this)}></div>
            </div>
          ) : ''
        }

        {
          this.state.send_money ? (
            <div className="sendMoney">
              <div className={`unopen animated ${this.state.open ? 'bounceOut' : ''}`}>
                <div className="openBtn" onClick={this.openRed.bind(this)}></div>
                <div className="content-wrap">
                  <div className="p1">
                    <div className="s1">李雷</div>
                    <div className="s2">and</div>
                    <div className="s1">韩梅梅</div>
                  </div>
                  <div className="p2">给您的新婚回礼红包</div>
                </div>
              </div>
              <div className={`open animated  ${this.state.openEnd ? 'bounceIn' : ''}`}>
                <div className="packageWrap">
                  <p className="p1">您已收到</p>
                  <p className="p2">
                    <strong>20</strong>
                    <span>元</span>
                  </p>
                  <p className="p3">回礼红包</p>
                </div>
                <div className="content-wrap">
                  <div className="p1">
                    <div className="s1">李雷</div>
                    <div className="s2">and</div>
                    <div className="s1">韩梅梅</div>
                  </div>
                  <div className="p2">给您的新婚回礼红包</div>
                </div>
              </div>

            </div>
          ) : ''
        }

        {/*<div className="qrcodePage">*/}
          {/*<div className="logo"></div>*/}
          {/*<div className="logoText"></div>*/}
          {/*<div className="t">长按二维码制作电子请帖</div>*/}
          {/*<div className="qrcode"></div>*/}
          {/*<div className="gohome">我也要创建活动</div>*/}
        {/*</div>*/}
      </div>
    )
  }
}

export default H5;