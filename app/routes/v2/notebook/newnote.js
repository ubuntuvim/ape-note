import Ember from 'ember';
import LogoutMixin from '../../../mixins/logout';

export default Ember.Route.extend(LogoutMixin, {
    model(params) {
        return this.store.findRecord('notebook', params.notebook_id);
    }
});
