<?php
include "./../admin/403.php";
// 链接数据库
header('Content-type:application/json;charset=utf-8');
include "./../admin/config.php";
$cookie = $_COOKIE['XnUserName'];
$mode = $_REQUEST['mode'];
$type = $_REQUEST['type'];
$admin = $_REQUEST['admin'];















// 登录注册
$loginName = $_REQUEST['login_username'];
$loginPassword = sha1($_REQUEST['login_password']);
$loginNick = $_REQUEST['login_usernick'];
$loginEmail = $_REQUEST['login_mail'];
$date = $_REQUEST['login_date'];
$id = $_REQUEST['login_id'];

// 注册
if ($mode == 'userAccountRegister') {
    $check = "SELECT * FROM `xn-user` WHERE `username`='{$loginName}' or `mail`='{$loginEmail}' or id='{$id}'";
    $login = mysqli_query($server, $check);
    $res = mysqli_num_rows($login);

    $getId = "SELECT max(`id` + 0) FROM `xn-user`";
    $resA = mysqli_query($server, $getId);
    $row = mysqli_fetch_row($resA);
    $newId = $row[0] + 1;

    $token = getRandomStr(75);
    if ($res) {
        echo "103";
    } else {
        $registerInfo = "insert into `xn-user` (`id`,`username`,`password`,`mail`,`date`,`nick`,`sex`,`birth1`,`birth2`,`birth3`,`token`,`collect`,`settingData`,`theme`,`memoList`,`upDataDate`) VALUES('{$newId}','{$loginName}','{$loginPassword}','{$loginEmail}','{$date}','{$loginNick}','','','','','{$token}','','','','','')";
        mysqli_query($server, $registerInfo);
        echo "101";
    }
}

// 登录
if ($type == 'login') {
    $check = "SELECT * FROM `xn-user` WHERE `username`='{$loginName}' and `password`='{$loginPassword}'";
    $login = mysqli_query($server, $check);
    $result = $server->query($check);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            setcookie("XnUserName", $row['token'], time() + 60 * 60 * 24 * 30, "/");
        }
    }
    $res = mysqli_num_rows($login);
    if ($res) {
        echo "102";
    } else {
        echo "100";
    }
}

if ($type == 'isLogin') {
    $check = "SELECT * FROM xn-user WHERE username='{$loginName}'";
    $login = mysqli_query($server, $check);
    $res = mysqli_num_rows($login);
    if ($res) {
        echo "102";
    } else {
        echo "100";
    }
}

if ($type == 'loginOut') {
    setcookie("XnUserName", $loginName, time() - 1, "/");
}

function getRandomStr($len, $special = false) {
    $chars = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
    if ($special) {
        $chars = array_merge($chars, array("!", "@", "#", "\$", "?", "|", "{", "/", ":", ";", "%", "^", "&", "*", "(", ")", "-", "_", "[", "]", "}", "<", ">", "~", "+", "=", ",", "."));
    }
    $charsLen = count($chars) - 1;
    shuffle($chars);
    $str = '';
    for ($i = 0; $i < $len; $i++) {
        $str .= $chars[mt_rand(0, $charsLen)];
    }
    return $str;
}














// 修改用户信息
if ($mode == "upUserInformation") {
    $nick = $_REQUEST['nick'];
    $mail = $_REQUEST['mail'];
    $sex = $_REQUEST['sex'];
    $b1 = $_REQUEST['b1'];
    $b2 = $_REQUEST['b2'];
    $b3 = $_REQUEST['b3'];
    $upUserInformation = "update `xn-user` set `nick`='{$nick}',`mail`='{$mail}',`birth1`='{$b1}',`birth2`='{$b2}',`birth3`='{$b3}',`sex`='{$sex}' WHERE `token`='{$cookie}'";
    mysqli_query($server, $upUserInformation);
    echo 'true';
}

// 用户密码更新
if ($mode == "upUserPassword") {
    $new = sha1($_REQUEST['newPassword']);
    $old = sha1($_REQUEST['oldPassword']);
    $check = "SELECT * FROM `xn-user` WHERE `token`='{$cookie}' and `password`='{$old}'";
    $login = mysqli_query($server, $check);
    $result = $server->query($check);
    $res = mysqli_num_rows($login);
    if ($res) {
        echo "true";
        $upUserPassword = "update `xn-user` set `password`='{$new}' WHERE `token`='{$cookie}'";
        mysqli_query($server, $upUserPassword);
    } else {
        echo "false";
    }
}

