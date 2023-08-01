oldVersionJsonCheck = JSON.parse(localStorage.getItem("memoList"))
if (oldVersionJsonCheck !== null) {
    if (oldVersionJsonCheck.hasOwnProperty("version") && oldVersionJsonCheck.version === "2.0") { } else {
        var newjson = {
            "tags": [{
                "name": "旅游",
                "color": "#fcc419",
                "bg": "#fcc4193b"
            }, {
                "name": "个人",
                "color": "#228be6",
                "bg": "#228be63b"
            }, {
                "name": "生活",
                "color": "#40c057",
                "bg": "#40c0573b"
            }, {
                "name": "工作",
                "color": "#e64980",
                "bg": "#e649803b"
            }],
            "memos": [],
            "version": "2.0"
        }
        for (let i = 0; i < oldVersionJsonCheck.length; i++) {
            json = {
                time: formatTime(oldVersionJsonCheck[i].time),
                text: oldVersionJsonCheck[i].top,
                title: oldVersionJsonCheck[i].title,
                tag: "",
                fiexd: false
            }
            newjson.memos.push(json)
        }
        localStorage.setItem("memoList", JSON.stringify(newjson))
        console.log("JSON 中不存在 version 属性或其值不为 2.0");
    }
}
function formatTime(timeString) {
    var regex = /(\d{4})年(\d{1,2})月(\d{1,2})日(\d{1,2})时(\d{1,2})分/;
    var match = regex.exec(timeString);
    if (match) {
        var year = match[1];
        var month = match[2];
        var day = match[3];
        var hours = match[4];
        var minutes = match[5];

        var formattedTime = `${year}-${month}-${day} ${hours}:${minutes}`;
        return formattedTime;
    } else {
        return timeString; // 如果无法匹配，则返回原始的时间字符串
    }
}
var memos_list = {
    "tags": [{
        "name": "旅游",
        "color": "#fcc419",
        "bg": "#fcc4193b"
    }, {
        "name": "个人",
        "color": "#228be6",
        "bg": "#228be63b"
    }, {
        "name": "生活",
        "color": "#40c057",
        "bg": "#40c0573b"
    }, {
        "name": "工作",
        "color": "#e64980",
        "bg": "#e649803b"
    }],
    "memos": [],
    "version": "2.0"
}
var this_tag = '标签';
var this_title = '标题';
var this_html = 'Hello World';

var memoList = localStorage.getItem("memoList");
if (memoList) {
    var parsedMemoList = JSON.parse(memoList);
    if (parsedMemoList.tags) {
        memos_list.tags = parsedMemoList.tags;
    }
    if (parsedMemoList.memos) {
        memos_list.memos = parsedMemoList.memos;
    }
} else {
    localStorage.setItem("memoList", JSON.stringify(memos_list))
}

