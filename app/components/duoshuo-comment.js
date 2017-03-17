import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {

    	// (function() {
    		var ds = document.createElement('script');
    		ds.type = 'text/javascript';ds.async = true;
    		ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.unstable.js';
    		ds.charset = 'UTF-8';
    		(document.getElementsByTagName('head')[0]
    		 || document.getElementsByTagName('body')[0]).appendChild(ds);
    	// })();
    }
});
