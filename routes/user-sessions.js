// Requiring the user library
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

// ## Login Authentification
// Performs **basic** user authentication.
// Looks at username and password and tries to find a match in userdb 
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


// ## Logout Page
// redirects to login page
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
  res.redirect('/');
};

/* ## Main Page
Also known as the Front Page. This page: 
> 1. Greets the user that is signed in. 
> 2. Displays the name of online users
> 3. Allow users to "tweet" (warbles)
> 4. Displays recent tweets/warbles
*/
exports.main = function(req, res) {

  function warbleData(req) {
  var aWarble;
  if (req.method === 'GET') {
      aWarble = {
      username: ' ',
      date : ' ',
      message : req.query.update,
      attachment:' ',
      atUser:' '
    };
  }
  else {
    aWarble = {
      username: ' ',
      date : ' ',
      username : req.body.update,
      attachment:' ',
      atUser:' '
    };
  }
  
  return aWarble;
}

  // TDR: added session support
  var message = authmessage || { username : 'nobody', password : 'nopass' };
  // reset authmessage.
  authmessage = undefined;
  res.render('main', { title   : 'User Main',
                       message : 'Login Successful',
                         users : online,
                         username : user.username,
                         password : user.password,
                         warble : userlib.getWarbledb(),
                         //addwarble : userlib.addWarble(),
						             follower: userlib.getFollowerdb()
						 });
};

//## Online Page
//A page that renders online users. Is a test function for discover
exports.online = function(req, res) {
  res.render('online', { title : 'Users Online',
                         users : online });
};

//## Discover Page
//Lists the users online as well as the 5 most recent entries in the user database. This page also displays Warbles from the Warble Databse
exports.discover = function (req,res) {
  res.render('discover', { title  : 'Discover',
                            users : online,
                            allUsers : userlib.getUserdb()});
}

// ## About Page
exports.about = function (req, res) {
  res.render('about', { title  : 'About'});
}

// ## At Me Page
// Displays Warbles at the user that is logged in. 
exports.me = function (req, res) {
  var message = authmessage || { username : 'nobody', password : 'nopass' };
  // reset authmessage.
  authmessage = undefined;
  res.render('me', { title  : 'At Me',
                    username : users.username,
                    warble : userlib.getWarbledb()});
}

/* ## Upload Function
This function is currently commented out and does nothing
exports.upload = function (req, res) {
  res.render('upload', { title  : 'Upload'});
}
*/


// ## My Profile Page
// This page display user information like: the number of Warbles and followers they have and the number of people they follow. It also displays Warbles by that user
exports.my_profile = function (req, res) {
  var message = authmessage || { username : 'nobody', password : 'nopass' };
  // reset authmessage.
  authmessage = undefined;
  res.render ('my_profile', { title : 'My Profile',
                              username : userlib.username,
                              warble : userlib.getWarbledb(),
							  follower : userlib.getFollowerdb(),
							  following : userlib.getFollowingdb()
							  });
}

// ## Followers Page
// Displays the followers of the user currently logged in
exports.followers = function (req, res) {
  var message = authmessage || { username : 'nobody', password : 'nopass' };
  // reset authmessage.
  authmessage = undefined;
  res.render ('followers', { title : 'Followers',
                              username : userlib.username,
							  follower : userlib.getFollowerdb(),
							  following : userlib.getFollowingdb()
						   });
}

// ## Following Page
// Displays the users that the current logged in user is following
exports.following = function (req, res) {
  var message = authmessage || { username : 'nobody', password : 'nopass' };
  // reset authmessage.
  authmessage = undefined;
  res.render ('following', { title : 'Following',
                              username : userlib.username,
							               following : userlib.getFollowingdb(),
							               follower : userlib.getFollowerdb()
							});
}


exports.wuser = function (req, res) {
    var u = req.params.user;
    var c = userlib.get_user(u);
    if (c) {
        res.send('<h3>User: ' + 
                 c.username  +'</h3>');
    } else {
        res.send('<h3>Unknown user: ' + u + '</h3>');
    }
};


//Processes form get requests:
exports.addWarb = function (req, res) {
  var aWarble = {
      username: ' ',
      date : ' ',
      message : req.body.update,
      attachment:' ',
      atUser:' '
    };

  userlib.warbledb.push(aWarble);

};

//Puts together the warbleData use to add warbles to the warble database
function warbleData(req) {
  var aWarble;
  if (req.method === 'GET') {
      aWarble = {
      username: ' ',
      date : ' ',
      message : req.query.update,
      attachment:' ',
      atUser:' '
    };
  }
  else {
    aWarble = {
      username: ' ',
      date : ' ',
      username : req.body.update,
      attachment:' ',
      atUser:' '
    };
  }
  
  return aWarble;
}