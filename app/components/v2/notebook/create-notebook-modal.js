import Ember from 'ember';

export default Ember.Component.extend({
    //放在session的登录用户数据
    loginUser: Ember.inject.service('login-user'),

    actions: {
        saveNotebook() {
            var title = this.get('title');
            if (title) {
                //获取用户id
                var uid = this.get('loginUser').getBySession('uid');
                this.store.createRecord('notebook', {
                    userId: uid,
                    title: title
                }).save().then(() => {
                    this.$('#createNotebookModal').modal('hide');
                    // console.log('笔记本保存成功。');
                });
            }
        }
    }
});
