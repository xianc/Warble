var userlib = require('../lib/user');

// A logged in "database":
var online = {};

// # User Server-Side Routes

// ## login
// Provides a user login view.
exports.login = function(req, res){
  // Grab any messages being sent to use from redirect.
  var authmessage = req.flash('auth') || '';

  // TDR: redirect if logged in:
  var user  = req.session.user;

  // TDR: If the user is already logged in - we redirect to the
  // main application view. We must check both that the `userid`
  // and the `online[userid]` are undefined. The reason is that
  // the cookie may still be stored on the client even if the
  // server has been restarted.
  if (user !== undefined && online[user.uid] !== undefined) {
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
  var user = req.session.user;

  // TDR: do the check as described in the `exports.login` function.
  if (user !== undefined && online[user.uid] !== undefined) {
    res.redirect('/user/main');
  }
  else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;
    // Perform the user lookup.
    userlib.lookup(username, password, function(error, user) {
      if (error) {
        // If there is an error we "flash" a message to the
        // redirected route `/user/login`.
        req.flash('auth', error);
        res.redirect('/user/login');
      }
      else {
        req.session.user = user;
        // Store the user in our in memory database.
        online[user.uid] = user;
        // Redirect to main.
        res.redirect('/user/main');
      }
    });
  }
};


// ## logout
// Deletes user info & session - then redirects to login.
exports.logout = function(req, res) {
  var user = req.session.user;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/user/login');
    return;
  }

  if (online[user.uid] !== undefined) {
    delete online[user.uid];
  }

  delete req.session.user;
  res.redirect('/user/login');
};

// ## main
// The main user view.
exports.main = function(req, res) {
  // TDR: added session support
  var message = authmessage || { username : 'nobody', password : 'nopass' };
  // reset authmessage.
  authmessage = undefined;
  res.render('main', { title   : 'User Main',
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
  res.render('discover', { title  : 'Discover',
                            users : online });
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
    res.render('/user/form/' + id,
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
      res.render('/user/form/' + id,
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
      res.render('/user/form/' + id,
                 { title: 'form - ' + id,
                   id: id,
                   msg: m,
                   users: ul });
    });
  }
};
