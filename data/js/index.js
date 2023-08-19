let closeAppList = [];
var city;
var startPageValueData = {
	"city": "101010100"
}
function cityID() {
	$.get("./../../api/visitor.php", function (json) {
		k = json.location.split("-")
		v = k[k.length - 1].split("市").join("")
		$.getJSON("./../../data/json/city.json", function (data) {
			var id = data.city.filter(function (item) {
				return item.name === v;
			});
			startPageValueData.city = id[0].city_code;
		});
	});
}
if (ls("startPageValueData") === "empty") {
	cityID()
	setTimeout(() => {
		localStorage.setItem("startPageValueData", JSON.stringify(startPageValueData));
	}, 5000);
}


if (location.protocol == "http:") {
	location.search = 'from=http'
	location.protocol = "https:"
}
Date.prototype.format = function (fmt) {
	var o = {
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	}
	return fmt;
}
function fullDateSet() {
	var now = new Date();
	var year = now.getFullYear();
	var month = PrefixZero(now.getMonth() + 1, 2);
	var date = PrefixZero(now.getDate(), 2);
	var day = now.getDay();

	var week_days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
	$("#date").html(year + "-" + month + "-" + date + " " + week_days[day])
}
setInterval("$('#dateTime').html((new Date()).format('hh:mm'));$('#dateTime').attr('class','timeBegin');fullDateSet()", 1000);
setTimeout(() => {
	$("#body").attr("onmousemove", "windowsXZMove(this,event)")
}, 100);
$("#TMTR_Box > li:not(li[not-closeMenu])").on("click", function () {
	showMenu();
})
function showMenu() {
	if ($(".engineList").css("display") !== "none") { data_01b3cad3() }
	var dsms = $("#data").attr("data-setting-menu-show")
	box = $("#toolMenuTopRight");
	if (dsms == 'show') {
		$("#data").attr("data-setting-menu-show", "hide")
		box.css("display", "block")
		setTimeout(() => {
			box.css("max-height", "300px")
		}, 0);
	} else {
		$("#data").attr("data-setting-menu-show", "show")
		box.css("max-height", "0")
		if (dsms == "hide") {
			setTimeout(() => {
				box.css("display", "none")
			}, 300);
		}
	}
}
function setEngine(url) {
	localStorage.setItem("searchEngin", url)
	$("#searchForm").attr("engin", url)
}
var text = $("#text");
var word = $("#word");
text.on("focus", function () {
	MemoBarConfig("close");
	$("div#appList")[0].className = "";
	$("#backgroundBoxImage").attr("class", 'bg-focus')
	if (ContentDetection($('#word').html()) !== 'empty') {
		word.css("display", "block")
		setTimeout(() => {
			word.css("max-height", "600px")
			word.css("padding-bottom", "10px")
		}, 33);
		word.css("opacity", '1')
	}
	$(".searchBody").attr("class", "searchBody search")
	$("#sentence").hide()
	if ($(".engineList").css("display") !== "none") { data_01b3cad3() }
})
text.on("blur", function () {
	if ($(".memoFixedList").length > 0) {
		MemoBarConfig("open");
	}
	if (closeAppList == '') {
		$("div#appList")[0].className = "";
	} else {
		$("div#appList")[0].className = "open";
	}
	$("#backgroundBoxImage").attr("class", '')
	setTimeout(() => {
		word.css("max-height", "0")
		word.css("padding-bottom", "0")
		word.css("display", "none")
	}, 333);
	word.css("opacity", '0')
	if (ls('settingData', 'json').CleanUpSearchBox == true) {
		$("#text").val("")
	}
	$(".searchBody").attr("class", "searchBody")
	if (ls("settingData", "json").oneWord == true) {
		$("#sentence").show()
	}
})
text.on("keyup", function () {
	word.css("display", "block")
	setTimeout(() => {
		// word.css("max-height", "600px")
		word.css("padding-bottom", "10px")
	}, 33);
	word.css("opacity", '1')
})
function bgFocus(data) {
	$("#backgroundBoxImage").attr("class", data)
}
function openUrl(url, mode) {
	if (mode == 'outside') {
		window.open(url)
	} else if (mode == 'inside') {
		location.href = url;
	} else if (mode == 'fun') {
		myCountFunction(url)
	}
}
function myCountFunction(number) {
	if (number == 1) {
		console.log("测试成功");
	} else if (number == 2) {
		loadFiexdMemos();
		if ($("html").attr("class") == 'mode-timeClick') {
			$("#dateTime").click()
		}
		if ($(".setting").css("display") == 'none') {
			MemoBarConfig("close");
			if ($("#data").attr("data-settingUI") == 'close') {
				$(".setting").load('./page/setting.html', function (response, status, xhr) {
					if (status == "success") {
						loadSettingUIfun();
						___ce_infoShow();
					} else {
						$(".setting").html(`<iframe id="wallHavenLoadProgress" srcdoc="<html><body><div class=&quot;loaderB&quot;></div><p style=&quot;margin-left: 35px;color: #000000cc;font-size: 20px;&quot; onclick=&quot;window.parent.location.reload();&quot;>加载失败,重新加载？</p><body>
        <style>body {display: flex;align-items: center;justify-content: center;background:#f7f7f7;height: 100px;margin: auto;top: 0;bottom: 0;position: absolute;left: 0;right: 0;}:root {--color-1: hsl(215, 70%, 52%);--color-2: hsl(288, 70%, 52%);--color-3: hsl(151, 70%, 52%);--color-4: hsl(104, 70%, 52%);--speed: 2s;}
        .loaderB {animation: rotate var(--speed) infinite;height: 50px;width: 50px;}
        .loaderB:before,.loaderB:after {border-radius: 50%;content: '';display: block;height: 20px;width: 20px;}
        .loaderB:before {animation: ball1 1s infinite;background-color: var(--color-3);box-shadow: 30px 0 0 var(--color-1);margin-bottom: 10px;}
        .loaderB:after {animation: ball2 1s infinite;background-color: var(--color-4);box-shadow: 30px 0 0 var(--color-2);}
        @keyframes rotate {0% {-webkit-transform: rotate(0deg) scale(0.8);-moz-transform: rotate(0deg) scale(0.8);}50% {-webkit-transform: rotate(360deg) scale(1.2);-moz-transform: rotate(360deg) scale(1.2);}100% {-webkit-transform: rotate(720deg) scale(0.8);-moz-transform: rotate(720deg) scale(0.8);}}
        @keyframes ball1 {0% {box-shadow: 30px 0 0 var(--color-1);}50% {box-shadow: 0 0 0 var(--color-1);margin-bottom: 0;-webkit-transform: translate(15px, 15px);-moz-transform: translate(15px, 15px);}100% {box-shadow: 30px 0 0 var(--color-1);margin-bottom: 10px;}}
        @keyframes ball2 {0% {box-shadow: 30px 0 0 var(--color-2);}50% {box-shadow: 0 0 0 var(--color-2);margin-top: -20px;-webkit-transform: translate(15px, 15px);-moz-transform: translate(15px, 15px);}100% {box-shadow: 30px 0 0 var(--color-2);margin-top: 0;}}
        <style></html>" frameborder="0" height="100%" width="100%" data-v-0a2a8a21=""></iframe></div>`)
					}
				});
				setTimeout(() => {
					loadSvg()
				}, 100);
				$("#data").attr("data-settingUI", 'appear')
			}
			$("html").attr("class", 'mode-setting')

			$(".setting").css("display", 'block')
			setTimeout(() => {
				$(".setting").css("opacity", '')
				$(".setting").css("transform", '')
			}, 1);
			$("#backgroundBoxImage").attr("class", 'bg-focus')
		} else {
			$(".setting").css("opacity", '0')
			$(".setting").css("transform", 'scale(.75)')
			setTimeout(() => {
				$(".setting").css("display", 'none')
				if ($(".memoFixedList").length > 0) {
					MemoBarConfig("open");
				}
			}, 430);
			$("html").attr("class", '')
			$("#backgroundBoxImage").attr("class", '')
			autoUploadData();
		}
	} else if (number == 3) {
		// 全屏设置界面
		if ($("#setting")[0].className == 'setting') {
			$("#setting")[0].className = 'setting full'
		} else {
			$("#setting")[0].className = 'setting'
		}
	} else {
		console.log('无法调用函数')
	}
}
if ($("html").attr("mode") == "close") {
	location.href = "./../../error/404.html"
}
$("#dateTime").on("click", function () {
	if ($(".engineList").css("display") !== "none") { data_01b3cad3() }
	if ($("html").attr("class") !== 'mode-timeClick') {
		$("html").attr("class", 'mode-timeClick')
		$("#backgroundBoxImage").attr("class", 'bg-focus')
		$(".time-click-collect").css("display", 'block')
		MemoBarConfig("close");
		setTimeout(() => {
			$(".time-click-collect").css("opacity", '1')
		}, 100);
	} else {
		if ($(".memoFixedList").length > 0) {
			MemoBarConfig("open");
		}
		$("html").attr("class", '')
		$("#backgroundBoxImage").attr("class", '')
		$(".time-click-collect").css("display", 'none')
		$(".time-click-collect").css("opacity", '0')
	}
})
function autoUploadData() {
	if (ls("settingData", "json").autoUploadInfor) {
		setTimeout(() => {
			if (getCookie("XnUserName") !== "empty") {
				memoList = ls("memoList", "json")
				CollectList = ls("CollectList", "json")
				data = {
					"memoList": memoList,
					"CollectList": CollectList
				}
				var request = new XMLHttpRequest();
				request.open("POST", "./../../admin/entries_sheet.php?mode=upload");
				request.onload = function () {
					if (request.status == 200) {
						var responseText = JSON.parse(request.responseText);
						if (responseText.state !== 1002) {
							$("body#body").append(`<div class="welcome wel"><div><p>` + responseText.text + `</p></div></div>`);
							setTimeout(() => { $(".welcome.wel").remove() }, 4700);
						}
					}
				};
				request.send(JSON.stringify(data));
			} else {
				$("body#body").append(`<div class="welcome wel sign"><div><p>请登录</p></div></div>`);
				setTimeout(() => { $(".welcome.wel").remove() }, 4700);
			}
		}, 10);
	}
}
function weather() { }
if (ls("loginFlag") == "true" && getCookie("XnUserName") !== "empty") {
	setTimeout(() => {
		$("body#body").append(`<div class="welcome wel k"><div><p>我们将为您打开自动同步数据</p></div></div>`);
		setTimeout(() => { $(".welcome.wel.k").remove() }, 4700);
		if (ls('settingData', 'json') == "empty") {
			a = {
				"backMask": false,
				"minimalist": false,
				"minimalistLess": false,
				"CleanUpSearchBox": false,
				"autoLinkGo": false,
				"startFocus": false,
				"InvokeByDynamicParameters": false,
				"previewBackgroundColor": false,
				"loginWelcome": false,
				"allTime": false,
				"oneWord": false,
				"TM_glass": false,
				"weather": false,
				"autoGetInfor": true
			}
			lss("loginFlag", "验证")
			lss("settingData", JSON.stringify(a))
		} else {
			var data = ls("settingData", "json");
			data.autoGetInfor = true;
			var modifiedJsonStr = JSON.stringify(data);
			lss('settingData', modifiedJsonStr);
			lss("loginFlag", "验证")
		}
	}, 1000);
}
var doneLoginFlagSetting_change;
$(document).ready(function () {
	var $option1 = $('.option1');
	var $option2 = $('.option2');

	$option1.click(function () {
		$(this).toggleClass('active');
		$option2.removeClass('active');
		doneLoginFlagSetting_change = "覆盖"
	});

	$option2.click(function () {
		$(this).toggleClass('active');
		$option1.removeClass('active');
		doneLoginFlagSetting_change = "叠加"
	});
});
function doneLoginFlagSetting() {
	if (doneLoginFlagSetting_change == "覆盖") {
		autoGetData();
		localStorage.removeItem("loginFlag")
	} else {
		localStorage.removeItem("loginFlag")
		if (getCookie("XnUserName") !== "empty") {
			var request = new XMLHttpRequest();
			request.open("POST", "./../../admin/entries_sheet.php?mode=getInfo");
			request.onload = function () {
				if (request.status == 200) {
					var responseText = JSON.parse(request.responseText);
					if (responseText.state == 2001) {
						var memoList = responseText.info.memoList;
						var collectList = responseText.info.collect;
						if (memoList !== []) {
							var storedMemoList = JSON.parse(localStorage.getItem("memoList")) || [];
							var updatedMemoList = storedMemoList.concat(dealData(memoList));
							localStorage.setItem("memoList", JSON.stringify(updatedMemoList));
						}
						if (collectList !== []) {
							var storedCollectList = JSON.parse(localStorage.getItem("CollectList")) || [];
							var updatedCollectList = storedCollectList.concat(dealData(collectList));
							localStorage.setItem("CollectList", JSON.stringify(updatedCollectList));
						}
						linkLove();
						autoUploadData()
						function dealData(data) {
							if (/^\s*$/.test(data) || "|" + data + "|" == "||") {
								return [];
							} else {
								return JSON.parse(data.split("\"empty\"").join("[]"));
							}
						}
					}
				}
			};
			request.send();
		}
	}
	$(".messageBox").remove()
}
if (ls('settingData', 'json').autoGetInfor) {
	if (ls("loginFlag") == "empty") {
		autoGetData();
	} else if (ls("loginFlag") == "验证") {
		$("body#body").append(`<div class="messageBox"><p class="title">检测到服务器同步的数据</p><p class="text">本提示只会在首次登陆之后提示</p>
		<div class="choices"><p class="choice option1 corrugation">允许直接覆盖本地数据</p><p class="choice option2 corrugation">重叠数据，并且更新</p></div>
		<p class="text">为什么会出现此页面，因为本站的“标签页”以及“笔记”功能均是非登录即可使用，当登陆时候，会进行同步，从而出现新数据与本地的旧数据冲突的情况</p>
        <div class="buttonBox"><input type="button" value="确认" onclick="doneLoginFlagSetting()"></div></div>`)
	}
}
function autoGetData() {
	if (getCookie("XnUserName") !== "empty") {
		var request = new XMLHttpRequest();
		request.open("POST", "./../../admin/entries_sheet.php?mode=getInfo");
		request.onload = function () {
			if (request.status == 200) {
				var responseText = JSON.parse(request.responseText);
				if (responseText.state == 2001) {
					if (responseText.memoList !== []) {
						localStorage.setItem("memoList", dealData(responseText.info.memoList))
					}
					if (responseText.collect !== []) {
						localStorage.setItem("CollectList", dealData(responseText.info.collect))
					}
					JSON.stringify(ls("memoList", "json").concat(dealData(responseText.info.memoList)))
					linkLove()
					function dealData(data) {
						if (/^\s*$/.test(data) || "|" + data + "|" == "||") {
							return [];
						} else {
							return data.split("\"empty\"").join("[]");
						}
					}
				}
			}
		};
		request.send();
	}
}
linkLove()
function linkLove() {
	var data = getDateA();
	$(".collect-list-2").empty();
	$.each(data, function (i, n) {
		$(".collect-list-2").append("<collect-li><a title=" + n.title + " onclick='" + appAndLinkStart(n.url) + "' target='_blank'><collect-img style='background: " + getBg(n.url) + "></a><p class='collect-title'>" + n.title + "</p><span>" + n.url + "</span><collect-del-input index=" + i + "></collect-del-input></collect-li>")
	});
	$(".collect-list-2").append("<collect-li><a title='添加或修改收藏的网站' class='corrugation' id='addOrDelCollect' onclick='addOrDelCollect()'><collect-img></collect-img></a></collect-li>");
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
}
setTimeout(() => {
	getBgAuto()
}, 1000);
function getBgAuto() {
	var url = "./data/json/appList.json"
	var request = new XMLHttpRequest();
	request.open("get", url);
	request.send(null);
	request.onload = function () {
		if (request.status == 200) {
			a = $("collect-img[data-getBgAuto]").length;
			for (let i = 0; i < a; i++) {
				b = $($("collect-img[data-getBgAuto]")[i]).parent().attr("onclick")
				if (/xnAppId/.test(b)) {
					json = JSON.parse(request.responseText);
					id = b.split("xnAppId(").join("").split(")").join("");
					iconUrl = json.appDataList[id - 1].icon
					$("collect-img[data-getBgAuto]")[i].style.setProperty("--iconVar", "url('" + iconUrl + "')")
				}
			}
		}
	}
}
welWork()
function welWork() {
	now = new Date(), hour = now.getHours()
	var wt = document.getElementById("welTime")
	if (hour < 6) { wt.innerText = "凌晨" }
	else if (hour < 9) { wt.innerText = "早上" }
	else if (hour < 12) { wt.innerText = "上午" }
	else if (hour < 14) { wt.innerText = "中午" }
	else if (hour < 17) { wt.innerText = "下午" }
	else if (hour < 19) { wt.innerText = "傍晚" }
	else if (hour < 22) { wt.innerText = "晚上" }
	else { wt.innerText = "夜里" }
}
function xnAppId(id) {
	createWindowsFunction(id)
}
function createWindowsFunction(id) {
	var url = "./data/json/appList.json"
	var request = new XMLHttpRequest();
	request.open("get", url);
	request.send(null);
	request.onload = function () {
		if (request.status == 200) {
			var json = JSON.parse(request.responseText);
			var queryData = json.appDataList.filter(appDataList => {
				return appDataList.id === id;
			})
			data = queryData[0].json;
			createWindows(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]);
		}
	}
}
function createWindows(headerIcon, headerTitle, windowBackgroundType, windowBackgroundData, windowId, bodyType, bodyData, settingJson) {
	icon = headerIcon;
	title = headerTitle;
	wt = windowBackgroundType;
	wd = windowBackgroundData;
	wi = windowId;
	bt = bodyType;
	bd = bodyData;
	json = settingJson;
	DSHeaderInfo = json.headerInfo;
	DSbodyMaxMainWidth = json.wfullmaxWidthmain;
	width = json.width;
	height = json.height;
	fullMode = json.fullMode;

	html = '<div class="windowHtml ' + wt + ' ' + bt + '" style="' + windowBackground() + '--DSbodyMaxMainWidth:' + DSbodyMaxMainWidth + ';height:' + height + ';width:' + width + ';" id="' + wi + '" data-swf-AUTO="' + fullMode + '" data-setting-windows-full="' + fullMode + '" data-setting-headerInfo="' + DSHeaderInfo + '"><div class="header" onmousedown="windowsXZDown(this,event)" onmouseup="windowsXZUp(this)"><div class="titleBox"><img src="' + icon + '" alt=""><span>' + title + '</span></div></div><div class="buttonBox"><input type="button" onclick="fullWindows(\'#' + wi + '\',e)"><input type="button" onclick="delWindows(\'#' + wi + '\',e)"><input type="button" onclick="closeWindows(\'#' + wi + '\',e)"></div><div class="body"></div></div>';
	$("#windowsList").append(html);

	function windowBackground() {
		if (wt == 'img') {
			return '--background-image:url(' + wd + ");"
		} else if (wt == 'color') {
			return '--background-color:' + wd + ";"
		}
	}
	setTimeout(() => {
		if (bt == 'url') {
			$("#" + wi + " div.body").load(bd)
		} else if (bt == 'html') {
			document.getElementById(wi).getElementsByClassName("body")[0].innerHTML = bd
		}
	}, 100);
}
var x = 0;
var y = 0;
var x1 = 0;
var y1 = 0;
var moveable = false;
var index = 20000;
function windowsXZDown(obj, evt) {
	e = evt ? evt : window.event;
	x = e.clientX;
	y = e.clientY;
	x1 = parseInt($(obj).parent().css("left").substr(0, $(obj).parent().css("left").length - 2));
	y1 = parseInt($(obj).parent().css("top").substr(0, $(obj).parent().css("top").length - 2));
	moveable = true;
	if (moveable) {
		sessionStorage.setItem("windowMoveItemObj", $(obj).parent().attr("id"))
	}
	if (x1 < 0) {
		x1 = 0
	}
	$(obj).parent().attr("move", "true")
}

