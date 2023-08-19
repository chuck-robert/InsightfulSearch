/* -------------------
* Name: 选项补充插件
* Version: v1.0
* Author: 川上星林
* Date: 2023-8-18
* Mode: true
* Json: []
* ------------------- */
var ___opt_optionsAdder = [];
var ___opt_options = {};

function ___opt_add(jsonArray) {
    var storedOptions = localStorage.getItem('___opt_options');
    for (let i = 0; i < jsonArray.length; i++) {
        ___opt_optionsAdder.push(jsonArray[i]);
        ___opt_options[jsonArray[i].id] = false;
    }
    if (storedOptions) {
        storedOptions = JSON.parse(storedOptions);
        for (var key in storedOptions) {
            if (___opt_options.hasOwnProperty(key)) {
                ___opt_options[key] = storedOptions[key];
            }
        }
    } else {
        for (var key in ___opt_options) {
            ___opt_options[key] = false;
        }
    }
}

$(document).on("click", "ul.set-tab > li:nth-child(5)", function () {
    doc = $("*[___opt_add_doc]");
    for (let i = 0; i < doc.length; i++) {
        doc[i].remove();
    }
    $(".settingMain > .settingFa:nth-child(5) > .settingMainKixa").append(`<hr ___opt_add_doc style="background:#0084ff00;height:1px;margin:15px;">`);
    for (let i = 0; i < ___opt_optionsAdder.length; i++) {
        var d = '', c;
        j = ___opt_optionsAdder[i];
        g = localStorage.getItem('___opt_options');
        if (g) { c = JSON.parse(g)[j.id]; }
        if (c) { d = "checked"; }
        h = `<dl ___opt_add_doc><dt><p>` + j.n + `</p><p>` + j.d + `</p></dt><dd><checkbox><input class="checkbox" type="checkbox" id="` + j.id + `" onclick="` + j.f + `" ` + d + `><label class="checkbox-label" for="` + j.id + `"></label></checkbox></dd></dl>`;
        $(".settingMain > .settingFa:nth-child(5) > .settingMainKixa").append(h);
    }
})
$(document).on("click", "dl[___opt_add_doc] > dd > checkbox input[type=\"checkbox\"]", function () {
    i = $(this).attr("id");
    ___opt_options[i] = ___opt_get_d(i);
    localStorage.setItem("___opt_options", JSON.stringify(___opt_options));
})
function ___opt_get_d(id) {
    return $("#" + id).prop("checked");
}
function ___opt_get(id) {
    a = localStorage.getItem('___opt_options');
    if (a) {
        return JSON.parse(a)[id];
    }
}
