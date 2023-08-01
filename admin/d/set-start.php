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
    <title>星柠 | 起始页设置</title>
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
                            <li>
                                <a href="account.php"><i class="menu-icon fa fa-user"></i><span>账户</span></a>
                            </li>
                            <li class="active-page">
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
                    <h3 class="breadcrumb-header">起始页设置</h3>
                </div>
                <div id="main-wrapper">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="panel panel-white">
                                <div class="control-group">
                                    <div class="col-md-4">
                                        <div class="controls">
                                            <label class="control-label">标题</label>
                                            <input value="<?php echo getLine("./../../api/text/pageDataText.text",1);?>" id="title" type="text" class="input-large form-control m-b-sm" placeholder="输入网站标题 ...">
                                            <label class="control-label">介绍</label>
                                            <input value="<?php echo getLine("./../../api/text/pageDataText.text",3);?>" id="description" type="text" class="input-large form-control m-b-sm" placeholder="输入网站链接 ..." value="https://">
                                            <label class="control-label">关键字</label>
                                            <input value="<?php echo getLine("./../../api/text/pageDataText.text",2);?>" id="keywords" type="text" class="input-large form-control m-b-sm" placeholder="输入网站简介 ...">
                                            <label class="control-label">版本</label>
                                            <input value="<?php echo getLine("./../../api/text/pageDataText.text",5);?>" id="version" type="text" class="input-large form-control m-b-sm" placeholder="输入网站版本">
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-t-lg">
                                    <div class="col-md-12">
                                        <button type="button" class="btn btn-primary" id="showtoast" onclick="changeData()">保存</button>
                                        <?php if (getLine("./../../api/text/pageDataText.text",4) == "close" ){ echo '<button type="button" class="btn btn-default" id="showMode" onclick="os(\'open\')">开启网站</button>';} else {echo '<button type="button" class="btn btn-danger" id="showMode" onclick="os(\'close\')">关闭网站</button>';}?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="display:none" id="dataBox" data-openShow="true"></div>
    <script src="./../../data/js/jq.js"></script>
    <script>
        function os(data) {
            $("#dataBox").attr("data-openShow",data)
            if (data == "close") {
                $("#showMode").text("关闭网站 （未保存）")
            } else {
                $("#showMode").text("开启网站 （未保存）")
            }
        }
        function changeData() {
            title = $("#title").val();
            keywords = $("#keywords").val();
            description = $("#description").val();
            openShow = $("#dataBox").attr("data-openShow");
            version = $("#version").val();
                var request = new XMLHttpRequest();
                request.open("get", "./../data.php?mode=startSave&title="+title+"&keywords="+keywords+"&description="+description+"&openShow="+openShow+"&version=" + version);
                request.send(null);
                request.onload = function () {
                    if (request.status == 200) {
                        if (request.responseText == 'success') {
                            location.reload()
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
