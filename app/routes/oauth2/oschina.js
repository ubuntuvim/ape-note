import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        console.log('code === ' + params.code);
        console.log('state === ' + params.state);
    }
});
