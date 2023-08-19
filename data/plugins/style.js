/* -------------------
* Name: 自定义css
* Version: v1.0
* Author: 川上星林
* Date: 2023-8-6
* Mode: true
* Json: []
* ------------------- */
___opt_add([
    {
        "n": "高级自定义",
        "d": "自定所有可自定义元素样式",
        "id": "_opt_style_setting",
        "f": "___style_setting()"
    }
]);
___style_setting();
function ___style_setting() {
    k = `<i ___style_settingMode_ico class="MenuIconInput fas fa-pencil" style="color: var(--v1-002-font);" aria-hidden="true" onclick="___style_setting_s()"></i>`;
    setTimeout(() => {
        if (___opt_get("_opt_style_setting")) {
            $(".openSettingMenuInput").prepend(k);
            applySavedStyles();
        } else {
            $("[___style_settingMode_ico]").remove();
        }
    }, 400);
}
var ___style_settingMode = false;

function ___style_setting_s() {
    xnAppId(5);
}
function printUniqueLeafElementInfoJSON() {
    var uniqueElementInfo = {};
    $("body *:not(:has(*)), body > div, #TMTR_Box, #TMTR_Box *, #weatherBox *, #sentence *,.searchBody *,#setting *").each(function () {
        var elementInfo = getElementInfoWithAncestors($(this));
        if (elementInfo && !uniqueElementInfo[elementInfo]) {
            uniqueElementInfo[elementInfo] = true;
        }
    });
    return uniqueElementInfo;
}

function getElementInfoWithAncestors(element) {
    var elementInfo = getElementInfo(element);
    if (!hasClassOrId(elementInfo)) {
        var ancestorsInfo = getAncestorsInfo(element);
        if (ancestorsInfo) {
            elementInfo = ancestorsInfo + "  " + elementInfo;
        }
    }
    return elementInfo;
}

function getAncestorsInfo(element) {
    var ancestorsInfo = [];
    var currentElement = element.parent();
    while (currentElement.length > 0) {
        var elementInfo = getElementInfo(currentElement);
        if (hasClassOrId(elementInfo)) {
            ancestorsInfo.unshift(elementInfo);
            break;
        } else {
            ancestorsInfo.unshift(currentElement.prop("tagName").toLowerCase());
            currentElement = currentElement.parent();
        }
    }
    return ancestorsInfo.length > 0 ? ancestorsInfo.join("  ") : null;
}

function hasClassOrId(elementInfo) {
    return elementInfo.includes(".") || elementInfo.includes("#");
}

var ___style_item;
$(document).on("click", "#___doc_show_box .btn-default", function () {
    ___style_item = $(this).attr("value");
    $("#___style_sss_doc").val(___style_item);
    $("#___style_setting_box").show();
    $(".___style_setting_box_t").show();
    $("#___doc_show_box").html(`<p class="xn_css p_text success_content ___style_msg">您已选择 ` + ___style_item + ` 做为修改样式的元素</p>`);
});
$(document).ready(function () {
    $(document).on("click", "body > *:not(#windowsList):not(#windowsList *)", function () {
        var clickedElement = $(this);
        var targetElement = getTargetElement(clickedElement);
        if (___style_mode_html_pick) {
            var ___style_bl_element = getElementInfoWithAncestors(targetElement);
            var elementInfoObject = printUniqueLeafElementInfoJSON();
            var matchedElements = Object.keys(elementInfoObject).filter(function (elementInfo) {
                return elementInfo.includes(___style_bl_element);
            });
            if (matchedElements.length > 0) {
                $("#___doc_show_box").html(``);
                $("#___doc_show_box").html(`<p class="xn_css p_text success_content ___style_msg">根据已点击的元素，我们搜索到以下结果</p>`);
                matchedElements.forEach(function (elementInfo) {
                    var element = $(elementInfo);
                    var elementNamesSet = new Set();
                    elementNamesSet.add(elementInfo);
                    element.find("*").each(function () {
                        var childElementInfo = getElementInfo($(this));
                        elementNamesSet.add(elementInfo + "  " + childElementInfo);
                    });
                    var allElementNames = Array.from(elementNamesSet);
                    for (let i = 0; i < allElementNames.length; i++) {
                        $("#___doc_show_box").append(`<input type="button" k value="` + allElementNames[i] + `" class="xn_css xn_button_1 btn-default"><br>`);
                    }
                });
                openWindows('#superStyles', e);
                ___style_mode_html_pick = false;
                $("html").attr("___style_mode", "");
            } else {
                console.log("未搜索到符合元素");
            }
        }
    });
});