function windowsXZMove(obj, evt) {
	e = evt ? evt : window.event;
	if (moveable) {
		objA = "#" + sessionStorage.getItem("windowMoveItemObj")
		if ($(objA).attr("move") == "true") {
			moveX = x1 + e.clientX - x;
			moveY = y1 + e.clientY - y;
			$(objA).css("left", moveX + "px")
			$(objA).css("top", moveY + "px")
		}
	}
}
function windowsXZUp(obj) {
	moveable = false;
	$(obj).parent().attr("move", "false")
}
function delWindows(dom, e) {
	e.stopPropagation()
	$(dom).hide()
	iconSrc = $(dom + " > div.header > div.titleBox > img").attr("src")
	title = $(dom + " > div.header > div.titleBox > span").text()
	let appObjJson = JSON.stringify({
		id: dom,
		icon: iconSrc,
		title: title
	})
	appObjJson = JSON.parse(appObjJson)
	closeAppList.push(appObjJson)
	loadCloseAppList();
	if (closeAppList.length == 1) {
		$("div#appList")[0].className = "open";
	}
}
function closeWindows(dom, e) {
	e.stopPropagation()
	$(dom).remove()
}
function openWindows(dom, e) {
	e.stopPropagation()
	$(dom).show()
	for (let i = 0; i < closeAppList.length; i++) {
		json = closeAppList[i];
		if (json.id == dom) {
			closeAppList.splice(i, 1)
			loadCloseAppList();
			if (closeAppList == '') {
				$("div#appList")[0].className = "";
			}
		}
	}
}
function loadCloseAppList() {
	$("div#appList").html('')
	for (let i = 0; i < closeAppList.length; i++) {
		json = closeAppList[i];
		let dom = `<div onclick="openWindows('` + json.id + `',e)">
            <img src="`+ json.icon + `" alt="` + json.title + `">
            <span>`+ json.title + `</span>
        </div>`
		$("div#appList").append(dom)
	}
}
function fullWindows(dom, e) {
	e.stopPropagation()
	if ($(dom).attr("data-setting-windows-full") == "full") {
		$(dom).attr("data-setting-windows-full", "null")
	} else {
		$(dom).attr("data-setting-windows-full", "full")
	}
}
function bbiSuccessLoad() {
	$("#backgroundBoxImage").css("opacity", "1");
}
function addOrDelCollect(event) {
	$("#addOrDelCollect").attr("onclick", '')
	var e = event || window.event;
	poX = e.clientX
	poY = e.clientY
	wiW = window.innerWidth
	if (wiW - poX <= 310) {
		poX = wiW - 310
	}
	$("body").append(`<div data-043ba7a>
	<span class="addOrDelCollectBox fadeUp" style="top: `+ poY + `px;left: ` + poX + `px;">
		<li><svgcreate-div svgid="13"><svg t="1668239266146" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="29458" width="400" height="400"><path d="M823.296 60.416q65.536 0 99.328 38.4t33.792 93.696l0 543.744q0 25.6-21.504 46.08l-171.008 163.84q-13.312 11.264-22.528 14.336t-23.552 3.072l-459.776 0q-23.552 0-47.104-9.728t-41.984-27.648-30.208-43.008-11.776-55.808l0-634.88q0-60.416 33.28-96.256t94.72-35.84l568.32 0zM608.256 702.464q13.312 0 22.528-9.216t9.216-22.528q0-14.336-9.216-23.04t-22.528-8.704l-320.512 0q-13.312 0-22.528 8.704t-9.216 23.04q0 13.312 9.216 22.528t22.528 9.216l320.512 0zM736.256 509.952q13.312 0 22.528-9.216t9.216-22.528-9.216-22.528-22.528-9.216l-448.512 0q-13.312 0-22.528 9.216t-9.216 22.528 9.216 22.528 22.528 9.216l448.512 0zM799.744 318.464q13.312 0 22.528-9.216t9.216-23.552q0-13.312-9.216-22.528t-22.528-9.216l-512 0q-13.312 0-22.528 9.216t-9.216 22.528q0 14.336 9.216 23.552t22.528 9.216l512 0z" p-id="29459" fill="#3cbaf6"></path></svg></svgcreate-div><input type="text" id="tccTitle" autocomplete="off" placeholder="请输入标题"></li>
		<li><svgcreate-div svgid="12"><svg t="1668239064731" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15457" width="400" height="400"><path d="M62.296463 576.23471l64.234709-64.23471 85.676565 85.646279-42.853425 42.853425a121.140424 121.140424 0 0 0 0 171.292559l42.853425 42.853425a121.140424 121.140424 0 0 0 171.292559 0l214.145983-214.145984a121.140424 121.140424 0 0 0 0-171.322844l-42.823139-42.823139a120.080445 120.080445 0 0 0-24.440081-18.413345l88.705075-88.67479 85.64628 85.64628a211.995741 211.995741 0 0 1 0 299.822548l-256.969124 256.969123a211.995741 211.995741 0 0 1-299.822548 0l-85.646279-85.646279a211.995741 211.995741 0 0 1 0-299.822548z" fill="#0084ff" p-id="15458"></path><path d="M961.703537 447.76529l-64.234709 64.23471-85.676565-85.646279 42.853425-42.853425a121.140424 121.140424 0 0 0 0-171.292559l-42.853425-42.853425a121.140424 121.140424 0 0 0-171.292559 0l-214.145983 214.145984a121.140424 121.140424 0 0 0 0 171.322844l42.823139 42.823139a120.080445 120.080445 0 0 0 24.440081 18.413345L404.911866 704.734414l-85.64628-85.64628a211.995741 211.995741 0 0 1 0-299.822548l256.969124-256.969123a211.995741 211.995741 0 0 1 299.822548 0l85.646279 85.646279a211.995741 211.995741 0 0 1 0 299.822548z" fill="#95ccff" p-id="15459"></path></svg></svgcreate-div><input type="text" id="tccLink" autocomplete="off" placeholder="请输入地址" value="http://"></li>
		<li no-background="" no-padding=""><input type="button" class="corrugation" onclick="tccOK()" value="确认" data-043ba6d><input type="button" class="corrugation" value="取消" onclick="tccNo()"></li>
		<li class="disloginShow" no-background="" no-padding="">由于您并未登陆，所以你保存的链接将无法同步</li>
	</span></div>`)
	$("#tccTitle").focus()
}
function focusMode() {
	if ($("html").attr("mode") == "focues") {
		$("html").attr("mode", "")
		if ($(".memoFixedList").length > 0) {
			$(".memoFixedList").show()
		}

	} else {
		$("html").attr("mode", "focues")
		$("html").requestFullscreen;
		$(".memoFixedList").hide();
	}
}
function tccOK() {
	link = $("#tccLink").val()
	title = $("#tccTitle").val()
	if (/^((https|http|ftp|rtsp|mms)?:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])[^\s]+/.test(link)) {
		if (/^[ ]*$/.test(title)) {
			$("body#body").append(`<div class="welcome wel sign"><div><p>你需要输入一个合适的标题</p></div></div>`);
			setTimeout(() => { $(".welcome.wel").remove() }, 4700);
		} else {
			var local = getDateA();
			local.push({
				url: link,
				title: title
			});
			localStorage.setItem("CollectList", JSON.stringify(local))
			linkLove();
			tccNo();
			autoUploadData()
		}
	} else {
		$("body#body").append(`<div class="welcome wel sign"><div><p>请确保你输入的是一个链接</p></div></div>`);
		setTimeout(() => { $(".welcome.wel").remove() }, 4700);
	}
}
function tccNo() {
	$("#addOrDelCollect").attr("onclick", 'addOrDelCollect(event)')
	$("[data-043ba7a]").remove()
}
function getDateA() {
	var data = localStorage.getItem("CollectList");
	if (data !== null) {
		return JSON.parse(data);
	} else {
		return [];
	}
};
function loadSettingUIfun() {
	setTimeout(() => {
		loadJs('./page/setting.js');
	}, 100);
	setTimeout(() => {
		btheme = $("body").attr("class")
		theme = btheme.split(' green').join("").split(" orange").join("").split(" blue").join("").split(" pink").join("");
		color = btheme.split('dark ').join("").split("light ").join("");
		if (theme == 'dark') {
			checkT('theme-color');
		}
		setTimeout(() => {
			checkT(color, 'r');
		}, 100);
	}, 200)
}
function loadSvg() {
	var url = "./data/json/svg.json"
	var request = new XMLHttpRequest();
	request.open("get", url);
	request.send(null);
	request.onload = function () {
		if (request.status == 200) {
			for (let i = 0; i < document.getElementsByTagName("svgCreate-div").length; i++) {
				div = document.getElementsByTagName("svgCreate-div")[i];
				var json = JSON.parse(request.responseText);
				var queryData = json.svgList.filter(svgList => {
					return svgList.id === Number(document.getElementsByTagName("svgCreate-div")[i].getAttribute("svgId"));
				})
				svg = queryData[0].svg;
				document.getElementsByTagName("svgCreate-div")[i].innerHTML = svg;
			}
		}
	}
}
function loadJs(src) {
	setTimeout(() => {
		$("#jsFunctionLoadBox").prepend("<script src=\"" + src + "\"></script>")
	}, 100);
}
oneWord()
function oneWord() {
	if (ls("settingData", "json").oneWord == true) {
		$.get("../../api/text/aword.php", null,
			function (data, textStatus, jqXHR) {
				a = data.hitokoto
				b = data.from
				c = data.from_who

				$("body").append(`
		<div id="sentence" class="corrugation">
			<span class='sec'>「  `+ a + `  」</span>
			<span class='from'>
				<span class='before'>———</span>
				<span class='author' data-from="`+ b + `"> ` + c + `  《` + b + `》</span>
			</span>
		</div>
	`)
			},
			"json"
		);
	} else {
		$("#sentence").remove()
	}
}

