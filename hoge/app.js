'use strict';
var http = require('http');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var Message = require('./schema/Messaage');
var fileUpload = require('express-fileupload');

var app = express();

mongoose.connect('mongodb://root:example@db:27017/chatapp?authSource=admin')
.then(() => console.log('DB Connected!'))
.catch(err => {
  console.log('DB Connection Error: ' + err.message);
});

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get("/", (req, res, next) => {
  Message.find()
  .then(messages => {
    return res.render('index', { title: 'Hello world! ', messages: messages });
  })
  .catch(err => {
    console.log('Data Fetch Error: ' + err.message);
    throw err;
  });
});

app.get("/update", (req, res, next) => {
  return res.render('update');
});

app.post("/update", fileUpload(), (req, res, next) => {
  console.log(req.body);
  var newMessage = new Message({
    username: req.body.username,
    message: req.body.message
  });
  
  newMessage.save()
  .then(()=> {
    console.log('Data Save success.')
    return res.redirect('/');
  })
  .catch(err=> {
    console.log('Data Save Error: ' + err.message);
    throw err;
  });
});
  
var server = http.createServer(app);
server.listen(8080);