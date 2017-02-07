import DS from 'ember-data';

export default DS.Model.extend({
    userId: DS.attr('string'),
    title: DS.attr('string'),
    timestamp: DS.attr('number'),
    content: DS.attr('string'),
    notebook: DS.belongsTo('notebook')
});
