// app/components/editor-md.js
// 创建Markdown编辑器
// TODO 重要提示： 只有在edit.hbs和newnote.hbs两个模板中才会调用到此组件
import Ember from 'ember';
// import createMarkdownEditor from '../utils/create-markdown-editor';

export default Ember.Component.extend({
    loginUser: Ember.inject.service('login-user'),
    // attributeBindings: ['id'],
    // id: 'editormd',

    didInsertElement() {  //didRender  didInsertElement

        // 页面手动刷新后需要手动设置选中的笔记本、笔记本标题等
        showNoteHideNotebook(Ember);
        var content = '';
        // 编辑模式需要设置以及存在的标题信息
        if ('edit' === this.get('type')) {
            // 编辑摸下下还要初始化已经有的笔记内容
           content = this.get('content');
           //    设置顶部标题
            Ember.$("#noteTitldInputId").val(this.get("title"));
        }
        // 新建模式
        if ('new' === this.get('type')) {
            // 重置笔记标题输入框
            Ember.$("#noteTitldInputId").val("");
        }

		createEditor(this, content);

        //得到选中的笔记本id。这个值是在newnote.hbs中设置的
        var id = Ember.$("#selectedNotebookIdInNewNoteTpl").val();
        if (!id) {
            id = Ember.$("#selectedNotebookIdInEditNoteTpl").val();
        }
        // 设置选中状态
        var ids = `#${id}`;
        Ember.$(ids).addClass('active');

        // 设置新建按钮链接的href属性
        var href = `/#/v2/notebook/${id}/newnote`;
        Ember.$("#newNoteLinkId").attr('href', href);

        // 退出全屏预览时设置返回按钮显示
        Ember.$('.editormd-preview-close-btn').click(function() {
            Ember.$(".retunNoteList").show();
        });

    },  // didInsertElement
    didRender() {
        this._super(...arguments);
    }
});

