// # user-after.js

//the warble database
var warbles = require('../lib/warbles.js'),
    formidable = require('formidable'),
    querystring = require('querystring'),
    fs = require('fs');
    
// Records the user logged in
var userids = 0;
// Records all users that are logged in in a "database"
var online = {};



/*
 * GET home page.
 */


// ### Flash

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

// ## User Server-Side Routes

// ## Login Page
// A username and password is entered and is checked with the databae using auth
exports.login = function(req, res){
  // Grab any messages being sent to use from redirect.
  var authmessage = flash(req, res, 'auth') || '';

  // TDR: redirect if logged in:
  var userid  = req.cookies.userid;

  // If the user is already logged in - they are redirected to the
  // main/front page of Warble. We must check both that the `userid`
  // and the `online[userid]` are undefined. The reason is that
  // the cookie may still be stored on the client even if the
  // server has been restarted.
  if (userid !== undefined && online[userid] !== undefined) {
    flash(req, res, 'message', 'Signing in...');
    res.redirect('/user/me');
  }
  else {
    // Render the login view if this is a new login.
    res.render('login', { title   : 'User Login',
                          message : warbles.User });
  }
};


// ## Login Authentification
// Performs **basic** user authentication.
exports.auth = function(req, res) {
  var userid = req.cookies.userid;

  if (userid !== undefined && online[userid] !== undefined) {
    flash(req, res, 'message', 'Signing in...');
    res.redirect('/user/me');
  }
  else {
    // Pull the values from the form.
    var username = req.body.username;
    var password = req.body.password;
    // Perform the user lookup.
    console.log('chcking credentials');
    warbles.lookup(username, password, function(error, user) {
      console.log('checking...');
      if (error) {
        console.log('error! redirecting...');
        // If there is an error we "flash" a message to the
        // redirected route `/user/login`.
        flash(req, res, 'auth', error);
        res.redirect('/user/login');
      }
      else {
        console.log('login success!');
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
        res.redirect('/user/me');
      }
    });
  }
}

// ### logout
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

exports.me = function (req, res) {
  //renders here
  var userid = req.cookies.userid;
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    warbles.getWarbles(function (err, warbs) {
      if (err) { res.send('problem access data layer!'); }
      else {
        var user = online[userid];
        res.render('me', { title  : 'At Me',
                          username : user.username,
                          warble : warbs
                        });
     
      }
    });
  }
}

/*exports.my_profile = function (req, res) {
  var userid = req.cookies.userid;
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    var user = online[userid];
    var warbs;
    var followers;

    warbles.getWarbles(function (err, warbles) {
      warbs = warbles;
    }
    warbles.getFollowers(function (err, follow) {
      followers = follow;
    }

    console.log('username '+ user.username);
    console.log('follower ' + followers[0].username);

    var user = online[userid];
    res.render('my_profile', { title  : 'My Profile',
                          username : user.username,
                          warble : warbs,
                          follower : followers
                        });
      
  
    }
  };
*/




