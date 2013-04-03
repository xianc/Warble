var user = require('../lib/user');

// Records the logged in user:
var userids = 0;
// A logged in "database":
var online = {};

//
// The `flash` function is used to pass a message between
// request and response. This is specifically used to help
// pass messages as part of the redirect. For example, to
// pass a `message` with a value `v` to a redirected URL we
// would invoke `flash` before the redirect like so:
//
//    flash(req, res, 'message', 'this is my message');
//    res.redirect('/user/main');
//
// To receive the message in the redirected route we would
// invoke `flash` like so:
//
//    var message_value = flash(req, res, 'message');
//
// This is implemented using *cookies*. We create a cookie
// named `name` with the value `value`. This cookie is
// passed to the client and sent as part of the subsequent
// request as part of the redirect. We then delete the
// cookie when the redirect request is received back on
// the server-side.
//
function flash(req, res, name, value) {
  // If `value` is not undefined we are *setting* a flash
  // value (i.e., setting a cookie).
  if (value !== undefined) {
    res.cookie(name, value);
    // We return the `value` to be consistent with the
    // alternative call - to retrieve the value.
    return value;
  }
  else {
    // Grab the `value` from the cookies sent along with
    // the request.
    value = req.cookies[name];
    // Clear the cookie in the response.
    res.clearCookie(name);
    // Return the `value`.
    return value;
  }
}

// # User Server-Side Routes

// ## login
// Provides a user login view.
exports.login = function(req, res){
  // Grab any messages being sent to use from redirect.
  var authmessage = flash(req, res, 'auth') || '';

  // TDR: redirect if logged in:
  var userid  = req.cookies.userid;

  // TDR: If the user is already logged in - we redirect to the
  // main application view. We must check both that the `userid`
  // and the `online[userid]` are undefined. The reason is that
  // the cookie may still be stored on the client even if the
  // server has been restarted.
  if (userid !== undefined && online[userid] !== undefined) {
    res.redirect('/user/main');
  }
  else {
    // Render the login view if this is a new login.
    res.render('login', { title   : 'User Login',
                          message : authmessage });
  }
};

// ## auth
// Performs **basic** user authentication.
exports.auth = function(req, res) {
  // TDR: redirect if logged in:
  var userid = req.cookies.userid;

  // TDR: do the check as described in the `exports.login` function.
  if (userid !== undefined && online[userid] !== undefined) {
    res.redirect('/user/main');
  }
  else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;
    // Perform the user lookup.
    user.lookup(username, password, function(error, user) {
      if (error) {
        // If there is an error we "flash" a message to the
        // redirected route `/user/login`.
        flash(req, res, 'auth', error);
        res.redirect('/user/login');
      }
      else {
        // TDR: use cookie to record stateful connection. Here
        // we record the generated userid as a cookie to be
        // passed back and forth between client and server.
        userid = ++userids;
        res.cookie('userid',
                   userid+'',
                   { maxAge : 900000 }); // 15 minutes

        // Store the user in our in memory database.
        online[userid] = user;
        // Redirect to main.
        res.redirect('/user/main');
      }
    });
  }
};

// ## logout
// Deletes user info & cookies - then redirects to login.
exports.logout = function(req, res) {
  // TDR: handle cookies
  var userid = req.cookies.userid;
  if (online[userid] !== undefined) {
    res.clearCookie('userid');
    delete online[userid];
  }
  res.redirect('/');
};

// ## main
// The main user view.
exports.main = function(req, res) {
  // TDR: added cookie support
  var userid = req.cookies.userid;
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    var users = online[userid];
    res.render('main', { title   : 'User main',
                         message : 'Login Successful',
                         users : online,
                         username : users.username,
                         password : users.password, 
<<<<<<< HEAD
                         warble : user.addTweet()
=======
                         warble : user.getWarbledb(),
						 follower : user.getFollowerdb()
>>>>>>> c650519c158f06ddc9fe12f5c7acffe99cde738f
                        });
  }
};

exports.online = function(req, res) {
  var users = online[userid];
  res.render('online', { title : 'user Online',
                         users : online });
};
exports.warbles = function(req, res) {
  var warbles = warbles[userid];
  res.render('online', { title : 'user Online',
                         users : online });
};



exports.discover = function (req,res) {
  res.render('discover', { title  : 'Discover',
                            users : online,
                            allUsers : user.getUserdb()});
}

exports.me = function (req, res) {
  var userid = req.cookies.userid;
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    var users = online[userid];
  res.render('me', { title  : 'At Me',
                    username : users.username,
                    warble : user.getWarbledb()  });
}
}

exports.about = function (req, res) {
  res.render('about', { title  : 'About'});
}

exports.upload = function (req, res) {
  res.render('upload', { title  : 'Upload'});
}

exports.my_profile = function (req, res) {
   var userid = req.cookies.userid;
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    var users = online[userid];
  res.render ('my_profile', { title : 'My Profile',
                              username : users.username });
  }
}

exports.followers = function (req, res) {
   var userid = req.cookies.userid;
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    var users = online[userid];
  res.render ('followers', { title : 'Followers',
                              username : users.username,
							  follower : user.getFollowerdb()
							});
  }
}

exports.following = function (req, res) {
   var userid = req.cookies.userid;
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    var users = online[userid];
  res.render ('following', { title : 'Following',
                              username : users.username });
  }
}

exports.form = function (req, res) {
  var id = req.params.id;
  genUserList(function (ul) {
    res.render('form/' + id,
               { title: 'form - ' + id,
                 id: id,
                 msg: '',
                 user: ul });
  });
};

//###Processes form get requests:
exports.process = function (req, res) {
  var id   = req.params.id;
  var auser = userData(req);

  if (user.validateUser(auser)) {
    user.addUser(auser);
    genUserList(function (ul) {
      res.render('form/' + id,
                 { title: 'form - ' + id,
                   id: id,
                   msg: 'Congrats! Your Account has been created!!',
                   user: ul });
    });
  }
  else {
    var smap = {
      'username': 'Username',
      'password' : 'Password',
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
                   user: ul });
    });
  }
};

function userData(req) {
  var auser;
  if (req.method === 'GET') {
    auser = {
      //fname: req.query.fname,
      //lname: req.query.lname,
      //email: req.query.email,
      username: req.query.username,
      password : req.query.password,
      uid : req.query.uid,
      //sex  : req.query.sex,
      //month : req.query.month,
      //day : req.query.day,
      //year : req.query.year,
    };
  }
  else {
    auser = {
      //fname: req.body.fname,
      //lname: req.body.lname,
      //email: req.body.email,
      username : req.body.username,
      password : req.body.password,
      //sex  : req.body.sex,
      //month: req.body.month,
      //day  : req.body.day,
      //year : req.body.year,
    };
  }
  
  return auser;
}


//###Displays user
function genUserList(callback) {
  var i;
  user.getUserInfo([], function (list) {
  var u = '<ul>';
    for (i = 0; i < list.length; i++ ) {
      var userInfo = list[i];
      u += '<li>' + userInfo + '</li>';
    }
    u += '</ul>';
    callback(u);
  });
}
