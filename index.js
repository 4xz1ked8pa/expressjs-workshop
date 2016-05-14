var library = require('./library.js');
var reddit = require('./reddit.js');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var express = require('express');
var app = express();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reddit'
});

var redditAPI = reddit(connection);

app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// This creates a web server that can listen to /hello and respond with some html.
app.get('/hello', function(req, res) {
  res.send('<h1>Hello World!</h1>');
});

// This creates a web server that can listen to requests for /hello?name=firstName.
app.get('/hello/:name', function(req, res) {
  res.send(`<h1>Hello ${req.params.name}</h1>`);
});

// This creates a web server that can listen to requests for /calculator/:operation?num1=XX&num2=XX
app.get('/calculator/:operation', function(req, res) {
  library.performOperation(req.params.operation,req.query.num1, req.query.num2, function(err, result) {
    if (err) {
      res.status(400).send('Invalid operation');
    }
    else {
      res.send(result);
    }
  });
});

// This creates a web server that can listen to requests for /posts
app.get('/posts', function(req, res) {
  var posts = redditAPI.getAllPosts({limit:1,offset:0},function(err, posts) {
    if (err) {
      console.log(err);
    }
    else {
      var html = '<ul>';
      posts.forEach(function(post) {
        html += "<li><a href='" + post.url + "'>" + post.title + "</a></li>";
      });
      html += '</ul>';
      res.send(html);
    }
  });
});

// This creates a web server that can listen to requests for /createContent
app.get('/createContent', function(req, res) {
  res.sendFile('./form.html', {root:__dirname}, function(err, result) {
    if (err) {
      res.status(500).send('Error!');
    }
    else {
      return;
    }
  });
});

// This creates a web server that can listen to requests for /createContent
app.post('/createContent', function(req, res) {
  redditAPI.createPost({userId: 1, title: req.body.title, url: req.body.url}, function(err, post) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.redirect(`/posts/${post.postId}`);
    }
  });
});

// This creates a web server that can listen to requests for /posts/postId
app.get('/posts/:postId', function(req, res) {
  redditAPI.getSinglePost(req.params.postId, function(err, post) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.send(post);
    }
  });
});















/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(8888, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
