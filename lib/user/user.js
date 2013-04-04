//##User.js
//Our main javascipt object class. 
//This class houses the main components of our project:
//The...
//>#1.Users
//>#2.Warbles
//>#3.Followers
//>#4.Following

//#Users:
//User objects house the main components needed for login and authentication
//They contain many fields: 
function User(username, password, uid, warbles, followers){
  this.username = username; //a user's desired username
  this.password = password;//a user's desired password
  this.uid = uid; //an ID number unique to each user.
  this.warbles; //a specific user's warbles
  this.followers; //a specific user's followers
}

//#Warbles:
//Our equivalent of a tweet. Warbles are microblogs that form the building blocks of communicating with other users
function Warble(username, date, message, attachment, atUser){
  //this.wid = wid;         //wid was thought to be needed for specific warble deletion
  this.username = username; //a user's desired username
  this.date = date; //a user's desired password
  this.message = message; //a warble's 140 character message 
  this.attachment = attachment; //eventually will be a file associated with a certain warble. Now however it only holds the file name.
  this.atUser = atUser; //eventually will be a user/s mentioned in a certain warble. Now however it only holds the user's name.
}

//#Follower:
//Followers represent another user that subscribes to another's warbles. Eventually will be a user object however it is only a string now
//These methods deal with setting up the follower/following relationship:
function Follower(followed, follower){ //#1. Follower method alows the user to be followed by another user
	this.followed = followed;
	this.follower = follower;
}

function Following(follower, followed){ //#2. Following method alows the user to be follow another user
	this.follower = follower;
	this.followed = followed;
}

//#addUser() 
//Method allows for adding of a user object to the User Database Array
exports.addUser = function addUser(userData) {
    userData.date = new Date();
    userdb.push(userData);
};


//#addWarble() 
//Method allows for adding of a warble object to the Warble Database Array
exports.addWarble = function addWarble(warbleData) {
    //warbleData.date = new Date();
    warbledb.push(warbleData);
};

//#addFollower() 
//Method allows for adding of a Follower object to the Follower Database Array
exports.addFollower = function addFollower(followerData){
	followerdb.push(followerData);
}

//#addFollowing() 
//Method allows for adding of a Following object to the Following Database Array
exports.addFollowing = function addFollowing(followingData){
	followingdb.push(followingData);
}

//#deleteFollowing() 
//Method allows for adding of a Following object to the Following Database Array
exports.deleteWarble = function deleteWarble(warbleData){
  warbledb.pop(warbleData);
}


var userdb = [ //#Fake Users database. Stored in an Array.
  new User('Eric', 'Smith!', 1, new Array()),
  new User('Xian', 'Chocolate', 2, new Array()),
  new User('Ryan', 'CS326', 3, new Array()),
  new User('Hridya', 'Puppies', 4, new Array()),
  new User('Michelle', 'someuser', 5, new Array())
];

var warbledb = [  //#Fake Warble database. Stored in an Array.
  new Warble ('Xian', '4/3/13 at 2:15pm', 'Another test', 'none', ' '),
  new Warble ('Xian', '4/3/13 at 2:28pm', 'Hello. This is a test', 'none', ' '),
  new Warble ('Eric', '4/3/13 at 4:50pm', 'Immah Here', 'none', 'Xian'),
  new Warble ('Xian', '4/3/13 at 5:06pm', 'Hehe filtering werks', 'none', ' '),
  new Warble ('Ryan', '4/3/13 at 5:30pm', 'Followeeerrrsss!!!!', 'none', 'Xian')

];

var followerdb = [ //#Fake Follower database. Stored in an Array.
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

var followingdb = [ //#Fake Following database. Stored in an Array.
	new Following('Eric', 'Hridya'),
	new Following('Eric', 'Ryan'),
	new Following('Eric', 'Xian'),
	new Following('Hridya', 'Ryan'),
	new Following('Hridya', 'Xian'),
	new Following('Ryan', 'Eric'),
	new Following('Ryan', 'Xian'),
	new Following('Xian', 'Eric'),
	new Following('Xian', 'Hridya'),
];

 // exports.addWarbles = function addWarble(user, warble){
 //    for (var i = userdb.length - 1; i >= 0; i--) {
 //      if(userdb[i].username == warble.author){
 //        userdb[i].warbles.poll(warble);
 //      };
 //    };
 // }

// #getUserInfo()
// Gets the information for all users. This function expects a callback
// to be received with the signature: `function (array)`, where the `array`
// is a populated array of strings containing each user's information.
exports.getUserInfo = function getUserInfo(list, callback) {
  for (var i = 0; i < userdb.length; i++) {
  list.push(userdb[i].username);
  }
    callback(list);
};

// #getWarbleInfo()
// Gets the information for all warbles. This function expects a callback
// to be received with the signature: `function (array)`, where the `array`
// is a populated array of strings containing each user's information.
exports.getWarbleInfo = function getWarbleInfo(list, callback) {
  for (var i = 0; i < warbledb.length; i++) {
  list.push(warbledb[i].message);
  }
    callback(list);
};




 //validateUser()
 // Validates a user. It returns `true` if the user is valid; 
 // `false` otherwise
exports.validateUser = function validateUser(user) {
    return user.username &&
           user.password;
};


exports.userdb = userdb;

exports.get_user = function (user) {
    var c = undefined;
    for (var i = 0; i < userdb.length; i++) {
        if (userdb[i].username === user) {
            c = userdb[i];
            break;
        }
    }
    return c;
};

//#Fetch Database Functions
//database fetcher methods for each object type
exports.getUserdb = function(){
  return userdb;
}

exports.getWarbledb = function(){
  return warbledb;
}

exports.getUsername= function(index){
  return userdb[index].username;
}
exports.getFollowerdb = function(){
	return followerdb;
}

exports.getFollowingdb = function(){
	return followingdb;
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