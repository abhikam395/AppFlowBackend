var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth/', authRouter);

// catch 404
app.use(function(req, res, next) {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  })
})

module.exports = app;
