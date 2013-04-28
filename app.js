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
app.get ('/user/login'  , user.login);
app.post('/user/auth'   , user.auth);
app.get ('/user/logout' , user.logout);

//app.get('/users', user.list);
app.get ('/user/me'       , user.me);
app.get('/user/my_profile', user.my_profile);
app.get('/warbles/list'   , user.warbles_list);


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



/**
 * Module dependencies.
 */
/*var express = require('express')
  , user  = require('./routes')
  , chat = require('./chat')
  , http  = require('http')
  , path  = require('path')
  , formidable = require('formidable')
  // TDR: Include flash middleware:
  , flash = require('connect-flash');

var app = express();

app.configure(function(){
  //app.set('port', process.env.PORT || 3000);
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

app.configure('production', function(){
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
app.get('/users/:username', user.wuser);
app.post('/users/:username', user.wuser);
app.post('/user/main', user.main);



//#Chat Test
//The below is a test for dynamically updated statuses
app.get('/chat', user.chat);
app.post('/post', chat.post);
app.post('/check', chat.check);


app.get('/form/:id', user.form);
app.get('/form/process/:id', user.process);
app.post('/form/process/:id', user.process);


//Upload
app.get('/begin' , user.begin);
app.post('/upload', user.upload);
//app.get('/show', user.show);

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
*/