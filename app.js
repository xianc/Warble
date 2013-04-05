
/**
 * Module dependencies.
 */
var express = require('express')
  , user  = require('./routes')
  , chat = require('./chat')
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
app.get ('/user/my_profile', user.my_profile);
app.get('/user/front',   user.main);
app.get('/user/upload', user.upload);
app.get('/user/followers', user.followers);
app.get('/user/following', user.following);
app.get('/user/about',   user.about);
app.get('/user/:username', user.wuser);
app.post('/user/:username', user.wuser);
app.post('/user/main', user.main);

//app.post('/user/addWarb', user.main);

//#Chat Test
//The below is a test for dynamically updated statuses
app.get('/chat', user.chat);
app.post('/post', chat.post);
app.post('/check', chat.check);


app.get('/form/:id', user.form);
app.get('/form/process/:id', user.process);
app.post('/form/process/:id', user.process);



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
