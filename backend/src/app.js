var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./db/mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors')
const bodyParser = require('body-parser');


const app = express();

app.use(cors())

/*
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "localhost:3001");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users',require('./routes/users'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
const port = process.env.PORT || 4000

app.listen(port, () => console.log(`server started on port ${port}`))

module.exports = app;
