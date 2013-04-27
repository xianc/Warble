var sqlite3 = require('sqlite3');

// Connect to the database:
var db = new sqlite3.Database('./data/warbles.db');
// Warbles data access layer.


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


exports.addWarble = function () {
  // Example of how to use sqlite3 module:
  // db.run("insert into Warbles values (NULL, ?, ?, ?)", ['hazel', 15, 4.2], cb);
};

exports.addBoat = function () {
  // Example of how to use sqlite3 module:
  // db.run("insert into boats values (NULL, ?, ?)", ['perl', 'green'], cb);
};

exports.addReservation = function () {
  // Tricky - need ids from Warbles and boats...
  // Example of how to use sqlite3 module:
  // db.get("select * from Warbles where sname=?", ['hazel'], function (err, row) {
  //   if (err) {
  //     cb(err);
  //   }
  //   else {
  //     var sid = row['sid'];
  //     db.get("select * from boats where bname=?", ['perl'], function (err, row) {
  //       if (err) {
  //         cb(err);
  //       }
  //       else {
  //         var bid = row['bid'];
  //         db.run("insert into reserves values (?, ?, ?)",
  //           [sid, bid, day],
  //           cb);
  //       }
  //     });
  //   }
  // });
};

exports.getWarbles = function (cb) {
  db.all('select * from warbles', cb);
};

exports.getUsers = function (cb) {
  db.all('select * from users', cb);
};

exports.getBoat = function () {

};

exports.getBoats = function () {

};

exports.getReservation = function () {

};

exports.getReservations = function () {

};