function User(username, password, uid, warbles, followers){
  this.username = username;
  this.password = password;
  this.uid = uid;
  this.warbles;
  this.followers;
}

function Warble(username, date, message, attachment, atUser){
  this.username = username;
  this.date = date;
  this.message = message;
  this.attachment = attachment;
  this.atUser = atUser;
}

function Follower(followed, follower){
	this.followed = followed;
	this.follower = follower;
}

exports.addUser = function addUser(userData) {
    userData.date = new Date();
    userdb.push(userData);
};

exports.addWarble = function addWarble(warbleData){
  warbleData.date = new Date();
  warbledb.push(warbleData);
}

exports.addFollower = function addFollower(followerData){
	followerdb.push(followerData);
}

exports.deleteWarble = function deleteWarble(warbleData){
  warbleData.date = new Date();
  warbledb.pop(warbleData);
}


/*//Follower object
function Follower(username){
  this.username = username;
}

//Following object
function Following(username){
  this.username = username;
}*/

// Fake User database
var userdb = [
  new User('Eric', 'Smith!', 1, new Array()),
  new User('Xian', 'Chocolate', 2, new Array()),
  new User('Ryan', 'CS326', 3, new Array()),
  new User('Hridya', 'Puppies', 4, new Array()),
  new User('Michelle', 'someuser', 5, new Array())
];

var warbledb = [
  new Warble ('Xian', '4/3/13 at 2:15pm', 'Another test', 'none', 'Eric'),
  new Warble ('Xian', '4/3/13 at 2:28pm', 'Hello. This is a test', 'none', ' '),
  new Warble ('Eric', '4/3/13 at 4:50pm', 'Immah Here', 'none', 'Xian'),
  new Warble ('Xian', '4/3/13 at 5:06pm', 'Hehe filtering werks', 'none', ' '),
];

var followerdb = [
	new Follower('Eric', 'Christine'),
	new Follower('Eric', 'Ryan'),
	new Follower('Eric', 'Xian'),
	new Follower('Eric', 'Kim'),
	new Follower('Hridya', 'Tom'),
	new Follower('Hridya', 'Eric'),
	new Follower('Hridya', 'Grace'),
	new Follower('Hridya', 'Xian'),
	new Follower('Ryan', 'Dan'),
	new Follower('Ryan', 'Eric'),
	new Follower('Ryan', 'Hridya'),
	new Follower('Ryan', 'Kim'),
	new Follower('Xian', 'Eric'),
	new Follower('Xian', 'Hridya'),
	new Follower('Xian', 'Ryan'),
	new Follower('Xian', 'Tom'),
];


// //Fake follower database
// var followerdb = [
//   new Follower('Christine'),
//   new Follower('Kim'),
//   new Follower('Julie')
// ];

// //Fake follwing database
// var followingdb = [
//   new Following('Grace'),
//   new Following('Tom'),
//   new Following('Zack'),
//   new Following('Dan')
//   new Follower('Grace'),
//   new Follower('Tom'),
//   new Follower('Zack'),
//   new Follower('Dan')
// ];



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

exports.getUserdb = function(){
  return userdb;
}

exports.getWarbledb = function(){
  return warbledb;
}

exports.getFollowerdb = function(){
	return followerdb;
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