import Ember from 'ember';

export default Ember.Component.extend({
    didRender() {
        this._super(...arguments);

        //得到选中的笔记id。这个值是在detail.hbs中设置的
        var id = Ember.$("#selectedNoteId4Detail").val();
        var ids = `#${id}`;
        Ember.$(ids).addClass('active');
    }
});
