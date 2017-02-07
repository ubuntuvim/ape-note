import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        saveNotebook() {
            //获取用户id
            var userId = "test";
            this.store.createRecord('notebook', {
                userId: userId,
                title: this.get('title')
            }).save().then(() => {
                this.$('#createNotebookModal').modal('hide');
                console.log('笔记本保存成功。');
            });
        }
    }
});
