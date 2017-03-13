// app/routes/login.js
import Ember from 'ember';

export default Ember.Route.extend({
    // 注入session信息
    loginUser: Ember.inject.service('login-user'),

    // 重定向
    redirect(model, transition) {
        var uid = this.get('loginUser').getBySession('uid');
        if (uid) {
            var notebookId = this.store.findAll("notebook").then((nbs) => {
                var len = nbs.get('length');
                var flag = true;
                var notebookId = '';
                for (var i = 0; i < len && flag; i++) {
                    if (nbs.objectAt(i).get('userId') === uid && nbs.objectAt(i).get('isDeletable') === 0) {
                        flag = false;
                        notebookId = nbs.objectAt(i).get('id');
                    }
                }
                return notebookId;
            })
            this.transitionTo('v2.notebook.list', notebookId);
        } else {
            // this是指调用次方法的route类
            this.transitionTo('login');
        }
    }
});
