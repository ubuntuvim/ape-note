// app/utils/markdown-to-html.js  转换Markdown为HTML标签
export default function markdownToHTML(options) {
    //  在ape-note-right-main-note-list.js中会根据点击的笔记手动设置右边预览区域的内容
     // 在show-markdown.hbs中指定的div的id属性值
    editormd.markdownToHTML("editormd-view", options || {
        path : "/assets/editormd/lib/", // Autoload modules mode, codemirror, marked... dependents libs path
        // markdown        : null ,//+ "\r\n" + $("#append-test").text(),
       //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
        htmlDecode      : "style,script,iframe",  // you can filter tags decode

        // Editor.md theme, default or dark, change at v1.5.0
        // You can also custom css class .editormd-theme-xxxx
        // theme : "default | dark",

        // Preview container theme, added v1.5.0
        // You can also custom css class .editormd-preview-theme-xxxx
        // previewTheme : "dark",

        // Added @v1.5.0 & after version this is CodeMirror (editor area) theme
        // editorTheme : editormd.editorThemes['theme-name'],

    //    toc             : false,
        tocm            : true,    // Using [TOCM]
       //tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
    //    gfm             : false,  //禁止后代码块格式会乱掉
       //tocDropdown     : true,
       // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
        emoji           : true,
        taskList        : true,
        tex             : true,  // 默认不解析
        flowChart       : true,  // 默认不解析
        sequenceDiagram : true  // 默认不解析
   });

}
