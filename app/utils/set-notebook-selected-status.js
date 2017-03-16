// 用于页面刷新后。设置刷新之前选中的笔记本
export default function setNotebookSelectedStatus(dom) {
    var id = dom.$("#selectedNotebookIdInListTpl").val() || "";
    if (id === '') {
        id = dom.$("#selectedNotebookIdInEditNoteTpl").val() || "";
    }
    // 在newnote.hbs中设置的隐藏字段
    if (id === '') {
        id = dom.$("#selectedNotebookIdInNewNoteTpl").val() || "";
    }
    if (id !== '') {
        dom.$(('#'+id)).addClass('active');
    }
    return id;
}
