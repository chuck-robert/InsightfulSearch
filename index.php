<?php
// ------------------------------------------------------
//配置
include "./admin/config.php";
// ------------------------------------------------------
?> 
<!DOCTYPE html>
<html lang="zh-cn" id="html" login="<?php if(isset($_COOKIE['XnUserName'])){echo "login";}else{echo"no";}?>" mode="<?php echo getLine("./api/text/pageDataText.text",4);?>" ibdp="false">

<head>
	<meta charset="utf-8">
	<title><?php echo getLine("./api/text/pageDataText.text",1);?></title>
	<meta name="viewport"
		content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="description" content="<?php echo getLine("./api/text/pageDataText.text",3);?>">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
	<link rel="shortcut icon" href="./data/image/icon/InsightfulSearch.v3.png" type="favicon.ico">
    <link rel="stylesheet" Content-Type="text/css" href="./data/css/theme.v1.css">
    <link rel="stylesheet" Content-Type="text/css" href="./data/css/xn-ui.css">
    <link rel="stylesheet" Content-Type="text/css" href="./data/css/fonticon.css">
    <link rel="stylesheet" Content-Type="text/css" href="./data/css/animate.min.css">
    <link rel="stylesheet" Content-Type="text/css" href="./data/css/w.css">
    <style>
        *:not(w-body *) {padding: 0;border: 0;outline: 0;margin: 0;box-sizing: border-box;-webkit-user-select: none; user-select: none;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;-webkit-tap-highlight-color: transparent;}
*:not(input,textarea) { -webkit-touch-callout: none; -webkit-user-select: none; }
html,body {height: 100%;width: 100%;position: absolute;top: 0;left: 0;overflow: hidden;}
.searchBody {position: absolute;top: 29%;left: 0;right: 0;}
.searchForm {right: 0;left: 0;margin: auto !important;box-shadow: 0 2px 10px var(--v1-001-shadow);max-width: 499px;min-width: 400px;height: 40px;border-radius: 20px;-webkit-transition: all .2s cubic-bezier(1, 0.4, 0, 0.59);transition: all .2s cubic-bezier(1, 0.4, 0, 0.59);background: var(--v1-010-bg);display: flex;-webkit-backdrop-filter: blur(10px);backdrop-filter: blur(10px);align-items: center;}
.tr3s {transition: all .3s;}
#backgroundBoxImage,#setting,#TMTR_Box li,#searchEngineList li,.collect-list li,ul#TMTR_Box li i,#editorMemo,*[miniHide],.searchBody {transition: all .3s;}
.searchForm:hover,.searchForm:focus {max-width: 499px;min-width: 400px;-webkit-box-shadow: 0 2px 10px var(--v1-001-shadow);box-shadow: 0 2px 10px var(--v1-001-shadow);}
.searchForm:hover *,.searchForm:focus * {opacity: 1;}
.searchInput {color: var(--v1-004-font);background: bottom !important;width: 90%;height: inherit;margin-left: 20px;background-color: inherit;outline: none;padding: 0 10px;border: none;}
.searchInput:focus+.searchForm {-webkit-box-shadow: 0 2px 10px var(--v1-002-shadow);box-shadow: 0 2px 10px var(--v1-002-shadow);}
.confirmInput {border: solid 6px var(--c-link);width: 25px;height: 25px;display: inline-block;position: absolute;border-radius: 50px;right: 7.5px;top: 7.5px;}
.confirmInput:hover {cursor: pointer;border-color: var(--c-hover);}
.word-back {display: none;border: 1px solid var(--v1-002-border);text-align: left;min-width: 350px;max-width: 500px;border-radius: 10px;padding: 10px 20px;position: absolute;left: 0;right: 0;margin: auto;overflow: hidden;-webkit-transition: all .25s;transition: all .25s;line-height: 25px;background: var(--v1-004-bg);top: calc(100% + 5px);}
    </style>
    <link rel="stylesheet" Content-Type="text/css" href="./data/css/page.v1.css">
