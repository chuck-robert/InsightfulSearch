var jsonItem = Object.keys(ls('settingData', 'json'));
for (let i = 0; i < jsonItem.length; i++) {
    if (Object.values(ls('settingData', 'json'))[i] == true) {
        checkT(jsonItem[i]);
    }
}

function loadCheckBox() {
    var dsi = $("checkBox").length;
    for (let i = 0; i < dsi; i++) {
        id = $("checkBox")[i].getAttribute("data-setting-id");
        fun = $("checkBox")[i].getAttribute("data-Function")
        html = '<input class="checkbox" type="checkbox" id="' + id + '" ' + fun + '><label class="checkbox-label" for="' + id + '"></label>';
        $("checkBox")[i].innerHTML = html;
    }
}
$('.settingChildKixaChangeList.bg li').click(function () {
    var f = this;
    var input = document.getElementById("input");
    $('.settingChildKixaChangeList li').each(function () {
        this.className = this == f ? 'active' : '';
    });
});
$('.settingChildKixaChangeList.link li').click(function () {
    var f = this;
    var input = document.getElementById("input");
    $('.settingChildKixaChangeList.link li').each(function () {
        this.className = this == f ? 'active' : '';
    });
});
$(function () {
    $('.settingChildKixaChangeList.link li').click(function () {
        var index = $(this).index();
        $("#menu_list-5 div.settingMainKixa").eq(index).show().siblings().hide();
    })
});
function bwc() {
    var bwcI = $("#videoBgBox").val();
    if (event.keyCode == 13) {
        var urlTest = /^((https|http|ftp|rtsp|mms)?:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])[^\s]+/;
        if (!urlTest.test(bwcI)) {
            $("body#body").append(`<div class="welcome wel sign"><div><p>请确保你输入的是一个链接</p></div></div>`);
            setTimeout(() => { $(".welcome.wel").remove() }, 4700);
        } else {
            if (/.(mp4|avi|wmv|mpeg|m4v|mov|asf|flv|f4v)+$/.test(bwcI)) {
                localStorage.setItem("bgURL", bwcI);
                $("body#body").append(`<div class="welcome wel success"><div><p>输入成功</p></div></div>`);
                setTimeout(() => { $(".welcome.wel").remove() }, 4700);
                $('#backgroundBoxImage').each(function () {
                    $(this).replaceWith($('<video src=' + bwcI + ' autoplay="" loop="" muted="" id="backgroundBoxImage" alt="" onload="closeCover()">'));
                });
            } else {
                $("body#body").append(`<div class="welcome wel success"><div><p>输入成功</p></div></div>`);
                setTimeout(() => { $(".welcome.wel").remove() }, 4700);
                $('#backgroundBoxImage').each(function () {
                    $(this).replaceWith($('<img src=' + bwcI + ' id="backgroundBoxImage" alt="" onload="closeCover()">'));
                });
                localStorage.setItem("bgURL", bwcI);
                $("#backgroundBoxImage").attr("src", bwcI)
            }
        }
    }
}
$(function () {
    $('.settingChildKixaChangeList.bg li').click(function () {
        var index = $(this).index();
        $("#menu_list-1 div.settingMainKixa").eq(index).show().siblings().hide();
    })
});
function imgUPload() {
    var bgFile = $("#bgChoose")[0].files[0];
    var reader = new FileReader();
    if (bgFile) {
        reader.readAsDataURL(bgFile);
        reader.onloadend = function () {
            base64imgBG = reader.result;
            localStorage.setItem("bgURL", base64imgBG)
            setBackgroundBox('tr');
            $("body#body").append(`<div class="welcome wel success"><div><p>输入成功</p></div></div>`);
            setTimeout(() => { $(".welcome.wel").remove() }, 4700);
        }
    }
}
function showBgBox() {
    $("#bgListPhoto").html("");

    setTimeout(() => {
        var url = "./data/json/background.json"
        var request = new XMLHttpRequest();
        request.open("get", url);
        $("#bgListPhoto").attr('class', 'settingMainKixa a')
        request.send(null);
        request.onload = function () {
            if (request.status == 200) {
                loading('#bgListPhoto', 'a')
                var json = JSON.parse(request.responseText);
                bgList = json.srcList;
                for (let i = 0; i < bgList.length; i++) {
                    bgSrc = bgList[i];
                    if (bgSrc.substring(0, 2) == '0|') {
                        $("#bgListPhoto").append("<div onclick=\"bgUrlsET('./data/image/pro/background/" + bgSrc.substring(3) + "')\"><img src=\"./data/image/pro/background/" + bgSrc.substring(3) + "\"></div>");
                    } else if (bgSrc.substring(0, 2) == '||') {
                        $("#bgListPhoto").append("<div class='btt'><p class='backgroundTypeTitle'>" + bgSrc.substring(3) + "<p></div>");
                    } else if (bgSrc.substring(0, 2) == '1|') {
                        $("#bgListPhoto").append("<div onclick=\"bgUrlsET('./data/image/pro/background/out-" + bgSrc.substring(3) + "')\"><img src=\"./data/image/pro/background/out-" + bgSrc.substring(3) + "\"></div>");
                    } else if (bgSrc.substring(0, 2) == 'a|') {
                        $("#bgListPhoto").append("<div onclick=\"bgUrlsET('" + bgSrc.substring(3) + "')\"><img src=\"" + bgSrc.substring(3) + "\"></div>");
                    }
                }
            }
        }
    }, 200);
}
WallHavenLoad = 3;
wallhavenPage = 1
function bgWallHavenScroll() {
    if ($("#bgWallHaven")[0].scrollHeight - $("#bgWallHaven")[0].scrollTop <= 1000 && WallHavenLoad == 3) {
        WallHavenLoad = 1
    }
    if (WallHavenLoad == 1) {
        WallHaven()
        WallHavenLoad = 2
    }
}
function WallHaven() {
    if (wallhavenPage == 1) {
        $("#wallhavenInput").attr("onclick", "WallHaven()")
    } else {
        $("#bgWallHaven").append(`<iframe id="wallHavenLoadProgress" srcdoc="<html><body><div class=&quot;loaderB&quot;></div><body>
        <style>body {display: flex;align-items: center;justify-content: center;height: 100px;margin: 0;}:root {--color-1: hsl(215, 70%, 52%);--color-2: hsl(288, 70%, 52%);--color-3: hsl(151, 70%, 52%);--color-4: hsl(104, 70%, 52%);--speed: 2s;}
        .loaderB {animation: rotate var(--speed) infinite;height: 50px;width: 50px;}
        .loaderB:before,
        .loaderB:after {border-radius: 50%;content: '';display: block;height: 20px;width: 20px;}
        .loaderB:before {animation: ball1 1s infinite;background-color: var(--color-3);box-shadow: 30px 0 0 var(--color-1);margin-bottom: 10px;}
        .loaderB:after {animation: ball2 1s infinite;background-color: var(--color-4);box-shadow: 30px 0 0 var(--color-2);}
        @keyframes rotate {0% {-webkit-transform: rotate(0deg) scale(0.8);-moz-transform: rotate(0deg) scale(0.8);}50% {-webkit-transform: rotate(360deg) scale(1.2);-moz-transform: rotate(360deg) scale(1.2);}100% {-webkit-transform: rotate(720deg) scale(0.8);-moz-transform: rotate(720deg) scale(0.8);}}
        @keyframes ball1 {0% {box-shadow: 30px 0 0 var(--color-1);}50% {box-shadow: 0 0 0 var(--color-1);margin-bottom: 0;-webkit-transform: translate(15px, 15px);-moz-transform: translate(15px, 15px);}100% {box-shadow: 30px 0 0 var(--color-1);margin-bottom: 10px;}}
        @keyframes ball2 {0% {box-shadow: 30px 0 0 var(--color-2);}50% {box-shadow: 0 0 0 var(--color-2);margin-top: -20px;-webkit-transform: translate(15px, 15px);-moz-transform: translate(15px, 15px);}100% {box-shadow: 30px 0 0 var(--color-2);margin-top: 0;}}
        <style></html>" frameborder="0" height="100%" width="100%" data-v-0a2a8a21=""></iframe></div>`)
        // $("#bgWallHaven")[0].scrollTop = $("#bgWallHaven")[0].scrollHeight - 800
    }
    var url = "./../api/image/wallhaven.php?page=" + wallhavenPage
    var request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);
    request.onload = function () {
        if (request.status == 200) {
            WallHavenLoad = 3
            if (wallhavenPage == 1) {
                $("#bgWallHaven").empty();
            }
            wallhavenPage++;
            var json = JSON.parse(request.responseText);
            for (let i = 0; i < json.data.length; i++) {
                image = json.data[i];
                $("#bgWallHaven").append('<div class="bg_opacityLoad" style="animation-delay: ' + i + '00ms;" onclick="bgUrlsET(\'' + image.path + ' \')"><img src="' + image.thumbs.small + ' "></div>')
            }
            setTimeout(() => {
                $("#wallHavenLoadProgress").remove()
            }, 100);
        }
    }
}

