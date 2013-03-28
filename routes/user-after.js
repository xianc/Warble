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
  res.redirect('/user/login');
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
    var user = online[userid];
    res.render('main', { title   : 'User main',
                         message : 'Login Successful',
                         users : online,
                         username : user.username,
                         password : user.password });
  }
};

exports.online = function(req, res) {
  res.render('online', { title : 'Users Online',
                         users : online });
};

exports.discover = function (req,res) {
  res.render('discover', { title  : 'Discover'});
}

exports.me = function (req, res) {
  res.render('me', { title  : 'At Me'});
}

exports.my_profile = function (req, res) {
  res.render ('my_profile', { title : 'My Profile'});
}