function EngineSwitch() {
	if ($(".engineList").css("display") == "none") {
		$(".engineList").show();
	} else {
		data_01b3cad3()
	}
}
$(".engineList").on("click", "span", function () {
	u = $(this).attr("u");
	setTimeout(function () {
		window.open(u + $("#text").val())
	}, 0)
	data_01b3cad3()
})
function data_01b3cad3() {
	$(".engineList").removeClass("animate__fadeInUp");
	setTimeout(() => {
		$(".engineList").css("transform", "translate3d(0,100%,0)");
		$(".engineList").css("opacity", "0");
	}, 0);
	setTimeout(() => {
		$(".engineList").hide()
		$(".engineList").css("transform", "");
		$(".engineList").css("opacity", "");
		$(".engineList").addClass("animate__fadeInUp");
	}, 1000);
}

function openToolMenu() {
	$("li[data-top-menu]").hide()
	$("li[data-second-menu]").show()
}

function closeToolMenu() {
	$("li[data-top-menu]").show()
	$("li[data-second-menu]").hide()
}


loadFiexdMemos();
function loadFiexdMemos() {

	var fiexdMemoListPar = JSON.parse(localStorage.getItem("memoList"));
	if (fiexdMemoListPar !== null) {
		if (fiexdMemoListPar.hasOwnProperty("version") && fiexdMemoListPar.version === "2.0") {
			if ($(".memoFixedList").length > 0) {
				$(".memoFixedList").remove();
			}
			var fiexdMemoJson = fiexdMemoListPar.memos.map(function (memo, index) {
				return { "index": index, "data": memo };
			}).filter(function (memoObj) {
				return memoObj.data.fiexd === true;
			});
			if (fiexdMemoJson.length !== 0) {
				$("body#body").append("<div class='memoFixedList'><div class='main'><div class='hide corrugation'><img src='/data/image/icon.v2/hide_back_light.png' alt='关闭'></div></div></div>");
				for (let i = 0; i < fiexdMemoJson.length; i++) {
					var timeText = fiexdMemoJson[i].data.time;
					var titleText = fiexdMemoJson[i].data.title;
					var tag = fiexdMemoJson[i].data.tag;
					if (tag === "倒计时") {
						var countdown = formatDateToCountdown(titleText);
						titleText = countdown;
					}
					var html = `
						<div class="memoBar corrugation" mid="${fiexdMemoJson[i].index}" tag="${tag}">
							<div class="top">
								<div class="title">${titleText}</div>
								<div class="del">
									<img src='/data/image/icon.v2/close_light.png' alt='关闭'>
								</div>
							</div>
							<div class="time">${timeText}</div>
						</div>`;
					$(".main").append(html);
				}
			}
			MemoBarConfig("open");
		} else {
			console.log("青师版本不为2.0,无法使用置顶功能");
		}
	}
}
function formatDateToCountdown(dateString) {
	var prefix = "";
	var prefixMatch = dateString.match(/^([^\d]+)/);
	if (prefixMatch) {
		prefix = prefixMatch[1];
	}
	var datePattern = /(\d{1,4})[-\/\.](\d{1,2})[-\/\.](\d{1,4})/;
	var match = dateString.match(datePattern);
	if (match) {
		var year = parseInt(match[1]);
		var month = parseInt(match[2]);
		var day = parseInt(match[3]);
		var targetDate = new Date(year, month - 1, day);
		var currentDate = new Date();
		var timeDiff = targetDate - currentDate;
		var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		if (daysDiff === 0) {
			return prefix + "<span class=\"djs\">就是今天</span>";
		} else if (daysDiff < 0) {
			return prefix + "<span class=\"djs\">过去了 " + Math.abs(daysDiff) + " 天</span>";
		} else {
			return prefix + "<span class=\"djs\">还有 " + daysDiff + " 天</span>";
		}
	} else {
		return dateString;
	}
}

