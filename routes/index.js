
/*
 * GET home page.
 */

var users = require('../lib/users');

// Renders the index view:
exports.index = function (req, res){
  res.render('index', { title: 'Warble' })
};

// Renders the front page:
exports.pages = function (req, res) {
  var id = req.params.id;
  res.render('pages/'+id,
             { layout: 'pages/layout',
               title: 'pages - ' + id,
               id: id });
};

// Renders the form examples:
exports.form = function (req, res) {
  var id = req.params.id;
  genUserList(function (ul) {
    res.render('form/' + id,
               { title: 'form - ' + id,
                 id: id,
                 msg: '',
                 users: ul });
  });
};

// Processes form get requests:
exports.process = function (req, res) {
  var id   = req.params.id;
  var user = userData(req);

  if (users.validateUser(user)) {
    users.addUser(user);
    genUserList(function (ul) {
      res.render('form/' + id,
                 { title: 'form - ' + id,
                   id: id,
                   msg: 'Success!',
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
      res.render('form/' + id,
                 { title: 'form - ' + id,
                   id: id,
                   msg: m,
                   users: ul });
    });
  }
};

function userData(req) {
  var user;
  if (req.method === 'GET') {
    user = {
      fname: req.query.fname,
      lname: req.query.lname,
      pass : req.query.pass,
      sex  : req.query.sex,
      newu : req.query.newu,
    };
  }
  else {
    user = {
      fname: req.body.fname,
      lname: req.body.lname,
      pass : req.body.pass,
      sex  : req.body.sex,
      newu : req.body.newu,
    };
  }
  
  return user;
}

function genUserList(callback) {
  var i;
  users.getUserInfo([], function (list) {
    var u = '<ul>';
    for (i = 0; i < list.length; i++ ) {
      var userInfo = list[i];
      u += '<li>' + userInfo + '</li>';
    }
    u += '</ul>';
    callback(u);
  });
}
