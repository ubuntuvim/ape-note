import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement() {
		Ember.$("#menu-toggle").click(function(e) {
			Ember.$("#wrapper").toggleClass("toggled");
		});
		Ember.$('.tree-toggler').click(function () {
			Ember.$(this).parent().children('ul.tree').toggle(300);
		});
	}
});
