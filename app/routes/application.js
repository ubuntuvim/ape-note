import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return Ember.RSVP.hash({
            notebooks: this.store.findAllPagination(this.store, 'notebook').then((nbs) => {
    			return nbs.filter((nb) => {
    				return nb.userId === 'test';
    			});
    		})
        });
    }
});
