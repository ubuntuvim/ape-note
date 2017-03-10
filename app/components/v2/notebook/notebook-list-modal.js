import Ember from 'ember';

export default Ember.Component.extend({
    //放在session的登录用户数据
    loginUser: Ember.inject.service('login-user'),

    allNotebooks: Ember.computed(function() {
        return this.store.findAll("notebook");
    }),
    noteboos: Ember.computed('allNotebooks.@each.userId', function() {
        var uid = this.get('loginUser').getBySession('uid');
        return this.get('allNotebooks').filterBy('userId', uid);
    }),
    actions: {
        delNotebook(id) {
            // 删除笔记本的同时删除所属下的所有笔记（目前只是设置为删除状态，并不直接冲数据库删除）
            this.store.findRecord('notebook', id).then((nb) => {
                // 先删除管理的笔记
                nb.get('notes').forEach((item) => {
                    this.store.findRecord('note', item.id).then((n) => {
                        n.set('status', 0);
                        n.save();
                    });
                });
                nb.set('status', 0);
                nb.save();  //删除笔记本身
            });
        },
        // 更新笔记本标题
        updateNotebookTitle(id) {
            var v = Ember.$(`#nb_list_${id}`).val();
            this.store.findRecord('notebook', id).then((nb) => {
                nb.set('title', v);
                nb.set('timestamp', new Date().getTime());
                nb.save();
            });
        }
    }
});
