
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
// api_onlineShoppify

var router = express.Router();

const serverless = require('serverless-http')

mongoose.connect("mongodb+srv://api_onlineShoppify:api_onlineShoppify@cluster0.2o2uk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ 
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/.netlify/functions/api', indexRouter);
app.use('/.netlify/functions/api/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.status(err.status || 500);
//   res.render('error');
// });


module.exports.handler = serverless(app);
