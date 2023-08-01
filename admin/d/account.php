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
    <title>星柠 | 账户</title>
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
                            <li>
                                <a href="link.php"><i class="menu-icon fa fa-tags"></i><span>链接</span></a>
                            </li>
                            <li class="active-page">
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
                    <h3 class="breadcrumb-header">账户</h3>
                </div>
                <div id="main-wrapper">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-white">
                                <div class="panel-heading clearfix">
                                    <h4 class="panel-title">用户列表</h4>
                                </div>
                                <div class="panel-body">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>#</th><th>账户</th><th>昵称</th><th>邮箱</th><th>注册日期</th><th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tableAccountView"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="./../../data/js/jq.js"></script>
    <script>
        previewAcc()
        function previewAcc() {
            $("#tableAccountView").load("./../../account/data.php?admin=accountTable")
        }
        function delAccount(id) {
            var request = new XMLHttpRequest();
            request.open("get", "./../../account/data.php?admin=delate&delId=" + id);
            request.send(null);
            request.onload = function() {
                if (request.status == 200) {
                    if (request.responseText == 'success') {
                        setTimeout(() => {
                            previewAcc();
                        }, 100);
                    }
                }
            }
        }
        $("#collapsed-sidebar-toggle-button").on("click",function(){
            if ($("body").attr("class") == "hide-menu" || $("body").attr("class") == undefined) {
                $("body").attr("class","menu")
            } else {
                $("body").attr("class","hide-menu")
            }
        })
    </script>
</body>

</html>
<?php } else {
    include "./../xn-login.html";
}?>
