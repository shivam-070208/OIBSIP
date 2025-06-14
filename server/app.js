var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hostRouter = require('./routes/hostuser')
const cartRoute = require('./routes/Cart')

var app = express();
const connectDB = require('./config/Connectdb')

app.use(cors({
  origin:'*'
}))
connectDB()


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/host',hostRouter)
app.use('/cart',cartRoute)



module.exports = app;
