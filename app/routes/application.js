import Ember from 'ember';

export default Ember.Route.extend({
    redirect() {
        var url = window.location.href;
        // 跳转到介绍页面
        if (url === 'http://ape-note.com/'
            || url === 'http://ape-note.com'
            || url === 'http://wwww.ape-note.com'
            || url === 'http://wwww.ape-note.com/') {
            this.transitionTo('intro');
        }
    }
});
