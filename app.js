var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addusersRouter = require('./routes/addusers');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/addusers', addusersRouter);
app.use('/users', usersRouter);

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test'
});

connection.connect(function(err) {
    if (err) throw err;
    else {
      console.log("Connected!");
    }
    
});

app.post('/saveuser', urlencodedParser, function(req,res){
  console.log(req.body);
  var sql = "insert into users values(null, '"+req.body.username+"','"+req.body.password+"','"+req.body.email+"')";
  connection.query(sql, function(err){
    if (err) throw err
    res.render('user-success',{ dataval: () => req.body.username });
  })
  
  connection.end();
});
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
  res.render('error');
});

module.exports = app;
