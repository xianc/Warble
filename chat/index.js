// Chat Module

// Records all the posts made to the server:
var posts = [];

// Represents a post:
function Post(text) {
	this.text = text;
	this.date = new Date();
}

// The post function will handle incoming posts and store them
// into the posts array. The client is expected to send a post
// request containing a single object: { text : <value> }.
exports.post = function (req, res) {
	if (req.method === 'POST') {
	var text = req.body.text;
	console.log('received post: ' + text);
	posts.push(new Post(text));
	res.json({ status: 'OK'});
	}
};

// The check function is used to check how many new posts are
// available given the last post the client has. The client is
// expected to send a post request with a JSON body containing
// a single object: { last : <value> }.
exports.check = function (req, res) {
	var last = parseInt(req.body.last, 10);
	var rest = posts.slice(last, posts.length);
	res.json(rest);
};