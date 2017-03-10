import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        /**
         * 更新笔记本标题
         */
        updateNotebookTitle() {
            //获取选中的笔记本id
            var id = Ember.$("#selectedNotebookIdInListTpl").val();
            var title = Ember.$("#notebookTitldInputId").val();
            if (title && id) {
                this.store.findRecord('notebook', id).then((nb) => {
                    nb.set('title', title);
                    nb.save();
                });
            }
        },
        /**
         * 更新、保存笔记标题
         */
        updateNoteTitle() {
            var id = Ember.$("#autosaveFlag").val();
            if (!id)
                id = Ember.$("#editedNoteId").val();
            var title = Ember.$("#noteTitldInputId").val();
            if (title && id) {
                this.store.findRecord('note', id).then((nb) => {
                    nb.set('title', title);
                    nb.save();
                });
            }
        }
    },
    didInsertElement() {
        //窗口小于800px时i显示一个展开菜单的按钮，点击按钮显示左侧菜单
        Ember.$('.ape-note-mobilemenu-button').click(function() {
            var view;
            if (!(view = Ember.$('.ape-note-viewport')).hasClass('mobile-menu-expanded')) {
                view.addClass('mobile-menu-expanded');
            }
        });

    }
});
