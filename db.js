var sqlite3 = require('sqlite3');
var async   = require('async');

// Connect to the database:
var db = new sqlite3.Database('warbles.db');

async.series([
  function (cb) {
    // A simple query:
    console.log('users:');
    db.all('select * from users', function (err, rows) {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        console.log('  username: ' + row['username'] + ', password: ' + row['password']);
      }
      cb(null);
    });
  },

  /*function (cb) {
    // example of renaming
    console.log('Renaming:');
    db.all ('select sname as name, age as x from sailors where age>21', function (err, rows) {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        console.log('  name: ' + row['name'] + ', age: ' + row['x']);
      }
      cb(null);
    });
  },

  function (cb) {
    // Aggregation
    console.log('Average Age:');
    db.all ('select avg(s.age) as ageavg from sailors s where s.rating=10', function (err, rows) {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        console.log('  Average Age: ' + row['ageavg']);
      }
      cb(null);
    });
  },

  function (cb) {
    // Aggregation
    console.log('Maximum Age:');
    db.all ('select max(s.age) as maxage from sailors s where s.rating=10', function (err, rows) {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        console.log('  Maximum Age: ' + row['maxage']);
      }
      cb(null);
    });
  },

  function (cb) {
    // Aggregation
    console.log('Count:');
    db.all ('select count(*) as cnt from sailors s where s.rating>5', function (err, rows) {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        console.log('  Sailor Count: ' + row['cnt']);
      }
      cb(null);
    });
  },

  function (cb) {
    // Grouping
    console.log('Grouping:');
    db.all ('select s.rating, min(s.age) as minage from sailors s group by s.rating', function (err, rows) {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        console.log('  Rating: ' + row['rating'] + ', Min Age: ' + row['minage']);
      }
      cb(null);
    });
  },
*/
  function (cb) {
    // Disconnect from the database:
    db.close();
  }
]);
