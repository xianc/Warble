var warbles = require('../lib/warbles.js'),
    formidable = require('formidable'),
    querystring = require('querystring'),
    fs = require('fs');
    
var online = {};



exports.login = function(req, res){
  var authmessage = req.flash('auth') || '';
  var user  = req.session.user;

  if (user !== undefined && online[user.uid] !== undefined) {
    res.redirect('/user/me');
  }
  else {
    res.render('login', { title   : 'User Login',
                          message : authmessage });
  }
};


exports.auth = function(req, res) {
  var user = req.session.user;
  if (user !== undefined && online[user.uid] !== undefined) {
    res.redirect('/user/me');
  }
  else {
    var username = req.body.username;
    var password = req.body.password;
    
    warbles.lookup(username, password, function(error, user) {
      if (error) {
        req.flash('auth', error);
        res.redirect('/user/login');
      }
      else {
        req.session.user = user;
        online[user.uid] = user;
        res.redirect('/user/me');
      }
    });
  }
};


exports.logout = function(req, res) {
  var user = req.session.user;
  if (user === undefined || online[user.uid] === undefined) {
    req.flash('auth', 'Not logged in!');
    res.redirect('/login');
    return;
  }

  if (online[user.uid] !== undefined) {
    delete online[user.uid];
  }

  delete req.session.user;
  res.redirect('/login');
};


exports.me = function (req, res) {
  //renders here
  var userid = req.cookies.userid;
  if (userid === undefined || online[userid] === undefined) {
    flash(req, res, 'auth', 'Not logged in!');
    res.redirect('/user/login');
  }
  else {
    var user = online[userid];
    console.log('username '+ user.username);
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
    var user = online[userid];
    console.log('username '+ user.username);
    
    var warbs = warbles.getWarblesDB();
    var followers = warbles.getFollowersDB();

    var user = online[userid];
    res.render('my_profile', { title  : 'My Profile',
                          username : user.username,
                          warble : warbs,
                          follower : followers
                        });
      
  
}