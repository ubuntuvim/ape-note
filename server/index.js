/*jshint node:true*/

// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//


module.exports = function(app) {
  var globSync   = require('glob').sync;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);
  var request = require('request');
  var cors = require('cors');

  app.use(cors());

  // Log proxy requests
  var morgan  = require('morgan');
  app.use(morgan('dev'));

  //设置跨域访问
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });

  mocks.forEach(function(route) { route(app); });
  proxies.forEach(function(route) { route(app); });


  app.get('/oauths/oschina', function(req, res) {
      console.log('========== /oauth/oschina ============');
      var client_id = "vzCBAoqIVBClvNcXnj";
      var client_secret = "lMUKYuuveVEbhIOolQexMnyzJDmfG";
      var redirect_uri = "http://test.ape-note.com/oauth/oschina";
      // 首先获取code
      var getCodeUrl = `https://www.oschina.net/action/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;
      requests(getCodeUrl, function(error, response, body) {
          if (!error && response.statusCode === 200) {
              var bodyObj1 = JSON.parse(body);
              // 得到code后获取access_token，
              var code = bodyObj1.code;
              if (code) {  // 获取access_token
                  var url = `https://www.oschina.net/action/openapi/token?redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&code=${code}&dataType=json`;
                  request(url, function (error, response, body) {
                      if (!error && response.statusCode === 200) {
                          var bodyObj = JSON.parse(body);
                          var access_token = bodyObj.access_token;
                          // 根据得到的access_token获取用户信息
                          request(`https://www.oschina.net/action/openapi/user?access_token=${access_token}&dataType=json`, function(error, response, body) {
                              if (!error && response.statusCode === 200) {
                                  var userObj = JSON.parse(body);
                                  res.send({
                                      msg: '登录成功',
                                      code: 1,
                                      user: userObj
                                  });
                              } else {
                                  res.send({
                                      msg:"获取用户信息失败: " + error,
                                      code: 0
                                  });
                              }
                          });
                      } else {
                          res.send({
                              msg: "获取`access_token`失败: " + error,
                              code: 0
                          });
                      }
                  });
              }
          } else {
              res.send({
                  msg: "获取`code`失败: " + error,
                  code: 0
              });
          }
      });
  });
};