$("#memos_list button.add").on("click", function () {
    $(".editor_placeholder").show()
    if ((getValue() !== '' && $("div#memo_box").css("display") == "flex") || $("#start_page").css("display") == "block") {
        $(".memo_title").val("")
        li = $(".memos-tabs-item");
        for (let i = 0; i < li.length; i++) {
            li.eq(i).removeClass("active");
        }
        $("#pre-generated").prepend(`<li class="memos-tabs-item active corrugation" memo-id="${Number(JSON.parse(localStorage.getItem("memoList")).memos.length)}">
    <div class="memos_msg">
        <p class="memos-title">标题</p>
        <span class="memos-time">`+ nowTime() + `</span>
    </div>
    <div class="memos-item-btn">
        <span class="memos-del" title="删除备忘录">
            <svg t="1688618124390" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3478" width="256" height="256">
                <path d="M747.136 288.706c1.819-22.016 21.141-38.39 43.158-36.57 21.796 1.8 38.061 20.757 36.62 42.498l-0.05 0.66-47.837 579C777.33 894.83 760.322 910.68 739.786 911H281.837c-20.606 0-37.803-15.645-39.808-36.086l-0.056-0.62-47.837-579c-1.82-22.017 14.554-41.34 36.57-43.158 21.797-1.801 40.952 14.228 43.098 35.912l0.06 0.658L318.668 831h383.663l44.805-542.294z" fill="#00000000" p-id="3479"></path>
                <path d="M857 252c22.091 0 40 17.909 40 40 0 21.87-17.552 39.641-39.339 39.995L857 332H166c-22.091 0-40-17.909-40-40 0-21.87 17.552-39.641 39.339-39.995L166 252h691zM427.509 437.87c21.87 0 39.641 17.553 39.995 39.339l0.005 0.661v208.735c0 22.092-17.909 40-40 40-21.87 0-39.641-17.552-39.995-39.338l-0.005-0.662V477.87c0-22.091 17.909-40 40-40zM596.491 437.87c21.87 0 39.641 17.553 39.995 39.339l0.005 0.661v208.735c0 22.092-17.909 40-40 40-21.87 0-39.641-17.552-39.995-39.338l-0.005-0.662V477.87c0-22.091 17.909-40 40-40z" fill="#00000000" p-id="3480"></path>
                <path d="M654 113H370c-22.091 0-40 17.909-40 40v139c0 22.091 17.909 40 40 40h284c22.091 0 40-17.909 40-40V153c0-22.091-17.909-40-40-40z m-40 80v59H410v-59h204z" fill="#00000000" p-id="3481"></path>
            </svg>
        </span>
        <span class="memos-top" title="固定到桌面">
            <svg t="1688618064766" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2211" width="256" height="256">
                <path d="M514 130.2c-6.2 0-18.7 4.8-35 35.8-39.2 66.8-101.1 175.9-101.1 175.9s-113.2 21-186.2 34.2c-35.8 5.6-47.5 36.1-29.3 57.5 51.1 59 142.2 156.5 142.2 156.5s-14.8 107.1-23.2 180.2c-2.7 28.1 12.8 44.1 34.4 44.1 7.9-0.1 15.6-1.8 22.7-5.1L514 726c20.7 10.2 113 55.2 173.6 84.3 7 3.3 14.7 5 22.5 5.1 21.3 0 36.6-16.1 34-44.2-8.2-73.2-22.9-180.4-22.9-180.4S811 493.2 861.8 434c18-21.5 6.4-52-29-57.6-72.2-13.2-184.1-34.2-184.1-34.2s-61.5-109.2-100-176.1c-13.7-24.7-24.1-32.6-30.7-34.8-1.3-0.5-2.6-0.8-4-0.8v-0.3z m0 0" fill="#00000000" p-id="2212"></path>
            </svg>
        </span>
    </div>
</li>`)

        memoJson = {
            time: nowTime(),
            text: "",
            title: "标题",
            tag: "",
            fiexd: false
        }
        memos_list.memos.push(memoJson)
        localStorage.setItem("memoList", JSON.stringify(memos_list));
        $("#editor").html("")
        $(".memo_title").val("")
    }
})

function nowTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    if (month < 10) { month = "0" + month; }
    if (day < 10) { day = "0" + day; }
    if (hour < 10) { hour = "0" + hour; }
    if (minute < 10) { minute = "0" + minute; }
    var time = year + "-" + month + "-" + day + " " + hour + ":" + minute;
    return time;
}

$('.memo_title').on('input', function () {
    var newValue = $(this).val();
    var isEmpty = /^\s*$/.test(newValue);
    this_title = newValue;
    if (isEmpty) {
        newValue = $("li.memos-tabs-item.active > .memos_msg > .memos-title").text();
    }

    $("li.memos-tabs-item.active > .memos_msg > .memos-title").text(newValue);
    change("title", newValue)
});


function getValue() {
    return $("#editor").html();
}
function setValue(html) {
    $("#editor").html(html);
}

var editorB = document.getElementById('editor');

