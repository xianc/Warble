//var user = require('../lib/warbles/warbles.js');
// User object
function Warble(author, date, time, message){
    this.author = author;
    this.date = date;
    this.time = time;
    this.message = message;
}

var warblesdb = [
  new Warble('Eric', '3/25/13', '12:30', 'This is a test Warble'),
  new Warble('Xian', '3/19/13', '5:45', 'I love Chocolate')
];

exports.addUser = function addUser(userData) {
    userData.date = new Date();
    userdb.push(userData);
    userdb.sort(function (u1, u2) {
  return u1.username < u2.username;
    });
};

function User(username, password, uid, warbles){
  this.username = username;
  this.password = password;
  this.uid = uid;
  this.warbles;
  for (var i = warblesdb.length - 1; i >= 0; i--) {
    if(warblesdb[i].author == username){
      warbles.push(warblesdb[i]);
    }; 
  }
}

//Follower object
function Follower(username){
  this.username = username;
}

//Following object
function Following(username){
  this.username = username;
}

// Fake User database
var userdb = [
  new User('Eric', 'Smith!', 1, new Array()),
  new User('Xian', 'Chocolate', 2, new Array()),
  new User('Ryan', 'CS326', 3, new Array()),
  new User('Hridya', 'Puppies', 4, new Array())
];


//Fake follower database
var followerdb = [
  new Follower('Christine'),
  new Follower('Kim'),
  new Follower('Julie')
];

//Fake follwing database
var followingdb = [
  new Follower('Grace'),
  new Follower('Tom'),
  new Follower('Zack'),
  new Follower('Dan')
];

exports.addUser = function addUser(userData) {
    userData.date = new Date();
    userdb.push(userData);
    userdb.sort(function (u1, u2) {
  return u1.username < u2.username;
    });
};


 // exports.addWarbles = function addWarble(user, warble){
 //    for (var i = userdb.length - 1; i >= 0; i--) {
 //      if(userdb[i].username == warble.author){
 //        userdb[i].warbles.poll(warble);
 //      };
 //    };
 // }

// ### *function*: getUserInfo
/**
 * Gets the information for all users. This function expects a callback
 * to be received with the signature: `function (array)`, where the `array`
 * is a populated array of strings containing each user's information.
 * @param {array} list An empty list
 * @param {callback} callback function to receive the populated array
 */
exports.getUserInfo = function getUserInfo(list, callback) {
  for (var i = 0; i < userdb.length; i++) {
  list.push(userdb[i].username);
  }
    callback(list);
};



// ### *function*: validateUser
/**
 * Validates a user. It returns `true` if the user is **valid**; 
 *   `false` otherwise
 * @param {object} user A user object
 */
exports.validateUser = function validateUser(user) {
    return user.username &&
           user.password;
};

/*exports.tolist = function () {
    var content = '<h3>Users</h3>';
    content += '<ul>';
    for (var i = 0; i < userdb.length; i++) {
        var c = userdb[i];
        content += '<li>' + c.name + '</li>';
    }
    content += '</ul>';    
    return content;
};*/


exports.getUserdb = function(){
  return userdb;
}
// User Lookup function
exports.lookup = function(username, password, cb) {
  var len = userdb.length;
  for (var i = 0; i < len; i++) {
    var u = userdb[i];
    if (u.username === username) {
      if (u.password === password) {
        cb(undefined, u);
      }
      else {
        cb('password is not correct');
      }
      return;
    }
  }
  cb('user not found');
};