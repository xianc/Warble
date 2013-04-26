
/*
 * GET users listing.
 */

var user = require('../lib/user');
var warbles = require('../lib/warbles.js');
var formidable = require('formidable');
var userids = 0;
var online = {};


exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.warbles_list = function (req, res) {
  warbles.getUsers(function (err, ss) {
    if (err) {
      res.send('problem access data layer!');
    }
    else {
      res.render('warbles_list', { title : 'Warbles List',
                                   users : ss });
    }
  });
};