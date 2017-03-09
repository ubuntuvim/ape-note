import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        /**
         * 删除笔记
         * @params notebookId笔记本id
         * @params noteId 笔记id
         */
        delNote(notebookId, noteId) {
            this.store.findRecord('note', noteId, { backgroundReload: false }).then((n) => {
                n.destroyRecord().then(function() {
                    location.href = `/#/v2/notebook/list/${notebookId}`;
                });
            });
        }
    }
});
