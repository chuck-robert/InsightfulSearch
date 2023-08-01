<?php include "./../admin/config.php";?>
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="utf-8">
    <title>账号管理</title>
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <meta name="description" content="星柠起始页，由川上 星林制作，坚持以效率与美观为本责，给用户以良好的体验。">
    <link rel="shortcut icon" href="./../data/image/icon/logo.v3.ico" type="favicon.ico">
    <link rel="stylesheet" href="./../data/css/account.css">
    <meta name="referrer" content="no-referrer">
    <link rel="apple-touch-icon" href="../data/image/startPage/apple-touch-icon.png">
    <link rel="stylesheet" href="./../data/css/fonticon.css">
</head>

<body class="creative">
    <?php 
if ($_REQUEST['type'] !== 'resetPassword' && $_REQUEST['type'] !== 'resetPasswordGetId') {
    if ($_COOKIE['XnUserName']) {

        $cookie = $_COOKIE['XnUserName'];
        $sql = "select * from `xn-user` where `token`='{$cookie}'";
        $result = mysqli_query($server, $sql);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $nick = $row['nick'];
                $username = $row['username'];
                $id = $row['id'];
                $mail = $row['mail'];
                $date = $row['date'];
                $sex = $row['sex'];
                $birth1 = $row['birth1'];
                $birth2 = $row['birth2'];
                $birth3 = $row['birth3'];
            }
        }
        ?>
    <header>
        <div class="myAcc">
            <img src="./../data/image/icon/128.png">
            <p class="nick"><?php echo $nick;?></p>
            <p class="username"><?php echo $username;?></p>
        </div>
        <div class="toolList">
            <ul>
                <li class="active"><i class="fa fa-home" aria-hidden="true"></i><span>首页</span></li>
                <li><i class="fa fa-fa fa-address-card" aria-hidden="true"></i><span>资料编辑</span></li>
                <li><i class="fa fa-shield" aria-hidden="true"></i><span>账号安全</span></li>
            </ul>
        </div>
        <div class="bTool">
            <i class="fa fa-cog" aria-hidden="true"></i>
            <i class="fa fa-sign-out" aria-hidden="true" id="loginOut"></i>
        </div>
    </header>
    <div class="body <?php echo $theme?>" newPageData>
        <div data-0101023>
            <img src="<?php echo getLine("./../api/text/pageDataText-b.text",3);?>" class="mainPhoto">
            <span data-12-31335-shdf>
                <p class="welcome">欢迎回来，尊敬的 <?php echo $nick;?> ！</p>
            </span>
            <p class="new"><?php echo getLine("./../api/text/pageDataText-b.text",1);?></p>
        </div>
        <div data-0101023 style="display: none;">
            <h1>个人资料编辑</h1>
            <div class="edit">
                <dl class="form-group">
                    <dt><i class="fa fa-address-card" aria-hidden="true"></i>用户昵称</dt>
                    <dd>
                        <input autocomplete="off" type="text" placeholder="用户名" class="full" id="usernick" value="<?php echo $nick;?>">
                        <p class="note">您的姓名可能会出现在星柠软件内，在那里您或被提及。您可以随时将其修改。</p>
                    </dd>
                </dl>
                <dl class="form-group">
                    <dt><i class="fa fa-envelope" aria-hidden="true"></i>邮箱地址</dt>
                    <dd>
                        <input autocomplete="off" type="text" placeholder="邮箱" class="full" id="usermail" value="<?php echo $mail;?>">
                        <p class="note">您的邮箱会在注册登录以及找回密码时被使用</p>
                    </dd>
                </dl>
                <dl class="form-group">
                    <dt><i class="fa fa-user" aria-hidden="true"></i>性别</dt>
                    <dd>
                        <input autocomplete="off" type="text" placeholder="性别" class="full" id="usersex" value="<?php echo $sex;?>">
                        <p class="note">您的性别决定了您的喜好，我们会根据性别为您服务</p>
                    </dd>
                </dl>
                <dl class="form-group">
                    <dt><i class="fa fa-birthday-cake" aria-hidden="true"></i>生日</dt>
                    <dd>
                        <input autocomplete="off" type="text" placeholder="生日的年份" class="small" id="b1" value="<?php echo $birth1;?>">年
                        <input autocomplete="off" type="text" placeholder="生日的月份" class="small" id="b2" value="<?php echo $birth2;?>">月
                        <input autocomplete="off" type="text" placeholder="生日的天数" class="small" id="b3" value="<?php echo $birth3;?>">日
                        <p class="note">在您的生日这一天，我们会给您带来不一样的礼物</p>
                    </dd>
                </dl>
                <dl class="form-group">
                    <dt><i class="fa fa-id-card-o" aria-hidden="true"></i>用户名</dt>
                    <dd>
                        <input autocomplete="off" type="text" placeholder="用户名" class="full dishover" value="<?php echo $username;?>">
                        <p class="note">您的用户名为登录本站软件的必备标识</p>
                    </dd>
                </dl>
                <dl class="form-group">
                    <dt><i class="fa fa-id-card-o" aria-hidden="true"></i>ID</dt>
                    <dd>
                        <input autocomplete="off" type="text" placeholder="ID" class="full dishover" value="<?php echo $id;?>">
                        <p class="note">您的ID为您的次标识号，在账号丢失时可发送ID或用户名以寻求帮助</p>
                    </dd>
                </dl>
                <dl class="form-group">
                    <dt><i class="fa fa-calendar" aria-hidden="true"></i>注册日期</dt>
                    <dd>
                        <input autocomplete="off" type="text" placeholder="注册日期" class="full dishover" value="<?php echo $date;?>">
                        <p class="note">您的注册日期代表您登录本平台的时间</p>
                    </dd>
                </dl>
                <input type="button" value="保存编辑的内容" id="upUserInformation">
            </div>
        </div>
        <div data-0101023 style="display: none;">
            <h1>安全信息设置</h1>
            <div class="edit">
                <dl class="form-group">
                    <dt><i class="fa fa-history" aria-hidden="true"></i>旧密码</dt>
                    <dd>
                        <input autocomplete="off" type="password" placeholder="旧密码" class="full" id="oldPassword">
                        <p class="note">请输入旧密码以更新新密码</p>
                    </dd>
                </dl>
                <dl class="form-group">
                    <dt><i class="fa fa-key" aria-hidden="true"></i>新密码</dt>
                    <dd>
                        <input autocomplete="off" type="password" placeholder="新密码" class="full" id="newPassword">
                        <p class="note">输入您设置的新密码，密码为：以字母开头，长度在6~18之间，只能包含字母、数字和下划线</p>
                    </dd>
                </dl>
                <dl class="form-group">
                    <dt><i class="fa fa-check" aria-hidden="true"></i>确认密码</dt>
                    <dd>
                        <input autocomplete="off" type="password" placeholder="确认密码" class="full" id="repeatPassword">
                        <p class="note">重复输入您设置的新密码</p>
                    </dd>
                </dl>
                <input type="button" value="更新密码" id="upUserPassword">
                <input type="button" value="忘记密码" id="forgetPassword">
            </div>
        </div>
    </div>
    <script src="./../data/js/jq.js"></script>
    <script src="./../data/js/xn.js"></script>
    <script src="./../data/js/account-manager.js"></script>
    <?php 
    
    } else {
        ?>
    <div class="loginBox">
        <p class="modelT">账号</p>
        <div class="textBox">
            <input type="text" style="display: none;" name="login_usernick" id="usernick" placeholder="请输入阁下的昵称（可中文）"
                autocomplete="off">
            <input type="text" style="display: none;" name="login_mail" id="mail" placeholder="请输入阁下的邮箱"
                autocomplete="off">
            <input type="text" name="login_username" id="username" placeholder="请输入阁下的名称" autocomplete="off">
            <input type="password" name="login_password" id="password" placeholder="请输入阁下的密码" autocomplete="off">
            <input type="password" style="display: none;" name="" id="repassword" placeholder="重复输入您的密码"
                autocomplete="off">
            <button id="loginF">登录</button>
            <button id="registerF" style="display: none;">注册</button>
        </div>
        <div class="modelB">
            <button id="login">登录</button>
            <button id="register">注册</button>
        </div>
        <p id="msg" onclick="showMsg()"></p>
        <p class="ys">注册或者登录代表阁下已同意 <a href="https://www.stear.cn/index.php/privacy-policy/">隐私政策</a>&nbsp;&nbsp;
        <a href="?type=resetPassword" rel="noopener noreferrer">忘记密码</a></p>
    </div>
    <div class="codeMask" style="display: none;">
        <div class="codeBox">
            <p style="font-size: 25px;margin: 30px;">验证码</p>
            <div style="display: flex;flex-direction: column;">
                <input autocomplete="off" type="text" name="code" id="vccode" mode="false" style="text-align: center;"
                    placeholder="请输入验证码">
                <div class="inputBox" style="display: flex;">
                    <input type="button" value="重新发送" id="resell">
                    <input type="button" value="开始验证" onclick="checkCode()">
                    <input type="button" value="取消验证"
                        onclick="document.getElementsByClassName('codeMask')[0].style.display='none'">
                </div>
                <p style="transform: scale(0.85);opacity: .7;margin-top: 20px;">如果无法接受验证码，请检查阁下的垃圾箱</p>
            </div>
        </div>
    </div>
    <script src="./../data/js/jq.js"></script>
    <script src="./../data/js/xn.js"></script>
    <script src="./../data/js/account.js"></script>
    <?php 
    }
} else {
    if ($_REQUEST["type"] == 'resetPassword') {
        ?>
    <div class="loginBox">
        <p class="modelT">重置密码</p>
        <div class="textBox">
            <input type="text" name="login_username" id="username" placeholder="账户名称" autocomplete="off">
            <input type="text" name="login_mail" id="mail" placeholder="邮箱地址" autocomplete="off">
            <button id="loginF" onclick="r()">重置</button>
        </div>
        <p id="msg"></p>
    </div>
    <div class="codeMask" style="display: none;">
        <div class="codeBox">
            <p style="font-size: 25px;margin: 30px;">验证码</p>
            <div style="display: flex;flex-direction: column;">
                <input autocomplete="off" type="text" name="code" id="vccode" mode="false" style="text-align: center;"
                    placeholder="请输入验证码">
                <div class="inputBox" style="display: flex;">
                    <input type="button" value="重新发送" id="resell">
                    <input type="button" value="开始验证" onclick="checkCode()">
                    <input type="button" value="取消验证"
                        onclick="document.getElementsByClassName('codeMask')[0].style.display='none'">
                </div>
                <p style="transform: scale(0.85);opacity: .7;margin-top: 20px;">如果无法接受验证码，请检查阁下的垃圾箱</p>
            </div>
        </div>
    </div>
    <script src="./../data/js/jq.js"></script>
    <script src="./../data/js/xn.js"></script>
    <script>
    username = $("#username");
    mail = $("#mail");
    vccode = $("#vccode");
    codeMask = $(".codeMask")[0];
    sellMsg = $("#msg");

    function r() {
        mailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (username.val() == "" || !mailReg.test(mail.val())) {
            username.css("border", "1px solid #ff9b9b");
            mail.css("border", "1px solid #ff9b9b");
            return;
        } else {
            username.css("border", "");
            mail.css("border", "");
        }
        if (vccode.attr("mode") == "false") {
            codeMask.style.display = "block";
            var code = parseInt(Math.random() * 999999 + 0);
            localStorage.setItem("code", code);
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
            xhr.onreadystatechange = function(res) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var back = xhr.responseText
                    if (back == 'true') {
                        sellMsg.innerText = "验证码已发送至邮箱，请注意查收"
                    } else {
                        sellMsg.innerText = "验证码发送失败，请重试"
                    }
                }
            }
            xhr.open('POST', 'https://stear.cn/api/mail/sellCode.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send('mailTo=' + $("#mail").val() + '&title=验证您的电子邮件&bodyHtml=' + code + '&bodyText=您的验证码如下' + code);
        } else {
            vccode.css("border", "");
            if (window.XMLHttpRequest) {
                sellResetEmail = new XMLHttpRequest();
            } else {
                sellResetEmail = new ActiveXObject('Microsoft.XMLHTTP');
            }
            sellResetEmail.onreadystatechange = function(res) {
                if (sellResetEmail.readyState == 4 && sellResetEmail.status == 200) {
                    var back = JSON.parse(sellResetEmail.responseText);
                    // if (back.code == '101') {
                    localStorage.setItem("token", back.token);
                    url = encodeURIComponent(location.href + "GetId&token=" + back.token + "&username=" + $(
                        "#username").val() + "&mail=" + $("#mail").val());
                    if (window.XMLHttpRequest) {
                        sellTokenEmail = new XMLHttpRequest();
                    } else {
                        sellTokenEmail = new ActiveXObject('Microsoft.XMLHTTP');
                    }
                    sellTokenEmail.onreadystatechange = function(res) {
                        if (sellTokenEmail.readyState == 4 && sellTokenEmail.status == 200) {
                            var back = sellTokenEmail.responseText;
                            if (back == 'true') {
                                localStorage.removeItem("token");
                                sellMsg.innerText = "请查看邮箱内的链接，重置密码"
                            }
                        }
                    }
                    sellTokenEmail.open('POST', 'https://stear.cn/api/mail/sellMail.php', true);
                    sellTokenEmail.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    sellTokenEmail.send('mailTo=' + $("#mail").val() + '&title=重置您的密码&bodyHtml=' + url +
                        '&bodyText=您的链接如下' + url);
                    // }
                }
            }
            sellResetEmail.open('POST', 'data.php', true);
            sellResetEmail.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            sellResetEmail.send('mode=resetPasswordByMail&mail=' + $("#mail").val() + '&username=' + $("#username")
            .val());
        }
    }

    function checkCode() {
        var c = localStorage.getItem("code");
        if (c == vccode.val()) {
            codeMask.style.display = "none";
            vccode.attr("mode", "true");
            localStorage.removeItem("code");
            sellMsg.innerText = "请再次点击[重置]按钮"
        }
    }
    </script>
    <?php 
    }
    if ($_REQUEST['type'] == 'resetPasswordGetId') {

        // include "./../../admin/config.php";

$cookie = $_COOKIE['XnUserName'];

$token = $_GET['token'];
$username = $_GET['username'];
$mail = $_GET['mail'];


$check = "SELECT * FROM `xn-user` WHERE `username`='$username' and `mail`='$mail' and `token`='$token'";
    $login = mysqli_query($server, $check); 
    $result=$server->query($check);
    if($result->num_rows>0) { 
        while ($row=$result->fetch_assoc()) {
            setcookie("XnUserName", $row['token'], time()+60*60*24*30, "/");
        }
    }
    $res = mysqli_num_rows($login);
    if ($res) {?>

    <div class="loginBox">
        <p class="modelT">重置密码</p>
        <div class="textBox">
            <input type="password" name="login_username" id="password" placeholder="输入密码" autocomplete="off">
            <input type="password" name="login_mail" id="repass" placeholder="重复密码" autocomplete="off">
            <button id="loginF" onclick="r()">重置</button>
        </div>
    </div>
    <script src="./../data/js/jq.js"></script>
    <script src="./../data/js/xn.js"></script>
    <script>
    function r() {
        reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?_&])[A-Za-z\d$@$!%*#?_&]{8,}$/;
        var password = $("#password").val();
        var repass = $("#repass").val();
        if (reg.test(password) && password == repass) {
            $("#password").css("border", "");
            $("#repass").css("border", "");
            if (window.XMLHttpRequest) {
                passwordREset = new XMLHttpRequest();
            } else {
                passwordREset = new ActiveXObject('Microsoft.XMLHTTP');
            }
            passwordREset.onreadystatechange = function(res) {
                if (passwordREset.readyState == 4 && passwordREset.status == 200) {
                    var back = passwordREset.responseText;
                    if (back == 'true') {
                        location.search = "";
                    }
                }
            }
            passwordREset.open('POST', 'data.php', true);
            passwordREset.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            passwordREset.send('mode=resetPasswordFinal&password=' + password + '&mail=' + GetQueryString("mail") +
                '&username=' + GetQueryString("username") + '&token=' + GetQueryString("token"));
        } else {
            $("#password").css("border", "1px solid #ff9b9b");
            $("#repass").css("border", "1px solid #ff9b9b");
        }
    }
    </script>

    <?php } else {?>

    非法登录

    <?php }
        
    }
}
?>
</body>

</html>