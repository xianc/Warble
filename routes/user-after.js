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





// Processes form get requests: for sign up
exports.process = function (req, res) {
  var id   = req.params.id;
  var auser = userData(req);
  //Validates and adds new user to the userdatabse
  warbles.validateUser(auser, function(error, user) {
      console.log('checking...');
      if (error) {
        var smap = {
          'username': 'Username',
          'password' : 'Password',
        };
    // Error message
    // display if there is missing information or the username selected is already taken
      var m = '<font color=red><b>Uh oh!</b></font> <br> Either the username you have entered has already been taken or you have forgotten to fill out some required information! (*)<br><br>';
      for (p in smap) {
        if (warbles[p] === '' &&  p in smap) {
          m += smap[p] + ' is required! <br/>';
        }
      }

      genUserList(function (ul) {
      res.render('form/' + id,
                 { title: 'form - ' + id,
                   id: id,
                   msg: m,
                   user: ul 
                 });
       });
      }
      else {
       console.log('added new user');
       warbles.addUser(auser.username, auser.password, auser.birthday, function (err) {
        
        genUserList(function (ul) {
      //if there is no errors, user gets added to the database
       res.render('form/' + id,
                 { title: 'form - ' + id,
                   id: id,
                   msg: 'Congrats! Your Account has been created!!<br><br>',
                   user: ul });
                   });
            
            });
    }
  });
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

function userData(req) {
  var auser;
  if (req.method === 'GET') {
    auser = {
      username: req.query.username,
      password : req.query.password,
      uid : req.query.uid,
    };
  }
  //## registers user
  else {
    auser = {
      username : req.body.username, // gets the username
      password : req.body.password, // gets the password
      birthday:  req.body.month + '/' + req.body.day + '/' + req.body.year, // formats the date
    };
  }
  
  return auser;
}

// Displays user
function genUserList(callback) {
  var i;
  warbles.getUserInfo([], function (list) {
  var u = '<ul>';
    for (i = 0; i < list.length; i++ ) {
      var userInfo = list[i];
      u += '<li>' + userInfo + '</li>';
    }
    u += '</ul>';
    callback(u);
  });
}


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
                              me        : user.username,
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
                              me        : user.username,
                              username : user.username,
                              birthday : user.birthday,
                              warble : warbs,
                              follower : follows
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
                              me        : user.username,
                              username : user.username,
                              birthday : user.birthday,
                              warble : warbs,
                              follower : follows
              });

  });
  });
  }
};

  // ## About Page
exports.about = function (req, res) {
  res.render('about', { title  : 'About'});
}

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
            var date = new Date()+'';
            warbles.addWarble(users.username, date, req.body.update, req.files.fileToUpload.name, '', function (err3) {
              if (err) { res.send('bad warble insert'); }
              else { res.redirect('/user/main'); }
            });
          }
          else{
            console.log('Date: ' + new Date());
            var date = new Date()+'';
            warbles.addWarble(users.username, date, req.body.update, '', '', function (err3) {
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

//## Discover Page
//Lists the users online as well as the 5 most recent entries 
//in the user database. This page also displays Warbles from the Warble Databse
exports.discover = function (req,res) {
  var userid = req.cookies.userid;
  //authenticate login
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    warbles.getWarbles(function (err, warbs) {
        warbles.getUsers(function (err3, usr) {
          var users = online[userid];
          res.render('discover', { title  : 'Discover',
                                    users : online,
                                    allUsers : usr, // access the user database
                                    username : users.username,
                                    warble : warbs // access the warble database
                                  });
        });
      });

}
};


exports.wuser = function (req, res) {
  var userid = req.cookies.userid;
  var users = online[userid];
  var u = req.params.username;
  //var c = warbles.get_user(u); // This method searches for user in the user database


  warbles.getWarbles(function (err, warbs) {
    warbles.getFollowers(function (err2, follow) {
        warbles.getUsers(function (err3, usr) {
          if (req.method === 'POST') {
              console.log('Adding to Followers:');
              user.addToFollow (users.username, u);  // This adds the following and followed to the following database
              }

            res.render ('users/wuser' , { title : 'Profile+ ' + u,
                                      me : users.username,  // username of user viewing the page
                                      username : u, // username of the user page being viewed
                                      warble : warbs, // access the warbles database
                                      follower : follow, // access the followers database
                                      userdata : usr,
                                      birthday : users.birthday
                        });
            });
        });
    });
    };



exports.chat = function(req, res){
  var userid = req.cookies.userid;
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    warbles.getWarbles(function (err, warbs) {
      warbles.getFollowers(function (err2, follow) {
        var users = online[userid];
        res.render('chat', { title   : 'Realtime Chat',
                             users : online,  // array of users currently online
                             username : users.username,
                             password : users.password, 
                             warble : warbs, // access the warbles database
                             follower : follow // access the follower
                            });
        });
    });
    }
};


/*exports.gallery = function (req, res) {
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
        res.render('me', { title  : 'User Gallery',
                          username : user.username,
                          warble : warbs
                        });
     
      }
    });
  }
}*/