
/**
 * Module dependencies.
 */
var express = require('express')
  , user  = require('./routes')
  , http  = require('http')
  , path  = require('path')
  // TDR: Include flash middleware:
  , flash = require('connect-flash');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('cookies monster'));
  // Added session support
  app.use(express.session());
  // Added flash support
  app.use(flash());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', user.login);
app.get ('/user/login' , user.login);
app.post('/user/auth'  , user.auth);
app.get ('/user/main'  , user.main);
app.get ('/user/logout', user.logout);
app.get ('/user/online', user.online);
app.get ('/user/discover', user.discover);
app.get ('/user/me',      user.me);
app.get ('/user/profile', user.my_profile);
app.get('/user/front',   user.main);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
