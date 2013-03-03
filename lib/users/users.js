// # Users Module
// This is a module for accessing user data. We are using
// [Docker](https://github.com/jbt/docker), a documentation generation
// library, that will convert the inline documentation in [Markdown
// format](http://daringfireball.net/projects/markdown/syntax) into
// HTML that can be used to display documentation alongside the source
// code. You will use this to document your projects.

// ## In Memory User Database
// We will use a simple array `users` to record user data.
// We could easily replace this with calls to a *database layer*
var users = [];

// ## Exported Functions

// ### *function*: addUser
/**
 * Adds a user to the "database". The `userData` is an object with
 * the following properties:
 *
 * - `fname` The user's first name
 * - `lname` The user's last name
 * - `pass` The user's password
 * - `sex` The user's gender (male|female)
 *
 * @param {object} userData The user data
 */
function addUser(userData) {
    userData.date = new Date();
    users.push(userData);
    users.sort(function (u1, u2) {
	return u1.lname < u2.lname;
    });
}

// Export the `addUser` function.
exports.addUser = addUser;

// ### *function*: getUserInfo
/**
 * Gets the information for all users. This function expects a callback
 * to be received with the signature: `function (array)`, where the `array`
 * is a populated array of strings containing each user's information.
 * @param {array} list An empty list
 * @param {callback} callback function to receive the populated array
 */
function getUserInfo(list, callback) {
    var len = users.length;
    for (var i = 0; i < len; i++) {
	var u = users[i];
	list.push(u.fname + ' ' + u.lname);
    }
    callback(list);
}

// Export the `getUserInfo` function.
exports.getUserInfo = getUserInfo;


// ### *function*: validateUser
/**
 * Validates a user. It returns `true` if the user is **valid**; 
 *   `false` otherwise
 * @param {object} user A user object
 */
function validateUser(user) {
    return user.fname &&
	   user.lname &&
	   user.pass;
}

// Export the `validateUser` function.
exports.validateUser = validateUser;
