const messagesContainer = document.getElementById('messages');
const input = document.getElementById('input');
const sendButton = document.getElementById('send');
var qaIdx = 0, answers = {}, answerContent = '', answerWords = [];
var codeStart = false, lastWord = '', lastLastWord = '';
var typingTimer = null, typing = false, typingIdx = 0, contentIdx = 0, contentEnd = false;
var replies = [], fullReply;
let eventSource;
messages = [];
chatgptDataCheck()
function chatgptDataCheck() {
    if (ls("chatDataSet") == "empty") {
        var jsonB = {
            "a": 0.8, "b": 0.5, "c": 1, "d": 0, "e": 2050,
        }
        localStorage.setItem("chatDataSet", JSON.stringify(jsonB))
    } else {
        j = ls("chatDataSet", "json")
        var count = 0;
        for (var key in j) {
            if (count >= 4) {
                break;
            }
            document.getElementsByClassName("progress-bar")[count].setAttribute("data-default-value", Number(j[key]) * 100)
            count++;
        }
    }
}

marked.setOptions({
    highlight: function (code, language) {
        const validLanguage = hljs.getLanguage(language) ? language : 'javascript';
        return hljs.highlight(code, { language: validLanguage }).value;
    },
});

var numSpan = document.getElementById("lengthOfText");
input.addEventListener('input', (e) => {
    input.style.height = e.target.scrollHeight + 'px';
    if (e.target.scrollHeight >= 54) {
        document.getElementById('send').style.margin = '5px'
        document.getElementById('send').style.borderRadius = '20px'
    }
});

input.addEventListener('blur', (e) => {
    input.style.height = '';
});

input.addEventListener('focus', (e) => {
    input.style.height = e.target.scrollHeight + 'px';
});


if (GetQueryString("text") !== null) {
    $("#input").val(GetQueryString("text"))
    sendMessage()
}

function sendMessage() {
    replies = []
    fullReply = '';
    const inputValue = input.value;
    if (!inputValue) {
        return;
    }
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month < 10) { month = "0" + month; }
    if (day < 10) { day = "0" + day; }
    if (hour < 10) { hour = "0" + hour; }
    if (minute < 10) { minute = "0" + minute; }
    if (second < 10) { second = "0" + second; }
    var time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    messageJson = {
        "role": "user",
        "content": inputValue
    }
    messages.push(messageJson)
    question = `<div class="message question" id="question-` + qaIdx + `"><div class="msg-r">` + HTMLEncode(inputValue).replace(/\n/g, "<br>") + `</div><span class="msg-time">` + time + `</span></div>`
    document.getElementById("messages").innerHTML += question

    answer = `<div class="message answer" id="question-` + qaIdx + `"><div class="msg-l">` + marked.parse('AI思考中……') + `</div><span class="msg-time">` + time + `</span></div>`
    document.getElementById("messages").innerHTML += answer

    answers[qaIdx] = document.getElementById('answer-' + qaIdx);

    input.value = '';
    sendButton.disabled = true;
    $(sendButton).css("opacity", ".4");
    input.style.height = '';


    typingTimer = setInterval(typingWords, 50);
    getAnswer();
}
function HTMLEncode(html) {
    let temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    const output = temp.innerHTML;
    temp = null;
    return output;
}