editorB.addEventListener('input', function () {
    $("#editor link").remove()
    $("#editor style").remove()
    $("#editor script").remove()


    this_html = getValue()
    change("text", this_html)

    if (getValue() == '') {
        $("span.editor_placeholder").show()
    } else {
        $("span.editor_placeholder").hide()
    }
});
tag_list = memos_list.tags
colors_list = {
    "color_red": {
        "a": "#c92a2a",
        "b": "#c92a2a3b"
    },
    "color_pink": {
        "a": "#e64980",
        "b": "#e649803b"
    },
    "color_grape": {
        "a": "#be4bdb",
        "b": "#be4bdb3b"
    },
    "color_violet": {
        "a": "#7950f2",
        "b": "#7950f23b"
    },
    "color_indigo": {
        "a": "#4c6ef5",
        "b": "#4c6ef53b"
    },
    "color_blue": {
        "a": "#228be6",
        "b": "#228be63b"
    },
    "color_cyan": {
        "a": "#15aabf",
        "b": "#15aabf3b"
    },
    "color_teal": {
        "a": "#12b886",
        "b": "#12b8863b"
    },
    "color_green": {
        "a": "#40c057",
        "b": "#40c0573b"
    },
    "color_lime": {
        "a": "#82c91e",
        "b": "#82c91e3b"
    },
    "color_yellow": {
        "a": "#fcc419",
        "b": "#fcc4193b"
    },
    "color_orange": {
        "a": "#fd7e14",
        "b": "#fd7e143b"
    }
}

$(".memo_tag").on("click", function () {
    if ($(".tag_box").css("display") == "none") {
        $(".tag_box").show()
        $("button.memo_tag > img").attr("src", "./img/home.png")

        $("#tag_list").html('');
        setTimeout(() => {
            tag_list = JSON.parse(localStorage.getItem("memoList")).tags;
            for (let i = 0; i < tag_list.length; i++) {
                $("#tag_list").append('<span class="tag" style="background:' + tag_list[i].bg + ';color:' + tag_list[i].color + ';">' + tag_list[i].name + '</span>')
            }
        }, 0);
    } else {
        $(".tag_box").hide()
        $("button.memo_tag > img").attr("src", "./img/tags.png")
    }
})

$("#tag_add_btn").on("click", function () {
    var tag = $("#tag_add").val().trim();
    var isEmpty = /^\s*$/.test(tag);
    if (!isEmpty) {
        var randomColorKey = Object.keys(colors_list)[Math.floor(Math.random() * Object.keys(colors_list).length)];
        var randomColorObject = colors_list[randomColorKey];
        var tagJson = {
            "name": tag,
            "color": randomColorObject.a,
            "bg": randomColorObject.b
        };
        memos_list.tags.push(tagJson);
        $("#tag_list").empty();
        setTimeout(() => {
            tag_list = JSON.parse(localStorage.getItem("memoList")).tags;
            for (let i = 0; i < tag_list.length; i++) {
                $("#tag_list").append('<span class="tag" style="background:' + tag_list[i].bg + ';color:' + tag_list[i].color + ';">' + tag_list[i].name + '</span>');
            }
        }, 0);
        $("#tag_add").val('');
        localStorage.setItem("memoList", JSON.stringify(memos_list))
    }
})
$(document).on("click", "#tag_list span.tag", function () {
    tag = $(this).html();
    this_tag = tag;
    change("tag", this_tag)
    $(".memo_tag").click()
})

$(document).on("click", "button#btnN", function () {
    $(".dialog").remove()
})
$(document).on("click", "button#btnY", function () {
    memos_list_del = JSON.parse(localStorage.getItem("memoList"));
    id = $(this).attr("del-id");
    memos_list_del.memos.splice(id, 1);
    localStorage.setItem("memoList", JSON.stringify(memos_list_del));
    $(".dialog").remove();
    loadMemosList();
    sp_load_memos();
    memos_list = JSON.parse(localStorage.getItem("memoList"));
    // if (memos_list.memos.length == 0) {
    $("div#start_page").show();
    $("div#memo_box").hide();
    // }
})

