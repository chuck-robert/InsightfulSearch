function ChangeColor() {
    btheme = $("body").attr("class")
    color = btheme.split('dark ').join("").split("light ").join("");
    theme = btheme.split(' green').join("").split(" orange").join("").split(" blue").join("").split(" pink").join("");
    if (theme == 'light') {
        $("body").attr("class", "dark " + color)
        localStorage.setItem("theme", "dark " + color)
    } else {
        $("body").attr("class", "light " + color)
        localStorage.setItem("theme", "light " + color)
    }
}
function changeThemeColor(data) {
    btheme = $("body").attr("class")
    theme = btheme.split(' green').join("").split(" orange").join("").split(" blue").join("").split(" pink").join("");
    $("body").attr("class", theme + ' ' + data)
    localStorage.setItem("theme", theme + ' ' + data)
}
var jsonA = ls('settingData', 'json');
function loadA() {
    if (localStorage.getItem('theme') == null) {
        localStorage.setItem('theme', 'light blue');
        $("body").attr("class", localStorage.getItem("theme"))
    } else {
        $("body").attr("class", localStorage.getItem("theme"))
        btheme = $("body").attr("class")
        theme = btheme.split(' green').join("").split(" orange").join("").split(" blue").join("").split(" pink").join("");
        color = btheme.split('dark ').join("").split("light ").join("");
    }
    if (jsonA.minimalist == true) {
        $("body").attr("class", 'light blue')
        $("body").attr("mode", 'minimalist')
    }
    if (jsonA.minimalistLess == true) {
        $("body").attr("mode", 'minimalistLess')
    }
    if (ls('searchEngin') !== 'empty') {
        $("#searchForm").attr("engin", ls('searchEngin'))
    }
    if (jsonA.InvokeByDynamicParameters == true) {
        $("html").attr("ibdp", 'true')
    }
    if (jsonA.loginWelcome == true) {
        $(".welcome.wel.a").remove()
    } else {
        setTimeout(() => {
            $(".welcome.wel.a").remove()
        }, 4700);
    }
    if (jsonA.allTime == true) {
        $("#timeBody").attr("mode", 'show')
    }
    if (jsonA.TM_glass == true) {
        TM('glass')
    }
    if (!(jsonA.minimalist === true || jsonA.minimalistLess === true)) {
        setBackgroundBox()
    }
    mask()
    loadWeather()
    collect_pbc()
}
function loadWeather() {
    if (jsonA.weather) {
        $("body").append(`<div id="weatherBox" class="load_fadeIn_left"><div class="weather-header"><div class="showBox">上海市 </div><img src="./data/image/weather/16.png" alt="ICON"><span>31℃</span><span onclick="xnAppId(3)">更换城市</span></div><div class="weather-body"><div data-03abd2caa><div data-03abd2ca data-0110a2a><div data-03abd2ca data-0110a2a data-0110a1a>33°</div><div data-03abd2ca data-0110a2a data-0110a1b><span data-03abd2ca data-0110a3a><i class="fal fa-leaf"></i><span></span></span><span data-03abd2ca data-0110a3b><i class="fal fa-cloud"></i><span></span></span></div></div><div data-03abd2ca data-0110a2b><div data-03abd2ca-a1b2></div></div></div></div></div>`)
        var url = "./../../api/weather.v2.php?city=" + ls("startPageValueData", "json").city;
        var request = new XMLHttpRequest();
        request.open("POST", url);
        request.send();
        request.onload = function () {
            if (request.status == 200) {
                var currentDate = new Date();
                var currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                var json = JSON.parse(request.responseText);
                $(".weather-header > .showBox").text(json.cityInfo.city + " ");
                $(".weather-header > img").attr("src", "./data/image/weather/" + weatherImg(json.data.forecast[0].type) + ".png");
                $(".weather-header > span:nth-child(3),div[data-03abd2ca][data-0110a2a][data-0110a1a]").text(json.data.wendu + "°");
                $("span[data-0110a3a][data-03abd2ca] span").text(aqi(json.data.forecast[0].aqi)[1]);
                $("span[data-0110a3b][data-03abd2ca] span").text(json.data.forecast[0].fx);
                $("div[data-03abd2ca-a1b2]").html('');
                json.data.forecast.forEach(data => {
                    low = data.low.split("低温 ").join("").split("℃").join("°");
                    high = data.high.split("高温 ").join("").split("℃").join("°");
                    list = `<div data-a2b1><span class="date">` + currentMonth + `/` + data.date + `</span><img class="type" src="./data/image/weather/` + weatherImg(data.type) + `.png" alt="` + data.type + `"><span class="tem">` + low + `/` + high + `</span><span class="aqi ` + aqi(data.aqi)[0] + `">` + aqi(data.aqi)[1] + `/` + data.aqi + `</span></div>`;
                    $("div[data-03abd2ca-a1b2]").append(list)
                });
            }
        }
    }
}
function aqi(aqi) {
    if (aqi <= 50) {
        return ["A", "优"]
    } else if (aqi <= 100) {
        return ["B", "良"]
    } else if (aqi <= 150) {
        return ["C", "轻度"]
    } else if (aqi <= 200) {
        return ["D", "中度"]
    } else if (aqi <= 300) {
        return ["E", "重度"]
    } else {
        return ["F", "严重"]
    }
}
function weatherImg(weather) {
    w = ["暴雪", "暴雨", "暴雨到大暴雨", "大暴雨", "大暴雨到特大暴雨", "大到暴雪", "大到暴雨", "大雾", "大雪", "大雨", "冻雨", "多云", "浮尘", "雷阵雨", "雷阵雨伴有冰雹", "霾", "浓雾", "强浓雾", "强沙尘暴", "晴", "沙尘暴", "特大暴雨", "特强浓雾", "无", "雾", "小到中雪", "小到中雨", "小雪", "小雨", "严重霾", "扬沙", "夜间多云", "夜晴", "阴", "雨夹雪", "阵雪", "阵雨svg", "中到大雪", "中到大雨", "中度霾", "中雪", "中雨", "重度霾"]
    var index = w.indexOf(weather) + 1;
    return index;
}
function TM(theme) {
    setTimeout(() => {
        if ($("body#body").attr("theme") !== theme) {
            $("body#body").attr("theme", theme)
        } else {
            $("body#body").attr("theme", "")
        }
    }, 10);

}


