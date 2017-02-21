import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('notebook', { path: '/:notebook_id' }, function() {
    this.route('note', { path: '/note/:note_id' });
    this.route('new');
  });
  this.route('test');

  this.route('v2', function() {
      this.route('notebook', function() {
          this.route('note', { path: '/:notebook_id' }, function() {
              //  新建笔记
              this.route('new', { path: '/new' });
              this.route('edit', { path: '/edit/:note_id' });
              this.route('show', { path: '/show/:note_id' });
          });
      });
  });
  this.route('icon');
});

export default Router;
