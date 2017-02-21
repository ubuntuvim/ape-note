import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {

    },
    actions: {
        /**
        * @param self 选中的笔记id
        */
        setActive(self) {
            // self = "#"+self;
            //debugger;
            //重置选中状态
            Ember.$(".content-list .posts-list .note-list").each(function() {
                Ember.$(this).removeClass('active');
            });
            //设置当前被点击的为选中状态
            Ember.$(("#"+self)).addClass('active');
            this.store.findRecord('note', self).then((note) => {
                var markdown = note.get('content');
                //转成html串
                var converter = new showdown.Converter();
                var htmlStr = converter.makeHtml(markdown);
                // 设置主内容
                Ember.$('.wrapper').empty().append(htmlStr);
            });
        }
    }
});
