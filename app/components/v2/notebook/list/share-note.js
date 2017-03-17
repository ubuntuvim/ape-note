import Ember from 'ember';
import config from '../../../../config/environment';

export default Ember.Component.extend({
    isChecked: null,
    didInsertElement() {
        var that = this;
        // 设置笔记是否为分享状态
        Ember.$("#isShareCheckbox").click(function() {
            // 在detai.js中设置这个input的值
            var noteId = Ember.$("#shareNoteIdForShareModal").val();
            Ember.$("#copyTips").html();
            // 改变是否分享状态：0-不分享；1-分享
            that.store.findRecord('note', noteId).then((n) => {
                if (n.get('isShare')  === 0) {
                    // 设置复选框为选中、设置输入框和按钮为可用、设置分享的URL到input
                    // Ember.$("#isShareCheckbox").attr("checked",true);
                    that.set('isChecked', true);
                    Ember.$('#directeShareInput').attr("disabled",false);
                    Ember.$('#directeShareBtn').attr("disabled",false);
                    //组合得到分享链接
                    var shareUrl = `${config.APP.DOMAIN}/#/share/${noteId}`;
                    Ember.$("#directeShareInput").val(shareUrl);

                    n.set('isShare', 1)
                } else {
                    // 设置复选框为未选中，设置输入框和按钮为不可用
                    // Ember.$("#isShareCheckbox").attr("checked",false);
                    that.set('isChecked', false);
                    Ember.$('#directeShareInput').attr("disabled",true);
                    Ember.$('#directeShareBtn').attr("disabled",true);

                    n.set('isShare', 0);
                }

                n.save();
            });
        });
    },
    actions: {
        success() {
            Ember.$("#copyTips").css("color", "green").html("复制成功！");
        },
        error() {
            Ember.$("#copyTips").css("color", "red").html("复制失败，请直接使用<code>Ctrl + C</code>快捷键复制！");
        }
    }
});
