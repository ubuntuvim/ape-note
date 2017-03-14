// app/components/v2/ape-note-left-nav.js
//
import Ember from 'ember';
import markdownToHTML from '../../utils/markdown-to-html';

export default Ember.Component.extend({

    tagName: 'nav',
    classNames: ['ape-note-nav'],
    // 根据属性isShowLeftMenu绑定一个class
    classNameBindings: ['isShowLeftMenu:open'],
    // 是否显示左侧菜单，默认显示
    isShowLeftMenu: true,
    // 左下角展开、关闭按钮样式
    isCloseIcon: true,

    //放在session的登录用户数据
    loginUser: Ember.inject.service('login-user'),

    allNotebooks: Ember.computed(function() {
        return this.store.findAll("notebook");
    }),
    notebooks: Ember.computed('allNotebooks.@each.userId', function() {
        var uid = this.get('loginUser').getBySession('uid');
        return this.get('allNotebooks').filterBy('userId', uid);
    }),
    // 左上角用户信息
    displayName: Ember.computed(function() {
        var displayName = this.get('loginUser').getBySession('displayName');
        var email = this.get('loginUser').getBySession('email');
        if (displayName) {
            return displayName;
        } else {
            return email;
        }
    }),

    nickname: Ember.computed(function() {
        // 根据providerId判断
        // 属性值：邮箱-password；qq-qq；weibo-weibo
        var providerId = this.get('loginUser').getBySession('providerId');
        if (providerId === 'password') {
            return "邮箱登录用户";
        } else if (providerId === 'qq') {
            return "QQ登录用户";
        } else if (providerId === 'weibo') {
            return "微博登录用户";
        } else {
            return "";
        }
    }),

    // 搜索框
    searchValue: '',
    // notebooks得到已经是当前用户所有的笔记本
    searchNoteList: Ember.computed('searchValue', 'notebooks', function() {

        var retArr = new Array();
        //  根据笔记标题模糊搜索
         var searchValue = this.get('searchValue');
         // 搜索内容为空不显示列表框，只有搜索东西的时候才显示
         if (!searchValue) {
             return retArr;
         }

         var nbs = this.get('notebooks');
         var nbsLen = nbs.get('length');
         var notes = null;
         var note_len = 0;
         var title = "";
         var noteId = "";
         for (var i = 0; i < nbsLen; i++) {
             notes = nbs.objectAt(i).get('notes');
            //  notes.forEach((item) => console.log(item.get('id')));
             note_len = notes.get('length');
             for (var j = 0; j < note_len; j++) {
                //  通过notes.objectAt(j).get('title')只能获取关联的缓存数据需要重新获取笔记数据
                 noteId = notes.objectAt(j).get('id');
                 this.store.findRecord('note', noteId).then((n) => {
                     title = n.get('title');
                     if (n.get('status') === 1 && title && title.indexOf(searchValue) >= 0) {
                         retArr.pushObject(n);
                     }
                 });
             }
         }
         return retArr;
    }),

    actions: {
        // 显示搜索框，得到焦点并且输入了搜索内容才触发
        showSearchList() {
            // Ember.$("#dropdownMenu3").dropdown('toggle');
        },
        hideSearchList() {
            // Ember.$("#dropdownMenu3").dropdown('toggle');
        },
        // 点击结果列表转到相应的显示界面
        setSelectedNote(noteId) {
            //清空搜索框
            this.set('searchValue', '');
            // 在show-markdown.hbs中指定的div的id属性值
            Ember.$("#editormd-view").empty();  //先清空原有记录
            // self = "#"+self;
            //debugger;
            //重置选中状态
            Ember.$(".content-list .posts-list .note-list").each(function() {
                Ember.$(this).removeClass('active');
            });
            //设置当前笔记的被点击的为选中状态
            Ember.$(("#"+noteId)).addClass('active');
            // 设置右边笔记内容区的内容
            this.store.findRecord('note', noteId).then((note) => {
                // 手动设置右边预览面板的HTML值，在此之前记得要首先清空editormd-view里的内容
                markdownToHTML({markdown : note.get('content')});
            });
        },
        /**
         * 根据选中的笔记本做处理
         */
        setSelectedNotebook(id, title) {
            // 隐藏顶部笔记标题输入框
            Ember.$("#noteTitldInputId").hide();
            // 显示顶部笔记本标题输入框
            Ember.$("#notebookTitldInputId").show();

            // 设置左边顶部选中的笔记本标题
            Ember.$("#notebookTitldInputId").val(title);
            // 设置底部新建笔记按钮对应的笔记本id
            var href = `/#/v2/notebook/${id}/newnote`;
            Ember.$("#newNoteLinkId").attr('href', href);

        },

        // 点击左下角按钮关闭左侧菜单
        closeMenu(self) {
            // var viewport;
            // var isClazz = (viewport = Ember.$('.ape-note-viewport')).hasClass("ape-note-autonav");
            // var isClazzMobile = (viewport = Ember.$('.ape-note-viewport')).hasClass("mobile-menu-expanded");
            // if (isClazz || isClazzMobile) {  //菜单收缩
            //     this.set('isShowLeftMenu', true);  //显示菜单
            //     this.set('isCloseIcon', true);  //显示关闭菜单按钮
            //     viewport.removeClass('ape-note-autonav');  //右侧主内容区缩小，腾出显示菜单的空间
            //     viewport.removeClass('mobile-menu-expanded');  //
            //     // 工具条紧靠左边235px
            //     // Ember.$(".editormd-toolbar").css({'left': '235px !important'});
            // } else {  //显示左侧笔记本列表
            //     this.set('isShowLeftMenu', false);  // 隐藏菜单
            //     this.set('isCloseIcon', false);  //显示展开按钮
            //     viewport.addClass('ape-note-autonav');  //右侧主内容区最大化
            //     viewport.addClass('mobile-menu-expanded');  //
            //     // 工具条紧靠左边
            //     // Ember.$(".editormd-toolbar").css({'left': '0 !important'});
            // }
        },
        //鼠标移到左边收缩面板显示左侧菜单
        showLeftMenu() {
            // this.set('isShowLeftMenu', true);
            // this.set('isCloseIcon', !Ember.$('.ape-note-viewport').hasClass("ape-note-autonav"));
        },
        logout() {
            this.get('loginUser').clear();  //清空session中的信息
            location.href = `/#/login`;
        }
    },  // actions
    // 给组件本身增加一个事件
    //鼠标移开左边搜索面板显示左侧菜单
    mouseLeave() {
        // this.set('isShowLeftMenu', false);
        // this.set('isCloseIcon', !Ember.$('.ape-note-viewport').hasClass("ape-note-autonav"));
    },
    mouseEnter() {
        // this.set('isShowLeftMenu', true);
        // this.set('isCloseIcon', !Ember.$('.ape-note-viewport').hasClass("ape-note-autonav"));
    },
    didInsertElement() {
        this._super(...arguments);
        // 重置选中的笔记本高亮状态
        this.$(".ape-notebook-list").click(function() {
            Ember.$(".ape-notebook-list").each(function() {
                // 防止去除不成功，多执行2遍
                Ember.$(this).removeClass('active');
                Ember.$(this).removeClass('active');
                Ember.$(this).removeClass('active');
            });
            //
            // 设置被点击的本身为激活状态
            Ember.$(this).addClass('active');
        });

        //页面手动刷新后需要手动设置选中的笔记本、笔记本标题等
        // 设置选中状态
        //得到选中的笔记本id。这个值是在list.hbs中设置的
        var id = Ember.$("#selectedNotebookIdInListTpl").val();
        if (!id)
            id = Ember.$("#selectedNotebookIdInEditNoteTpl").val();
        var ids = `#${id}`;
        Ember.$(ids).addClass('active');

        // 隐藏顶部笔记标题输入框
        Ember.$("#noteTitldInputId").hide();
        // 显示顶部笔记本标题输入框
        Ember.$("#notebookTitldInputId").show();

        //得到选中的笔记本title。这个值是在list.hbs中设置的
        var title = Ember.$("#selectedNotebookTitleInListTpl").val();
        // 设置ape-note-right-main-header.hbs中的选中笔记本标题
        Ember.$("#notebookTitldInputId").val(title);

        // 设置新建按钮链接的href属性
        var href = `/#/v2/notebook/${id}/newnote`;
        Ember.$("#newNoteLinkId").attr('href', href);
    },
    didRender() {
        this._super(...arguments);
    }
});
