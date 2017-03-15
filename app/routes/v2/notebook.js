import Ember from 'ember';
import RSVP from 'rsvp'
import LogoutMixin from '../../mixins/logout';

export default Ember.Route.extend(LogoutMixin, {
    loginUser: Ember.inject.service('login-user'),
    model(params) {
        var uid = this.get('loginUser').getBySession('uid');
        return RSVP.hash({
            notebooks: this.store.findAll('notebook').then((nbs) => {
                return nbs.filterBy('userId', uid);
            }),
			selectedNotebookId: params.notebook_id
        });
    }
});
