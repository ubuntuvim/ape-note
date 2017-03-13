// app/comontent/v2/login/login-form.js
import Ember from 'ember';
import config from '../../../config/environment';
import { apiRequest, apiRequestAuth } from '../../../utils/api-requests';

export default Ember.Component.extend({

    loginUser: Ember.inject.service('login-user'),

    registerEmail: '',  //注册邮箱
    //校验是否是正确的邮箱格式
    isValidateRegisterEmail: Ember.computed('registerEmail', function() {
        var email = this.get('registerEmail');
        if (!email) return false;  //
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        return reg.test(email);  //true，正确邮箱格式
    }),
    registerPassword: '',  //注册密码
    // 校验注册密码是否符合规范
    isValidateRegisterPassword: Ember.computed('registerPassword', function() {
        var pwd = this.get('registerPassword');
        if (!pwd) return false;
        var reg = /^[A-Za-z0-9]{6,20}$/;
        return reg.test(pwd);  //true，校验通过
    }),
    //注册按钮是否可用
    isEnableRegistedBtn: Ember.computed.and('isValidateRegisterEmail', 'isValidateRegisterPassword'),
    isEnableRegistedBtn2: Ember.computed.not('isEnableRegistedBtn'),

    loginEmail: '',  //登录邮箱
    loginPassword: '',  //登录密码
    //登录按钮是否可用
    isEnableLoginBtn: Ember.computed('loginEmail', 'loginPassword', function() {
        return this.get('loginEmail') && this.get('loginPassword');
    }),
    isEnableLoginBt2: Ember.computed.not('isEnableLoginBtn'),

    actions: {
        toRegister() {
            //显示注册面板、隐藏登录面板
            Ember.$('.register-panel').show();
            Ember.$('.login-panel').hide();
            Ember.$(".openid-text").html("使用邮箱注册");
        },
        toLogin() {
            //显示登录面板、隐藏注册面板
            Ember.$('.login-panel').show();
            Ember.$('.register-panel').hide();
            Ember.$(".openid-text").html("或邮箱登录");
        },
        // 注册（邮箱）
        register() {
            // 注册按钮变为不可用并提示正在注册。
            var $registerBtn = Ember.$("#registerBtn");
            var $btn = $registerBtn.button('loading');

            var email = this.get('registerEmail');
            var password = this.get('registerPassword');
            // 加密
            password = md5(password);
            wilddog.initializeApp(config.wilddogConfig);
			//注册用户并初始化一个默认的笔记
			wilddog.auth().createUserWithEmailAndPassword(email, password).then(() => {
                var user = wilddog.auth().currentUser;
                // 设置用户信息到session中
                setUserInfoToSession(this, user);
                // 注册成功初始化一个默认的笔记本
                this.store.createRecord('notebook', {
                    title: '我的笔记本',
                    userId: user.uid,
                    isDeletable: 0
                }).save().then((nb) => {
                    $registerBtn.button('reset');
                    //保存成功跳转到笔记本列表页面
                    location.href = `/#/v2/notebook/list/${nb.get('id')}`;
                }, () => {
                    $registerBtn.button('reset');
                });
			}).catch((err) => {
                var msg = "";
                if (err.code === 22005) {
                    msg = "用户创建失败，请刷新页面重试。";
                } else if (err.code === 22009) {
                    msg = "该邮箱地址无效";
                } else if (err.code === 22013) {
                    msg = "该邮箱地址已经使用";
                } else if (err.code === 22203) {
                    msg = "邮箱地址已经被其他账户使用";
                } else if (err.code === 29999) {
                    msg = "发生未知错误";
                } else {  //情况很多，不处理
                    msg = "服务器罢工了！请稍后再注册，或者联系我们。";
                }
                // 注册失败提示失败信息。
                Ember.$("#registerErrorTip").html(msg);
                $registerBtn.button('reset');
                Ember.run.later({}, function() {
                    //提示信息只显示3秒钟
                    Ember.$("#registerErrorTip").html("");
                }, 3000);
			});
        },
        // 邮箱登录
        emailLogin() {
            var loginBtn = Ember.$("#loginBtn");
            var $btn = loginBtn.button('loading');

            var email = this.get('loginEmail');
            var password = this.get('loginPassword');
            // 加密
            password = md5(password);
            wilddog.initializeApp(config.wilddogConfig);
            //邮箱登录
            wilddog.auth().signInWithEmailAndPassword(email, password).then(() => {
                var user = wilddog.auth().currentUser;
                // 设置用户信息到session中
                setUserInfoToSession(this, user);
                //获取用户默认的笔记本
                this.store.findAll('notebook').then((nbs) => {
                    var defaultNotebookId = null;
                    var isExests = false;
                    var len = nbs.get('length');
                    for (var i = 0; !isExests && i < len; i++) {
                        // 可以用isDeletable判断是否是默认的笔记本，只有初始化的笔记本是不可删除的也是默认的
                        if (nbs.objectAt(i).get('userId') === user.uid && nbs.objectAt(i).get('isDeletable') === 0) {
                            defaultNotebookId = nbs.objectAt(i).get('id');
                            isExests = true;
                        } else {
                            isExests = false;
                        }
                    }
                    if (isExests) {
                        loginBtn.button('reset');
                        console.log('login success....');
                        //保存成功跳转到笔记本列表页面
                        location.href = `/#/v2/notebook/list/${defaultNotebookId}`;
                    }
                });
            }).catch(function(err){
                var msg = "";
                if (err.code === 22010) {
                    msg = "该密码不正确";
                } else if (err.code === 22009) {
                    msg = "该邮箱地址无效";
                } else if (err.code === 22011) {
                    msg = "该用户不存在";
                } else if (err.code === 22220) {
                    msg = "该邮箱还未注册";
                } else if (err.code === 29999) {
                    msg = "发生未知错误";
                } else {  //情况很多，不处理
                    //msg = "服务器罢工了！请稍后再等了，或者联系我们。";
                }
                // 注册失败提示失败信息。
                Ember.$("#loginrErrorTip").html(msg);
                loginBtn.button('reset');
                Ember.run.later({}, function() {
                    //提示信息只显示3秒钟
                    Ember.$("#loginrErrorTip").html("");
                }, 3000);
            });
        },
        // qq登录
        qqlogin() {
            wilddog.initializeApp(config.wilddogConfig);
			//弹出窗口方式，QQ登录
			var qqProvider = new wilddog.auth.QQAuthProvider();
            // signInWithRedirect  signInWithPopup
			wilddog.auth().signInWithPopup(qqProvider).then(() => {
                // 首次登录初始化一个笔记本、设置登录用户到session
                doLogin(this);
			}).catch(function(err){
			    console.error("登录错误：", err);
			});
        },
        // 微博登录
        weibologin() {
            wilddog.initializeApp(config.wilddogConfig);
            //弹出窗口方式，
            var weiboProvider = new wilddog.auth.WeiboAuthProvider();
            wilddog.auth().signInWithPopup(weiboProvider).then(() => {
                doLogin(this);
            }).catch(function(err){
                console.error("登录错误：", err)
            });
        },
        // 微信登录
        weixinlogin() {
            // console.log('weixinlogin.......');
            // wilddog.initializeApp(config.wilddogConfig);
            // //弹出窗口方式，
            // var weiboProvider = new wilddog.auth.WeixinAuthProvider();
            // wilddog.auth().signInWithPopup(weiboProvider).then(function () {
            //     console.info("login success", wilddog.auth().currentUser)
            // }).catch(function(err){
            //     console.info("login failed", err)
            // });
        },
        // qq登录
        // githubLogin() {
        //     const electron             = require('electron');
        //     const path                 = require('path');
        //     const app                  = electron.app;
        //     const BrowserWindow        = electron.BrowserWindow;
        //     const dirname              = __dirname || path.resolve(path.dirname());
        //     const emberAppLocation     = `file://${dirname}/dist/index.html`;
        //     location.href = emberAppLocation;
        // },
        githubLogin() {
            const {BrowserWindow} = require('electron').remote;
            // Your GitHub Applications Credentials
            var options = {
                client_id: '8c9d12f4c5b920b291c4',
                client_secret: '871f7196a0c5c3caca9570148237ea71ad1ceb94',
                scopes: ["user:email", "notifications"] // Scopes limit access for OAuth tokens.
            };
            // Build the OAuth consent page URL
            var authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false });
            var githubUrl = 'https://github.com/login/oauth/authorize?';
            var authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;
            authWindow.loadURL(authUrl);
            authWindow.show();

            var that = this;
            // Handle the response from GitHub - See Update from 4/12/2015
            authWindow.webContents.on('will-navigate', function (event, url) {
              handleCallback(url, authWindow, that, options);
            });

            authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
                // 授权之后执行这里
                //  http://test.ape-note.com/?code=3a1496ef47c4318b6b0a
                //  得到code
              handleCallback(newUrl, authWindow, that, options);
            });

            // Reset the authWindow on close
            authWindow.on('close', function() {
                BrowserWindow.getAllWindows().reload();
                authWindow = null;
            }, false);
        }
    }
});

