// Requiring the user library
var user = require('../lib/user');

// We use this to communicate messages between redirects. Because
// this is a global variable we can only support a single user.
var authmessage;

// # User Server-Side Routes

// ## Login Page
// A username and password is entered and is checked with the databae using auth
exports.login = function(req, res){
  var message = authmessage || '';  // capture a message if it exists.
  authmessage = undefined;          // reset authmessage.
  res.render('login', { title   : 'User Login',
                        message : message });
};

// ## About Page
exports.about = function (req, res) {
  res.render('about', { title  : 'About'});
}


// ## Login Authentification
// Performs **basic** user authentication.
// Looks at username and password and tries to find a match in userdb 
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

// ## Logout Page
// redirects to login page
exports.logout = function(req, res) {
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
  // capture the user object or create a default.
  var message = authmessage || { username : 'nobody', password : 'nopass' };
  // reset authmessage.
  authmessage = undefined;

  res.render('main', { title   : 'User main',
                       message : 'Login Successful',
                       username : message.username,
                       password : message.password,
                       warble : userlib.getWarbledb(),
					   follower : userlib.getFollowerdb() 
					   });
};

// ## Online Page

exports.online = function(req, res) {
  // A stub function we fill in `user-after.js`.
  res.send('You are the only one online!');
};

// ## Discover Page
// A stub function we fill in `user-after.js`.
exports.discover = function (req,res) {
  res.send('Nothing Here');
}

// ## At Me Page
// Displays Warbles at the user that is logged in. 
exports.me = function (req, res) {
  var message = authmessage || { username : 'nobody', password : 'nopass' };
  // reset authmessage.
  authmessage = undefined;
  res.render('me', { title  : 'At Me',
                    username : users.username,
                    warble : user.getWarbledb()});
}

/* ## Upload Function
This function is currently commented out and does nothing
exports.upload = function (req, res) {
  res.render('upload', { title  : 'Upload'});
}
*/



// ## Followers Page
// Displays the followers of the user currently logged in
exports.followers = function (req, res) {
  var message = authmessage || { username : 'nobody', password : 'nopass' };
  // reset authmessage.
  authmessage = undefined;
  res.render ('followers', { title : 'Followers',
                              username : user.username,
							  follower : user.getFollowerdb(),
							  following : user.getFollowingdb()
							});
}

// ## Following Page
// Displays the users that the current logged in user is following
exports.following = function (req, res) {
  var message = authmessage || { username : 'nobody', password : 'nopass' };
  // reset authmessage.
  authmessage = undefined;
  res.render ('following', { title : 'Following',
                              username : user.username,
							  following : user.getFollowingdb(),
							  follower : user.getFollowerdb()
							});
}

// ## My Profile Page
// This page display user information like: the number of Warbles and followers they have and the number of people they follow. It also displays Warbles by that user
exports.my_profile = function (req, res) {
  var message = authmessage || { username : 'nobody', password : 'nopass' };
  // reset authmessage.
  authmessage = undefined;
  res.render ('my_profile', { title : 'My Profile',
                              username : user.username,
                              warble : user.getWarbledb(),
							                follower : user.getFollowerdb(),
							                following : user.getFollowingdb()
							  });
}



//Processes form get requests:
exports.addWarb = function (req, res) {
  var aWarble = {
      username  : ' ',
      database  : ' ',
      messages  : req.query.update,
      attachment: ' ',
      atUser    : ' ',
    };

    //var warble = user.getWarbledb();
    //warble.push(aWarble);
    user.addWarble(aWarble);

};

//## User Pages
//This function displays user profiles. for example, user/Xian will display Xian's followers and warbles and the users who follows her. Her followers and the people who follower her can be displayed by clicking on the number link next to the corresponding category. (Currently 'uploads' are not yet implemented for a user.
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
