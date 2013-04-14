// Important Objects:
function publisher() {
  var subscribers = {};
  var obj = {};

  // Allows one to subscribe to an event on this object:
  obj.subscribe = function (type, fn) {
    if (subscribers[type] === undefined) {
      subscribers[type] = [];
    }
    subscribers[type].push(fn);
  };

  // Allows one to unsubscribe to an event on this object:
  obj.unsubscribe = function (type, fn) {
    if (subscribers[type] === undefined) {
      return false;
    }
    var s = subscribers[type];
    var i;
    for (i = 0; i < s.length; i++) {
      if (s[i] === fn) {
        delete s[i];
        return true;
      }
    }

    return false;
  };

  // Allows the object to publish to subscribers on the event type
  // with the given arguments:
  obj.publish = function (type, arg) {
    if (subscribers[type] === undefined) {
      return false;
    }

    // Iterates over subscriber functions and invokes them:
    var s = subscribers[type];
    var i;
    for (i = 0; i < s.length; i++) {
      var fn = s[i];
      fn(arg);
    }
    return true;
  };

  return obj;
}

// The chat text area object that corresponds with the text area
// defined by the view:
function chatTextArea() {
  var obj = Object.create(publisher());
  obj.elm = $('#chat-text-area');

  // Returns the text contained in the textarea:
  obj.getText = function () {
    return obj.elm.val();
  };

  // Removes the text from the text area:
  obj.clearText = function () {
    obj.elm.val('');
  };

  return obj;
}

// The chat post button that corresponds with the button defined in
// the view:
function chatPostButton() {
  var obj = Object.create(publisher());
  obj.elm = $('#chat-post-button');

  // Handles a click event on the UI button:
  obj.elm.click(function (event) {
    // We log to console:
    console.log('submit button pressed.');
    // Then, publish a submit event to any subscribers:
    obj.publish('submit');
    // Circumvent default behavior:
    return false;
  });

  return obj;
}

// The message list that corresponds with the message list defined in
// the view:
function messageList() {
  var obj = Object.create(publisher());
  obj.elm = $('#message-list');

  // A method to add a message to the list:
  obj.addMessage = function (msg) {
    var next = $('<li>');
    next.text(msg);
    obj.elm.prepend(next);
  };

  return obj;
}

// The chat application that creates all the necessary graphical
// widgets and connects them together in the correct way.
function chatApp(socket) {
  var obj = Object.create(publisher());
  obj.elm = $('div#chat-app');

  // Create each of the important UI objects:
  obj.text = chatTextArea();
  obj.post = chatPostButton();
  obj.list = messageList();

  // We let the post button deal with its own click event.  We simply
  // subscribe to the submit event on the post button.  It will invoke
  // our callback when it is ready to do so:
  obj.post.subscribe('submit', function () {
    // Grab the textarea's text and send to server:
    var message = obj.text.getText();
    socket.emit('post', { post : message });
    // Clear the text box and add the message locally:
    obj.text.clearText();
    obj.list.addMessage(message);
  });

  // Handle incoming post messages from the server:
  socket.on('post', function (data) {
    obj.list.addMessage(data.post);
  });

  return obj;
}

// This is the chat module to avoid name conflicts:
var Chat = {};

$(function () {
  // Connect with WebSockets:
  var socket = io.connect();
  // Instantiate a new chat application:
  Chat.app = chatApp(socket);
});