loadMemosList()
function loadMemosList() {
    $("#pre-generated").html("")
    ls_memos_json_main = JSON.parse(localStorage.getItem("memoList"))
    for (let i = 0; i < ls_memos_json_main.memos.length; i++) {
        $("#pre-generated").prepend(`<li class="memos-tabs-item corrugation" memo-id="` + i + `">
    <div class="memos_msg">
        <p class="memos-title">`+ ls_memos_json_main.memos[i].title + `</p>
        <span class="memos-time">`+ ls_memos_json_main.memos[i].time + `</span>
    </div>
    <div class="memos-item-btn">
        <span class="memos-del" title="删除备忘录">
            <svg t="1688618124390" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3478" width="256" height="256">
                <path d="M747.136 288.706c1.819-22.016 21.141-38.39 43.158-36.57 21.796 1.8 38.061 20.757 36.62 42.498l-0.05 0.66-47.837 579C777.33 894.83 760.322 910.68 739.786 911H281.837c-20.606 0-37.803-15.645-39.808-36.086l-0.056-0.62-47.837-579c-1.82-22.017 14.554-41.34 36.57-43.158 21.797-1.801 40.952 14.228 43.098 35.912l0.06 0.658L318.668 831h383.663l44.805-542.294z" fill="#00000000" p-id="3479"></path>
                <path d="M857 252c22.091 0 40 17.909 40 40 0 21.87-17.552 39.641-39.339 39.995L857 332H166c-22.091 0-40-17.909-40-40 0-21.87 17.552-39.641 39.339-39.995L166 252h691zM427.509 437.87c21.87 0 39.641 17.553 39.995 39.339l0.005 0.661v208.735c0 22.092-17.909 40-40 40-21.87 0-39.641-17.552-39.995-39.338l-0.005-0.662V477.87c0-22.091 17.909-40 40-40zM596.491 437.87c21.87 0 39.641 17.553 39.995 39.339l0.005 0.661v208.735c0 22.092-17.909 40-40 40-21.87 0-39.641-17.552-39.995-39.338l-0.005-0.662V477.87c0-22.091 17.909-40 40-40z" fill="#00000000" p-id="3480"></path>
                <path d="M654 113H370c-22.091 0-40 17.909-40 40v139c0 22.091 17.909 40 40 40h284c22.091 0 40-17.909 40-40V153c0-22.091-17.909-40-40-40z m-40 80v59H410v-59h204z" fill="#00000000" p-id="3481"></path>
            </svg>
        </span>
        <span class="memos-top`+ fixedCheck(i) + `" title="固定到桌面">
            <svg t="1688618064766" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2211" width="256" height="256">
                <path d="M514 130.2c-6.2 0-18.7 4.8-35 35.8-39.2 66.8-101.1 175.9-101.1 175.9s-113.2 21-186.2 34.2c-35.8 5.6-47.5 36.1-29.3 57.5 51.1 59 142.2 156.5 142.2 156.5s-14.8 107.1-23.2 180.2c-2.7 28.1 12.8 44.1 34.4 44.1 7.9-0.1 15.6-1.8 22.7-5.1L514 726c20.7 10.2 113 55.2 173.6 84.3 7 3.3 14.7 5 22.5 5.1 21.3 0 36.6-16.1 34-44.2-8.2-73.2-22.9-180.4-22.9-180.4S811 493.2 861.8 434c18-21.5 6.4-52-29-57.6-72.2-13.2-184.1-34.2-184.1-34.2s-61.5-109.2-100-176.1c-13.7-24.7-24.1-32.6-30.7-34.8-1.3-0.5-2.6-0.8-4-0.8v-0.3z m0 0" fill="#00000000" p-id="2212"></path>
            </svg>
        </span>
    </div>
</li>`)
    }
}

