/**
 * Created by Lzzzzzq on 2017/3/14.
 */
import React, {Component} from "react";
import classnames from "classnames";
import "./style/index.css";

class Model extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            msg: "",
            timer: 0,
            className: "",
        };
        this.show = this.show.bind(this);
    }

    show(opt) {
        let {type, typeStatus, msg, duration, callback} = opt;
        let time = null;
        const {timer} = this.state;
        clearTimeout(timer);
        duration = duration || 1500;

        let _self = this;
        if (type != "loading" || (type == "loading" && typeStatus == 2)) {
            time = setTimeout(() => {
                _self.setState({
                    className: "toastEnter",
                });
                setTimeout(() => {
                    let cls = this.state.className;
                    if (cls.match("toastEnter")) {
                        _self.setState({
                            className: "toastEnter toastOut"
                        });
                    }

                  callback?callback():''
                }, 500);
            }, type != "loading" ? duration : 1);
        }

        this.setState({
            type: type,
            msg: msg,
            timer: time,
            className: "",
        });
    }

    render() {
        let toastContent = "";
        if (this.state.type == "msg") {
            toastContent = this.state.msg;
        } else if (this.state.type == "loading") {
            toastContent =
                <div className="toastInnerBox">
                    <div className="toastLoadingImg">

                    </div>
                    <div className="toastInnerText">
                        { this.state.msg }
                    </div>
                </div>
            ;
        } else if (this.state.type == "success") {
            let successIcon = require('./Img/successToast.png');
            toastContent =
                <div className="toastInnerBox">
                    <div className="toastInnerImg">
                        <img src={successIcon} alt=""/>
                    </div>
                    <div className="toastInnerText">
                        { this.state.msg }
                    </div>
                </div>
            ;
        } else if (this.state.type == "fail") {
            let failIcon = require('./Img/failToast.png');
            toastContent =
                <div className="toastInnerBox">
                    <div className="toastInnerImg">
                        <img src={failIcon} alt=""/>
                    </div>
                    <div className="toastInnerText">
                        { this.state.msg }
                    </div>
                </div>
            ;
        } else if (this.state.type == "offline") {
            let offlineIcon = require('./Img/offlineToast.png');
            toastContent =
                <div className="toastInnerBox">
                    <div className="toastInnerImg">
                        <img src={offlineIcon} alt=""/>
                    </div>
                    <div className="toastInnerText">
                        { this.state.msg }
                    </div>
                </div>
            ;
        }
        return (
            <div
                className={
                    classnames({
                        toastInit: this.state.msg == "",
                        toastBox: true,
                        toastOut: this.state.className.match("toastOut"),
                    })
                }
            >
                <div
                    className={
                        classnames({
                            toastContent: true,
                            toastEnter: this.state.className.match("toastEnter"),
                        })
                    }
                    style={{
                        padding: this.state.msg != "" ? "10px" : "0"
                    }}
                >
                    { toastContent }
                </div>
            </div>
        );
    }
}

export default Model;
