import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        this._super(...arguments);
        // 重置login页面的背景色
        Ember.$('body').css('background', "#fff");
    }
});
