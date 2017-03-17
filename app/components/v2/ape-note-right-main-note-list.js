// app/components/v2/ape-note-right-main-note-list.js
import Ember from 'ember';
import markdownToHTML from '../../utils/markdown-to-html';

export default Ember.Component.extend({
    didInsertElement() {
        // 每次进入页面都先重置这两个输入框
        Ember.$("#noteTitldInputId").hide();
        Ember.$("#notebookTitldInputId").show();
    },
    actions: {
        /**
        * @param self 选中的笔记id
        */
        setActive(self) {
            // 在show-markdown.hbs中指定的div的id属性值
            Ember.$("#editormd-view").empty();  //先清空原有记录
            // self = "#"+self;
            //debugger;
            //重置选中状态
            Ember.$(".content-list .posts-list .note-list").each(function() {
                Ember.$(this).removeClass('active');
            });
            //设置当前笔记的被点击的为选中状态
            Ember.$(("#"+self)).addClass('active');
            // 设置右边笔记内容区的内容
            this.store.findRecord('note', self).then((note) => {
                // 手动设置右边预览面板的HTML值，在此之前记得要首先清空editormd-view里的内容
                markdownToHTML("editormd-view", {markdown : note.get('content')});
            });
        }
    }
});
