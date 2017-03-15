import Ember from 'ember';

// 此类已经作废，不使用。暂时保留

export default Ember.Component.extend({
    /*
    didInsertElement() {

        // 用户使用引导，在user-guides.js和app-main-header.hbs调用
        // <a onclick="javascript: intro.start();">使用引导</a>
        //  id="userGuideStep1" data-step="1" data-intro="" data-position='right'
        var intro = introJs();
      //   intro.setOption('tooltipPosition', 'auto');
        // intro.setOption('positionPrecedence', ['left', 'right', 'bottom', 'top']);
        intro.setOption('nextLabel', '下一步');
        intro.setOption('prevLabel', '上一步');
        intro.setOption('skipLabel', '跳过');
        intro.setOption('doneLabel', '完成');
        intro.setOption('showStepNumbers', false);
        // intro.setOption('showProgress', true);
        intro.setOption('overlayOpacity', 0.2);
        intro.setOptions({
            steps: [
              {
                element: '#dropdownMenu',  // project-list-page.hbs
                intro: "新增。",
                position: 'top'
              },
              {
                element: '#newNotebookForUseGuide',  // project-list-page.hbs
                intro: "新建笔记本。",
                position: 'top'
              },
              {
                element: '#notebookListForUseGuide', // create-todo-input.hbs
                intro: '选择一个笔记本',
                position: 'bottom'
              },
              {
                element: '#newNoteLinkId', // create-todo-input.hbs
                intro: '新建Markdown笔记',
                position: 'bottom'
              },
            //   {
            //     element: '#userGuideStep3', // create-todo-input.hbs
            //     intro: "点击<code><span class='glyphicon glyphicon-star'></span></code>创建任务时直接标记为重要任务项。",
            //     position: 'bottom'
            //   },
            //   {
            //     element: '#userGuideStep4',  // 搜索任务 todos.hbs
            //     intro: '快速搜索任务项，任务在再多也不怕了。',
            //     position: 'bottom'
            //   }
        ]
        });
        console.log("Ember.$.cookie('__SHOW_USER_GUIDE_FLAG__')=="+Ember.$.cookie('__SHOW_USER_GUIDE_FLAG__'));
        // 默认首次进入才显示
        if (!Ember.$.cookie('__SHOW_USER_GUIDE_FLAG__')) {
            Ember.$.cookie('__SHOW_USER_GUIDE_FLAG__', true, { expires: 365 });
            // 开始用户引导
            intro.start();
        }
        intro.start();
        //
    }
    */
});