$(document).on("click", ".memoFixedList .hide", function () {
	src = $(".memoFixedList .hide img").attr("src")
	if (src == "/data/image/icon.v2/hide_back_light.png") {
		MemoBarConfig("close");
	} else {
		MemoBarConfig("open");
	}
})

$(document).on("click", ".memoBar .del", function () {
	var fiexdMemoListPar = JSON.parse(localStorage.getItem("memoList"))
	id = $(this).closest(".memoBar.corrugation").attr("mid");
	fiexdMemoListPar.memos[id].fiexd = false;
	$(this).closest(".memoBar.corrugation").addClass("delFixed");
	localStorage.setItem("memoList", JSON.stringify(fiexdMemoListPar));
	fiexdMemoListPar = JSON.parse(localStorage.getItem("memoList"))
	setTimeout(() => {
		loadFiexdMemos()
	}, 290);
})

function MemoBarConfig(mode) {
	s = '/data/image/icon.v2/';
	if (mode == "close") {
		$(".memoFixedList").addClass("hide");
		setTimeout(() => {
			$(".memoFixedList .hide img").attr("src", s + "show_open_light.png");
		}, 300);
	} else if (mode == "open") {
		$(".memoFixedList").removeClass("hide");
		$(".memoFixedList .hide img").attr("src", s + "hide_back_light.png");
	}
}

