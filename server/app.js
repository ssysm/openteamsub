const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const indexRouter = require('./routers/index');
const usersRouter = require('./routers/users');

const app = express();

const config = require('./../config');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.sessionSecret));
app.use(express.static(path.join(__dirname, 'static')));

app.use(session({
    store: new RedisStore(),
    secret: "mb22uHZWx",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        maxAge: 60 * 24 * 60 * 60 * 1000
    }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.toString());
});

module.exports = app;