// 通过邮箱反馈重置密码的密钥
if ($mode == "resetPasswordByMail") {
    $mail = $_REQUEST['mail'];
    $username = $_REQUEST['username'];
    $token = getRandomStr(75);
    $upUserPasswordByMail = "update `user` set `token`='{$token}' WHERE `mail`='{$mail}' and `username`='{$username}'";
    $check = mysqli_query($server, $upUserPasswordByMail);
    if ($check) {
        $sql = "select * from `user` WHERE `mail`='{$mail}' and `username`='{$username}'";
        $showUserTokenBack = $server->query($sql);
        if ($showUserTokenBack->num_rows > 0) {
            while ($row = $showUserTokenBack->fetch_assoc()) {
                $json = ["token" => $row['token'], "code" => '101'];
                echo json_encode($json, JSON_UNESCAPED_UNICODE);
            }
        }
    } else {
        echo 'false';
    }
}

// 通过重置密码的密钥来重置密码
if ($mode == 'resetPasswordFinal') {
    $mail = $_REQUEST['mail'];
    $username = $_REQUEST['username'];
    $token = $_REQUEST['token'];
    $password = sha1($_REQUEST['password']);
    $upUserPasswordByToken = "update `user` set `password`='{$password}' WHERE `mail`='{$mail}' and `username`='{$username}' and `token`='{$token}'";
    $check = mysqli_query($server, $upUserPasswordByToken);
    if ($check) {
        $newToken = getRandomStr(75);
        $upNewToken = "update `user` set `token`='{$newToken}' where `password`='{$password}' and `mail`='{$mail}' and `username`='{$username}' and `token`='{$token}'";
        $checkToken = mysqli_query($server, $upNewToken);
        if ($checkToken) {
            setcookie("XnUserName", $loginName, time() - 1, "/");
            echo 'true';
        } else {
            echo 'false';
        }
    } else {
        echo 'false';
    }
}






if ($admin == "number") {
    $s = "SELECT * FROM `xn-user`";
    $show = mysqli_query($server, $s);
    if (!$show) {
        die('无法读取数据,请联系管理员修复:' . mysqli_error($server));
    }
    echo mysqli_num_rows($show);
}
if ($admin == "accountTable") {
    $s = "SELECT * FROM `xn-user` order by `id`";
    $show = mysqli_query($server, $s);
    if (!$show) {
        die('无法读取数据,请联系管理员修复:' . mysqli_error($server));
    }
    if (mysqli_num_rows($show) !== 0) {
        while ($row = mysqli_fetch_array($show)) {
            $id = $row['id'];
            $username = $row['username'];
            $nick = $row['nick'];
            $mail = $row['mail'];
            $date = $row['date'];
            echo '<tr><th scope="row">' . $id . '</th><td>' . $username . '</td><td>' . $nick . '</td><td>' . $mail . '</td><td>' . $date . '</td><td><button onclick="delAccount('.$id.')" type="button" class="btn btn-danger none">删除</button></td></tr>';
        }
    } else {
        echo 'null';
    }
}
if ($_REQUEST['admin'] == 'delate') {
    $id = $_REQUEST['delId'];
    $registerInfo = "DELETE FROM `xn-user` WHERE `id` = $id";
    mysqli_query($server, $registerInfo);
    echo "success";
}












// 保存用户主页信息
if ($mode == 'pageDataSave') {
    $token = $_REQUEST['token'];
    $CollectList = $_REQUEST['CollectList'];
    $settingData = $_REQUEST['settingData'];
    $theme = $_REQUEST['theme'];
    $memoList = $_REQUEST['memoList'];

    $check = "SELECT * FROM `user` WHERE `token`='{$token}'";
    $dataLineCheck = mysqli_query($server, $check);
    $resultBack = $server->query($check);
    $res = mysqli_num_rows($dataLineCheck);
    if ($res) {
        $pageDataSave = "update `user` set `collect`='{$CollectList}',`settingdata`='{$settingData}',`theme`='{$theme}',`memoList`='{$memoList}' WHERE `token`='{$token}'";
        $check = mysqli_query($server, $pageDataSave);
        if ($check) {
            echo 'true';
        } else {
            echo 'false';
        }
    } else {
        echo 'false';
    }
}

// 获取用户主页信息
if ($mode == 'pageDataGet') {
    $token = $_REQUEST['token'];
    $check = "SELECT * FROM `user` WHERE `token`='$token'";
    $dataLineCheck = mysqli_query($server, $check);
    $resultBack = $server->query($check);
    $res = mysqli_num_rows($dataLineCheck);
    if ($res) {
        $pageDataSave = "select * from `user` WHERE `token`='$token'";
        $check = mysqli_query($server, $pageDataSave);
        if ($check) {
            while ($row = $check->fetch_assoc()) {
                $json = ["collect" => $row['collect'], "settingdata" => $row['settingdata'], "theme" => $row['theme'], "memoList" => $row['memoList']];
                echo json_encode($json, JSON_UNESCAPED_UNICODE);
            }
        } else {
            echo 'false';
        }
    } else {
        echo 'false';
    }
}
mysqli_close($server);