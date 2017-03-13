/*jshint node:true*/

// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//


module.exports = function(app) {
  var globSync   = require('glob').sync;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);
  var request = require('request');

  // Log proxy requests
  var morgan  = require('morgan');
  app.use(morgan('dev'));

  mocks.forEach(function(route) { route(app); });
  proxies.forEach(function(route) { route(app); });


  app.get('/oauth/oschina', function(req, res) {
      var client_id = "vzCBAoqIVBClvNcXnj";
      var client_secret = "lMUKYuuveVEbhIOolQexMnyzJDmfG";
      var redirect_uri = "http://test.ape-note.com/oauth/oschina";
      // 首先获取code
      var getCodeUrl = `https://www.oschina.net/action/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;
      requests(getCodeUrl, function(error, response, body) {
          var bodyObj1 = JSON.parse(body);
          // 得到code后获取access_token，
          var code = bodyObj1.code;
         //  console.log('code = ' + code);
          if (code) {  // 获取access_token
              var url = `https://www.oschina.net/action/openapi/token?redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&code=${code}&dataType=json`;
              request(url, function (error, response, body) {
                  if (!error && response.statusCode == ) {
                      var bodyObj = JSON.parse(body);
                      var access_token = bodyObj.access_token;
                      // 根据得到的access_token获取用户信息
                      request(`https://www.oschina.net/action/openapi/user?access_token=${access_token}&dataType=json`, function(error, response, body) {
                          if (!error && response.statusCode === ) {
                              var userObj = JSON.parse(body);
                              res.send({
                                  msg: '登录成功',
                                  code: 1,
                                  user: userObj
                              });
                          } else {
                              res.send({
                                  msg:"获取用户信息失败",
                                  code: 0
                              });
                          }
                      });
                  } else {
                      res.send({
                          msg: "获取`access_token`失败",
                          code: 0
                      });
                  }
              });
          } else {
              res.send({
                  msg: "获取`code`失败",
                  code: 0
              });
          }
      });
  });
};
