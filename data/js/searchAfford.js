$(function () {
    $('#text').on('keyup', function () {
        if ($("#text").val() !== '') {
            var text = document.getElementById("text").value;
            var keywords = $(this).val();
            var str = keywords.substr(5);
            var realt = /(zq-xn)[\s][^]+/;
            var searchUrlTest = /^((https|http|ftp|rtsp|mms)?:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])[^\s]+/;
            var wikikey = 'wiki ' + str;
            var value = keywords;
            value = value.replace(/&/g, "&amp;");
            value = value.replace(/</g, "&lt;");
            value = value.replace(/>/g, "&gt;");
            value = value.replace(/ /g, "&nbsp;");
            value = value.replace(/"/g, '&quot;');
            var tr = '<a href="https://fanyi.baidu.com/#zh/en/' + encodeURIComponent(keywords) + '" target="_blank"><div class="back"><i class="text-afford fas fa-globe-asia"/>   <pre><code>翻译：' + value + '</pre></code></div></a>';

            $.ajax({
                url: 'http://suggestion.baidu.com/su?wd=' + keywords,
                dataType: 'jsonp',
                jsonp: 'cb',
                success: function (data) {
                    var word = $("#word");
                    var collectList = JSON.parse(localStorage.getItem("CollectList"));
                    var filteredData = collectList.filter(function (item) {
                        var regex = new RegExp(text.split("").join('.*'), 'i');
                        return regex.test(item.title.toLowerCase());
                    });

                    word.css("max-height", (data.s.length + filteredData.length) * 30 + 55 + 'px')
                    var textVal2 = document.getElementById("text").value;
                    $('#word').empty().show();

                    filteredData.forEach(function (item) {
                        $('#word').append(`<a href="` + item.url + `" target="_blank"><div class="back"><i class="text-afford star fas fa-star"></i><pre><code>收藏：` + item.title + `</code></pre></div></a>`);
                    });
                    setTimeout(() => {
                        if (textVal2 == " " * textVal2.length) {
                            $('#word').empty().hide();
                        } else {
                            $('#word').append(tr);
                        }
                        if (data.s == '') { }
                        $.each(data.s, function () {
                            $('#word').append('<div class="click_work" onclick="goS()">' + this + '</div>');
                        });
                        if (realt.test(textVal2)) { } else {
                            if (/(Wiki|wikipedia|Wikipedia|wikiPedia|WikiPedia|wp|WIKI|bk|百科|baike|wk)[\s][^]+/.test(document.getElementById("text").value)) {
                                document.getElementById("text").value = "wiki ";
                            }
                            if (keywords == wikikey) {
                                $('#word').empty().show();
                                $('#word').append('<a href="https://baike.baidu.com/item/' + str + '" target="_blank"><div class="back"><i class="text-afford fas fa-book-open" />维基：' + str + '</div></a>');
                                // $('#word').append(tr);
                                $.each(data.s, function () {
                                    $('#word').append('<div class="click_work" onclick="goS()">' + this + '</div>');
                                });
                                return;
                            }
                        }
                        if (searchUrlTest.test(textVal2)) {
                            $('#word').empty().show();
                            $('#word').append('<div class="back"><a href="' + text + '" target="_blank"><i class="text-afford fas fa-link"/>打开链接</a></div>');
                        }
                    }, 0);
                },
                // error: function () {
                // 	$('#word').empty().hide();
                // 	$('#word').append('<div class="click_work">Fail "' + encodeURIComponent(keywords) + '"</div>');
                // }
            });

            if (keywords == ' ' || text == " " || keywords == undefined) {
                $('#word').hide();
                return;
            }
            if (event.keyCode == 27) {
                textVal = "";
                $('#word')[0].focus();
            }
        }
    });

    $(document).on('click', '.click_work', function () {
        var word = $(this).text();
        $('#text').val(word);
        $('#word').hide();
    });
});


function stopFunc(e) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
}
$('#word div').click(function () {
    var key = this;
    var input = document.getElementById("text");
    $('#word div').each(function () {
        input.value = key.innerText;
    });
});
var value = $("#text").val();
var vLength = value.length;
if (value.match(/^[ ]*$/)) {
    function stop() { return false; }
}
function checkHtml(htmlStr) {
    var reg = /<[^>]+>/g;
    return reg.test(htmlStr);
}
checkHtml($("#text").val())