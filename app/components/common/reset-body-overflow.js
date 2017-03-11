import Ember from 'ember';

// 重置body的overflow属性
export default Ember.Component.extend({
    didInsertElement() {
        Ember.$('body').css("overflow", "auto");
    }
});
