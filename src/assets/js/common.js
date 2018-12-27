// function login (errBox, userAccount, pwd) {
//     $.ajax({
//         url: "/api/user/login",
//         type: "post",
//         data: {
//             userAccount: userAccount,
//             pwd: pwd
//         },
//         dataType: "json",
//         success: function (data) {
//             if (data.resCode == 1) {
//                 window.location.reload();
//             }
//             errBox.html(data.resMsg);

//         },
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }
// function quickLogin () {
//     var account = $("#userAccountIn").val(),
//         pwd = $("#userPwd").val();
//     console.log(123)
//     $.ajax({
//         url: "/api/user/login",
//         type: "post",
//         data: {
//             userAccount: account,
//             pwd: pwd
//         },
//         dataType: "json",
//         success: function (data) {
//             console.log(data)
//             if (data.resCode == 1) {
//                 window.location.reload();
//             }
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }
const loginFormatCheck = args => {
    let errTip = '';
    for (var key in args) {
        if (key == "account") {
            if (args[key] == "" || args[key] == null) {
                errTip = "邮箱不能为空"
                return errTip;
            }
            if (args[key].indexOf("@") == -1) {
                errTip = "邮箱格式错误";
                return errTip;
            }
        }
        if (key == "mailCode") {
            if (args[key] == "" || args[key] == null) {
                errTip = "邮箱验证码不能为空"
                return errTip;
            }
            if (!/^\d{6}?$/.test(args[key])) {
                errTip = "验证码格式错误"
                return errTip;
            }
        }
        if (key == "password") {
            if (args[key] == "" || args[key] == null) {
                errTip = "密码不能为空"
                return errTip;
            }
            if (!/^\w{6}(\w{2})?$/.test(args[key]) || args[key] < 6 || args[key].length > 20) {
                errTip = "密码为6-20位"
                return errTip;
            }
        }
        errTip = ""
        return true;
    }
}
// const categoriesInit = http.get(this.queryUrl)
//     .then(res => {
//         let data = res.data;
//         if (data.resCode === 1) {
//             this.tableData = data.categories
//         }
//     }).catch(err => {
//         console.log(err)
//     })
/*
* 自定confirm函数
* msg: 提示语
* yes：确认的回调函数
* no： 取消的回调函数，可以为空
* subPop:是否是子弹框
*/
// let showConfirmBox = function (msg, yes, no, subPop) {
//     var confirmHtml = '<div class="pop-wrap j-confirm-del-box" id="G_confirmBox">' +
//         '<div class="pop-overlay"></div>' +
//         '<div class="pop-dialog">' +
//         '<i class="i-icon pop-close j-close-dialog"></i>' +
//         '<h2 class="dialog-tt">' + msg + '</h2>' +
//         '<div class="btn-wrap">' +
//         '<div class="btn cancel j-close-dialog">取消</div>' +
//         '<div class="btn confirm j-confirm-del-btn">确定</div>' +
//         '</div>' +
//         '</div>' +
//         '</div>';
//     $("body").append(confirmHtml).addClass("pop-bd");
//     if (subPop) $("#G_confirmBox").addClass("sub-pop");
//     $("#G_confirmBox").addClass("show-pop-wrap");
//     //取消
//     $("#G_confirmBox .j-close-dialog").click(function () {
//         if (no && typeof (no) == "function") {
//             no();
//         }
//         $("#G_confirmBox").remove();
//         if (!subPop) $("body").removeClass("pop-bd");
//     });

//     //确定
//     $("#G_confirmBox .j-confirm-del-btn").click(function () {
//         if (yes && typeof (yes) == "function") {
//             yes();
//         }
//         $("#G_confirmBox").remove();
//         if (!subPop) $("body").removeClass("pop-bd");
//     });
// }

export { loginFormatCheck }


