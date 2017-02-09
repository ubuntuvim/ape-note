import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
       return Ember.RSVP.hash({
            notebooks: this.store.findAll('notebook'),
			selectedNotebookId: params.notebook_id
        });
    }
});
