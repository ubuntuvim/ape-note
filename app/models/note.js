import DS from 'ember-data';

export default DS.Model.extend({
    userId: DS.attr('string'),
    title: DS.attr('string'),
    timestamp: DS.attr('number', {
		defaultValue() { return new Date().getTime(); }
	}),
    content: DS.attr('string'),
	notebookId: DS.attr('string'),
    notebook: DS.belongsTo('notebook')
});
