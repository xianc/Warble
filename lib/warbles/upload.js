
// An example using 'formidable' to handle form data.
var http = require('http');
var url  = require('url');
var formidable = require('formidable');

function start(route, routes) {
    function onRequest(req, res) {
        var pathname = url.parse(req.url).pathname;
        console.log('Request for ' + pathname + ' received.');
        // ADDITION: pass response instead of parsing form data
        route(routes, pathname, res, req);
    }

    http.createServer(onRequest).listen(3000)
    console.log('Web server up on port 3000');
}

// ADDITION: replaced postData with request
function route(routes, pathname, response, request) {
    console.log('About to route a request for ' + pathname);
    if (typeof routes[pathname] === 'function') {
        // ADDITION: replace postData parameter with request
        routes[pathname](response, request);
    // ADDITION: added check for img request
    } else if (pathname.substring(1,5) === 'show') {
        var imgname = pathname.substring(6,pathname.length);
        routes['/show'](response, request, imgname);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 Not Found');
        response.end();
    }
}

var querystring = require('querystring'),
    fs = require('fs');

// ADDITION: replaced postData parameter with request
function root(response, request) {
    console.log('Request handler for "root" was called.');
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello Root');
    response.end();
}

// ADDITION: replaced postData parameter with request
function begin(response, request) {
    console.log('Request handler for "begin" was called.');
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html"/>' +
        '</head>' +
        '<body>' +
        // ADDITION: added enctype
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        // ADDITION: replaced textarea with file upload input
        '<input type="file" name="upload"/><br/>' +
        '<input type="submit" value="Warble"/>' +
        '</form>' +
        '</body>' +
        '</html>';
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}

// ADDITION: replaced postData parameter with request
function upload(response, request) {
    console.log('Request handler for "upload" was called.');

    // ADDITION: added form handling code
    var form = new formidable.IncomingForm();
    form.uploadDir = 'upload';
    console.log('about to parse.');
    if (request.method === 'POST') {
      form.parse(request, function (error, fields, files) {
          console.log('parsing done.');        
          fs.rename(files.upload.path, 
                    'upload/' + files.upload.name,
                    function (err) {
                        if (err) {
                            response.writeHead(500, {'Content-Type': 'text/html'});
                            response.write('Failed to upload image!');
                            response.end();
                        } else {
                            response.writeHead(200, {'Content-Type': 'text/html'});
                            response.write('Received image:<br/>');
                            response.write('<img width="400px" src="show/' +
                                          files.upload.name + '" />'); +
                            response.end();
                        }
                    });
      });
    }
    else {
      // ADDITION: Send HTTP redirect to /begin URL:
      response.writeHead(301, {'Location': '/begin'});      
      response.end();
    }
}

// ADDITION: added imgname parameter and directory listing.
function show(response, request, imgname) {
    console.log('Request handler "show" was called.');

    if (imgname !== '' && imgname !== undefined) {      
      console.log('About to read image file "' + imgname + '"');
      // ADDITION: read file from upload directory
      fs.readFile('upload/'+imgname, 'binary', function (error, file) {
          if (error) {
              response.writeHead(500, {'Content-Type': 'text/html'});
              response.write('<p><strong>Image ' + imgname + ' not found!</strong></p>');
              response.end();
          } else {
              response.writeHead(200, {'Content-Type': 'image/jpeg'});
              response.write(file, 'binary');
              response.end();
          }
      });
    }
    else {
      // ADDITION: Reads a directory and returns an HTML listing of
      // links to the uploaded images.
      fs.readdir('upload', function (error, files) {
        var res = '<h2>Uploaded Image Files</h2>';
        if (files.length === 0) {
          res += '<p>No image files have been uploaded</p>';
        }
        else {
          res += '<ul>';
          for (var i = 0; i < files.length; i++) {
            res += '<li>'
            res += '<a href="show/' + files[i] + '">'
            res += files[i];
            res += '</a>'
            res += '</li>'
          }
          res += '</ul>'
        }
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(res);
        response.end();
      });
    }
}

// ADDITION: added list function, generates list of images
function list(response, request) {
    console.log('Request handler "list" was called.');
    fs.readdir("upload", function (err, files) {
        if (err) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write(error + '\n');
            response.end();
        } else {
            response.writeHead(200, {'Content-Type': 'text/html'});
            for (var i = 0; i < files.length; i++) {
                response.write('<p>' + files[i] + '</p>');
                response.write('<img width="100px" src="show/' +
                               files[i] + '"/><br/>\n');
            }
            response.end();
        }
    });
}

var routes = {}
routes['/']       = root;
routes['/begin']  = begin;
routes['/upload'] = upload;
routes['/show']   = show;
// ADDITION: added list route
routes['/list']   = list;

start(route, routes);
