
/*
 * GET home page.
 */

var users = require('../lib/users');

/**##Renders the Login/Home Page: index.ejs
*The Home Page is a simple login portal for users. It serves two purposes: 
*1. Allow members who have already signed up to log on
*2. Allow people who want to sign up to create an account.
*
*The index.ejs file includes header.ejs and footer.ejs which includes starting tages for the file (html, head, body etc.) and closing tags. 
*
*As of now, the sign in button will redirect to pages/front
**/

exports.index = function (req, res){
  res.render('index', { title: 'Warble' })
};

/* ##Renders the user specific pages:
> All pages are linked to header.ejs and footer.ejs which includes starting tages for the file (html, head, body etc.) and closing tags. 

###1. Front Page: pages/front.ejs
Displays and allows users to create status updates aka "warbles" and to upload files

###2. Discover: pages/discover.ejs
Displays search results. Users can search people or warbles. 

###3. Profile: pages/profile.ejs
Shows users their information and their warbles

###4. At Me: pages/at_me.ejs
Displays all messages and references to a specific user

###5. About: pages/about.ejs
An introdction to the web application project. 
 */

exports.pages = function (req, res) {
  var id = req.params.id;
  res.render('pages/'+id,
             { layout: 'pages/layout',
               title: 'pages - ' + id,
               id: id });
};

/*## Renders the forget password ans sign_up pages:
###1. Forget Password: pages/forget_password.ejs
A form that asks a user for their username/email. 

###2. Sign Up: pages/sign_up.ejs
A form that asks a user for information in order to create an account.

*/
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

//###Processes form get requests:
exports.process = function (req, res) {
  var id   = req.params.id;
  var user = userData(req);

  if (users.validateUser(user)) {
    users.addUser(user);
    genUserList(function (ul) {
      res.render('form/' + id,
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
      email: req.query.email,
      pass : req.query.pass,
      newu : req.query.newu,
 /*     sex  : req.query.sex,
      month : req.query.month,
      day : req.query.day,
      year : req.query.year,*/
    };
  }
  else {
    user = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      pass : req.body.pass,
  /*    sex  : req.body.sex,
      month: req.body.month,
      day  : req.body.day,
      year : req.body.year,*/
    };
  }
  
  return user;
}

//###Displays Users
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
