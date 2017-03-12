import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('test');


  this.route('v2', function() {
      this.route('notebook', function() {  //显示所有笔记本
          // 点击笔记本，显示所有笔记本下的笔记
          this.route('list', { path: '/list/:notebook_id' }, function() {
            //   v2/notebook/notebook_id/show/note_id/detail
              this.route('detail', { path: '/:note_id/detail' });
          });

          //  新建笔记
          this.route('newnote', { path: '/:notebook_id/newnote' });
          this.route('edit', { path: '/:notebook_id/note/:note_id/edit' });
      });
  });

  this.route('icon');
  this.route('login');
  this.route('intro');

  this.route('oauth2', function() {
    this.route('oschina', { path: '/oschina/:code/:state' });
  });
});

export default Router;
