/**
 * Created by Lzzzzzq on 2017/3/14.
 */
import React from "react";
import {render} from "react-dom";
import Model from "./Model";

const div = document.createElement("div");
document.body.appendChild(div);
const container = render(<Model />, div);

const Toast = function (opt) {
    opt = opt || {};
    if (opt.msg) {
        container.show(opt);
    }
};

export default Toast;

// Toast({
//   type: "success",
//   msg: "成功提示",
//   duration: 2000
// })
// Toast({
//   type: "fail",
//   msg: "错误提示",
//   duration: 2000
// })
// Toast({
//   type: "loading",
//   typeStatus: 1,
//   msg: "正在加载",
// })
// Toast({
//   type: "loading",
//   typeStatus: 2,
//   msg: "正在加载"
// })
// Toast({
//   type: "offline",
//   msg: "网络错误",
//   duration: 1500
// })
// Toast({
//   type: "msg",
//   msg: "文本提示",
//   duration: 2000,
//   callback: function() {
//
//   }
// })