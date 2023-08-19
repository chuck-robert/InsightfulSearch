function execEditorCommand(name, args = null) {
    document.execCommand(name, false, args);
}

const selectRender = (commandName, options = [], title = '') => {
    return `
        <select class="tool" name="${commandName}" id="${commandName}" title="${title}">
            ${options.map((e) => `<option class="${commandName}-option" value="${e.value}">${e.label}</option>`)}
        </select>
    `;
};

const addEventListener = (commandName) => {
    const eventNameMap = {
        fontName: 'change',
        fontSize: 'change',
        backColor: 'change',
        foreColor: 'change',
        styleWithCSS: 'change',
        contentReadOnly: 'change',
        heading: 'change',
    };
    const needInputUrl = ['insertImage', 'createLink'];
    const eventName = eventNameMap[commandName] || 'click';
    const dom = document.getElementById(commandName);
    dom && dom.addEventListener(eventName, () => {
        if (eventName === 'click') {
            if (needInputUrl.includes(commandName)) {
                const value = window.prompt('请输入链接');
                execEditorCommand(commandName, value);
            } else {
                execEditorCommand(commandName);
            }
        } else if (eventName === 'change') {
            const className = `${commandName}-option`;
            const optionSelectedIndex = document.getElementsByClassName(className);
            const value = optionSelectedIndex[dom.selectedIndex].value;
            // debugger
            execEditorCommand(commandName, value);
        }
    });
};


const defaultHtml = ``;

const commandMap = {
    undo: {
        name: '撤销',
        command: 'undo',
    },
    redo: {
        name: '重做',
        command: 'redo',
    },
    fontName: {
        name: '字体名',
        command: 'fontName',
        render: () => {
            const options = [
                { label: '微软雅黑', value: 'Microsoft YaHei' },
                { label: '新罗马', value: 'Times New Roman' },
                { label: '宋体', value: 'SimSun' },
                { label: '平方', value: 'PingFang SC' },
                { label: '华文楷体', value: 'STKaiti' },
                { label: 'Arial', value: 'Arial' },
                { label: 'Calibri', value: 'Calibri' },
                { label: 'Comic Sans MS', value: 'Comic Sans MS' },
                { label: 'Verdana', value: 'Verdana' },
            ];
            return selectRender('fontName', options, '字体名');
        },
    },
    fontSize: {
        name: '字体大小',
        command: 'fontSize',
        render: () => {
            const options = [
                { label: '特小', value: '1' },
                { label: '小', value: '2' },
                { label: '正常', value: '3' },
                { label: '略大', value: '4' },
                { label: '大', value: '5' },
                { label: '很大', value: '6' },
                { label: '极大', value: '7' },
            ];
            return selectRender('fontSize', options, '字体大小');
        },
    },
    heading: {
        name: '标题',
        command: 'heading',
        render: () => {
            const options = [
                { label: 'H1', value: 'H1' },
                { label: 'H2', value: 'H2' },
                { label: 'H3', value: 'H3' },
                { label: 'H4', value: 'H4' },
                { label: 'H5', value: 'H5' },
                { label: 'H6', value: 'H6' },
            ];
            return selectRender('heading', options, '标题');
        },
    },
    bold: {
        name: '加粗',
        command: 'bold',
    },
    italic: {
        name: '斜体',
        command: 'italic',
    },
    underline: {
        name: '下划线',
        command: 'underline',
    },
    strikeThrough: {
        name: '删除线',
        command: 'strikeThrough',
    },
    backColor: {
        name: '背景颜色',
        command: 'backColor',
        render: () => {
            const options = [
                { label: '黑', value: 'black' },
                { label: '红', value: 'red' },
                { label: '橙', value: 'orange' },
                { label: '蓝', value: 'blue' },
                { label: '绿', value: 'green' },
                { label: '白', value: 'white' },
                { label: '灰', value: '#999' },
                { label: '浅灰', value: '#ddd' },
            ];
            return selectRender('backColor', options, '背景颜色');
        },
    },
    foreColor: {
        name: '字体颜色',
        command: 'foreColor',
        render: () => {
            const options = [
                { label: '黑', value: 'black' },
                { label: '红', value: 'red' },
                { label: '橙', value: 'orange' },
                { label: '蓝', value: 'blue' },
                { label: '绿', value: 'green' },
                { label: '白', value: 'white' },
                { label: '灰', value: '#999' },
                { label: '浅灰', value: '#ddd' },
            ];
            return selectRender('foreColor', options, '字体颜色');
        },
    },
    superscript: {
        name: '上标',
        command: 'superscript',
    },
    subscript: {
        name: '下标',
        command: 'subscript',
    },
    justifyCenter: {
        name: '居中对齐',
        command: 'justifyCenter',
    },
    justifyFull: {
        name: '两端对齐',
        command: 'justifyFull',
    },
    justifyLeft: {
        name: '左对齐',
        command: 'justifyLeft',
    },
    justifyRight: {
        name: '右对齐',
        command: 'justifyRight',
    },
    removeFormat: {
        name: '清除样式',
        command: 'removeFormat',
    },
    insertHorizontalRule: {
        name: '分割线',
        command: 'insertHorizontalRule',
    },
    insertUnorderedList: {
        name: '无序列表',
        command: 'insertUnorderedList',
    },
    insertOrderedList: {
        name: '有序列表',
        command: 'insertOrderedList',
    },
    increaseFontSize: {
        name: '字体变大',
        command: 'increaseFontSize',
    },
    decreaseFontSize: {
        name: '字体变小',
        command: 'decreaseFontSize',
    },
    styleWithCSS: {
        name: '标记方式',
        command: 'styleWithCSS',
        render: () => {
            const options = [
                { label: 'html标签', value: false },
                { label: 'css样式', value: true },
            ];
            return selectRender('styleWithCSS', options, '标记方式(使用html标签 还是css样式来生成标记)');
        },
    },
    createLink: {
        name: '插入链接',
        command: 'createLink',
    },
    insertImage: {
        name: '插入图片',
        command: 'insertImage',
    },
    contentReadOnly: {
        name: '区域是否可以编辑',
        command: 'contentReadOnly',
        render: () => {
            const options = [
                { label: '是', value: true },
                { label: '否', value: false },
            ];
            return selectRender('contentReadOnly', options, '区域是否可以编辑');
        },
    },
};

