require('dotenv').load()
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var unirest = require('unirest')
var parseString = require('xml2js').parseString;
var Twitter = require('twitter');
var routes = require('./routes/index');
var users = require('./routes/users');
var autolinker = require( 'autolinker' )
var hbs = require('hbs')
var cookieSession = require('cookie-session')
var db = require('monk')(process.env.MONGOLAB_URI)
var fireUsers = db.get('users')



var app = express();

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY1, process.env.KEY2]
}))

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


hbs.registerPartials(__dirname + '/views/partials');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  if (req.session.id) {
    console.log('hi')
    req.session.id
    fireUsers.findOne({_id: req.session.id}, function (err, doc) {
      app.locals.id = req.session.id
    })
  } else {
    console.log('n0')
    app.locals.id = ''
  }
  next()
})

app.use('/', routes);
app.use('/users', users);

app.post('/tweets', function(req, res){
  var title = req.body.title[0]
  var params = {q: title, count: 20};
  client.get('search/tweets', params, function(error, tweets, response){
    if (!error) {
      tweets.statuses.forEach(function(el){
        el.text = autolinker.link(el.text)
      })
      res.json(tweets)
    } else {
      console.log(error);
    }
  })
})


app.post('/save', function(req, res, next) {
  var title = req.body.title[0]
  console.log(title)

  // users.insert(title:  }, function (err, doc) {
  //       req.session.id = doc._id
  //       res.redirect('/')
  //     })
  res.end()
});
//

app.get('/cookie', function(req, res) {
  res.json({id: app.locals.id})
})


app.get('/locations', function(req, res){
  unirest.get('http://inciweb.nwcg.gov/feeds/rss/incidents/')
    .end(function (response) {
      var xml = response.body
      parseString(xml, function (err, result) {
        fireArr = result.rss.channel[0].item
        var arr = []
        fireArr.forEach(function(el){
          if (/[0-9]/.test(el['geo:lat'][0]) && /[0-9]/.test(el['geo:long'][0])) {
            arr.push(el)
          }
        })
        res.json(arr)
      });
    })
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
