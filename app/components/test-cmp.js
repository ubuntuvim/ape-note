import Ember from 'ember';

export default Ember.Component.extend({
	
	actions: {
		
		save() {
			var notebookId = '-KcXFkW8ZTmIBWGuLrua';  //-KcWrZB3HUE9yVyYgIEe
			// 获取输入内容
			//console.log("content = " + this.getMarkdown());
			let notebook = this.store.peekRecord('notebook', notebookId);
			let note = this.store.createRecord('note', {
				userId: 'test',
				title: 'test title',
				content: 'eeeeeeeeeeeeeeeeeeeeeeeee',
				notebookId: notebookId,
				notebook: notebook
			});
			
			notebook.get('notes').pushObject(note);
			note.save().then(() => {
				notebook.save().then(() => {
					console.log("笔记保存成功。。。。");
				});
			});
		}
		
	}
});