const commands = [
    'undo',
    'redo',
    'fontName',
    'fontSize',
    // 'heading',
    'bold',
    'italic',
    'underline',
    'strikeThrough',
    'backColor',
    'foreColor',
    'superscript',
    'subscript',
    // 对光标插入位置或者所选内容进行文字对齐
    'justifyCenter',
    'justifyFull',
    'justifyLeft',
    'justifyRight',
    // 对所选内容去除所有格式
    'removeFormat',
    'insertHorizontalRule',
    'insertUnorderedList',
    'insertOrderedList',
    // 'increaseFontSize',
    // 'decreaseFontSize',
    'createLink',
    'insertImage',
    // 标记使用html标签还是css
    'styleWithCSS',
    // 'contentReadOnly',
];

const commandZone = document.getElementById('commandZone');
const editor = document.getElementById('editor');
const editable = document.getElementById('editable');


const htmlList = commands.map((commandName) => {
    const command = commandMap[commandName];
    if (!command) {
        return '';
    }
    if (command.render) {
        return command.render();
    }
    // <button class="btn tool" id="${commandName}">${command.name}</button>
    return `
        <img class="icon tool" id="${commandName}" title="${command.name}" src="icon/${commandName}.svg"/>
    `;
});
commandZone.innerHTML = htmlList.join('\n');
editor.innerHTML = defaultHtml;

editable.addEventListener('click', (e) => {
    if ($("#editor").attr("contentEditable") == "true") {
        $("button.editable > img").attr("src","./img/editor.png")
        $("#editor").attr("contentEditable","false");
        $("div#commandZone").hide();
    } else {
        $("button.editable > img").attr("src","./img/view.png")
        $("#editor").attr("contentEditable","true")
        $("div#commandZone").show();
    }
});

// editor.addEventListener('mouseup', () => {
//     console.log(document.getSelection());
// });

setTimeout(() => {
    commands.forEach((commandName) => addEventListener(commandName));
}, 100);