$(document).on("dblclick", "#sentence", function () {
	sec = $("#sentence > .sec").text().split("「  ").join("").split("  」").join("");
	aut = $("#sentence > .from > .author").text()
	$("#text").val(sec + ' ' + aut);
	$("#text").select();
	document.execCommand('copy');
	$("body#body").append(`<div class="welcome wel"><div><p>复制成功</p></div></div>`);
	setTimeout(() => { $(".welcome.wel").remove() }, 4700);
})

$(document).on("dblclick", ".memoBar.corrugation", function () {
	id = $(this).attr("mid")
	sessionStorage.setItem("mid", id)
	location.href = "./tool/memo/?memoID=" + id + "&from=" + location.href;
})

plugins()
function plugins() {
	$.get("/data/plugins/index.php", null,
		function (data, textStatus, jqXHR) {
			let json = data;
			for (let i = 0; i < json.length; i++) {
				if (json[i].mode == "true") {
					var script = document.createElement('script');
					script.src = "/data/plugins/" + json[i].file;
					$("div[xid=\"jsLoader\"]").append(script);
				}
			}
		},
		"json"
	);
}





// 右键菜单
$(function () {
	$("*").on("mousedown", function (event) {
		if (event.button == 2) {
			if ($(this).is("div#backgroundBoxFa") && $("img#backgroundBoxImage").attr("class") !== "bg-focus") {
				$("#dateTime").click();
			}
		}
	});

	window.oncontextmenu = function (e) {
		e.preventDefault();
	};
});

