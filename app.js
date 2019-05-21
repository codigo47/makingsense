const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {
  authMiddleware
} = require('./utils/auth.js');

const app = express();

app.all('*', authMiddleware);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

const postController = require('./controllers/post_controller');

app.use('/posts', postController);

module.exports = app;