function versionS() {
    $("#menu_list-3").html('')
    $("#menu_list-3").load('./page/version.html')
}
function linksS() {
    $("#menu_list-4").html('')
    $("#menu_list-4").load('./page/links.html')
}
$("#C-Link").on("click", function () {
    $("#linkUrlTextInput").val('http://');
    $("#linkTitleTextInput").val('');
})














function plu() {
    a = $("diva").length;
    for (let i = 0; i < a; i++) {
        let functionCommand = document.getElementsByTagName("diva")[i].innerText.split("[plu-]").join("").split("[-plu]").join("")
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                script.onload = script.onreadystatechange = null;
            }
        };
        script.innerText = functionCommand;
        head.appendChild(script);
    }
}






$(function () {
    loadCol();
    $("#overEnterLink").on("click", function () {
        if (/^((https|http|ftp|rtsp|mms)?:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])[^\s]+/.test($("#linkUrlTextInput").val()) || /xnAppId/.test($("#linkUrlTextInput").val())) {
            if (/^[ ]*$/.test($("#linkTitleTextInput").val())) {
            } else {
                saveCollect()
                autoUploadData()
                setTimeout(() => {
                    getBgAuto()
                }, 1000);
            }
        } else {
            $("body#body").append(`<div class="welcome wel sign"><div><p>请确保你输入的是一个链接</p></div></div>`);
            setTimeout(() => { $(".welcome.wel").remove() }, 4700);
        }

        function saveCollect() {
            var local = getDate();
            local.push({
                url: $("#linkUrlTextInput").val(),
                title: $("#linkTitleTextInput").val()
            });
            saveDate(local);
            loadCol();
        };
    });
    $(".collect-list").on("click", "i.del", function () {
        var data = getDate();
        var index = $(this).attr("index");
        data.splice(index, 1);
        saveDate(data);
        loadCol();
    });

    function saveDate(data) {
        localStorage.setItem("CollectList", JSON.stringify(data))
    }

    function loadCol() {
        var data = getDate();
        $(".collect-list").empty();
        $(".collect-list-2").empty();
        $.each(data, function (i, n) {
            $(".collect-list").append("<li><a title=" + n.title + " onclick='" + appAndLinkStart(n.url) + "'><collect-img style='background: url(\"https://stear.cn/api/favicon/get.php?url=" + n.url + "\");'></a><div class='linkInfoDiv'><p class='collect-title'>" + n.title + "</p><span>" + n.url + "</span><div><i class='copy' index=" + i + ">复制</i><i class='del' index=" + i + ">删除</i></div></div></li>")
            $(".collect-list-2").append("<collect-li><a title=" + n.title + " onclick='" + appAndLinkStart(n.url) + "' target='_blank'><collect-img style='background: " + getBg(n.url) + "></a><p class='collect-title'>" + n.title + "</p><span>" + n.url + "</span><collect-del-input index=" + i + "></collect-del-input></collect-li>")
        });
        $(".collect-list-2").append("<collect-li><a title='添加或修改收藏的网站' class='corrugation' id='addOrDelCollect' onclick='addOrDelCollect(event)'><collect-img></collect-img></a></collect-li>");
    }
    $(".collect-list").on("click", "i.copy", function () {
        var index = $(this).attr("index");
        var data = getDate();
        for (let i = 0; i < data.length; i++) {
            if (i == index) {
                copyText = data[i].url;
                console.log(copyText)
                $("#copyBox").val(copyText)
                $("#copyBox").select();
                document.execCommand("copy");
                $(this).val("复制完毕");
            }
        }
    });
    function getDate() {
        var data = localStorage.getItem("CollectList");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    };
    function appAndLinkStart(data) {
        final = data
        if (/^((https|http|ftp|rtsp|mms)?:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])[^\s]+/.test(final)) {
            return 'window.open("' + final + '")';
        } else {
            return final;
        }
    }

    function getBg(data) {
        if (/^((https|http|ftp|rtsp|mms)?:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])[^\s]+/.test(data)) {
            return 'url(https://stear.cn/api/favicon/get.php?url=' + data + ')\'';
        } else {
            return 'var(--iconVar)\' data-getBgAuto'
        }
    }
});

