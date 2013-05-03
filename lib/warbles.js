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
  follower : Sequelize.STRING,
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

exports.makeUser = function (username, password, birthday) {
  User.create({
    username : username,
    password : password,
    birthday : birthday
  }).success(cb);
};

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

exports.addWarble = function (username, day, message, attachment, warbleAt, cb) {
  db.run('insert into warbles values (?,?,?,?,?)', 
    [username, day, message, attachment, warbleAt],
    cb(true));
};


exports.addUser = function (username, password, birthday, cb) {
  db.run('insert into users values (NULL,?,?,?)', 
    [username, password, birthday],
    cb(true));
};

exports.addGallery = function (image, day, cb) {
  db.run('insert into warbles values (?,?)', 
    [image, day],
    cb(true));
};

exports.makeFollower = function (follow, following) {
  Follower.create({
    }).success(function (follow) {
      follow.setFollow(follow);
      follow.setFollowing(following);
      cb(follow);
    });
};

/*exports.validateUser = function validateUser(user) {
  db.all('select * from users', function (err, userdb) {
    var found=false;
    for (var i = 0; i < userdb.length; i++) {
      if (userdb[i].username === user.username) {
        found=true;  
      }
    }
    if (user.username && user.password && found==false) { return true }
      else if (found==true){ return false }
    });
  };*/




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

 exports.getUserInfo = function getUserInfo(list, callback) {
  db.all('select * from users', function (err, userdb) {
    for (var i = 0; i < userdb.length; i++) {
    list.push(userdb[i].username);
    }
      callback(list);
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
};

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
    //if (user.username && user.password && found==false) { cb(undefined, true) }
    cb(undefined, true);
    });
  };

/*exports.getUsers = function (cb) {
  db.all('select * from warbles', cb);
};*/
exports.getUser = function (props, errorcb, succcb) {
  var findUser = User.find({ where : props });
  findUser.success(succcb);
  findUser.error(errorcb);
};



exports.getUsers = function (cb) {
  db.all('select * from users', cb);
};

exports.getWarbles = function (cb) {
  db.all('select * from warbles', cb);
};

exports.getGallery = function (cb) {
  db.all('select * from gallery', cb);
};

exports.getFollowers = function (cb) {
  db.all('select * from followers', cb);
};


exports.User = User;
exports.Warble = Warble;
exports.Follow = Follower;