function createEditor(that, content) {

    var editor = editormd("editormd", {
        // 指定codemirror插件路径，
        path : "/assets/editormd/lib/", // Autoload modules mode, codemirror, marked... dependents libs path
        // pluginPath: 'assets/editormd/plugins/',
        // width: "100%",
       // height: 740,
        // autoHeight: true,
        //  theme : "dark",
        //  previewTheme : "dark",
        //  editorTheme : "dark",
        //
        markdown : content,
        codeFold : true,
        placeholder: "请输入您的笔记内容。",
        //syncScrolling : false,
        saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
        searchReplace : true,
        //watch : false,                // 关闭实时预览
        htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
        // toolbar  : false,             //关闭工具栏
        //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
        emoji : true,
        taskList : true,
        tocm            : true,         // Using [TOCM]
        tex : true,                   // 开启科学公式TeX语言支持，默认关闭
        flowChart : true,             // 开启流程图支持，默认关闭
        sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
        toolbarIcons : function() {
            return [
                "bold", "del", "italic", "quote", "|",
                "h1", "h2", "h3", "h4", "h5", "h6", "|",
                "list-ul", "list-ol", "hr", "|",
                // "link", "imageUpload", "code", "table", "emoji", "|",
                "imageUpload", "|",
                "watch", "preview", "|",  //"fullscreen",
                // "help", "info", "|",
                "returnPreLevel", "|",
                "autosave"
            ];
        },
        lang: {
            // 工具类的title提示
            toolbar: {
                preview          : "全窗口预览",
                returnPreLevel:   "保存",
                autosave			 :  "自动保存",
                imageUpload: "插入图片"
            }
        },
        // 指定自定义工具栏的图标
        toolbarIconsClass : {
            returnPreLevel : "fa-floppy-o",  // 指定一个FontAawsome的图标类
            // 弹出一个模态框插入图片
            imageUpload: "fa-image"
        },
        // 指定自定义工具栏的图标的提示文字
        toolbarIconTexts : {
            //save : "保存"  // 如果没有图标，则可以这样直接插入内容，可以是字符串或HTML标签
        },
        // 用于增加自定义工具栏的功能，可以直接插入HTML标签，不使用默认的元素创建图标
        toolbarCustomIcons : {
            //name属性指定执行的方法
            //<i class=\"fa fa-check\" name=\"check\" unselectable=\"on\"></i>\
            // returnPreLevel: "<i class=\"fa fa-save\" name=\"returnPreLevel\" unselectable=\"on\"></i>",

            //<i class=\"iconfont btn-save\" name=\"check\" unselectable=\"on\">&#xe633;</i>\
            autosave : "<a class=\"save-link\" href=\"javascript:;\" title=\"保存\" unselectable=\"on\">" +
                        "<div class=\"GIKW210DKB\">" +
                            "<div>" +
                                "<div data-reactroot=\"\" class=\"focus-editor-SaveAnimation-SaveAnimation-container\">" +
                                    "<div class=\"focus-editor-SaveAnimation-Icon-icon focus-editor-SaveAnimation-Icon-gray\"></div>" +
                                    "<div class=\"focus-editor-SaveAnimation-Icon-icon focus-editor-SaveAnimation-Icon-in-progress\"></div>" +
                                    "<div class=\"focus-editor-SaveAnimation-Icon-icon focus-editor-SaveAnimation-Icon-green\"></div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                        "<div class=\"GIKW210BKB\">" +
                            "<div class=\"GIKW210DJB\" aria-hidden=\"true\" style=\"\">" +
                                "<div tabindex=\"0\" class=\"GIKW210EJB\">" +
                                    "<input type=\"text\" tabindex=\"-1\" role=\"presentation\"" +
                                        "style=\"opacity: 0; height: 1px; width: 1px; z-index: -1; overflow: hidden; position: absolute;\">" +
                                "</div>" +
                                "<div tabindex=\"0\" class=\"GIKW210OF GIKW210PF GIKW210FJB\">" +
                                        "<input type=\"text\" tabindex=\"-1\" role=\"presentation\"" +
                                            "style=\"opacity: 0; height: 1px; width: 1px; z-index: -1; overflow: hidden; position: absolute;\">" +
                                        "<div>" +
                                            "<div class=\"GIKW210MF\"></div>" +
                                            "<div class=\"GIKW210AD\"></div>" +
                                        "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</a>"
            // 弹出一个模态框插入图片
            // imageUpload: "<i class=\"fa fa-image\" name=\"imageUpload\" unselectable=\"on\"></i>"
        },

        // 自定义工具栏按钮的事件处理
        toolbarHandlers : {
            // 上传图片并插入到光标所在位置
            imageUpload: function(cm, icon, cursor, selection) {
                Ember.$("#imgageUploadModal").modal('show');
            },
            //
             // @param {Object}      cm         CodeMirror对象
             // @param {Object}      icon       图标按钮jQuery元素对象
             // @param {Object}      cursor     CodeMirror的光标对象，可获取光标所在行和位置
             // @param {String}      selection  编辑器选中的文本
             //
            returnPreLevel : function(cm, icon, cursor, selection) {
                var id = Ember.$("#selectedNotebookIdInNewNoteTpl").val();
                if (!id) {
                    id = Ember.$("#selectedNotebookIdInEditNoteTpl").val();
                }
                // 获取当前笔记的
                var saveOrUpdateId = Ember.$("#autosaveFlag").val();  //新增笔记时会有值
                //  编辑笔记
                if (!saveOrUpdateId) {
                    saveOrUpdateId = Ember.$("#editedNoteId").val();  //修改笔记时会有值
                }
                var href = "";
                // saveOrUpdateId还是为空，说明是刚从新建进来页面并且还没做任何保存
                if (saveOrUpdateId) {
                    href = `/#/v2/notebook/list/${id}/${saveOrUpdateId}/detail`;
                } else {
                    href = `/#/v2/notebook/list/${id}`;
                }
                location.href = href;
            }
        },
        onload : function() {
            lastLinecodePaddingBottom(Ember);
            // 手动设置自动保存提示按钮位置
            Ember.$(".editormd-toolbar .editormd-menu li:last-child").css({'position': 'fixed', 'top': '70px', 'right': '30px'});
        },
        // 监听输入变化，可在此方法中保存数据（自动保存）
        onchange : function() {
            lastLinecodePaddingBottom(Ember);
            // 从页面获取选中的笔记本
            //得到选中的笔记本id。这个值是在list.hbs中设置的
            var notebookId = Ember.$("#selectedNotebookIdInNewNoteTpl").val();
            if (!notebookId) {
                notebookId = Ember.$("#selectedNotebookIdInEditNoteTpl").val();
            }
            //  笔记标题
            var title = Ember.$("#noteTitldInputId").val() || "无标题";
            // 输入Markdown内容。
            var content = this.getMarkdown();
            //简单校验
            if (!(notebookId && content)) { return; }

            // 显示提示保存成功按钮
            Ember.$(".focus-editor-SaveAnimation-Icon-icon").css('opacity', "1");

            // 如果此值不为空，说明不是第一次保存了，应该执行更新
            var saveOrUpdateId = Ember.$("#autosaveFlag").val();
            //  编辑笔记
            if ('edit' === that.get('type')) {
                saveOrUpdateId = Ember.$("#editedNoteId").val();
            }
            if (saveOrUpdateId) {
                that.store.findRecord('note', saveOrUpdateId).then((n) => {
                    n.set('title', title);
                    n.set('timestamp', new Date().getTime());
                    n.set('content', content);
                    // notebookId: notebookId,
                    // notebook: notebook
                    n.save().then(() => {
                        Ember.run.later({}, function() {
                          Ember.$(".focus-editor-SaveAnimation-Icon-icon").css('opacity', "0");
                      }, 4000);
                    });
                });

            } else {
                // 获取输入内容
                let notebook = that.store.peekRecord('notebook', notebookId);
                var uid = sessionStorage.getItem('uid');
                let note = that.store.createRecord('note', {
                    userId: uid,
                    title: title,
                    content: content,
                    notebookId: notebookId,
                    notebook: notebook
                });

                notebook.get('notes').pushObject(note);
                note.save().then((n) => {
                    //保存成功后设置id到页面作为标记，第二次则直接更新
                    var id = n.get('id');

                    Ember.$("#autosaveFlag").val(id);

                    notebook.save().then(() => {
                        Ember.run.later({}, function() {
                          Ember.$(".focus-editor-SaveAnimation-Icon-icon").css('opacity', "0");
                      }, 4000);
                    });
                });
            }  // if
        },  //onchange
        //编辑窗口滚动事件
        onscroll : function(event) {
            // this.setToolbarAutoFixed();
            lastLinecodePaddingBottom(Ember);
        },
        // 预览窗口滚动
        onpreviewscroll : function(event) {
            lastLinecodePaddingBottom(Ember);
        }

    //toolbarIcons: 'simple'
    });  // editor

    editor.setToolbarAutoFixed();
    window.editor = editor;
}  // end createEditor

/**
 * 隐藏笔记本标题输入框
 * 显示笔记标题输入框
 * @param  {[type]} Ember [当前页面dom对象]
 * @return {[type]}       [description]
 */
function showNoteHideNotebook(Ember) {
    Ember.$("#notebookTitldInputId").hide(function() {
        //显示新建笔记的标题输入框
        Ember.$("#noteTitldInputId").show(function() {
            //清空标题输入框
            // Ember.$("#noteTitldInputId").val('');
            //  使其取得焦点
            Ember.$("#noteTitldInputId").focus();
        });
    });
}

function lastLinecodePaddingBottom(Ember) {
    //先清空之前滚动设置的底部样式
    Ember.$("#editormd .CodeMirror-code div").each(function() {
        Ember.$(this).css({'padding-bottom': '0'});
    });
    Ember.$("#editormd .CodeMirror-code div:last-child").css({'padding-bottom': '100px'});
}
