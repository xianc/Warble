
//Require the inclusion of sqlite3 database and other libraries
var sqlite3   = require('sqlite3'),
    async     = require('async'),
    Sequelize = require('sequelize');

//Path to the .db file being used to render all the Warble pages
var db = new sqlite3.Database('./data/warbles.db');

//Sequelizing the information 
var sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  logging: false,
  storage: './data/warbles.db'
});


//User info and its instance methods
var User = sequelize.define('User',{
  username : Sequelize.STRING,
  password : Sequelize.STRING,
  birthday : Sequelize.STRING
},{
  instanceMethods:{
    //Username of the user
    getUsername: function() {
      return this.username;
    },
    //Password of the user
    getPassword: function(){
      return this.password;
    },
    //Birthday of the user
    getBirthday: function(){
      return this.birthday;
    }
  }
});

//Warble info and its instance methods
var Warble = sequelize.define('Warble',{
  username   : Sequelize.STRING,
  day        : Sequelize.STRING,
  message    : Sequelize.STRING,
  attachment : Sequelize.STRING,
  warbleAt    : Sequelize.STRING,
},{
  instanceMethods: {
    //Username of the person who made the warble
    getUsername: function() {
      return this.username;
    },
    //Day and time the warble was made at
    getDay: function() {
      return this.day;
    },
    //The message in the warble
    getMessage: function() {
      return this.message;
    },
    //The attached files to the warble
    getAttachment: function() {
      return this.attachment;
    },
    //Who the warble is directed to
    getWarbleAt: function() {
      return this.warbleAt;
    }
  }
});

//Follower and following info and its instance methods
var Follower = sequelize.define('Follower',{
  follower : Sequelize.STRING,
  following : Sequelize.STRING
},{
  instanceMethods:{
    //Followers infor
    getFollow: function() {
      return this.follow;
    },
    //Following info
    getFollowing: function(){
      return this.following;
    }
  }
});


//Gallery info and its instance methods
var Gallery = sequelize.define('Gallery',{
  image : Sequelize.STRING,
  day : Sequelize.STRING
},{
  instanceMethods:{
    getImage: function() {
      return this.image;
    },
    getDay: function(){
      return this.day;
    }
  }
});


Warble.hasMany(User);
Follower.hasMany(User);
sequelize.sync();

//Method to create a new user
exports.makeUser = function (username, password, birthday) {
  User.create({
    username : username,
    password : password,
    birthday : birthday
  }).success(cb);
};

//Method to create a new warble. Its called from post on the main page
exports.makeWarble = function (username, day, message, attachment, warbleAt, cb) {
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

//Method to add a new warble to the database
exports.addWarble = function (username, day, message, attachment, warbleAt, cb) {
  db.run('insert into warbles values (?,?,?,?,?)', 
    [username, day, message, attachment, warbleAt],
    cb(true));
};


//Method to add a new user and inserts the new user into the users
//tables in warbles.db
exports.addUser = function (username, password, birthday, cb) {
  db.run('insert into users values (NULL,?,?,?)', 
    [username, password, birthday],
    cb(true));
};

//Method to add a gallery. This method is not implemented because a gallery has not yet been set up
exports.addGallery = function (image, day, cb) {
  db.run('insert into warbles values (?,?)', 
    [image, day],
    cb(true));
};

//Following new people and adds it to the database
exports.addToFollow = function (follow, following, cb) {
  db.run('insert into followers values (?,?)', 
    [follow, following],
    cb(true));
};

//Creating a new follower and adds it to warbles.db
exports.makeFollower = function (follow, following) {
  Follower.create({
    }).success(function (follow) {
      follow.setFollow(follow);
      follow.setFollowing(following);
      cb(follow);
    });
};


//Find a user and return it
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

//returns user information
exports.getUserInfo = function (list, callback) {
  db.all('select * from users', function (err, userdb) {
    for (var i = 0; i < userdb.length; i++) {
    list.push(userdb[i].username);
    }
      callback(list);
    });
};

//###user Lookup function for validation during sign in
//####checks the username and password to make sure they are correct
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
};

//###validates user for sign up
//####checks to see if the username entered during sign up is already 
//taken. If it already has, we throw back an error. 
exports.validateUser = function(user, cb) {
  db.all('select * from users', function (err, userdb) {
    var found=false;
    for (var i = 0; i < userdb.length; i++) {
      if (userdb[i].username === user.username) {
        console.log('one: '+ userdb[i].username + ' two :' + user.username)
        found=true;  
        cb('err');
      }
    }
    cb(undefined, true);
    });
  };


//finds and gets a user
exports.getUser = function (props, errorcb, succcb) {
  var findUser = User.find({ where : props });
  findUser.success(succcb);
  findUser.error(errorcb);
};


//gets and array of all the users from the database
exports.getUsers = function (cb) {
  db.all('select * from users', cb);
};

//gets and array of all the warbles from the database
exports.getWarbles = function (cb) {
  db.all('select * from warbles', cb);
};

//gets and array of all the images from gallery
exports.getGallery = function (cb) {
  db.all('select * from gallery', cb);
};

//returns and array of all the followers from the database
exports.getFollowers = function (cb) {
  db.all('select * from followers', cb);
};


exports.User = User;
exports.Warble = Warble;
exports.Follow = Follower;