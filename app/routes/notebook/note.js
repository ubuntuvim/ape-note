import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        console.log('params.note_id = ' + params.note_id);
        // return this.store.findRecord('note', params.note_id);
    }
});
