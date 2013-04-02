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