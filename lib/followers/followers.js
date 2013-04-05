// # Users Module
// This is a module for accessing follower data.

// ## In Memory User Database
// We will use an array to store followers 

// who is following a user

//Follower object
function Follower(username){
  this.username = username;
}

//Following object
function Following(username){
  this.username = username;
}

var followers = [
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
	new Follower('Tim', 'Ryan'),
    new Follower('Tim', 'Hridya'),
];

// who a user is following
var following = [
	new Following('Eric', 'Hridya'),
	new Following('Eric', 'Ryan'),
	new Following('Eric', 'Xian'),
	new Following('Hridya', 'Ryan'),
	new Following('Hridya', 'Xian'),
	new Following('Ryan', 'Eric'),
	new Following('Ryan', 'Xian'),
	new Following('Xian', 'Eric'),
	new Following('Xian', 'Hridya'),
	new Following('Tim', 'Ryan'),
    new Following('Tim', 'Hridya'),
];

/**
 * Adds a follower to the "database". The `followerData` is an object with
 * the following properties:
 *
 * - `followed` The username of the person being followed
 * - `follower` The username of the person following the followed
 * @param {object} followerData The follower data
 */

function addFollower(followerData){
	followerData.date = new Date();
	followers.push(followerData);
	followers.sort(function(u1, u2) {
	return u1.followed < u2.followed;
	});
}

// Export the `addFollower` function.
exports.addFollower = addFollower;

// ### *function*: getFollowerInfo
/**
 * Gets all users following a user 
 */
function getFollowerInfo(username, callback) {
    var len = followers.length;
    for (var i = 0; i < len; i++) {
		var u = followers[i];
		if(u.followed = username){
			list.push(u.follower);
		}
    }
    callback(list);
}

// Export the `getFollowerInfo` function.
exports.getFollowerInfo = getFollowerInfo(username);


// ### *function*: validateWarble
function validateFollower(follower) {
    return followers.update 
}

// Export the `validateWarble` function.
exports.validateFollower = validateFollower;

/**
 * Adds a following to the "database". The `followingData` is an object with
 * the following properties:
 *
 * - `follower` The username of the person followig someone
 * - `followed` The username of the person being followed
 * @param {object} followerData The follower data
 */

function addFollowing(followingData){
	followingData.date = new Date();
	following.push(followerData);
	following.sort(function(u1, u2) {
	return u1.follower < u2.follower;
	});
}

// Export the `addFollowing` function.
exports.addFollowing = addFollowing;

// ### *function*: getFollowingInfo
/**
 * Gets all users a user if following 
 */
function getFollowingInfo(list, callback) {
    var len = following.length;
    for (var i = 0; i < len; i++) {
	var u = following[i];
	list.push(u.following);
    }
    callback(list);
}

// Export the `getFollowingInfo` function.
exports.getFollowingInfo = getFollowingInfo;


// ### *function*: validateWarble
function validateFollowing(followed) {
    return following.update 
}

// Export the `validateWarble` function.
exports.validateFollowing = validateFollowing;



//use this?
/**
 * Adds a user's follower to the "database". The `followerData` is an object with
 * the following properties:
 *
 * - `followUname` The follower's user name
 * - `link` The link to the user's profile
 *
 * @param {object} folowerData 
 */
