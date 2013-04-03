// # Warbles
// ## In Memory Warble Database
// We will use an array to store members

var warbles = [];

// ## Exported Functions
function Warble(author, date, time, message){
    this.author = author;
    this.date = date;
    this.time = time;
    this.message = message;
}

var userdb = [
  new Warble('Eric', '3/25/13', '12:30', 'This is a test Warble'),
  new Warble('Xian', '3/19/13', '5:45', 'I love Chocolate')
];

// ### *function*: addWarbles
/**
 * Adds a warbles to database
 */
exports.addWarble = function addWarble(userData) {
    userData.date = new Date();
    userdb.push(userData);
    userdb.sort(function (u1, u2) {
  return u1.username < u2.username;
    });
}

// Export the `addWarble` function.
exports.addWarbles = addWarbles;

// ### *function*: getWarbleInfo
/**
 * Gets all warbles of a user. This function 
 */
function getWarbleInfo(list, callback) {
    var len = warbles.length;
    for (var i = 0; i < len; i++) {
	var u = warbles[i];
	list.push(u.fname + ' ' + u.lname);
    }
    callback(list);
}

// Export the `getWarbleInfo` function.
exports.getWarblesInfo = getWarblesInfo;


// ### *function*: validateWarble
function validateWarble(warble) {
    return warbles.update 
}

// Export the `validateWarble` function.
exports.validateWarble = validateWarble;


//Deletes a warble and everything associated with it
Deletes a warble
function deleteWarble(warbleData){
    var removeItem = warbleData;
    var i;
    for(i = 0; i < warbles.length; i++){
        if(warbles[i] == removeItem){
            warbles.splice(i,1);
        }
    }
}

exports.deleteWarble = deleteWarble;
