import DS from 'ember-data';

export default DS.Model.extend({
    userId: DS.attr('string'),
    title: DS.attr('string'),
    timestamp: DS.attr('number', {
		defaultValue() { return new Date().getTime(); }
	}),
    isDeletable: DS.attr('number', {
        //可删除标记：1-可以删除；0-不可删除
        //对于首次注册的用户会默认初始化一个笔记本，此笔记本是不可删除的。
        defaultValue() { return 1; }
	}),
    status: DS.attr('number', {
      //笔记本状态：1-正常；0-删除
        defaultValue() { return 1; }
	}),
    notes: DS.hasMany('note')
});
