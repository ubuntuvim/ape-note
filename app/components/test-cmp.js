import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({

	actions: {

		save() {
			console.log('config.wilddogConfig === ',config.wilddogConfig);
			wilddog.initializeApp(config.wilddogConfig);
			//弹出窗口方式，QQ登录
			var weiboProvider = new wilddog.auth.QQAuthProvider();
			wilddog.auth().signInWithPopup(weiboProvider).then(function () {
			    console.info("login success", wilddog.auth().currentUser);
			}).catch(function(err){
			    console.info("login failed", err);
			});
		}

	}
});
