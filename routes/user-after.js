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
        res.redirect('/user/main');
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



exports.my_profile = function (req, res) {
  var userid = req.cookies.userid;
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    warbles.getWarbles(function (err, warbs) {
      warbles.getFollowers(function (err2, follows) {
        var user = online[userid];
        res.render('my_profile', { title  : 'My Profile',
                              username : user.username,
                              birthday : user.birthday,
                              warble : warbs,
                              follower : follows
                            });
      });
    });
  }
  };


  // ## Followers Page
// Displays the followers of the user currently logged in. 
// Is accessed via a user profile and clicking on the number
// corresponding to followers
exports.followers = function (req, res) {
   var userid = req.cookies.userid;
   //Authentification
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
  //var users = online[userid];
  //var users = warbles.getUser();
   warbles.getWarbles(function (err, warbs) {
      warbles.getFollowers(function (err2, follows) {
      var user = online[userid];
      res.render ('followers', { title : 'Followers',
                              username : user.username,
                              warble : warbs, // access the warbles database
                              follower : follows, //access the followers database
                              following : follows // access the following database
              });

  });
  });
  }
};

exports.following = function (req, res) {
   var userid = req.cookies.userid;
   //Authentification
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
  //var users = online[userid];
  //var users = warbles.getUser();
   warbles.getWarbles(function (err, warbs) {
      warbles.getFollowers(function (err2, follows) {
      var user = online[userid];
      res.render ('following', { title : 'Following',
                              username : user.username,
                              warble : warbs, // access the warbles database
                              follower : follows, //access the followers database
                              following : follows // access the following database
              });

  });
  });
  }
};

  // ## About Page
exports.about = function (req, res) {
  res.render('about', { title  : 'About'});
}

/  /* ## Main Page
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
     warbles.getWarbles(function (err, warbs) {
      warbles.getFollowers(function (err2, follows) {
        var users = online[userid];
          if (req.method === 'POST') {
            var path;
            console.log('Adding Warbles');

            if (req.files.fileToUpload.size!=0){
            console.log('File upload path: ' + req.files.fileToUpload.path);
            console.log('File upload name: ' + req.files.fileToUpload.name);
            console.log('File upload type: ' + req.files.fileToUpload.type);
            console.log('File upload size: ' + req.files.fileToUpload.size);
                 
            var fileDestPath = 'public/uploadedFiles/' + req.files.fileToUpload.name;
            fs.rename(req.files.fileToUpload.path, fileDestPath, function(err) {

              if (err) {
                console.log('File could not be moved to proper directory.');
                fs.unlink(req.files.fileToUpload.path, function(err2) {
                  if (err2) {
                    console.log('Temp file could not be deleted.');
                    throw err2;
                  }
                });
                console.log('Temp file deleted.');
                throw err;
              }
              console.log('Upload done!');
            });
          
            warbles.addWarble(users.username, new Date(), req.body.update, req.files.fileToUpload.name, '', function (err3) {
              if (err) { res.send('bad warble insert'); }
              else { res.redirect('/user/main'); }
            });
          }
          else{
            warbles.addWarble(users.username, new Date(), req.body.update, '', '', function (err3) {
              if (err) { res.send('bad warble insert'); }
              else { res.redirect('/user/main'); }
            });

          }

          }
          

              res.render('main', { title   : 'User main',
                                       message : 'Login Successful',
                                       users : online,
                                       username : users.username,
                                       password : users.password, 
                                       warble : warbs,
                                       follower : follows
                                      });
        });
      });
      }
};