function attr_data(id) {
    let attr_data = {
        1: "glass"
    }
    return attr_data[id]
}
var jsonA = ls('settingData', 'json');
function ibdp() {
    setTimeout(() => {
        $("html").attr("ibdp", document.getElementById("InvokeByDynamicParameters").checked)
    }, 100);
}
function allTime() {
    if ($("#timeBody").attr("mode") == "show") {
        $("#timeBody").attr("mode", 'hide')
    } else {
        $("#timeBody").attr("mode", 'show')
    }
}
function collect_pbc() {
    var jsonA = ls('settingData', 'json');
    if (jsonA.previewBackgroundColor == true) {
        $(".collect-list-2").attr("pbc", 'true')
    } else {
        $(".collect-list-2").attr("pbc", 'false')
    }
}
function checkMinimalist() {
    if ($("body").attr("mode") == 'minimalist') {
        $("body").attr("class", localStorage.getItem("theme"))
        setBackgroundBox()
        $("body").attr("mode", 'auto')
    } else {
        checkT("minimalist");
        setTimeout(() => {
            $("body").attr("class", 'light blue')
            $("body").attr("mode", 'minimalist')
        }, 100);
    }
}
function checkMinimalistLess() {
    if ($("body").attr("mode") == 'minimalistLess') {
        $("body").attr("mode", 'auto')
        setBackgroundBox()
    } else {
        checkT("minimalistLess");
        setTimeout(() => {
            $("body").attr("mode", 'minimalistLess')
        }, 100);
    }
}
function setBackgroundBox(data, mode) {
    var imgURL = ls("bgURL");
    if (/.(mp4|avi|wmv|mpeg|m4v|mov|asf|flv|f4v)+$/.test(imgURL)) {
        $('#backgroundBoxImage').each(function () {
            $(this).replaceWith($('<video src=' + imgURL + ' autoplay="" loop="" muted="" id="backgroundBoxImage" alt="" class="bg-focus" onload="bbiSuccessLoad()">'));
        });
    } else {
        if ($('#backgroundBoxImage').get(0).tagName == 'IMG') {
            backgroundA(data);
        } else {
            $('#backgroundBoxImage').each(function () {
                $(this).replaceWith($('<img src="' + imgURL + '" alt="" id="backgroundBoxImage" class="bg-focus" onload="bbiSuccessLoad()">'));
            });
            backgroundA(data);
        }
    }
}
function backgroundA(d) {
    if (ls("bgURL") == 'empty') {
        localStorage.setItem('bgURL', './data/image/pro/background/1.webp');
        $("#backgroundBoxImage").attr('src', ls("bgURL"));
    } else {
        if (d == 'tr') {
            $("#backgroundBoxImage").css('transform', 'scale(1.5)');
            $("#backgroundBoxImage").css('filter', 'blur(10px) brightness(0.1)');
            setTimeout(() => {
                $("#backgroundBoxImage").css('transform', '');
                setTimeout(() => {
                    $("#backgroundBoxImage").attr('src', ls("bgURL"));
                    $("#backgroundBoxImage").css('filter', '');
                }, 100)
            }, 300);
        } else {
            $("#backgroundBoxImage").attr('src', ls("bgURL"));
        }
    }
}
function goS() {
    if (ls("settingData", 'json').autoLinkGo == false) {
        goSearch()
    } else {
        $("#text").focus();
    }
}
function goSearch() {
    if (/^[ ]*$/.test($("#text").val())) {
        return false;
    } else {
        setTimeout(function () {
            window.open(document.getElementById("searchForm").getAttribute("engin") + document.getElementById("text").value)
        }, 0)
    }
}
function mask() {
    if (ls('settingData', 'json').backMask == true) {
        $("#mask")[0].className += ' hide'
    } else {
        $("#mask")[0].className = $("#mask")[0].className.split(' hide').join("")
    }
}
function exportData() {
    var collectList = ls('CollectList');
    var theme = ls('theme');
    var bgURL = ls('bgURL');
    var memoList = ls('memoList');
    var settingData = ls('settingData');
    var data = {
        collectList: collectList,
        theme: theme,
        bgURL: bgURL,
        memoList: memoList,
        settingData: settingData
    };
    var link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }));
    link.download = 'Stearsoft_NewPage_data_' + Date.now(); +'.json';
    link.click();
}

