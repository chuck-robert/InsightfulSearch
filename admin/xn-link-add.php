<?php
// ------------------------------------------------------
//配置
include "./config.php";
// ------------------------------------------------------
if ($_COOKIE['XnAdminUser']) {
    if ($_REQUEST['mode'] == 'save') {
        // 保存链接
        $title = $_REQUEST['title'];
        $url = $_REQUEST['url'];
        $date = $_REQUEST['date'];
        $about = $_REQUEST['about'];
        $getId = "SELECT max(`id` + 0) FROM `xn-links`";
        $res = mysqli_query($server, $getId);
        $row = mysqli_fetch_row($res);
        $newId = $row[0] + 1;
        $registerInfo = "insert into `xn-links` (`id`,`title`,`link`,`about`,`date`) VALUES('{$newId}','{$title}','{$url}','{$about}','{$date}')";
        mysqli_query($server, $registerInfo);
        echo "true";
    } else if ($_REQUEST['mode'] == 'delate') {
        // 删除链接
        $id = $_REQUEST['delId'];
        $registerInfo = "DELETE FROM `xn-links` WHERE `id` = $id";
        mysqli_query($server, $registerInfo);
        echo "删除 $id 号链接成功";
    } else {
        ?>
<!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <link rel="shortcut icon" href="./../data/image/icon/logo.v3.ico" type="image/x-icon">
    <title>星柠 - 管理员 | 上传新链接</title>
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <link rel="stylesheet" href="./../data/css/admin.css">
</head>

<body>
    <div class="linksAddBox">
        <div class="enterBoxMain">
            <div class="enterBox">
                <input type="text" placeholder="标题" id="LinkTitle">
                <input type="text" placeholder="链接" id="LinkUrl" value="http://">
                <input type="text" placeholder="介绍" id="LinkAbout">
                <input type="button" value="预览" onclick="previewUrl()">
                <input type="button" value="确认" onclick="uploadUrl()">
            </div>
            <div class="previexBox">
                <div class="LinkBox">
                    <img id="preI" src="./../data/image/icon/216.png" class="pre-icon" alt="">
                    <p class="pre-title" id="preT">星柠</p>
                    <p class="pre-url" id="preU">https://stear.cn</p>
                </div>
            </div>
        </div>
        <ul class="loadLink"></ul>
    </div>
    <script src="./../data/js/jq.js"></script>
    <script>
    previewUrl();

    function uploadUrl() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        date = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
        url = $("#LinkUrl").val()
        title = $("#LinkTitle").val()
        about = $("#LinkAbout").val()
        var request = new XMLHttpRequest();
        request.open("get", "./xn-link-add.php?mode=save&title=" + title + "&url=" + encodeURI(url) + "&date=" + date +
            "&about=" + about);
        request.send(null);
        request.onload = function() {
            if (request.status == 200) {
                if (request.responseText == 'true') {
                    setTimeout(() => {
                        previewUrl();
                        title = $("#LinkTitle").val('')
                        about = $("#LinkAbout").val('')
                    }, 100);
                }
            }
        }
    }

    function delLink(id) {
        var request = new XMLHttpRequest();
        request.open("get", "./xn-link-add.php?mode=delate&delId=" + id);
        request.send(null);
        request.onload = function() {
            if (request.status == 200) {
                if (request.responseText == '删除 ' + id + ' 号链接成功') {
                    setTimeout(() => {
                        previewUrl();
                    }, 100);
                }
            }
        }
    }

    function previewUrl() {
        url = $("#LinkUrl").val()
        title = $("#LinkTitle").val()
        $("#preU").text(url)
        $("#preT").text(title)
        $("#preI").attr("src", "https://stear.cn/api/favicon/get.php?url=" + url)
        $(".loadLink").load("./../api/admin/xn-link-linkreview.php?num=1000&p=1&admin=preview")
        // $(".loadLink").load("./../api/admin/xn-link-linkreview.php?num=1000&p=1")
    }
    </script>
</body>

</html>
<?php 
    }
} else {
    include "./xn-login.html";
}