$(document).on("click", "li.memos-tabs-item:not(.active)", function () {
    json = JSON.parse(localStorage.getItem("memoList"))
    id = $(this).attr("memo-id")
    $("li.memos-tabs-item.active").removeClass("active")
    $(this).addClass("active")
    $("input.memo_title").val(json.memos[id].title)
    $("#editor").html(json.memos[id].text)
    if (json.memos[id].text !== '') {
        $(".editor_placeholder").hide()
    }
})
$(document).on("click", ".memos-del", function () {
    var memoId = $(this).closest("li").attr("memo-id");
    $("body").append(`<div class="dialog">
    <div class="dialogBox animate__animated animate__zoomIn">
        <div class="ContentBox">
            <div class="contentIcon"><svg t="1688646434425" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2303" width="256" height="256"><path d="M1001.661867 796.544c48.896 84.906667 7.68 157.013333-87.552 157.013333H110.781867c-97.834667 0-139.050667-69.504-90.112-157.013333l401.664-666.88c48.896-87.552 128.725333-87.552 177.664 0l401.664 666.88zM479.165867 296.533333v341.333334a32 32 0 1 0 64 0v-341.333334a32 32 0 1 0-64 0z m0 469.333334v42.666666a32 32 0 1 0 64 0v-42.666666a32 32 0 1 0-64 0z" fill="#FAAD14" p-id="2304"></path></svg></div>
            <div class="content">是否删除这个备忘录</div>
        </div>
        <div class="btnBpx">
            <button id="btnN">取消</button>
            <button id="btnY" del-id="`+ memoId + `">确认</button>
        </div>
    </div>
</div>`)
})
$(document).on("click", ".memos-top", function () {
    var memoId = $(this).closest("li").attr("memo-id");
    json = JSON.parse(localStorage.getItem("memoList"));
    if (json.memos[memoId].fiexd == true) {
        json.memos[memoId].fiexd = false;
        $(this).removeClass("gold")
    } else {
        json.memos[memoId].fiexd = true;
        $(this).addClass("gold")
    }
    localStorage.setItem("memoList", JSON.stringify(json));
})
function change(key, content) {
    id = Number($("li.memos-tabs-item.active").attr("memo-id"));
    memos_list_ls = JSON.parse(localStorage.getItem("memoList"));
    if (key == "tag") {
        memos_list_ls.memos[id].tag = content
    }
    if (key == "title") {
        memos_list_ls.memos[id].title = content
    }
    if (key == "text") {
        memos_list_ls.memos[id].text = content
    }
    localStorage.setItem("memoList", JSON.stringify(memos_list_ls))
}
$('xn-div[for="start_page_memos_view"] button:nth-child(1)').on("click", function () {
    sp_load_memos()
})
$('xn-div[for="start_page_memos_view"] button:nth-child(2)').on("click", function () {
    sp_load_tags()
})

