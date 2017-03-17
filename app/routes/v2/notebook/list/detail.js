import Ember from 'ember';
import LogoutMixin from '../../../../mixins/logout';

export default Ember.Route.extend(LogoutMixin, {
    model(params) {
        return this.store.findRecord('note', params.note_id);
    },
    actions: {
        shareNote(id) {
            Ember.$("#shareNoteModal").modal('show');
            Ember.$("#shareNoteIdForShareModal").val(id);
            this.store.findRecord('note', id).then((n) => {
                // isShare:0-不分享；1-分享
                if (n.get('isShare')  === 1) {
                    // 设置复选框为选中、设置输入框和按钮为可用、设置分享的URL到input
                    Ember.$("#isShareCheckbox").prop("checked", true);
                    Ember.$('#directeShareInput').attr("disabled",false);
                    Ember.$('#directeShareBtn').attr("disabled",false);
                    //组合得到分享链接
                    var shareUrl = `http://ape-note.com/#/share/${id}`;
                    Ember.$("#directeShareInput").val(shareUrl);
                } else {
                    // 设置复选框为未选中，设置输入框和按钮为不可用
                    Ember.$("#isShareCheckbox").prop("checked", false);
                    Ember.$('#directeShareInput').attr("disabled",true);
                    Ember.$('#directeShareBtn').attr("disabled",true);
                }
            });
        }
    }
});
