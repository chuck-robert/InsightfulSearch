var btnL = document.getElementById("login"),
    btnR = document.getElementById("register"),
    tName = document.getElementById("username"),
    tPass = document.getElementById("password"),
    trePass = document.getElementById("repassword"),
    tNick = document.getElementById("usernick"),
    tMail = document.getElementById("mail"),
    box = document.getElementById("loginBox"),
    bL = document.getElementById("loginF"),
    bR = document.getElementById("registerF"),
    msg = document.getElementById("msg"),
    vccode = document.getElementById("vccode"),
    codeMask = document.getElementsByClassName("codeMask")[0],
    sellMsg = document.getElementById("sellMsg"),
    body = document.getElementsByTagName("body")[0];

//登录按钮选中
btnL.onclick = function () {
    btnL.className = "btnACT"
    btnR.className = ""
    trePass.style.display = "none"
    msg.innerText = ""
    bR.style.display = "none"
    btnR.style.display = "block"
    tNick.style.display = "none"
    bL.style.display = "block"
    tMail.style.display = "none"
}
//注册按钮选中
btnR.onclick = function () {
    btnR.className = "btnACT"
    btnL.className = ""
    trePass.style.display = "block"
    tName.value = ""
    tPass.value = ""
    trePass.value = ""
    msg.innerHTML = "点我查看注册要求"
    tNick.style.display = "block"
    bL.style.display = "none"
    bR.style.display = "block"
    btnL.style.display = "block"
    tMail.style.display = "block"
}
document.body.onload = function start() {
    btnL.className = "btnACT";
}
function showMsg() {
    msg.innerHTML = "用户名为：4到16位的字母、数字、下划线、减号</br>密码为：至少8个字符，至少1个字母，1个数字和1个特殊字符"
}
bL.onclick = function () {
    if (ContentDetection(tName.value) == true) {
        tName.style.border = "1px solid #ff000054"
        return false;
    } else {
        tName.style.border = ""
    }
    if (ContentDetection(tPass.value) == true) {
        tPass.style.border = "1px solid #ff000054"
        return false;
    } else {
        tPass.style.border = ""
    }


    var name = document.getElementById('username').value;
    var pwd = document.getElementById('password').value;
    var type = 'login';
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.onreadystatechange = function (res) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var back = xhr.responseText
            if (back == '100') {
                msg.innerText = "阁下的密码或账户好像错了呢"
            }
            if (back == '102') {
                msg.innerText = "欢迎阁下再次光临"
                localStorage.setItem("loginFlag","true")
                var from = getQueryString("from")
                if (from == null) {
                    body.className = "setting"
                    location.reload();
                } else {
                    location.href = encodeURI(from)
                }
            }
        }
    }
    xhr.open('POST', '/../account/data.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send('login_username=' + name + '&login_password=' + pwd + '&type=' + type);
}
bR.onclick = function () {
    var nick = tNick.value;
    var mail = tMail.value;
    var name = tName.value;
    var p1 = trePass.value;
    var pass = tPass.value;
    var id = parseInt(Math.random() * 99999999 + 0);
    var day = new Date();
    var dayYear = day.getFullYear();
    var dayMonth = day.getMonth() + 1;
    var dayDate = day.getDate();
    var date = dayYear + '-' + dayMonth + '-' + dayDate;
    reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?_&])[A-Za-z\d$@$!%*#?_&]{8,}$/;
    mailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    nameReg = /^[a-zA-Z0-9_-]{4,16}$/;
    if (ContentDetection(nick) == true) {
        tNick.style.border = "1px solid #ff000054";
        return false;
    } else {
        tNick.style.border = "";
    }
    if (mailReg.test(mail) == false) {
        tMail.style.border = "1px solid #ff000054";
        return false;
    } else {
        tMail.style.border = "";
    }
    if (nameReg.test(name) == false) {
        tName.style.border = "1px solid #ff000054";
        return false;
    } else {
        tName.style.border = "";
    }
    if (p1 !== pass) {
        trePass.style.border = "1px solid rgb(60 200 255 / 33%)";
        tPass.style.border = "1px solid rgb(60 200 255 / 33%)";
        return false;
    } else {
        trePass.style.border = "";
        tPass.style.border = "";
    }
    if (reg.test(pass) == false) {
        tPass.style.border = "1px solid #ff000054";
        showMsg()
        return false;
    } else {
        tPass.style.border = "";
    }
    if (vccode.getAttribute('mode') == "true") {
        if (window.XMLHttpRequest) {
            userAccountRegister = new XMLHttpRequest();
        } else {
            userAccountRegister = new ActiveXObject('Microsoft.XMLHTTP');
        }
        userAccountRegister.onreadystatechange = function (res) {
            if (userAccountRegister.readyState == 4 && userAccountRegister.status == 200) {
                var back = userAccountRegister.responseText
                if (back == '101') {
                    msg.innerText = "恭喜旅行者注册成功,初次见面我是白羽，你可以叫我小羽，请多多指教呀"
                    localStorage.setItem("loginFlag","true")
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                } else {
                    msg.innerText = "很抱歉呢，您好像注册失败了呢"
                }
                if (back == '103') {
                    tMail.style.border = "1px solid #ff000054";
                    tName.style.border = "1px solid #ff000054";
                    msg.innerText = "阁下可以考虑换一个[账户]或者[邮箱]，如果不行请刷新重试呢"
                }
            }
        }
        userAccountRegister.open('POST', 'data.php', true);
        userAccountRegister.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        userAccountRegister.send('mode=userAccountRegister&login_usernick=' + nick + '&login_mail=' + mail + '&login_username=' + name + '&login_password=' + pass + '&login_date=' + date + '&login_id=' + id);
    } else {
        codeMask.style.display = "block";
        sellCode()
    }
}
function checkCode() {
    var c = localStorage.getItem("code");
    if (c == vccode.value) {
        codeMask.style.display = "none"
        vccode.setAttribute("mode", "true")
    }
}
function sellCode() {
    var code = parseInt(Math.random() * 1000000 + 0);
    localStorage.setItem("code", code);
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.onreadystatechange = function (res) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var back = xhr.responseText
            if (back == 'true') {
                sellMsg.innerText = "验证码已发送至邮箱，请注意查收"
            } else {
                sellMsg.innerText = "验证码发送失败，请重试"
            }
        }
    }
    xhr.open('POST', '/../../api/mail/sellCode.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send('mailTo=' + tMail.value + '&title=验证您的电子邮件&bodyHtml=' + code + '&bodyText=您的验证码如下' + code);
}
// if (getQueryString("from") == "https:\/\/stear.cn") {
//     alert("注意，若您是起始页用户，并且您是初次登陆，请务必执行以下操作避免登陆后您的数据被覆盖，返回首页-右上角-更多功能-备份还原-备份")
// }
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) {
            return arr[1];
        }
    }
    return "";
}