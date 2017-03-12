import Ember from 'ember';
import LogoutMixin from '../mixins/logout';
// 未登录直接跳转到登录页面
export default Ember.Route.extend(LogoutMixin, {
});
