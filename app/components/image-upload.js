import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({

    store: Ember.inject.service(),
    loginUser: Ember.inject.service('login-user'),

    imgUrl: '',
    // 进度条控制
    valuenow: 0, // 当前进度
    valuenowWithStyle: Ember.computed('valuenow', function() {
        return Ember.String.htmlSafe("width: " + this.get('valuenow')+"%;");
    }),
    allImgs: Ember.computed(function() {
        return this.get('store').findAll("img");
    }),
    imgs: Ember.computed('allImgs.@each.userId', function() {
        var uid = this.get('loginUser').getBySession('uid');
        return this.get('allImgs').filterBy('userId', uid);
    }),
    didInsertElement() {
        var that = this;
        var ember = Ember;
        //引入Plupload 、qiniu.js后
       var uploader = Qiniu.uploader({
           runtimes: 'html5,flash,html4',    //上传模式,依次退化
           browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
           uptoken_url: config.QINIU.tokenUrl,            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
           // uptoken : '', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
        //    unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
        //    save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
           domain: 'http://img.ape-note.com/',   //bucket 域名，下载资源时用到，**必需**
           get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
           container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
           max_file_size: '10mb',           //最大文件体积限制
           flash_swf_url: 'http://img.ape-note.com/Moxie.swf',  //引入flash,相对路径
           max_retries: 3,                   //上传失败最大重试次数
           dragdrop: true,                   //开启可拖曳上传
           drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
           chunk_size: '4mb',                //分块上传时，每片的体积
           auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
           init: {
               'FilesAdded': function(up, files) {

                },
                'BeforeUpload': function(up, file) {
                    that.$("#uploadProgress").show();
                    that.$("#uploadProgressTipText").empty();
                    // 设置进度条为百分之0
                    that.set('valuenow', file.percent);
                },
                'UploadProgress': function(up, file) {
                    // var file = this.file;
                   var uploaded = file.loaded;
                   var size = plupload.formatSize(uploaded).toUpperCase();
                   var formatSpeed = plupload.formatSize(file.speed).toUpperCase();
                   var html = "已上传: " + size + " 上传速度： " + formatSpeed + "/s";
                   that.$("#uploadProgressTipText").empty().html(html);
                   var percentage = file.percent;
                   percentage = parseInt(percentage, 10);
                   if (file.status !== plupload.DONE && percentage === 100) {
                       percentage = 99;
                   }
                   //    上传的百分比会根据放回会调至自动变化
                   that.set('valuenow', percentage);
                },
                'UploadComplete': function() {
                    ember.run.later({}, function() {
                        //    上传完毕隐藏进度条
                        that.$("#uploadProgress").hide();
                        that.$("#uploadProgressTipText").hide();
                    }, 3000);  //延迟3秒再隐藏
                },

                'Error': function(up, err, errTip) {
                    console.log('Error = ',errTip);
                },
               'FileUploaded': function(up, file, info) {
                //    到这里上传百分比就是100%
                   that.set('valuenow', file.percent);
                      // 每个文件上传成功后,处理相关的事情
                      // 其中 info 是文件上传成功后，服务端返回的json，形式如
                      // {
                      //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                      //    "key": "gogopher.jpg"
                      //  }
                      // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

                      var domain = up.getOption('domain');
                      var res = JSON.parse(info);
                      var sourceLink = domain + res.key; //获取上传成功后的文件的Url
                    //   显示到页面上，用于预览
                    //   点击插入才插入到编辑器中
                      that.set('imgUrl', sourceLink);
                    //   保存到数据，已经上传的图片直接插入即可
                    var uid = that.get('loginUser').getBySession('uid');
                    that.get('store').createRecord('img', {
                        userId: uid,
                        title: '',
                        url: sourceLink
                    }).save();
               },

               'Key': function(up, file) {
                    // 获取文件后缀名，然后重组一个文件名

                   // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                   // 该配置必须要在 unique_names: false , save_key: false 时才生效
                   //配置一个UUID作为文件名，防止中文名字问题
                   var fileNamePrefix = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    });
                    var uploadFileName = file.name || "";
                    var fileNameSuffix = uploadFileName.substring(uploadFileName.indexOf('.'), uploadFileName.length);
                    // 组合一个新的文件名，防止中文名称问题
                    return fileNamePrefix + fileNameSuffix;
               }
           } //init
     }); // uploader

       // domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取

       // uploader 为一个plupload对象，继承了所有plupload的方法，参考http://plupload.com/docs
    },
    actions: {
        // 插入图片链接到文章内容中
        insertImageUrl() {
            // 在光标所在位置插入图片Markdown的代码
            // var editormd = window.editor;
            var url = this.get('imgUrl');
            if (!url) {
                url = this.get('selectedImgUrl');  //从图库选中插入图片的时候用这个字段
            }
            window.editor.cm.replaceSelection(`\n![图片说明](${url})\n`);
            // 关闭模态框
            Ember.$("#imgageUploadModal").modal('hide');
            // 清空上传图片URL字段
            this.set('imgUrl', null);
        },
        // 选中某个图片
        selected(imgUrl) {
            // 设置图片为选中状态，并且设置imgUrl为选中图片的URL
            this.set('selectedImgUrl', imgUrl);
        }
    }
});
