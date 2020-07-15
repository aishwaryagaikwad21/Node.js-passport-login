const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')

//passport config
const passport = require('passport')
require('./config/passport')(passport)

require('./config/mongoose')

const app = express();
const index = require('./routes/index')
const user = require('./routes/user')

app.use(expressLayouts)
app.set('view engine','ejs');

//bodyparser
app.use(express.urlencoded({extended:false}));

//Express session middleware
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash())

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

//routes
app.use('/',index)
app.use('/users',user)

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server running on port ${PORT}`));