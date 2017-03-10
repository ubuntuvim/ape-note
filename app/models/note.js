import DS from 'ember-data';

export default DS.Model.extend({
    userId: DS.attr('string'),  //暂时保存，目前用不上
    title: DS.attr('string'),
    timestamp: DS.attr('number', {
		defaultValue() { return new Date().getTime(); }
	}),
    content: DS.attr('string'),
    status: DS.attr('number', {
      //笔记状态：1-正常；0-删除
        defaultValue() { return 1; }
	}),
	notebookId: DS.attr('string'),
    notebook: DS.belongsTo('notebook')
});
