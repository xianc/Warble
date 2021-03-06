var express = require('express')
  , user    = require('./routes')
  , chat    = require('./chat')
  , http    = require('http')
  , path    = require('path')
  , flash   = require('connect-flash');

var app = express();

function auth(req, res, next) {
  if (req.session.user === undefined && req.url === '/user/login') {
    user.auth(req, res, next);
  }
  else if (req.session.user === undefined) {
    user.login(req, res, next);
  }
  else {
    next();
  }
}

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('cookies monster'));
  app.use(express.session());
  app.use(flash());
  app.use(app.router);
//  app.use(auth);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/'             , user.login);
app.get('/user/about'        , user.about);
app.get ('/user/login'  , user.login);
app.post('/user/auth'   , user.auth);
app.get ('/user/logout' , user.logout);
app.get ('/user/forget_password' , user.logout);

app.get('/form/:id', user.form);
app.get('/form/process/:id', user.process);
app.post('/form/process/:id', user.process);

//app.get('/users', user.list);
app.get ('/user/main'     , user.main);
app.post('/user/main'    , user.main);
app.get('/user/front'     , user.front);
app.get ('/user/me'       , user.me);
app.get('/warbles/list'   , user.warbles_list);
app.get('/user/followers' , user.followers);
app.get('/user/following' , user.following);
app.get('/user/gallery'   , user.gallery);

app.get('/user/chat', user.chat);
app.post('/user/post', chat.post);
app.post('/user/check', chat.check);

app.get('/user/my_profile', user.my_profile);
app.get ('/user/discover' , user.discover);
app.get('/users/:username', user.wuser);
app.post('/users/:username', user.wuser);


app.get('/user/onlineUsers', user.onlineUsers);
app.get('/user/allUsers', user.allUsers);
app.get('/user/recentWarbles', user.recentWarbles);
app.get('/user/recentUploads', user.recentUploads);
app.get('/user/myWarbles', user.myWarbles);
app.get('/user/myUploads', user.myUploads);


var server = http.createServer(app);

// WebSockets/Socket.IO
var io      = require('socket.io', {'log level': 0}).listen(server);
var chatApp = require('./chat');

io.sockets.on('connection', function (socket) {
  chatApp.init(socket);
});

server.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode",
              server.address().port, app.settings.env);
});