// # Warbles
// ## In Memory Warble Database
// We will use an array to store members

var warbles = [];

// ## Exported Functions

// ### *function*: addWarbles
/**
 * Adds a warbles to database
 */
function addWarbles(warbleData) {
    warbleData.date = new Date();
    warbles.push(warbleData);
    warbles.sort(function (u1, u2) {
	return u1.lname < u2.lname;
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
function deleteWarble(warble){
    var removeItem = warble;
    var i;
    for(i = 0; i < warbles.length; i++){
        if(warbles[i] == removeItem){
            warbles.splice(i,1);
        }
    }
}

exports.deleteWarble = deleteWarble;