function handleCallback (url, authWindow, that, options) {
  var raw_code = /code=([^&]*)/.exec(url) || null;
  var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
  var error = /\?error=(.+)$/.exec(url);

  if (code || error) {
    // Close the browser if code found or error
    authWindow.destroy();
  }

  // If there is a code, proceed to get token from github
  if (code) {
    requestGithubToken(options, code, authWindow, that);
  } else if (error) {
    alert('Oops! Something went wrong and we couldn\'t' +
      'log you in using Github. Please try again.');
  }
}

function requestGithubToken(options, code, authWindow, that) {

    var request = require('request');
    var url = `https://github.com/login/oauth/access_token?client_id=${options.client_id}&client_secret=${options.client_secret}&code=${code}`;
    request(url, (error, response, body) => {
    // console.log(error,response,body);
    if (!error && response.statusCode === 200) {
        var raw_access_token = /access_token=([^&]*)/.exec(body) || null;
        var access_token = (raw_access_token && raw_access_token.length > 1) ? raw_access_token[1] : null;
        // console.log('access_token === ',access_token);  //
        // 获取授权用户信息
        var getUserUrl = `https://api.github.com/user?access_token=${access_token}`;
        var queryParams = {
            url: getUserUrl,
            headers: {
                'User-Agent': 'ape-note'
            }
        };
        request(queryParams, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                var bodyObj = JSON.parse(body);
                var user = {
                    uid: bodyObj.id,
                    displayName: bodyObj.name,
                    email: bodyObj.email,
                    providerId: 'github',
                    photoURL: bodyObj.avatar_url
                };
                // console.log('user === ',user);
                doLogin(that, user, authWindow);
            }
        });
        // const {net} = require('electron');
        //   const request2 = net.request(queryParams);
        //   request2.on('response', (response) => {
        //         console.log(`STATUS: ${response.statusCode}`);
        //         console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
        //         response.on('data', (chunk) => {
        //             console.log(`BODY: ${chunk}`);
        //              authWindow.destroy();
        //         });
        //         response.on('end', () => {
        //             console.log('No more data in response.');
        //         });
        //   });
        //   request2.end();
    }
});
  // apiRequests
  //   .post('https://github.com/login/oauth/access_token', {
  //     client_id: options.client_id,
  //     client_secret: options.client_secret,
  //     code: code,
  //   })
  //   .end(function (err, response) {
  //     if (response && response.ok) {
  //         console.log('response ==== ',response);
  //       // Success - Received Token.
  //       // Store it in localStorage maybe?
  //       window.localStorage.setItem('githubtoken', response.body.access_token);
  //     } else {
  //       // Error - Show messages.
  //       console.log(err);
  //     }
  //   });

}

