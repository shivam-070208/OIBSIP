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
const session = require('express-session');

app.use(session({
  secret: 'yourSecretKey', 
  resave: false,
  saveUninitialized: false,
  cookie: {
   
    secure: true, // set to true if using HTTPS
    sameSite: none, // or 'none' if using HTTPS and cross-site
    maxAge: 1000 * 60 * 60 * 30 // 1 day
  }
}));
const allowedOrigins=[
  'http://localhost:5173'
]
app.use(cors({
  origin:(origin,cb)=>{
    if(!origin||allowedOrigins.includes(origin)) cb(null,true)
      else cb(new Error('Cors not allowed for this origin: '+origin))
  },
  credentials:true
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
