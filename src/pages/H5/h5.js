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
      activeId: null, //活动id
      templateId: null, //模板id
      musicId: null, //音乐id
      edit: 0, //是否是编辑状态1编辑2预览3分享
      share: false, //是否是分享出去的h5页面
      startPoint: 0, //开始y轴坐标
      endPoint: 0, //结束y轴坐标
      scroll: false, //是否可以滚动
      seat: 0, //第几页
      pages: [], //总数据
      i: null, //第i页
      j: null, //第i页的第j个元素
      imgId: null, //图片id
      code: '', //公众号code用来跟后台交换支付参数
      red_part: false, //弹出随礼红包
      send_money: false, //弹出回礼红包
      open: false, //回礼红包打开
      openEnd: false, //回礼红包打开结束
      qrcodePage: false, //打开二维码页面

      firstInfo: {
        address: "",
        category_id: "",
        first_name: "",
        second_name: "",
        start_time: "",
        third_name: "",
        title: "",
      },//首页的信息
      sendT1: '', //送祝福内容
      sendT2: '', //送祝福名字
    }
  }

  componentDidMount() {
    wxinit();
    let code = util.queryString('code');
    if(code) {
      this.setState({
        code
      })
    } else {
      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
        + 'wxc4d4986ff1b104df'
        + "&redirect_uri=" + encodeURIComponent(window.location.href)
        + "&response_type=code"
        + "&scope=snsapi_userinfo"
        + "&state=weiapppay#wechat_redirect";
    }

    let id = this.props.match.params.id;
    let edit = this.props.match.params.edit;
    if(edit) {
      this.setState({
        edit: edit
      })
    }
    if(id) {
      this.setState({
        templateId: id
      }, () => {
        axios.post('/api/share/get-data-by-template-id',{
          template_id: id
        }).then(res => {
          if(res.data.status === 'success') {
            this.setState({
              activeId: res.data.data.activity_id,
              musicId: res.data.data.music_id,
              pages: res.data.data.page,
            }, () => {
              axios.post('/api/activity/get-detail-by-activity-id',{
                activity_id: res.data.data.activity_id
              }).then(re => {
                if(re.data.status === 'success') {
                  this.setState({
                    firstInfo: re.data.data
                  }, () => {
                    console.log(this.state.firstInfo)
                  })
                  wxinit(() => {
                    wx.onMenuShareTimeline({
                      title: `${re.data.data.first_name}与${re.data.data.second_name}邀请您来参加活动 "${re.data.data.title}"`,
                      link: `http://wap.suiliji.com/#/H5/${this.state.templateId}/3`,
                      imgUrl: 'http://p2bkdmc4g.bkt.clouddn.com/FrASVMEBn4_QsAsiihiPGf_HzubB',
                      success: function () {
                        // 用户确认分享后执行的回调函数
                      },
                      cancel: function () {
                        console.log('cancel')
                        // 用户取消分享后执行的回调函数
                      }
                    })
                    wx.onMenuShareAppMessage({
                      title: re.data.data.title,
                      desc: `${re.data.data.first_name}与${re.data.data.second_name}邀请您来参加活动 "${re.data.data.title}"`,
                      link: `http://wap.suiliji.com/#/H5/${this.state.templateId}/3`,
                      imgUrl: 'http://p2bkdmc4g.bkt.clouddn.com/FrASVMEBn4_QsAsiihiPGf_HzubB',
                      success: function(res) {},
                      cancel: function(res) {},
                      fail: function(res) {}
                    });
                  });
                }
              })
            });
          }
        })
      })
    }

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
  }

  //滑动手势开始
  moveStart(e) {
    this.setState({
      startPoint: e.touches[0].pageY,
      endPoint: e.touches[0].pageY,
      scroll: false
    });
  }

  //滑动中
  moveIng(e) {
    this.setState({
      endPoint: e.touches[0].pageY
    });
  }

  //滑动手势结束
  moveEnd() {
    if(Math.abs(this.state.startPoint - this.state.endPoint) > 100) {

      if(this.state.startPoint - this.state.endPoint > 0) {
        //向下滑
        if(this.state.seat <= this.state.pages.length) {
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
        } else if((this.state.seat > this.state.pages.length) && (this.state.seat <= (this.state.pages.length + 1))) {
          this.setState({
            qrcodePage: true
          })
        }

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

  //七牛云上传图片
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

  //编辑h5图片
  editCover(i, j, id) {
    this.setState({
      i,
      j,
      imgId: id
    },() => {
      this.refs.file.click();
    })
  }

  //微信支付
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

  //打开支付红包的操作
  openPay() {
    this.setState({
      red_part: true
    })
  }

  //关闭红包的操作
  closeRed() {
    this.setState({
      red_part: false
    })
  }

  //打开红包的操作
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

  //预览
  preview() {
    this.setState({
      edit: 2
    })
  }

  //输入操作
  inputHandle(state, e) {
    let value = e.target.value;
    this.setState({
      [state]: value
    })
  }

  //送祝福
  sendMsg() {
    axios.post('/api/msg/send-msg',{
      activity_id: this.state.activeId,
      msg: this.state.sendT1,
      name: this.state.sendT2
    }).then(res => {
      if(res.data.status === 'success') {

      }
    })
  }

  //显示留言框
  showBless() {

  }

  //改信息
  changeInfo() {

  }

  backEdit() {
    this.setState({
      edit: 1
    })
  }

  render() {
    return(
      <div className="H5" id="h5">
        {/*返回*/}
        {
          this.state.edit == 2 ? (
            <div className="backIcon" onClick={this.backEdit.bind(this)}></div>
          ) : null
        }

        {/*音乐*/}
        {/*<audio src="http://p15nw7thi.bkt.clouddn.com/music/sys_music/911 - I Do.mp3" autoplay="autoplay"></audio>*/}

        {/*图片上传input*/}
        <input type="file" ref="file" accept="image/*" onChange={this.qiniuUpload.bind(this)} style={{display: 'none'}}/>

        <div className={`pageWrap ${(this.state.red_part || this.state.send_money || this.state.qrcodePage) ? 'blur':''}`} onTouchStart={this.moveStart.bind(this)} onTouchMove={this.moveIng.bind(this)} onTouchEnd={this.moveEnd.bind(this)}>
          {/*第一页*/}
          <div className={`animated page page0 ${Number(this.state.seat) == 0 ? 'active fadeIn' : 'fadeOut'}`}>
            <div>
              <div className="ele_wrap ele_0_0">
                <div className="ele_wrap_item animated ele_wrap_0_0">
                  <img className="cover" src={require('../invitationCardList/images/cover.png')}/>
                </div>
              </div>
            </div>

            <div>
              <div className="ele_wrap ele_0_1">
                <div className="ele_wrap_item animated ele_wrap_0_1">
                  <img className="cover" src={require('./images/border.png')}/>
                </div>
              </div>
              {
                (!this.state.share && this.state.edit == 1) ? (
                  <div className='editImg'>
                    <div className="co"></div>
                    <div className="bg"></div>
                  </div>
                ) : null
              }
            </div>

            <div>
              <div className="ele_wrap ele_0_2">
                <div className="ele_wrap_item animated ele_wrap_0_2">
                  <div className="r1">{`${this.state.firstInfo.first_name} and ${this.state.firstInfo.second_name}`}</div>
                  <div className="r2">{this.state.firstInfo.start_time}</div>
                  <div className="r2">于{this.state.firstInfo.address}举行婚礼</div>
                  <div className="r2">诚邀亲朋好友参加</div>
                </div>
                {
                  (!this.state.share && this.state.edit == 1) ? (
                    <div className='editImg' onClick={this.changeInfo.bind(this)}>
                      <div className="co"></div>
                      <div className="bg"></div>
                    </div>
                  ) : null
                }
              </div>
            </div>
          </div>

          {/*中间h5页面*/}
          {
            this.state.pages.map((item, i) => {
              return (
                <div key={i} className={`animated page page${i+1} ${Number(this.state.seat) === (i+1) ? 'active fadeIn' : 'fadeOut'}`}>
                  {
                    item.elements.map((itm, j) => {
                      return (
                        <div key={j}>
                          <div className={`ele_wrap ele_${i+1}_${j}`} key={j}>
                            <div className={`ele_wrap_item animated ele_wrap_${i+1}_${j}`}>
                              <img className="cover" src={itm.img} ref={i+'_'+j}/>
                            </div>
                          </div>
                          {
                            (itm.is_edit == '2' && !this.state.share && this.state.edit == 1) ? (
                              <div className='editImg' onClick={this.editCover.bind(this, i, j, itm.id)}>
                                <div className="co"></div>
                                <div className="bg"></div>
                              </div>
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

          {/*尾页*/}
          <div className={`animated page page7 ${(Number(this.state.seat) == 7 || Number(this.state.seat) == 8) ? 'active fadeIn' : 'fadeOut'}`}>
            <div className="contentWrap">
              <h1 className="t1">WELCOME</h1>
              <p className="t2">2018年01月01日</p>
              <p className="t3">上海陆家嘴大酒店</p>
              <div ref="sharemap" className="map"></div>
              <h4 className="t4">是否赴宴</h4>
              <ul className="statusWrap">
                <li className="statusItem active">赴宴</li>
                <li className="statusItem">待定</li>
                <li className="statusItem">有事</li>
              </ul>
              <div className="t5">
                <div className="c1">导航</div>
                <div className="c2">
                  <div className="xiicon"></div>
                  随礼
                </div>
              </div>
            </div>
          </div>

        </div>

        {/*宾客祝福*/}
        {
          (this.state.seat == 0 || this.state.seat >= (this.state.pages.length+1) || this.state.edit == 1 || this.state.edit == 2) ? null : (
            <div className="bless-foot" onClick={this.showBless.bind(this)}>
              <div className="bless-input-wrap">
                请留下你的祝福
              </div>
              <div className="payBtn" onClick={this.openPay.bind(this)}>
                <div className="xiicon"></div>
                <div>随礼</div>
              </div>
            </div>
          )
        }

        {/*填写祝福内容*/}
        {/*<div className="inputContent">*/}
          {/*<div className="c c1">*/}
            {/*<div className="name">祝福</div>*/}
            {/*<textarea className="input tarea" value={this.state.sendT1} onChange={this.inputHandle.bind(this, 'sendT1')} placeholder=""></textarea>*/}
          {/*</div>*/}
          {/*<div className="c c2">*/}
            {/*<div className="name">姓名</div>*/}
            {/*<input className="input" value={this.state.sendT2} onChange={this.inputHandle.bind(this, 'sendT2')} type="text" placeholder="请输入您的姓名"/>*/}
            {/*{*/}
              {/*(this.state.sendT1 != '' && this.state.sendT2 != '') ? (*/}
                {/*<div className="send able" onClick={this.sendMsg.bind(this)}>发送</div>*/}
              {/*) : (*/}
                {/*<div className="send disable">发送</div>*/}
              {/*)*/}
            {/*}*/}
          {/*</div>*/}
        {/*</div>*/}

        {/*设置菜单*/}
        {
          this.state.edit == 1 ? (
            <div className="footBar">
              <div className="sets">
                {/*<div className="set">*/}
                {/*<div className="icon" style={{backgroundImage: "url("+require('./images/set.png')+")"}}></div>*/}
                {/*<div className="des">排序/删除</div>*/}
                {/*</div>*/}
                <Link to={`/music/${this.state.templateId}/${this.state.activeId}/${this.state.musicId}`} className="set">
                  <div className="icon" style={{backgroundImage: "url("+require('./images/music.png')+")"}}></div>
                  <div className="des">音乐</div>
                </Link>
                <Link to={`/h5set/${this.state.templateId}/${this.state.activeId}`} className="set">
                  <div className="icon" style={{backgroundImage: "url("+require('./images/set.png')+")"}}></div>
                  <div className="des">设置</div>
                </Link>
                <div onClick={this.preview.bind(this)} className="set">
                  <div className="icon" style={{backgroundImage: "url("+require('./images/preview.png')+")"}}></div>
                  <div className="des">预览</div>
                </div>
              </div>
              <div className="send">
                <div className="icon"></div>
                发送
              </div>
            </div>
          ) : null
        }

        {/*透明背景图*/}
        {
          (this.state.red_part || this.state.send_money || this.state.qrcodePage) ? (
            <div className="redMask"></div>
          ) : null
        }

        {/*红包随礼*/}
        {
          this.state.red_part ? (
            <div className={`redPart animated bounceIn`}>

              <div className="statisticForm">
                <div className="form-item">
                  <div className="name"><span className="red"></span>随礼人:</div>
                  <input type="text" placeholder="请输入您的姓名"/>
                </div>
                <div className="form-item">
                  <div className="name"><span className="red"></span>随礼金:</div>
                  <input type="text" placeholder="请输入礼金金额"/>
                </div>
                <div className="form-item">
                  <div className="name"><span className="red"></span>手机号:</div>
                  <input type="text" placeholder="输入号码以便通知联系"/>
                </div>
                <div className="form-item">
                  <div className="name">关系:</div>
                  <select>
                    <option value="0">其他</option>
                    <option value="1">朋友</option>
                    <option value="2">家人</option>
                    <option value="3">亲戚</option>
                    <option value="4">兄弟</option>
                    <option value="5">姐妹</option>
                    <option value="6">师生</option>
                  </select>
                  {/*<input type="text" placeholder="请输入你们的关系"/>*/}
                </div>
              </div>
              <div className="getMoney" onClick={this.pay.bind(this)}>塞钱进红包随礼</div>
              <div className="close" onClick={this.closeRed.bind(this)}></div>
            </div>
          ) : null
        }

        {/*回礼红包*/}
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
          ) : null
        }

        {
          this.state.qrcodePage ? (
            <div className={`qrcodePage animated ${this.state.qrcodePage?'fadeIn':'fadeOut'}`}>
              <div className="logo"></div>
              <div className="logoText"></div>
              <div className="t">长按二维码制作电子请帖</div>
              <div className="qrcode">
                <img src={require('./images/qrcode.png')}/>
              </div>
              <div className="gohome">我也要创建活动</div>
            </div>
          ) : null
        }
      </div>
    )
  }
}

export default H5;