function doLogin(that, user, authWindow) {
    if (!user)
        user = wilddog.auth().currentUser;

    // 设置用户到service中（session 的作用）
    that.get('loginUser').setToSession("uid", user.uid);
    that.get('loginUser').setToSession("email", user.email);
    that.get('loginUser').setToSession("displayName", user.displayName);
    // 帐户照片地址，第三方账号登录的用户才有
    that.get('loginUser').setToSession("photoURL", user.photoURL);
    // 当前帐户登录使用的身份认证提供商名称，
    // 属性值：邮箱-password；qq-qq；weibo-weibo
    that.get('loginUser').setToSession("providerId", user.providerId);
    //获取用户默认的笔记本
    that.store.findAll('notebook').then((nbs) => {
        var defaultNotebookId = null;
        var isExests = false;
        var len = nbs.get('length');
        for (var i = 0; !isExests && i < len; i++) {
            if (nbs.objectAt(i).get('userId') === user.uid && nbs.objectAt(i).get('isDeletable') === 0) {
                defaultNotebookId = nbs.objectAt(i).get('id');
                isExests = true;
            } else {
                isExests = false;
            }
        }
        // 已经登录过，不需要在初始化
        if (isExests) {
            //保存成功跳转到笔记本列表页面
            // location.href = `/#/v2/notebook/list/${defaultNotebookId}`;

            const electron             = require('electron');
            const path                 = require('path');
            const app                  = electron.app;
            const BrowserWindow        = electron.BrowserWindow;
            const dirname              = __dirname || path.resolve(path.dirname());
            const emberAppLocation     = `file://${dirname}/dist/index.html`;

            sessionStorage.setItem('loginFlag', 'login');

            location.href = emberAppLocation;

            // authWindow.destroy();
        } else {  // 如果遍历完所有笔记本都没有说明是首次使用qq登录，需要初始化一个默认的笔记本
            that.store.createRecord('notebook', {
                title: '我的笔记本',
                userId: user.uid,
                isDeletable: 0
            }).save().then((nb) => {
                //保存成功跳转到笔记本列表页面
                // location.href = `/#/v2/notebook/list/${nb.get('id')}`;
                const electron             = require('electron');
                const path                 = require('path');
                const app                  = electron.app;
                const BrowserWindow        = electron.BrowserWindow;
                const dirname              = __dirname || path.resolve(path.dirname());
                const emberAppLocation     = `file://${dirname}/dist/index.html`;

                sessionStorage.setItem('loginFlag', 'login');

                location.href = emberAppLocation;
                // authWindow.destroy();
            }, (error) => {
                console.log('初始化笔记本失败：'+error);
            });
        }
    });
}

function setUserInfoToSession(that, user) {
    // 设置用户到service中（session 的作用）
    that.get('loginUser').setToSession("uid", user.uid);
    that.get('loginUser').setToSession("email", user.email);
    that.get('loginUser').setToSession("displayName", user.displayName);
    // 帐户照片地址，第三方账号登录的用户才有
    that.get('loginUser').setToSession("photoURL", user.photoURL);
    // 当前帐户登录使用的身份认证提供商名称，例如 weibo，weixin
    // 属性值：邮箱-password；qq-qq；weibo-weibo
    that.get('loginUser').setToSession("providerId", user.providerId);
}
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}
