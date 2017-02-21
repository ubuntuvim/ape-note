import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        //窗口小于800px时i显示一个展开菜单的按钮，点击按钮显示左侧菜单
        Ember.$('.ape-note-mobilemenu-button').click(function() {
            var view;
            if (!(view = Ember.$('.ape-note-viewport')).hasClass('mobile-menu-expanded')) {
                view.addClass('mobile-menu-expanded');
            }
        });
    }
    // actions: {
    //     //显示左侧菜单，通过sendAction设置
    //     showLeftMenu() {
    //
    //     }
    // }
});