$(".innerFlexBox").on("click", function () {
    $("div#start_page").show();
    $("div#memo_box").hide()
    sp_load_memos()
})
sp_load_memos();
function sp_load_memos() {
    json = JSON.parse(localStorage.getItem("memoList"));
    $("xn-div#sp_memos_list").html("")
    for (let i = 0; i < json.memos.length; i++) {
        data = json.memos[i];
        $("xn-div#sp_memos_list").prepend(`<div class="li_memos_item corrugation" memo-id="` + i + `"><div class="content_box"><div class="title-box"><xn-h4>` + data.title + `</xn-h4>
        <div class="infor_box">`+ tagsSearch(data.tag) + `</div></div></div><div class="config-box"><span class="date">` + data.time + `</span><div class="memo_item_config">
        <span class="memos-top-b`+ fixedCheck(i) + `" title="固定到桌面"><svg t="1688618064766" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2211" width="20" height="20">
        <path d="M514 130.2c-6.2 0-18.7 4.8-35 35.8-39.2 66.8-101.1 175.9-101.1 175.9s-113.2 21-186.2 34.2c-35.8 5.6-47.5 36.1-29.3 57.5 51.1 59 142.2 156.5 142.2 156.5s-14.8 107.1-23.2 180.2c-2.7 28.1 12.8 44.1 34.4 44.1 7.9-0.1 15.6-1.8 22.7-5.1L514 726c20.7 10.2 113 55.2 173.6 84.3 7 3.3 14.7 5 22.5 5.1 21.3 0 36.6-16.1 34-44.2-8.2-73.2-22.9-180.4-22.9-180.4S811 493.2 861.8 434c18-21.5 6.4-52-29-57.6-72.2-13.2-184.1-34.2-184.1-34.2s-61.5-109.2-100-176.1c-13.7-24.7-24.1-32.6-30.7-34.8-1.3-0.5-2.6-0.8-4-0.8v-0.3z m0 0" fill="#0084ff" p-id="2212"></path></svg></span><span class="memos-del-b" title="删除备忘录"><svg t="1688618124390" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3478" width="20" height="20">
        <path d="M747.136 288.706c1.819-22.016 21.141-38.39 43.158-36.57 21.796 1.8 38.061 20.757 36.62 42.498l-0.05 0.66-47.837 579C777.33 894.83 760.322 910.68 739.786 911H281.837c-20.606 0-37.803-15.645-39.808-36.086l-0.056-0.62-47.837-579c-1.82-22.017 14.554-41.34 36.57-43.158 21.797-1.801 40.952 14.228 43.098 35.912l0.06 0.658L318.668 831h383.663l44.805-542.294z" fill="#FF5E5E" p-id="3479"></path>
        <path d="M857 252c22.091 0 40 17.909 40 40 0 21.87-17.552 39.641-39.339 39.995L857 332H166c-22.091 0-40-17.909-40-40 0-21.87 17.552-39.641 39.339-39.995L166 252h691zM427.509 437.87c21.87 0 39.641 17.553 39.995 39.339l0.005 0.661v208.735c0 22.092-17.909 40-40 40-21.87 0-39.641-17.552-39.995-39.338l-0.005-0.662V477.87c0-22.091 17.909-40 40-40zM596.491 437.87c21.87 0 39.641 17.553 39.995 39.339l0.005 0.661v208.735c0 22.092-17.909 40-40 40-21.87 0-39.641-17.552-39.995-39.338l-0.005-0.662V477.87c0-22.091 17.909-40 40-40z" fill="#FF5E5E" p-id="3480"></path>
        <path d="M654 113H370c-22.091 0-40 17.909-40 40v139c0 22.091 17.909 40 40 40h284c22.091 0 40-17.909 40-40V153c0-22.091-17.909-40-40-40z m-40 80v59H410v-59h204z" fill="#FF5E5E" p-id="3481"></path></svg></span></div></div></div>
        `)
    }
    function tagsSearch(tag) {
        if (tag == '') {
            return '';
        } else {
            tags = json.tags;
            var filter = tags.find(function (data) {
                return data.name === tag
            })
            if (filter == undefined) {
                return '<span class="tag" style="--color:#4c6ef5;--bg:#4c6ef53b">' + tag + '</span>';
            } else {
                return '<span class="tag" style="--color:' + filter.color + ';--bg:' + filter.bg + '">' + filter.name + '</span>';
            }
        }
    }
    if (json.memos.length == 0) {
        $("xn-div#sp_memos_list").prepend("<p class=\"xn_css p_text default_content xn_text_ac\">这里空空如也</p>")
    }
}