function getTargetElement(element) {
    if (!element.children().length) {
        return element;
    } else {
        var currentElement = element;
        while (currentElement.children().length) {
            var parent = currentElement.parent();
            if (hasClassOrId(getElementInfo(parent))) {
                return currentElement;
            }
            currentElement = parent;
        }
        return currentElement;
    }
}

function hasClassOrId(elementInfo) {
    return elementInfo.includes(".") || elementInfo.includes("#");
}

function getElementInfo(element) {
    var elementName = element.prop("tagName").toLowerCase();
    var classNames = element.attr("class");
    var elementId = element.attr("id");
    var info = elementName;
    if (classNames) {
        info += "." + classNames.split(" ").join(".");
    }
    if (elementId) {
        info += "#" + elementId;
    }
    return info;
}



var ___style_mode_html_pick;
$(document).on("click", "#___doc_show_box .btn-primary", function () {
    delWindows('#superStyles', e);
    $("html").attr("___style_mode", "a");
    ___style_mode_html_pick = true;
})
function applySavedStyles() {
    var savedStyles = JSON.parse(localStorage.getItem("savedStyles"));
    
    if (savedStyles) {
        var styleTag = $("<style></style>"); // 创建 <style> 标签
        var styleContent = ""; // 用于存储样式内容

        for (var element in savedStyles) {
            var elementStyles = savedStyles[element];
            styleContent += element + " {"; // 使用原始元素名作为选择器
            
            for (var styleName in elementStyles) {
                var styleValue = elementStyles[styleName];
                
                if (styleValue !== "") {
                    styleContent += styleName + ": " + styleValue + ";";
                }
            }
            
            styleContent += "} ";
        }

        styleTag.text(styleContent); // 设置 <style> 内容
        $("head").append(styleTag); // 将 <style> 标签添加到 <head> 中
    }
}



function applyStyles() {
    if (___style_item) {
        var styles = {
            "font-family": $("#___style_sss_font-family-input").val(),
            "font-size": $("#___style_sss_font-size-input").val(),
            "color": $("#___style_sss_font-color-input").val(),
            "background": $("#___style_sss_bg-input").val(),
            "border": $("#___style_sss_border-input").val(),
            "padding": $("#___style_sss_padding-input").val() + "px",
            "border-radius": $("#___style_sss_border-radius").val() + "px",
            "box-shadow": $("#___style_sss_box-shadow").val(),
            "margin": $("#___style_sss_margin-input").val(),
            "text-align": $("input[name='alignment']:checked").val(),
            "width": $("#___style_sss_width-input").val(),
            "height": $("#___style_sss_height-input").val(),
            "transform": "translateX(" + $("#___style_sss_position-left-input").val() + ") translateY(" + $("#___style_sss_position-top-input").val() + ")"
        };
        $(___style_item).css(styles);
        saveStylesToLocalStorage(styles);
        $("#___style_setting_box").hide();
        ___style_item = null;
    }
    closeWindows('#superStyles', e)
}

function saveStylesToLocalStorage(styles) {
    var savedStyles = JSON.parse(localStorage.getItem("savedStyles")) || {};
    savedStyles[$("#___style_sss_doc").val()] = styles;
    localStorage.setItem("savedStyles", JSON.stringify(savedStyles));
}

var currentElement = null;