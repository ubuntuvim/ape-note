/* jshint node: true */

module.exports = function(environment) {

  var ENV = {
    modulePrefix: 'ape-note',
    environment: environment,
    rootURL: '/',
    locationType: 'hash',

	firebase: {
		apiKey: 'AIzaSyCpJJfJSsm06uDpoVr5ec7cBgKvU34Ra_U',
		authDomain: 'ape-note.firebaseapp.com',
		databaseURL: 'https://ape-note.firebaseio.com',
		storageBucket: 'ape-note.appspot.com',
	},
	contentSecurityPolicy: {
        'default-src': "'none'",
        'script-src': "'self' 'unsafe-inline' 'unsafe-eval' *",
        'font-src': "'self' *",
        'connect-src': "'self' *",
        'img-src': "'self' *",
        'style-src': "'self' 'unsafe-inline' *",
        'frame-src': "*"

        // 'script-src': "'self' 'unsafe-eval' apis.google.com'",
        // 'frame-src': ''self' https://*.firebaseapp.com',
        // 'connect-src': ''self' wss://*.firebaseio.com https://*.googleapis.com'
    },
    // 链接野狗服务的设置
    wilddogConfig:{
        authDomain: "ape-note1.wilddog.com",
        syncDomain: "ape-note1.wilddog.com",
        syncURL: "https://ape-note1.wilddogio.com" //输入节点 URL
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
  },
    moment: {
      // To cherry-pick specific locale support into your application.
      // Full list of locales: https://github.com/moment/moment/tree/2.10.3/locale
      includeLocales: ['zh-cn'],
      includeTimezone: 'all'
    }
};  //ENV

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
