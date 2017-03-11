import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    loginUser: Ember.inject.service('login-user'),

    allNotebooks: Ember.computed(function() {
        return this.store.findAll("notebook");
    }),
    notebook: Ember.computed('allNotebooks.@each.userId', function() {
        var uid = this.get('loginUser').getBySession('uid');
        return this.get('allNotebooks').filterBy('userId', uid);
    }),

    model() {
        var uid = this.get('loginUser').getBySession('uid');
        return Ember.RSVP.hash({
            notebookId: this.store.findAll("notebook").then((nbs) => {
                var len = nbs.get('length');
                var flag = true;
                var notebookId = '';
                for (var i = 0; i < len && flag; i++) {
                    if (nbs.objectAt(i).get('userId') === uid && nbs.objectAt(i).get('isDeletable') === 0) {
                        flag = false;
                        notebookId = nbs.objectAt(i).get('id');
                    }
                }
                return notebookId;
            })
        });
    },
    actions: {
        // 体验一下，直接登录体验账户，但是要设置session
        experience() {
            this.get('loginUser').setToSession("uid", 'bdde6b9ae8d840780933a37387b1');
            this.get('loginUser').setToSession("email", 'ape-note@test.com');
            this.transitionTo('v2.notebook.list', '-KemEw_q2GzqG7iTUby3');
        }
    }
});