function importData(fileInput) {
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
        var data = JSON.parse(event.target.result);
        var collectList = data.collectList;
        var theme = data.theme;
        var bgURL = data.bgURL;
        var memoList = data.memoList;
        var settingData = data.settingData;
        lss('CollectList', collectList.split("empty").join("[]"));
        lss('theme', theme);
        lss('bgURL', bgURL);
        lss('memoList', memoList.split("empty").join("[]"));
        lss('settingData', settingData.split("empty").join("[]"));
        $("body#body").append(`<div class="welcome wel"><div><p>导入成功</p></div></div>`);
        setTimeout(() => {$(".welcome.wel").remove()}, 4700);
    };

    reader.readAsText(file);
}
function checkT(id, mode, mode2) {
    setTimeout(() => {
        if (mode2 !== 'false') {
            if (mode == 'r') {
                document.getElementById(id + '-checkcolor').checked = true;
            } else {
                document.getElementById(id).checked = true;
            }
        } else {
            document.getElementById(id).checked = false;
        }
    }, 100);
}
function saveSetting() {
    var setting = {
        "backMask": document.getElementById('backMask').checked,
        "minimalist": document.getElementById("minimalist").checked,
        "minimalistLess": document.getElementById("minimalistLess").checked,
        "CleanUpSearchBox": document.getElementById("CleanUpSearchBox").checked,
        "autoLinkGo": document.getElementById("autoLinkGo").checked,
        "startFocus": document.getElementById("startFocus").checked,
        "InvokeByDynamicParameters": document.getElementById("InvokeByDynamicParameters").checked,
        "previewBackgroundColor": document.getElementById("previewBackgroundColor").checked,
        "loginWelcome": document.getElementById("loginWelcome").checked,
        "allTime": document.getElementById("allTime").checked,
        "oneWord": document.getElementById("oneWord").checked,
        "TM_glass": document.getElementById("TM_glass").checked,
        "weather": document.getElementById("weather").checked,
        "autoGetInfor": document.getElementById("autoGetInfor").checked,
        "autoUploadInfor": document.getElementById("autoUploadInfor").checked,
    }
    localStorage.setItem("settingData", JSON.stringify(setting))
}

function lss(key, value) {
    if (value === undefined) {
        return localStorage.getItem(key);
    } else {
        localStorage.setItem(key, value);
    }
}
function ls(item, p) {
    if (localStorage.getItem(item) !== null) {
        if (p == 'json') {
            return JSON.parse(localStorage.getItem(item));
        } else {
            return localStorage.getItem(item);
        }
    } else {
        return 'empty';
    }
}
$(document).ready(function () {
    loadA()
})