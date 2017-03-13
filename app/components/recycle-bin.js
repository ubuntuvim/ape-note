// app/components/recycle-bin.js 回收站
import Ember from 'ember';

export default Ember.Component.extend({
    //放在session的登录用户数据
    loginUser: Ember.inject.service('login-user'),
    store: Ember.inject.service(),

    allNotebooks: Ember.computed(function() {
        return this.get('store').findAll("notebook");
    }),
    // 当前用户的所有notebook
    myNotebooks: Ember.computed('allNotebooks.@each.userId', function() {
        var uid = this.get('loginUser').getBySession('uid');
        return this.get('allNotebooks').filterBy('userId', uid);
    }),
    // 状态是删除的notebook
    notebooks: Ember.computed('myNotebooks.@each.status', function() {
        // var uid = this.get('loginUser').getBySession('uid');
        return this.get('myNotebooks').filterBy('status', 0);  //s
    }),

    actions: {
        recycleNotebook(id) {
            // 恢复笔记本的同时恢复所属下的所有笔记
            this.get('store').findRecord('notebook', id).then((nb) => {
                // 先恢复下属的笔记
                nb.get('notes').forEach((item) => {
                    this.get('store').findRecord('note', item.id).then((n) => {
                        n.set('status', 1);
                        n.save();
                    });
                });
                nb.set('status', 1);
                nb.save();
            });
        },
        // 恢复笔记
        recycleNote(id) {
            this.get('store').findRecord('note', id).then((nb) => {
                // 先判断所属的笔记本是否是删除状态，如果是应该首先恢复所属的笔记本
                if (nb.get('notebook').get('status') === 0) {
                    this.get('store').findRecord('notebook', nb.get('notebook').get('id')).then((n) => {
                        n.set('status', 1);
                        n.save();
                    });
                }
                nb.set('status', 1);
                nb.set('timestamp', new Date().getTime());
                nb.save();
            });
        }
    }
});