function loginInCheck() {
    if ($("html").attr("login") == "no") {
        location.href = "./../account/?from=https://stear.cn"
    }
}
function showLinks() {
    $("#linkList").load("./../admin/xn-link.html", '', function () {
        setTimeout(() => {
            $("#linkListUl").load("./../api/admin/xn-link-linkreview.php?num=10&p=1")
            $("#data").attr("data-link-p", '2')
        }, 100);
    })
}
function loadMoreLink() {
    $.get(
        'api/admin/xn-link-linkreview.php?num=10&p=' + Number($("#data").attr("data-link-p")),
        function (data) {
            if (data == 'null') {
                $("#loadMoreInput").val("---------==我还是有底线的ヽ(*。>Д<)o゜==---------");
                $("#loadMoreInput").attr("onclick", "");
            } else {
                $("#linkListUl").append(data);
                $("#data").attr("data-link-p", Number($("#data").attr("data-link-p")) + Number(1))
            }
        }
    )
}

function addLinkFromServer(data) {
    title = $(data).children('div.link-pre-info').children('p.title').text();
    link = $(data).children('div.link-pre-icon').attr("a");
    $(data).attr("class", "done")
    $("#linkTitleTextInput").val(title)
    $("#linkUrlTextInput").val(link)
    $("#overEnterLink").click()
}
function linkSearch() {
    key = $(".searchBox.pre input").val();
    $("#linkListUl").load("./../api/admin/xn-link-linkreview.php?mode=search&key=" + key + "&num=20&p=1")
}
$('#searchEngineList li:not(li[not])').click(function () {
    var d = this.getElementsByTagName('span')[2].innerHTML;
    setEngine(d)
});
function bgUrlsET(data) {
    localStorage.setItem('bgURL', data)
    setTimeout(() => {
        setBackgroundBox('tr', 'toImage')
    }, 100);
}
function loading(dom, em) {
    if (em !== 'a') {
        $(dom).load("./page/loading.html")
    } else {
        $(dom).html('');
    }
}
$('.set-tab li').click(function () {
    var d = this;
    $('.set-tab li').each(function () {
        this.className = this == d ? 'set-active' : '';
    });
});
$(function () {
    $('.set-tab li').click(function () {
        var index = $(this).index();
        $(".settingMain div.settingFa").eq(index).show().siblings().hide();
    })
});
$("#enginTextInput").on("keyup", function () {
    var urlTest = /^((https|http|ftp|rtsp|mms)?:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])[^\s]+/;
    if (urlTest.test(this.value)) {
        setEngine(this.value)
    }
    if (ContentDetection(this.value) == 'empty') {
        setEngine('https://cn.bing.com/search?q=')
    }
})
$("#enginTextInput").on("blur", function () {
    var urlTest = /^((https|http|ftp|rtsp|mms)?:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])[^\s]+/;
    if (urlTest.test(this.value)) {
        console.log('sss')
    }
    if (ContentDetection(this.value) == 'empty') {
        setEngine('https://cn.bing.com/search?q=')
    }
})

$("ul.set-tab li:nth-child(4)").on("click",function () {
    $('#memo_web_content').attr('src', "./../tool/memo/?theme=" + ls("theme").split(" ")[0] + "&from=startPage");
})
// $(document).on("click",)

// loadMemo();
loadCheckBox()