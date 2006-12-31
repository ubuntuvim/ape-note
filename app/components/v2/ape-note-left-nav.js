import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'nav',
    classNames: ['ape-note-nav'],
    // 根据属性isShowLeftMenu绑定一个class
    classNameBindings: ['isShowLeftMenu:open'],
    // 是否显示左侧菜单，默认显示
    isShowLeftMenu: true,
    // 左下角展开、关闭按钮样式
    isCloseIcon: true,

    actions: {
        // 点击左下角按钮关闭左侧菜单
        closeMenu(self) {
            var viewport;
            var isClazz = (viewport = Ember.$('.ape-note-viewport')).hasClass("ape-note-autonav");
            if (isClazz) {  //菜单收缩
                this.set('isShowLeftMenu', true);  //显示菜单
                this.set('isCloseIcon', true);  //显示关闭菜单按钮
                viewport.removeClass('ape-note-autonav');  //右侧主内容区缩小，腾出显示菜单的空间
            } else {
                this.set('isShowLeftMenu', false);  // 隐藏菜单
                this.set('isCloseIcon', false);  //显示展开按钮
                viewport.addClass('ape-note-autonav');  //右侧主内容区最大化
            }
        },
        //鼠标移到左边收缩面板显示左侧菜单
        showLeftMenu() {
            this.set('isShowLeftMenu', true);
            this.set('isCloseIcon', !Ember.$('.ape-note-viewport').hasClass("ape-note-autonav"));
        }
    },
    // 给组件本身增加一个事件
    //鼠标移开左边搜索面板显示左侧菜单
    mouseLeave() {
        this.set('isShowLeftMenu', false);
        this.set('isCloseIcon', !Ember.$('.ape-note-viewport').hasClass("ape-note-autonav"));
    },
    mouseEnter() {
        this.set('isShowLeftMenu', true);
        this.set('isCloseIcon', !Ember.$('.ape-note-viewport').hasClass("ape-note-autonav"));
    },
    didInsertElement() {
        this._super(...arguments);
    }
});
