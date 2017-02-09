// app/components/editor-md.js
// 创建Markdown编辑器
import Ember from 'ember';

export default Ember.Component.extend({
    attributeBindings: ['id'],
    id: 'editormd',

    didInsertElement() {
		var ember = this;
		Ember.$.get('/assets/md-files/test.md', function(md) {

			var editor = editormd("editormd", {
				path : "assets/editormd/lib/", // Autoload modules mode, codemirror, marked... dependents libs path
				// width: "100%",
			   // height: 740,
				// autoHeight: true,
				//  theme : "ambiance",
				//  previewTheme : "ambiance",
				//  editorTheme : "ambiance",
				markdown : md,
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
				dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
				dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
				dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
				dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
				dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
				imageUpload : true,
				imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
				imageUploadURL : "./php/upload.php",
				onload : function() {
					//console.log('onload', this);
					//this.fullscreen();
					//this.unwatch();
					//this.watch().fullscreen();
					//this.setMarkdown("#PHP");
					//this.width("100%");
					//this.height(480);
					//this.resize("100%", 640);
					//加载完成直接进入全屏预览状态
					// this.previewing();
				},
			    toolbarIcons : function() {
				    return [
					    "bold", "del", "italic", "quote", "|",
					    "h1", "h2", "h3", "h4", "h5", "h6", "|",
					    "list-ul", "list-ol", "hr", "|",
					    "link", "image", "code", "table", "emoji", "|",
					    "watch", "preview", "fullscreen", "|",
					    "help", "info", "|",
						"save"
				    ];
			    },
				lang: {
					// 工具类的title提示
					toolbar: {
						preview          : "全窗口预览", 
						save			 :  "保存"
					}
				}
				
				// 指定自定义工具栏的图标
				,toolbarIconsClass : {
					//save : "fa-floppy-o"  // 指定一个FontAawsome的图标类
				},
				// 指定自定义工具栏的图标的提示文字
				toolbarIconTexts : {
					//save : "保存"  // 如果没有图标，则可以这样直接插入内容，可以是字符串或HTML标签
				},
				// 用于增加自定义工具栏的功能，可以直接插入HTML标签，不使用默认的元素创建图标
				toolbarCustomIcons : {
					//name属性指定执行的方法
					save : "<a href=\"javascript:;\" title=\"保存\" unselectable=\"on\">\
							<i class=\"fa fa-floppy-o\" name=\"save\" unselectable=\"on\"></i></a>"
				},

				// 自定义工具栏按钮的事件处理
				toolbarHandlers : {
					//
					 // @param {Object}      cm         CodeMirror对象
					 // @param {Object}      icon       图标按钮jQuery元素对象
					 // @param {Object}      cursor     CodeMirror的光标对象，可获取光标所在行和位置
					 // @param {String}      selection  编辑器选中的文本
					 //
					save : function(cm, icon, cursor, selection) {
				
						/*
						let blogPost = this.get('store').peekRecord('blog-post', 1);
						let comment = this.get('store').createRecord('comment', {
						});
						blogPost.get('comments').pushObject(comment);
						comment.save().then(function () {
						  blogPost.save();
						});*/
						var notebookId = '-KcWrZB3HUE9yVyYgIEe';
						// 获取输入内容
						//console.log("content = " + this.getMarkdown());
						let notebook = ember.store.peekRecord('notebook', notebookId);
						let note = ember.store.createRecord('note', {
							userId: 'test',
							title: 'test title',
							content: this.getMarkdown(),
							notebookId: notebookId,
							notebook: notebook
						});
						
						notebook.get('notes').pushObject(note);
						note.save().then(() => {
							notebook.save().then(() => {
								console.log("笔记保存成功。。。。");
							});
						});
					}
				},

			//toolbarIcons: 'simple'
            });  // editor

            editor.setToolbarAutoFixed();
            // editor.config("toolbarAutoFixed", true);
    	});  //get

    }
});
