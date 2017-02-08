import Ember from 'ember';

export default Ember.Route.extend({
    model(params, transition) {
        console.log('params.notebook_id = ' + params.notebook_id);
        return this.store.findRecord('notebook', params.notebook_id);
        // transition.abort();
    }
});
