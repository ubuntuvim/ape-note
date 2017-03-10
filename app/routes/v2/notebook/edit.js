import Ember from 'ember';
import RSVP from 'rsvp';
import LogoutMixin from '../../../mixins/logout';

export default Ember.Route.extend(LogoutMixin, {
    model(params) {
        return RSVP.hash({
            notebook: this.store.findRecord('notebook', params.notebook_id),   //  笔记本
            note: this.store.findRecord('note', params.note_id)  //笔记
       });
    }
});
