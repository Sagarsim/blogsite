const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV = "production";

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'reactscratch', cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));

if(!isProduction){
    app.use(errorHandler());
}

mongoose.connect('mongodb://sagaranon:sagar2797@ds121026.mlab.com:21026/blogsite_scratch', {useNewUrlParser: true});
mongoose.set('debug', true);

// Add models
require('./models/Articles');   
// Add routes
app.use(require('./routes'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

const server = app.listen(process.env.PORT || 8000, () => console.log('Server started on http://localhost:8000'));