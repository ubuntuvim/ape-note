import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    this.route('notebook', function() {
        this.route('note', { path: '/:notebook_id/note/:note_id' });
    });
});

export default Router;
