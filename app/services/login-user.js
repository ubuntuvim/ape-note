import Ember from 'ember';

/**
 * 用于保存登录用户的信息
 * 登录用户名：displayName，使用第三方账号登录一定有
 * 登录用户邮箱：email，使用邮箱方式登录一定有
 * 登录用户唯一id：uid，不管哪种方式登录都一定有
 */
export default Ember.Service.extend({
    // displayName: null,
    // email: null,
    // uid: null,

    setToSession(key, value) {
        // Save data to sessionStorage
        sessionStorage.setItem(key, value);
        // this.set(key, value);
    },
    getBySession(key) {
        // Get saved data from sessionStorage
        return sessionStorage.getItem(key);
        // return this.get(key);
    },
    /**
     * 清空保存的登录信息
     */
    clear() {
        // this.set('displayName', null);
        // this.set('email', null);
        // this.set('uid', null);
        // Remove all saved data from sessionStorage
        // sessionStorage.clear();

        // Remove saved data from sessionStorage
        // for (var i = 0; i < keys.lenght; i++) {
        //     sessionStorage.removeItem(keys[i]);
        // }
        sessionStorage.removeItem('displayName');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('uid');
        // 帐户照片地址，第三方账号登录的用户才有
        sessionStorage.removeItem('photoURL');
        // 当前帐户登录使用的身份认证提供商名称，例如 weibo，weixin
        // 属性值：邮箱-password；qq-qq；weibo-weibo
        sessionStorage.removeItem('providerId');
    }
});
