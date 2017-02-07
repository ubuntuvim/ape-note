import DS from 'ember-data';

export default DS.Model.extend({
    userId: DS.attr('string'),
    title: DS.attr('string'),
    timestamp: DS.attr('number'),
    note: DS.hasMany('note')
});
