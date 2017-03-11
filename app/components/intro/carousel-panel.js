import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        this.$('.carousel').carousel({
            interval: 4000
        });
    }
});