</head>

<body id="body" class="light blue" onmouseup="moveable = false">
    <div id="backgroundBoxFa">
        <img alt="" style="opacity: 0;" id="backgroundBoxImage" onload="bbiSuccessLoad()">
        <div id="mask" class="auto tr3s"></div>
    </div>
    <div class="searchBody">
        <div>
            <div class="timeBody tr3s" id="timeBody">
                <div><span id="dateTime">00:00</span></div>
                <div><span id="date" class="animate__animated animate__fadeInUp">2019-10-03 星期四</span></div>
            </div>
            <s-form engin="https://cn.bing.com/search?q=" target="_blank" method="get" class="searchForm hide" id="searchForm" onkeydown="if(event.keyCode==13){goSearch()}">
                <input id="text" type="text" placeholder="Search . . ." class="searchInput" autocomplete="off">
                <span class="confirmInput" onclick="EngineSwitch()" id="searchInputGo"></span>
                <span>
                    <div id="word" style="display:none" type="submit" class="word-back"></div>
                    <div id="word2" style="display:none" type="submit" class="word-back"></div>
                </span>
            </s-form>
            <div class="engineList animate__animated animate__fadeInUp" style="opacity: 0;display:none">
                <span j="gg" class="corrugation" u="https://www.google.com/search?q="><img src="./data/image/startPage/google.png" alt="谷歌"></span>
                <span j="bd" class="corrugation" u="https://www.baidu.com/s?wd="><img src="./data/image/startPage/baidu.png" alt="百度"></span>
                <span j="by" class="corrugation" u="https://cn.bing.com/search?q="><img src="./data/image/startPage/bing.png" alt="必应"></span>
                <span j="ai" class="corrugation" u="/tool/chat/?text="><img src="./data/image/startPage/ai.png" alt="AI"></span>
            </div>
        </div>
    </div>
	<div class="time-click-collect" style="display: none;">
		<div><span class="collect-list-2"><collect-li class=""></collect-li></span></div>
	</div>
    <div class="openSettingMenuInput load_fadeIn_right" style="z-index: 100;">
        <i class="MenuIconInput fa fa-eye" style="color: var(--v1-002-font);" aria-hidden="true" onclick="focusMode()"></i>
        <i class="MenuIconInput fa fa-bars" style="color: var(--v1-002-font);" aria-hidden="true" onclick="showMenu()"></i>
    </div>
    <div id="toolMenuTopRight" open="close">
        <ul id="TMTR_Box">
            <li data-top-menu onclick="openUrl('2','fun')"><i class="fa fa-cog" aria-hidden="true" color="blue1"></i><p>更多功能</p></li>
            <li data-top-menu not-closeMenu onclick="openToolMenu()"><i class="fas fa-toolbox" aria-hidden="true" color="orange1"></i><p>工具箱</p></li>
            <li data-top-menu onclick="openUrl('./account/?from=https:\/\/stear.cn','outside')"><i class="fa fa-user-circle" aria-hidden="true" color="green1"></i><p>账户设置</p></li>
            <li data-top-menu onclick="xnAppId(2)"><i class="fa fa-question" aria-hidden="true" color="violet1"></i><p>反馈问题</p></li>
            <li data-second-menu ond-menu onclick="openUrl('./tool/chat/','outside')" style="display:none"><i class="fas fa-comments" color="blue1"></i></i><p>ChatGPT</p></li>
            <li data-second-menu onclick="openUrl('./tool/memo/','outside')" style="display:none"><i class="fas fa-list-ul" aria-hidden="true" color="orange1"></i><p>青师备忘</p></li>
            <li data-second-menu not-closeMenu onclick="closeToolMenu()" style="display:none"><i class="fas fa-arrow-left" aria-hidden="true" color="violet1"></i><p>返回</p></li>
        </ul>
    </div>
    <div class="setting" id="setting" style="display:none;opacity:0;transform:scale(.75);">
        <!-- <div class="settingMenuDiv"></div> -->
        <iframe id="wallHavenLoadProgress" srcdoc="<html><body><div class=&quot;loaderB&quot;></div><p style=&quot;margin-left: 35px;color: #000000cc;font-size: 20px;&quot; onclick=&quot;window.parent.location.reload();&quot;>加载中，请稍等</p><body>
    <style>body {display: flex;align-items: center;justify-content: center;background:#f7f7f7;height: 100px;margin: auto;top: 0;bottom: 0;position: absolute;left: 0;right: 0;}:root {--color-1: hsl(215, 70%, 52%);--color-2: hsl(288, 70%, 52%);--color-3: hsl(151, 70%, 52%);--color-4: hsl(104, 70%, 52%);--speed: 2s;}
    .loaderB {animation: rotate var(--speed) infinite;height: 50px;width: 50px;}
    .loaderB:before,.loaderB:after {border-radius: 50%;content: '';display: block;height: 20px;width: 20px;}
    .loaderB:before {animation: ball1 1s infinite;background-color: var(--color-3);box-shadow: 30px 0 0 var(--color-1);margin-bottom: 10px;}
    .loaderB:after {animation: ball2 1s infinite;background-color: var(--color-4);box-shadow: 30px 0 0 var(--color-2);}
    @keyframes rotate {0% {-webkit-transform: rotate(0deg) scale(0.8);-moz-transform: rotate(0deg) scale(0.8);}50% {-webkit-transform: rotate(360deg) scale(1.2);-moz-transform: rotate(360deg) scale(1.2);}100% {-webkit-transform: rotate(720deg) scale(0.8);-moz-transform: rotate(720deg) scale(0.8);}}
    @keyframes ball1 {0% {box-shadow: 30px 0 0 var(--color-1);}50% {box-shadow: 0 0 0 var(--color-1);margin-bottom: 0;-webkit-transform: translate(15px, 15px);-moz-transform: translate(15px, 15px);}100% {box-shadow: 30px 0 0 var(--color-1);margin-bottom: 10px;}}
    @keyframes ball2 {0% {box-shadow: 30px 0 0 var(--color-2);}50% {box-shadow: 0 0 0 var(--color-2);margin-top: -20px;-webkit-transform: translate(15px, 15px);-moz-transform: translate(15px, 15px);}100% {box-shadow: 30px 0 0 var(--color-2);margin-top: 0;}}
    <style></html>" frameborder="0" height="100%" width="100%" data-v-0a2a8a21=""></iframe></div>
    </div>
    <ul class="menuList"><li></li></ul>
    <div class="welcome wel a">
		<div><p>尊敬的 <span id="username"><?php if(isset($_COOKIE['XnUserName'])){$cookie=$_COOKIE["XnUserName"];$s="SELECT * FROM `xn-user` where `token` = '{$cookie}'";$show=mysqli_query($server,$s);if(!$show){die('无法读取数据,请联系管理员修复:'.mysqli_error($server));}if(mysqli_num_rows($show)!==0){while($row=mysqli_fetch_array($show)){echo$row['nick'];}}else{echo'旅行者';}}else{echo'旅行者';}?></span> <span id="welTime"></span>好！<span loginHide class="themeColor hoverUnderLine" onclick='location.href = "./../account/"'> 您还未登陆</span></p></div>
	</div>
    <div id="windowsList" data-setting-headerInfo="hide"></div>
    <div id="appList"></div>
    <div id="editorMemo" style="display: none;"></div>
    <div xid="jsLoader">
        <script src="./data/js/jq.js"></script>
        <script src="./data/js/xn-ui.js"></script>
        <script src="./data/js/xn.js"></script>
        <script src="./data/js/setting.js"></script>
        <script src="./data/js/index.js"></script>
        <div id="jsFunctionLoadBox"></div>
        <script src="./data/js/searchAfford.js"></script>
    </div>
    <data-setList id="data" data-setting-menu-show="show" data-settingUI="close"></data-setList>
</body>

</html>