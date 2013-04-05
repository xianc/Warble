// # user-after.js

// Requiring the user library
var user = require('../lib/user');

// Records the user logged in
var userids = 0;
// Records all users that are logged in in a "database"
var online = {};

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

/* ## Main Page
Also known as the Front Page. This page: 
> 1. Greets the user that is signed in. 
> 2. Displays the name of online users
> 3. Allow users to "tweet" (warbles)
> 4. Displays recent tweets/warbles
*/
exports.main = function(req, res) {
  // TDR: added cookie support
  var userid = req.cookies.userid;

  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    var users = online[userid];

    //This part of the code adds Warbles! It currently does not 
    //implement the "attachment" or "at user" feature but it does add
    //warbles to warbledb
    if (req.method === 'POST') {
      console.log('Adding Warbles:');
      user.addWarbs(users.username, new Date(), req.body.update);
    }

    res.render('main', { title   : 'User main',
                         message : 'Login Successful',
                         users : online,
                         username : users.username,
                         password : users.password, 
                         warble : user.getWarbledb(),
						             follower : user.getFollowerdb()
                        });
  }


};

// ## Online Page
// shows the other users online at a point in time
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

//## Discover Page
//Lists the users online as well as the 5 most recent entries 
//in the user database. This page also displays Warbles from the Warble Databse
exports.discover = function (req,res) {
  res.render('discover', { title  : 'Discover',
                            users : online,
                            warble : user.getWarbledb(),
                            allUsers : user.getUserdb()});
}


// ## At Me Page
// Displays Warbles at the user that is logged in. 
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

// ## About Page
exports.about = function (req, res) {
  res.render('about', { title  : 'About'});
}

/* ## Upload Function
This function is currently commented out and does nothing
exports.upload = function (req, res) {
  res.render('upload', { title  : 'Upload'});
}
*/

// ## My Profile Page
// This page display user information like: the number of Warbles and 
//followers they have and the number of people they follow. It also 
//displays Warbles by that user
exports.my_profile = function (req, res) {
   var userid = req.cookies.userid;
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    var users = online[userid];
  res.render ('my_profile', { title : 'My Profile',
                              username : users.username,
                              warble : user.getWarbledb(),
              							  follower : user.getFollowerdb(),
              							  following : user.getFollowingdb()
							  });
  }
}

// ## Followers Page
// Displays the followers of the user currently logged in. 
// Is accessed via a user profile and clicking on the number
// corresponding to followers
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
                              warble : user.getWarbledb(),
              							  follower : user.getFollowerdb(),
              							  following : user.getFollowingdb()
							});
  }
}

// ## Following Page
// Displays the who the logged in user is following
// Is accessed via a user profile and clicking on the number
// corresponding to following
exports.following = function (req, res) {
   var userid = req.cookies.userid;
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    var users = online[userid];
  res.render ('following', { title : 'Following',
                              username : users.username,
                              warble : user.getWarbledb(),
							               following : user.getFollowingdb(),
							               follower : user.getFollowerdb()
							});
  }
}
// is a form for signup
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

// Processes form get requests: for sign up
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
// Renders userData. Currently the commented out paramaters are not yet implemented
// but will be in the future
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
  //## registers user
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


// Displays user
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



exports.chat = function(req, res){
  var userid = req.cookies.userid;
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    var users = online[userid];
    res.render('chat', { title   : 'User main',
                         message : 'Login Successful',
                         users : online,
                         username : users.username,
                         password : users.password, 
                         warble : user.getWarbledb(),
                         follower : user.getFollowerdb()
                        });
  
//  res.render('chat', { title: 'Chat Client' });
    }
};


//## User Pages
//This function displays user profiles. for example, user/Xian will display Xian's followers and warbles and the users who follows her. Her followers and the people who follower her can be displayed by clicking on the number link next to the corresponding category. (Currently 'uploads' are not yet implemented for a user.)
exports.wuser = function (req, res) {
    var u = req.params.username;
    var c = user.get_user(u); // This method searches for user in the user database

    res.render ('wuser', { title : 'Profile+ ' + c.username,
                              username : c.username,
                              warble : user.getWarbledb(),
                              follower : user.getFollowerdb(),
                              following : user.getFollowingdb()
                });

};