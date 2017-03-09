import Ember from 'ember';

export default Ember.Route.extend({
    loginUser: Ember.inject.service('login-user'),
    model(params) {
        var uid = this.get('loginUser').getBySession('uid');
        return Ember.RSVP.hash({
            notebooks: this.store.findAll('notebook').then((nbs) => {
                return nbs.filter((n) => {
                    console.log("n.get('userId') === ",n.get('userId'));
                    return n.get('userId') === uid;
                });
            }),
			selectedNotebookId: params.notebook_id
        });
    }
});
