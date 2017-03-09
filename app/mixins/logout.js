import Ember from 'ember';

/**
 * 登录校验，如果还未登录直接跳转到login页面
 * @type {[type]}
 */
export default Ember.Mixin.create({
    // 注入session信息
    loginUser: Ember.inject.service('login-user'),
    // 重定向
    redirect(model, transition) {
        var uid = this.get('loginUser').getBySession('uid');
        if (!uid) {
            // this是指调用次方法的route类
            this.transitionTo('login');
        }
    }
});