document.onkeydown = function (e) {
	e = window.event || e;
	var k = e.keyCode;
	if ((e.ctrlKey == true && k == 85) || k == 123) {
		e.keyCode = 0;
		e.returnValue = false;
		e.cancelBubble = true;
		return false;
	}
}
if (ls('settingData', 'json').startFocus == true) {
	$("#text").focus();
}
function xhrJsonData(url, type, send) {
	var request = new XMLHttpRequest();
	request.open("get", url);
	request.send(null);
	request.onload = function () {
		if (request.status == 200) {
			if (type == 'json') {
				return JSON.parse(request.responseText);
			} else if (type == 'html') {
				return toString(request.responseText);
			}
		}
	}
}
function memoColor(color) {
	$("data-setlist").attr("data-memo-color", color);
	$("textarea#editorBox").attr("class", color);
}
function memoMode(mode) {
	$("data-setlist").attr("data-memo-mode", mode);
}
if (GetQueryString("appid") !== null && GetQueryString("appid") !== '') {
	xnAppId(Number(GetQueryString("appid")))
	setTimeout(() => {
		$("div#windowsList > div").attr("data-setting-windows-full", "full")
	}, 100);
}
// 访问次数
var url = "./../../api/php/loadInTime.php"
var request = new XMLHttpRequest();
request.open("get", url);
request.send(null);
