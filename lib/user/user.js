// User object
function User(username, password, uid){
	this.username = username;
  this.password = password;
	this.uid = uid;
}

// Fake User database
var userdb = [
  new User('Eric', 'Smith!', 1),
  new User('Xian', 'Chocolate', 2),
  new User('Ryan', 'CS326', 3),
  new User('Hridya', 'Puppies', 4)
];

exports.addUser = function addUser(userData) {
    userData.date = new Date();
    userdb.push(userData);
    userdb.sort(function (u1, u2) {
  return u1.username < u2.username;
    });
};

// ### *function*: getUserInfo
/**
 * Gets the information for all users. This function expects a callback
 * to be received with the signature: `function (array)`, where the `array`
 * is a populated array of strings containing each user's information.
 * @param {array} list An empty list
 * @param {callback} callback function to receive the populated array
 */
exports.getUserInfo = function getUserInfo(list, callback) {
    var len = userdb.length;
    for (var i = 0; i < len; i++) {
  var u = userdb[i];
  list.push(u.username);
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

exports.tolist = function () {
    var content = '<h3>Users</h3>';
    content += '<ul>';
    for (var i = 0; i < userdb.length; i++) {
        var c = userdb[i];
        content += '<li>' + c.name + '</li>';
    }
    content += '</ul>';    
    return content;
};

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