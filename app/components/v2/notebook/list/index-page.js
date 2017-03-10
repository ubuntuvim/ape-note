import Ember from 'ember';

export default Ember.Component.extend({
    loginUser: Ember.inject.service('login-user'),
    store: Ember.inject.service(),

    allNotebooks: Ember.computed(function() {
        return this.get('store').findAll("notebook");
    }),
    allNotes: Ember.computed(function() {
        return this.get('store').findAll("note");
    }),
    myNotebookTotalCount: Ember.computed('allNotebooks.@each.userId', function() {
        var uid = this.get('loginUser').getBySession('uid');
        return this.get('allNotebooks').filterBy('userId', uid).get('length');
    }),
    myNoteTotalCount: Ember.computed('allNotes.@each.userId', function() {
        var uid = this.get('loginUser').getBySession('uid');
        return this.get('allNotes').filterBy('userId', uid).get('length');
    })
});