$(document).ready(function () {
    $(".progress-bar").each(function () {
        var progressBar = $(this);
        var progress = progressBar.find(".progress");
        var isDragging = false;
        var increment = parseInt(progressBar.data("increment"));

        var defaultValue = parseInt(progressBar.data("default-value"));
        progress.css("width", defaultValue + "%");

        progressBar.on("mousedown", function (event) {
            isDragging = true;
            updateProgress(event.pageX);
        });

        $(document).on("mousemove", function (event) {
            if (isDragging) {
                updateProgress(event.pageX);
                chatDataSet();
            }
        });

        $(document).on("mouseup", function () {
            if (isDragging) {
                chatDataSet();
                isDragging = false;
                var progressBarWidth = progressBar.width();
                var currentProgressWidth = progress.width();
                var newDefaultValue = Math.round((currentProgressWidth / progressBarWidth) * 100 / increment) * increment;
                progressBar.attr("data-default-value", newDefaultValue);
                progress.html(newDefaultValue + "%");
                progress.css("width", (newDefaultValue / 100) * progressBarWidth + "px");
            }
        });

        function updateProgress(pageX) {
            var progressBarWidth = progressBar.width();
            var offsetX = pageX - progressBar.offset().left;
            var newProgressValue = Math.round((offsetX / progressBarWidth) * 100 / increment) * increment;
            var newProgressWidth = (newProgressValue / 100) * progressBarWidth;

            progress.css("width", newProgressWidth + "px");
            progress.html(newProgressValue + "%");
        }
    });
});
function chatDataSet() {
    a = Number($("#top_p").attr("data-default-value")) / 100 * 1;
    b = Number($("#temperature").attr("data-default-value")) / 100 * 1;
    c = Number($("#presence_penalty").attr("data-default-value")) / 100 * 1;
    d = Number($("#frequency_penalty").attr("data-default-value")) / 100 * 1;
    e = 100 + Number($("#max_tokens").attr("data-default-value")) / 100 * 3900;
    var jsonB = {
        "a": a, "b": b, "c": c, "d": d, "e": e,
    }
    localStorage.setItem("chatDataSet", JSON.stringify(jsonB))
}
function getAnswer() {
    var completionsJson = {
        "model": "gpt-3.5-turbo",
        "top_p": ls("chatDataSet","json").a,
        "temperature": ls("chatDataSet","json").b,
        "presence_penalty": ls("chatDataSet","json").c,
        "frequency_penalty": ls("chatDataSet","json").d,
        "max_tokens": ls("chatDataSet","json").e,
        "stream": true,
        "messages": messages
    };

    var url = "/tool/chat/chat.v2.php";
    var request = new XMLHttpRequest();

    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        if (request.status == 200) {
            try {
                var responseText = request.responseText;
                var responseChunks = responseText.split("data: ");
                responseChunks.forEach(function (chunk) {
                    if (chunk.trim() === "[DONE]") {
                        var fullReply = replies.join("");
                        typeWriterEffect(fullReply, qaIdx);
                        var messageJson = { "role": "assistant", "content": fullReply };
                        messages.push(messageJson);
                        return;
                    }
                    try {
                        var responseObj = JSON.parse(chunk);
                        var choices = responseObj.choices;
                        if (choices && choices.length > 0) {
                            var delta = choices[0].delta;
                            if (delta && delta.content) {
                                var reply = delta.content;
                                replies.push(reply);
                                updateTypingEffect(reply);
                            }
                        }
                    } catch (error) { }
                });
            } catch (error) { }
        }
    };
    request.send(JSON.stringify(completionsJson));

    function updateTypingEffect(reply) {
        var typingSpeed = 5; // 每个字符的打字机速度（以毫秒为单位）
        var currentCharIndex = 0;
        var typingInterval = setInterval(function () {
            if (currentCharIndex < reply.length) {
                var currentText = reply.substring(0, currentCharIndex + 1);
                document.getElementsByClassName("msg-l")[qaIdx].innerHTML = marked.parse(currentText);
                currentCharIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);
    }

    function typeWriterEffect(text, qaIdx) {
        var typingSpeed = 5; // 每个字符的打字机速度（以毫秒为单位）
        var currentCharIndexB = 0;
        var typingInterval = setInterval(function () {
            if (currentCharIndexB < text.length) {
                var currentText = text.substring(0, currentCharIndexB + 1);
                document.getElementsByClassName("msg-l")[qaIdx].innerHTML = marked.parse(currentText);
                currentCharIndexB++;
            } else {
                clearInterval(typingInterval);
                contentEnd = true;
            }
        }, typingSpeed);
    }
}
function typingWords() {
    if (contentEnd && contentIdx == typingIdx) {
        typingTimer;
        answerContent = '';
        answerWords = [];
        answers = [];
        qaIdx += 1;
        typingIdx = 0;
        contentIdx = 0;
        contentEnd = false;
        lastWord = '';
        lastLastWord = '';
        sendButton.disabled = false;
        $(sendButton).css("opacity", "1");
        ChatgptAnswer = sessionStorage.getItem("ChatgptAnswer")
        sessionStorage.setItem("ChatgptAnswer", '')
        if (ls("ChatsettingData", 'json').speak == true) {
            bh_sayTTS(ChatgptAnswer)
        }
        return;
    }
    if (contentIdx <= typingIdx) {
        return;
    }
    if (typing) {
        return;
    }
    typing = true;

    if (!answers[qaIdx]) {
        answers[qaIdx] = document.getElementById('answer-' + qaIdx);
    }

    const content = answerWords[typingIdx];
    if (content.indexOf('`') != -1) {
        if (content.indexOf('```') != -1) {
            codeStart = !codeStart;
        } else if (content.indexOf('``') != -1 && (lastWord + content).indexOf('```') != -1) {
            codeStart = !codeStart;
        } else if (content.indexOf('`') != -1 && (lastLastWord + lastWord + content).indexOf('```') != -1) {
            codeStart = !codeStart;
        }
    }

    lastLastWord = lastWord;
    lastWord = content;
    systemAnswer = '';
    answerContent += content;
    document.getElementsByClassName("msg-l")[qaIdx].innerHTML = marked.parse(answerContent + (codeStart ? '\n\n```' : ''));
    systemAnswer += answerContent;
    sessionStorage.setItem("ChatgptAnswer", systemAnswer)

    typingIdx += 1;
    typing = false;
}


function openMenu() {
    if ($(".menu-list").css("display") == "none") {
        $(".menu-list").show()
    } else {
        $(".menu-list").hide()
    }
}
width = window.innerWidth || document.documentElement.clientWidth
if (width < 600) {
    $(".menu-list").hide()
} else {
    $(".menu-list").show()
}

setTimeout(() => {
    $("#welcome").remove()
}, 4600);




themeLoader()
function themeLoader() {
    theme = localStorage.getItem("theme");
    background = localStorage.getItem("bgURL");
    if (theme == null) {
        theme = "light blue";
    }
    if (background == null) {
        background = "transparent";
    }
    if (/.(mp4|avi|wmv|mpeg|m4v|mov|asf|flv|f4v)+$/.test(background)) {
        background = "transparent";
    }

    if (ls("ChatsettingData", 'json').theme == true) {
        $("html").addClass(theme)
    } else {
        $("html").addClass('light blue')
    }
    if (ls("ChatsettingData", 'json').background == true) {
        $(".background").css("background-image", "url(" + background + ")")
    }
}
bh_config = {
    "lang": "zh-cn",
    "theme": "light",
    "tts_volume": 0.8,
    "tts_rate": 1.5,
    "tts_pitch": 0.8,
}
function bh_config_data(i) {
    bh_config_data_text = Object.values(bh_config)[i - 1];
    if (bh_config_data_text == undefined) {
        bh_sayTTS("加载失败，请联系开发人员配置翻译json")
        return "加载失败，请配置翻译json";
    } else {
        return bh_config_data_text;
    }
}
function bh_sayTTS(content) {
    const synth = window.speechSynthesis;
    const msg = new SpeechSynthesisUtterance();
    msg.text = content;     // 文字内容
    msg.lang = bh_config_data(1);  // 使用的语言:中文
    msg.volume = bh_config_data(3);      // 声音音量：0-1
    msg.rate = bh_config_data(4);        // 语速：0-10
    msg.pitch = bh_config_data(5);       // 音高：0-1
    synth.speak(msg);    // 播放
}

function openAbout() {
    if ($(".about").css("display") == "none") {
        $(".about").show();
    } else {
        $(".about").removeClass("animate__fadeInDown");
        setTimeout(() => {
            $(".about").css("transform", "translate3d(0,100%,0)");
            $(".about").css("opacity", "0");
        }, 0);
        setTimeout(() => {
            $(".about").hide()
            $(".about").css("transform", "");
            $(".about").css("opacity", "");
            $(".about").addClass("animate__fadeInDown");
        }, 1000);
    }
}
function openSetting() {
    if ($(".setting").css("display") == "none") {
        $(".setting").show();
    } else {
        $(".setting").removeClass("animate__fadeInDown");
        setTimeout(() => {
            $(".setting").css("transform", "translate3d(0,100%,0)");
            $(".setting").css("opacity", "0");
        }, 0);
        setTimeout(() => {
            $(".setting").hide()
            $(".setting").css("transform", "");
            $(".setting").css("opacity", "");
            $(".setting").addClass("animate__fadeInDown");
        }, 1000);
    }
}
var jsonItem = Object.keys(ls('ChatsettingData', 'json'));
for (let i = 0; i < jsonItem.length; i++) {
    if (Object.values(ls('ChatsettingData', 'json'))[i] == true) {
        checkT(jsonItem[i]);
    }
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
        "background": document.getElementById('background').checked,
        "theme": document.getElementById("theme").checked,
        "speak": document.getElementById("speak").checked,
    }
    localStorage.setItem("ChatsettingData", JSON.stringify(setting))
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

function repairContent() {
    sendButton.disabled = false;
    $(sendButton).css("opacity", "1");
    if (eventSource) {
        eventSource.close(); // 关闭 EventSource 对象
    }
    contentEnd = true;
    console.log((new Date().getTime()), 'answer end');
}
