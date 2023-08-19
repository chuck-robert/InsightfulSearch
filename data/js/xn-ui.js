const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
function xn_progress(id, progress, child) {
    if (child == undefined) {
        dom = $(".xn_css.add_pb#" + id);
        dom[0].style.setProperty("--xn-progress", progress);
        progress_text = $(".xn_css.add_pb#" + id + " div[data-progress] span")[0];
        progress_text.innerText = progress;
    } else {
        progress_div = $(".xn_css.add_pb#" + id + " div[data-progress-" + child + "]")[0];
        progress_text = $(".xn_css.add_pb#" + id + " div[data-progress-" + child + "] span")[0];
        progress_div.style.width = progress;
        progress_text.innerText = progress;
    }
}
async function xn_count(id) {
    add = Number($("#" + id).attr("xn_count-add"))
    max = Number($("#" + id).attr("xn_count-max"))
    min = Number($("#" + id).attr("xn_count-min")) - 2 * add
    time = Number($("#" + id).attr("xn_count-time"))
    for (let num = min; num < max - add;) {
        await sleep(time)
        num = num + add
        $("#" + id).text(num + add)
    }
}
xn_count_auto_up = $("*[xn_count_up]").length;
for (let i = 0; i < xn_count_auto_up; i++) {
    id = $("*[xn_count_up]")[i].getAttribute("id")
    xn_count(id)
}
$(".xn_css.menu_title").on("click", function () {
    menu_for = $(this).attr("for");
    menu = $('.xn_css.uol_2[name="' + menu_for + '"]')
    height = 0;
    if (menu.attr("class").indexOf('menu_hidden') > -1) {
        menu[0].classList.remove("menu_hidden")
        for (let i = 0; i < $('.xn_css.uol_2[name="' + menu_for + '"] > *').length; i++) {
            li = $('.xn_css.uol_2[name="' + menu_for + '"] > *')[i]
            height += li.clientHeight;
        }
        menu[0].style.maxHeight = height + "px"
        menu[0].parentNode.parentNode.style.maxHeight = menu[0].parentNode.parentNode.clientHeight + height + "px"
    } else {
        menu[0].classList.add("menu_hidden")
        menu[0].style.maxHeight = 0
    }
})
$(document).on("click",".xn_css.xn_tab_btn", function () {
    index = Number($(this).index()) + 1
    tab_for = $(this).parents()[0].getAttribute("for")
    tab_fade = $(this).parents()[0].getAttribute("fade")
    btn = $(".xn_css.xn_tab_bar[for=\"" + tab_for + "\"] .xn_css.xn_tab_btn");
    con = $(".xn_css.xn_tab[name=\"" + tab_for + "\"] .xn_css.xn_tab_content");
    time = 0
    $(".xn_css.xn_tab[name=\"" + tab_for + "\"] .xn_css.xn_tab_content.active")[0].style.opacity = 0;
    for (let i = 0; i < btn.length; i++) {
        btn[i].classList.remove("active")
    }
    $(this)[0].classList.add("active")
    if (tab_fade == "f") {
        time = 0
    } else {
        time = 300
    }
    setTimeout(() => {
        for (let i = 0; i < con.length; i++) { con[i].classList.remove("active") }
        $(".xn_css.xn_tab[name=\"" + tab_for + "\"] .xn_css.xn_tab_content:nth-child(" + index + ")")[0].classList.add("active")
        $(".xn_css.xn_tab[name=\"" + tab_for + "\"] .xn_css.xn_tab_content:nth-child(" + index + ")")[0].style.opacity = 1;
    }, time);
})
$(".xn_css.fold_title").on("click", function () {
    fold_for = $(this).attr("for");
    fold = $('.xn_css.fold_content[name="' + fold_for + '"]')
    fold_height = 200;
    if (fold.attr("class").indexOf('fold_hidden') > -1) {
        fold[0].classList.remove("fold_hidden")
        for (let i = 0; i < $('.xn_css.fold_content[name="' + fold_for + '"] > *').length; i++) {
            fold_content = $('.xn_css.fold_content[name="' + fold_for + '"] > *')[i]
            fold_height += fold_content.clientHeight;
        }
        fold[0].style.maxHeight = fold_height + "px"
        fold[0].parentNode.style.maxHeight = fold[0].parentNode.clientHeight + fold_height + "px"
    } else {
        fold[0].classList.add("fold_hidden")
        fold[0].style.maxHeight = 0
    }
})
$(".xn_css.editor").on('click', function () {
    $(this).attr('contentEditable', 'true');
    $(this).focus().select()
});
$(".xn_css.editor").on('blur', function () {
    $(this).attr("xn-editor", "edited");
});
$(".xn_css.copy").on('click', function () {
    $(this).attr('contentEditable', 'true');
    $(this).parent().append("<input type=\"text\" id=\"xn_copybox\" value=\"" + $(this).text() + "\">")
    $("input#xn_copybox").select()
    document.execCommand("Copy")
    $("input#xn_copybox").remove()
});
function xn_copy(name) {
    $(".xn_css.copy[name=\"" + name + "\"]").click()
}
function xn_edited() {
    $("html").attr("xn-edited-view","true")
    setTimeout(() => {
        $("html").attr("xn-edited-view","false")
    }, 5000);
}
$(document).on('click', '.corrugation', function (event) {
	var ripple = $("<div class='ripple'></div>");
	var posX = event.pageX - $(this).offset().left;
	var posY = event.pageY - $(this).offset().top;
	ripple.css({ top: posY, left: posX });
	$(this).append(ripple);
	setTimeout(function () {
		ripple.remove();
	}, 600);
});
