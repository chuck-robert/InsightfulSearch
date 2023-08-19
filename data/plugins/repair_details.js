/* -------------------
* Name: 页面加载动画
* Version: v1.0
* Author: 川上星林
* Date: 2023-8-6
* Mode: true
* Json: []
* ------------------- */

setTimeout(() => {
    $(".load_fadeIn_left").removeClass("load_fadeIn_left");
    $(".load_fadeIn_right").removeClass("load_fadeIn_right");
}, 400);

let slashKeyCount = 0;
let lastSlashPressTime = 0;

$(document).keydown(function (event) {
    const focusedElement = document.activeElement;
    const isInputFocused = focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA';
    if (event.key === '/' && !isInputFocused) {
        const currentTime = Date.now();
        const timeSinceLastSlashPress = currentTime - lastSlashPressTime;
        if (timeSinceLastSlashPress <= 300) {
            slashKeyCount++;
            if (slashKeyCount === 2) {
                wwwSearch();
                slashKeyCount = 0;
            }
        } else {
            slashKeyCount = 1;
        }
        lastSlashPressTime = currentTime;
    } else {
        slashKeyCount = 0;
    }
});
wwwSearchMode = false;
functionList = [
    {
        "aid": 1,
        "text": "打开 赞助",
        "ft": "app",
        "js": "xnAppId(1)"
    }, {
        "aid": 2,
        "text": "打开 反馈与帮助",
        "ft": "interior",
        "js": "xnAppId(2)"
    }, {
        "aid": 3,
        "text": "打开 天气的城市位置设置",
        "ft": "setting",
        "js": "xnAppId(3)"
    }, {
        "aid": 4,
        "text": "打开 备忘录",
        "ft": "app",
        "js": "xnAppId(4)"
    }
]
function wwwSearch() {
    if (wwwSearchMode) {
        wwwSearchMode = false;
        $("html").attr("mode", "");
        $("#word3").remove();
    } else {
        wwwSearchMode = true;
        $("html").attr("mode", "wwwSearch");
        $("s-form > span:nth-child(3)").append(`<div id="word3" type="submit" class="word-back"></div>`);
        $("#text").focus();
    }
}

$("#text").on("keyup", function () {
    if (wwwSearchMode) {
        $("#word3").empty("");
        text = $("#text").val();
        var filteredData = functionList.filter(function (item) {
            var regex = new RegExp(text.split("").join('.*'), 'i');
            return regex.test(item.text.toLowerCase());
        });
        for (let i = 0; i < filteredData.length; i++) {
            $("#word3").append("<div class=\"click_work\" onclick=\"" + filteredData[i].js + "\">" + filteredData[i].ft + " \t  " + filteredData[i].text + "</div>")
        }
    }
})
$(document).on("click", "div.click_word", function () {
    if (wwwSearchMode) {
        setTimeout(() => {
            $("#text").val("")
        }, 100);
    }
})
___opt_add([
    {
        "n": "隐藏提示",
        "d": "是否开启设置页面的绿色条文",
        "id": "_opt_info_show",
        "f": "___ce_infoShow()"
    }
]);

function ___ce_infoShow() {
    d = $(".settingFa p.aboutInfo");
    setTimeout(() => {
        if (___opt_get("_opt_info_show")) {
            for (let i = 0; i < d.length; i++) {
                $(d[i]).hide();
            }
        } else {
            for (let i = 0; i < d.length; i++) {
                $(d[i]).show();
            }
        }
    }, 400);
}

function __command(command) {
    const parts = command.split(' ');
    const cmdType = parts[0];
    const cmdArgs = parts.slice(1).join(' ');

    switch (cmdType) {
        case '0721':
            console.log(cmdArgs);
            break;
        default:
            console.log('Unknown command:', command);
    }
}