$(document).on("click", "#sp_tags_list>span.tag", function () {
    index = $(this).attr("tag-index")
    memos_list_del = JSON.parse(localStorage.getItem("memoList"));
    memos_list_del.tags.splice(index, 1);
    localStorage.setItem("memoList", JSON.stringify(memos_list_del));
    sp_load_tags()
})
sp_load_tags()
function sp_load_tags() {
    json = JSON.parse(localStorage.getItem("memoList"));
    $("xn-div#sp_tags_list").html("")
    for (let i = 0; i < json.tags.length; i++) {
        $("xn-div#sp_tags_list").prepend('<span class="tag" tag-index="' + i + '" style="--color:' + json.tags[i].color + ';--bg:' + json.tags[i].bg + '">' + json.tags[i].name + '</span>')
    }
    if (json.tags.length == 0) {
        $("xn-div#sp_tags_list").prepend("<p class=\"xn_css p_text default_content xn_text_ac\">这里空空如也</p>")
    }
}
function fixedCheck(id) {
    fiexdMode = JSON.parse(localStorage.getItem("memoList")).memos[id].fiexd
    if (fiexdMode == true) {
        return ' gold';
    } else {
        return '';
    }
}
$(document).on("click", ".memos-top-b", function () {
    var memoId = $(this).closest("div.li_memos_item").attr("memo-id");
    json = JSON.parse(localStorage.getItem("memoList"));
    if (json.memos[memoId].fiexd == true) {
        json.memos[memoId].fiexd = false;
        $(this).removeClass("gold")
    } else {
        json.memos[memoId].fiexd = true;
        $(this).addClass("gold")
    }
    localStorage.setItem("memoList", JSON.stringify(json));
    loadMemosList()
})
$(document).on("click", ".memos-del-b", function () {
    var memoId = $(this).closest("div.li_memos_item").attr("memo-id");
    $("body").append(`<div class="dialog">
    <div class="dialogBox animate__zoomIn animate__animated">
        <div class="ContentBox">
            <div class="contentIcon"><svg t="1688646434425" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2303" width="256" height="256"><path d="M1001.661867 796.544c48.896 84.906667 7.68 157.013333-87.552 157.013333H110.781867c-97.834667 0-139.050667-69.504-90.112-157.013333l401.664-666.88c48.896-87.552 128.725333-87.552 177.664 0l401.664 666.88zM479.165867 296.533333v341.333334a32 32 0 1 0 64 0v-341.333334a32 32 0 1 0-64 0z m0 469.333334v42.666666a32 32 0 1 0 64 0v-42.666666a32 32 0 1 0-64 0z" fill="#FAAD14" p-id="2304"></path></svg></div>
            <div class="content">是否删除这个备忘录</div>
        </div>
        <div class="btnBpx">
            <button id="btnN">取消</button>
            <button id="btnY" del-id="`+ memoId + `">确认</button>
        </div>
    </div>
</div>`)
})

$(document).on("click", "#memos_list button.add,  ul#pre-generated>li", function () {
    $("div#start_page").hide();
    $("div#memo_box").show()
})
$(document).on("dblclick", ".li_memos_item", function () {
    id = Number($(this).attr("memo-id"));
    $("ul#pre-generated > li[memo-id=\"" + id + "\"]").click()
})
$("button.xn_css.xn_button_1.btn_default.btn-addon").on("click", function () {
    $("#memos_list button.add").click()
})
theme = GetQueryString("theme");
from = GetQueryString("from");
if (from !== "empty") {
    $("body").attr("from", from)
}
if (theme !== "empty") {
    $("body").addClass(theme)
}

if (ContentDetection(GetQueryString("memoID")) !== 'empty') {
    id = GetQueryString("memoID");
    if (JSON.parse(localStorage.getItem("memoList")).memos.length >= Number(GetQueryString("memoID"))) {
        $("li.memos-tabs-item.corrugation[memo-id=\""+id+"\"]").click()
    }
}
if (GetQueryString("from") !== null) {
    href = GetQueryString("from");
    $("div#memos_list>p").html(`<img src="img/back_dark.png" alt="返回"><a href="`+href+`" style="text-decoration:none;">返回</a>`)
}