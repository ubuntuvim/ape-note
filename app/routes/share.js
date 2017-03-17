import Ember from 'ember';
import RSVP from 'rsvp';
import markdownToHTML from '../utils/markdown-to-html';

export default Ember.Route.extend({

    loginUser: Ember.inject.service('login-user'),
    model(params) {
        return RSVP.hash({
            note: this.store.findRecord('note', params.note_id),
            uid: this.get('loginUser').getBySession('uid')
        });
    }
});
