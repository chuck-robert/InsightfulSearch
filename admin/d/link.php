<?php
if ($_COOKIE['XnAdminUser']) { ?>
    <!DOCTYPE html>
<html lang="zh-cn">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <title>星柠 | 链接</title>
    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="../../data/css/fonticon.css">
    <link rel="shortcut icon" href="./../../data/image/icon/logo.v3.ico" type="image/x-icon">
</head>

<body>
    <div class="page-container">
        <div class="page-sidebar">
            <a href="index.php" class="logo-box">
                <span>Stearsoft</span>
                <i class="fa fa-times" id="sidebar-toggle-button-close" aria-hidden="true"></i>
            </a>
            <div class="slimScrollDiv">
                <div class="page-sidebar-inner">
                    <div class="page-sidebar-menu">
                        <ul class="accordion-menu">
                            <li>
                                <a href="index.php"><i class="menu-icon fa fa-home"></i><span>控制台</span></a>
                            </li>
                            <li class="active-page">
                                <a href="link.php"><i class="menu-icon fa fa-tags"></i><span>链接</span></a>
                            </li>
                            <li>
                                <a href="account.php"><i class="menu-icon fa fa-user"></i><span>账户</span></a>
                            </li>
                            <li>
                                <a href="set-start.php"><i class="menu-icon fa fa-globe"></i><span>起始页设置</span></a>
                            </li>
                            <li>
                                <a href="set-page.php"><i class="menu-icon fa fa-cog"></i><span>控制页设置</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-content">
            <div class="page-header">
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul class="nav navbar-nav">
                                <li><a href="javascript:void(0)" id="collapsed-sidebar-toggle-button"><i class="fa fa-bars"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="page-inner">
                <div class="page-title">
                    <h3 class="breadcrumb-header">链接</h3>
                </div>
                <div id="main-wrapper">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-white">
                                <div class="control-group">
                                    <div class="col-md-4">
                                        <div class="controls">
                                            <label class="control-label">标题</label>
                                            <input id="title" type="text" class="input-large form-control m-b-sm"
                                                placeholder="输入网站标题 ...">
                                            <label class="control-label">链接</label>
                                            <input id="link" type="text" class="input-large form-control m-b-sm"
                                                placeholder="输入网站链接 ..." value="https://,xnAppId()">
                                            <label class="control-label">简介</label>
                                            <input id="about" type="text" class="input-large form-control m-b-sm"
                                                placeholder="输入网站简介 ...">
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-t-lg">
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-primary" id="showtoast" onclick="uploadUrl()">提交</button>
                                        <button type="button" class="btn btn-primary" id="showtoast" onclick="previewUrl()">获取</button>
                                        <button type="button" class="btn btn-default" id="cleartoasts">取消</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-white">
                                <div class="panel-heading clearfix">
                                    <h4 class="panel-title">网站列表</h4>
                                </div>
                                <div class="panel-body">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>网站名称</th>
                                                <th>网站地址</th>
                                                <th>网站简介</th>
                                                <th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tableLinkView"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="script-box">
        <script src="../../data/js/jq.js"></script>
        <script>
            function uploadUrl() {
                var now = new Date();
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var date = now.getDate();
                var hour = now.getHours();
                var minute = now.getMinutes();
                var second = now.getSeconds();
                date = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
                url = $("#link").val()
                title = $("#title").val()
                about = $("#about").val()
                var request = new XMLHttpRequest();
                request.open("get", "/../../admin/xn-link-add.php?mode=save&title=" + title + "&url=" + encodeURI(url) + "&date=" + date +
                    "&about=" + about);
                request.send(null);
                request.onload = function () {
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
                request.open("get", "/../../admin/xn-link-add.php?mode=delate&delId=" + id);
                request.send(null);
                request.onload = function () {
                    if (request.status == 200) {
                        if (request.responseText == '删除 ' + id + ' 号链接成功') {
                            setTimeout(() => {
                                previewUrl();
                            }, 100);
                        }
                    }
                }
            }
            previewUrl()
            function previewUrl() {
                // url = $("#LinkUrl").val()
                // title = $("#LinkTitle").val()
                // $("#preU").text(url)
                // $("#preT").text(title)
                // $("#preI").attr("src", "https://stear.cn/api/favicon/get.php?url=" + url)
                $("#tableLinkView").load("/../../api/admin/xn-link-linkreview.php?num=1000&p=1&admin=preview")
                // $(".loadLink").load("./../api/admin/xn-link-linkreview.php?num=1000&p=1")
            }
            $("#collapsed-sidebar-toggle-button").on("click",function(){
            if ($("body").attr("class") == "hide-menu" || $("body").attr("class") == undefined) {
                $("body").attr("class","menu")
            } else {
                $("body").attr("class","hide-menu")
            }
        })
        </script>
    </div>
</body>

</html>
<?php } else {
    include "./../xn-login.html";
}?>
