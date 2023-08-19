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
    <title>星柠 | 控制台</title>
    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="../../data/css/fonticon.css">
    <link rel="shortcut icon" href="./../../data/image/icon/logo.v3.ico" type="image/x-icon">
    <script src="./../../data/js/jq.js"></script>
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
                            <li class="active-page">
                                <a href="index.php"><i class="menu-icon fa fa-home"></i><span>控制台</span></a>
                            </li>
                            <li>
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
                    <h3 class="breadcrumb-header">控制台</h3>
                </div>
                <div id="main-wrapper">
                    <div class="row">
                        <div class="infor-table-box">
                            <div class="panel">
                                <div class="panel-body">
                                    <div class="pull-left">
                                        <span class="stats-number" id="loadInTimeData">2333</span>
                                        <p class="stats-info">访问次数</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="infor-table-box">
                            <div class="panel">
                                <div class="panel-body">
                                    <div class="pull-left">
                                        <span class="stats-number" id="linkNumber">2333</span>
                                        <p class="stats-info">链接数量</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="infor-table-box">
                            <div class="panel">
                                <div class="panel-body">
                                    <div class="pull-left">
                                        <span class="stats-number" id="accountNumber">34</span>
                                        <p class="stats-info">账户数量</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="infor-table-box">
                            <div class="panel">
                                <div class="panel-body">
                                    <div class="pull-left">
                                        <span class="stats-number"><?php echo getLine("./../../api/text/pageDataText-b.text",2);?></span>
                                        <p class="stats-info">版本</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-white">
                                <div class="panel-heading clearfix">
                                    <h4 class="panel-title">网站信息</h4>
                                </div>
                                <div class="panel-body">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>项目</th>
                                                <th>结果</th>
                                                <th>备注</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><th scope="row">1</th><td>域名</td><td>stear.cn</td><td>/</td></tr>
                                            <tr><th scope="row">2</th><td>测试域名</td><td>aaa.ccc</td><td>/</td></tr>
                                            <tr><th scope="row">3</th><td>域名到期时间</td><td>2023-09-04</td><td>/</td></tr>
                                            <tr><th scope="row">4</th><td>虚拟主机到期时间</td><td>2023-10-29</td><td>/</td></tr>
                                            <tr><th scope="row">5</th><td>协议</td><td>https</td><td>/</td></tr>
                                            <tr><th scope="row">6</th><td>宽带</td><td>6Mbps</td><td>/</td></tr>
                                            <tr><th scope="row">7</th><td>环境</td><td>Kangle+MySQL+PHP</td><td>/</td></tr>
                                            <tr><th scope="row">8</th><td>数据库空间</td><td>0.03MB/128MB</td><td>/</td></tr>
                                            <tr><th scope="row">9</th><td>网站空间</td><td>12MB/512MB</td><td>/</td></tr>
                                            <tr><th scope="row">10</th><td>版本</td><td>Shizuku v1.0.8 - 3</td><td>/</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        loadsA()
        function loadsA() {
            $('#loadInTimeData').load('./../../api/text/loadInTimeData.txt')
            $('#linkNumber').load('./../../api/admin/xn-link-linkreview.php?admin=number')
            $('#accountNumber').load('./../../account/data.php?admin=number')
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
}
function getLine($file,$line,$length = 40690) {
    $returnText = null;
    $i = 1;
    $handle = @fopen($file,"r");
    if ($handle) {
        while (!feof($handle)) {
            $buffer = fgets($handle,$length);
            if ($line == $i) $returnText = $buffer;
            $i++;    
        }
        fclose($handle);
    }
    return str_replace("
","",str_replace("_"," ",str_replace(" ","",$returnText)));
}?>
