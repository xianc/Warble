var sqlite3   = require('sqlite3'),
    async     = require('async'),
    Sequelize = require('sequelize');

var db = new sqlite3.Database('./data/warbles.db');

var sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  logging: false,
  storage: './data/warbles.db'
});


var User = sequelize.define('User',{
  username : Sequelize.STRING,
  password : Sequelize.STRING,
  birthday : Sequelize.STRING
},{
  instanceMethods:{
    getUsername: function() {
      return this.username;
    },
    getPassword: function(){
      return this.password;
    },
    getBirthday: function(){
      return this.birthday;
    }
  }
});

var Warble = sequelize.define('Warble',{
  username   : Sequelize.STRING,
  day        : Sequelize.STRING,
  message    : Sequelize.STRING,
  attachment : Sequelize.STRING,
  warbleAt    : Sequelize.STRING,
},{
  instanceMethods: {
    getUsername: function() {
      return this.username;
    },
    getDay: function() {
      return this.day;
    },
    getMessage: function() {
      return this.message;
    },
    getAttachment: function() {
      return this.attachment;
    },
    getWarbleAt: function() {
      return this.warbleAt;
    }
  }
});

var Follower = sequelize.define('Follower',{
  follow : Sequelize.STRING,
  following : Sequelize.STRING
},{
  instanceMethods:{
    getFollow: function() {
      return this.follow;
    },
    getFollowing: function(){
      return this.following;
    }
  }
});


Warble.hasMany(User);
Follower.hasMany(User);

sequelize.sync();

exports.makeUser = function (username, password, birthday) {
  User.create({
    username : username,
    password : password,
    birthday : birthday
  }).success(cb);
};

exports.makeWarble = function (username, day, message, attachment, warbleAt) {
  Warble.create({
    day        : day,
    message    : message,
    attachment : attachment,
  }).success(function (warble) {
    warble.setUsername(username);
    warble.setWarbleAt(warbleAt);
    cb(warble);
  });
};

exports.makeFollower = function (follow, following) {
  Follower.create({
    }).success(function (follow) {
      follow.setFollow(follow);
      follow.setFollowing(following);
      cb(follow);
    });
};


// User Lookup function
exports.lookup = function(username, password, cb) {
  db.all('select * from users', function (err, user_table) {
    for (var i = 0; i < user_table.length; i++) {
      if (user_table[i].username === username) {
        if (user_table[i].password === password) 
          cb(undefined, user_table[i]);
        else { cb('password is not correct'); }
        return;
      }
    }
  cb('user not found');
  });
  /*console.log('Looking at database');
  for (var i = 0; i< User.length; i++){
    if (User[i].getUsername() === username) {
        console.log('username to find: ' + User[i].username);
        if (User[i].getPassword() === password) { 
          cb(undefined, User[i]); 
          break; 
        }
        else { 
          cb('password is not correct'); 
        }
      }
  }
  //cb('user not found');*/
};

/*exports.getUsers = function (cb) {
  db.all('select * from warbles', cb);
};*/
exports.getUser = function (props, errorcb, succcb) {
  var findUser = User.find({ where : props });
  findUser.success(succcb);
  findUser.error(errorcb);
};


exports.getWarbles = function (cb) {
  db.all('select * from warbles', cb);
};

exports.getAllUsers = function () {
  var allUser = [];
  db.all('select * from users', function (err, user) {
    for (var i = 0; i < user.length; i++) {
        allUser.push(user[i]);
    }
    });
  return allUser;
};


exports.getFollowers = function (cb) {
  db.all('select * from followers', cb);
};
exports.getAllFollowers = function () {
  var allFollowers = [];
  db.all('select * from users', function (err, follow) {
    for (var i = 0; i < follow.length; i++) {
        allFollowers.push(follow[i]);
    }
    });
  return allFollowers;
};

exports.User = User;
exports.Warble = Warble;
exports.Follow = Follower;