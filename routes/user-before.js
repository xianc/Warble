var user = require('../lib/user');

// We use this to communicate messages between redirects. Because
// this is a global variable we can only support a single user.
var authmessage;

// # User Server-Side Routes

// ## login
// Provides a user login view.
exports.login = function(req, res){
  var message = authmessage || '';  // capture a message if it exists.
  authmessage = undefined;          // reset authmessage.
  res.render('login', { title   : 'User Login',
                        message : message });
};

exports.about = function (req, res) {
  res.render('about', { title  : 'About'});
}


// ## auth
// Performs **basic** user authentication.
exports.auth = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  user.lookup(username, password, function(error, user) {
    if (error) {
      authmessage = error;          // capture the error message.
      res.redirect('/user/login');
    }
    else {
      authmessage = user;
      res.redirect('/user/main');   // capture the user object.
    }
  });
};

// ## logout
// Does nothing!
exports.logout = function(req, res) {
  res.redirect('/');
};

// ## main
// The main user view.
exports.main = function(req, res) {
  // capture the user object or create a default.
  var message = authmessage || { username : 'nobody', password : 'nopass' };
  // reset authmessage.
  authmessage = undefined;
  res.render('main', { title   : 'User main',
                       message : 'Login Successful',
                       username : message.username,
                       password : message.password });
};

exports.online = function(req, res) {
  // A stub function we fill in `user-after.js`.
  res.send('You are the only one online!');
};

exports.discover = function (req,res) {
  res.send('You are the only one online!');
}

exports.me = function (req, res) {
  res.render('me', { title  : 'At Me'});
}

exports.my_profile = function (req, res) {
  var message = authmessage || { username : 'nobody', password : 'nopass' };
  // reset authmessage.
  authmessage = undefined;
  res.render ('my_profile', { title : 'My Profile',
                              username : user.username });
}
exports.form = function (req, res) {
  var id = req.params.id;
  genUserList(function (ul) {
    res.render('form/' + id,
               { title: 'form - ' + id,
                 id: id,
                 msg: '',
                 users: ul });
  });
};

//###Processes form get requests:
exports.process = function (req, res) {
  var id   = req.params.id;
  var user = userData(req);

  if (users.validateUser(user)) {
    users.addUser(user);
    genUserList(function (ul) {
      res.render('form/' + id,
                 { title: 'form - ' + id,
                   id: id,
                   msg: 'Congrats! Your Account has been created!!',
                   users: ul });
    });
  }
  else {
    var smap = {
      'fname': 'First Name',
      'lname': 'Last Name',
      'pass' : 'Password',
    };
    var m = 'Missing information:<br>';
    for (p in smap) {
      if (user[p] === '' &&
          p in smap) {
        m += smap[p] + ' is required! <br/>';
      }
    }
    genUserList(function (ul) {
      res.render('form/' + id,
                 { title: 'form - ' + id,
                   id: id,
                   msg: m,
                   users: ul });
    });
  }
};

function userData(req) {
  var user;
  if (req.method === 'GET') {
    user = {
      fname: req.query.fname,
      lname: req.query.lname,
      email: req.query.email,
      pass : req.query.pass,
      newu : req.query.newu,
      sex  : req.query.sex,
      month : req.query.month,
      day : req.query.day,
      year : req.query.year,
    };
  }
  else {
    user = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      pass : req.body.pass,
      sex  : req.body.sex,
      month: req.body.month,
      day  : req.body.day,
      year : req.body.year,
    };
  }
  
  return user;
}

//###Displays Users
function genUserList(callback) {
  var i;
  users.getUserInfo([], function (list) {
    var u = '<ul>';
    for (i = 0; i < list.length; i++ ) {
      var userInfo = list[i];
      u += '<li>' + userInfo + '</li>';
    }
    u += '</ul>';
    callback(u);
  });
}
