import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
    model(params) {
        //  获取笔记本下的所有笔记
        let notebook = this.store.findRecord('notebook', params.notebook_id);
        return RSVP.hash({
            notebooks: this.store.findAll('notebook'),   //  所有笔记本
            notes: notebook.then((nb) => {
                return nb.get('notes');
            }),
            notebook: notebook  // 左侧选中的笔记本
       });
    }
});
