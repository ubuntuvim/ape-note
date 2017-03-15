import Ember from 'ember';

export default Ember.Component.extend({
    insertLink: null,
    actions: {
        insertLink() {
            // 得到的内容格式为：http://ape-note.com 可选标题
            // 需要根据空格分割
            var content = this.get('insertLink');
            // 根据空格分割，空格可能有多个
            var arr = content.split(/\s+/);
            var length = arr.length;
            if (arr && length === 2) {
                window.editor.cm.replaceSelection(`[${arr[1]}](${arr[0]})`);
            } else if (arr && length === 1) {
                window.editor.cm.replaceSelection(`[链接标题](${arr[0]})`);
            } else {
                window.editor.cm.replaceSelection(`[链接标题](${content})`);
            }
            // 关闭模态框
            Ember.$("#insertLinkModal").modal('hide');
            // 清空上传图片URL字段
            this.set('insertLink', null);
        }
    }
});
