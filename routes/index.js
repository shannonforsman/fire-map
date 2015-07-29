var express = require('express');
var router = express.Router();
var unirest = require('unirest')
var bcrypt = require('bcryptjs')
var db = require('monk')(process.env.MONGOLAB_URI)
var users = db.get('users')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/saved-fires', function(req, res, next) {
  res.render('saved-map', { title: 'Express'});
});





router.post('/register', function (req, res, next) {
  console.log(req.body)
  var errors = []
  if (!req.body.email) {
    errors.push("email can't be blank")
  }
  if (!req.body.password) {
    errors.push("password can't be blank")
  }
  if (errors.length) {
    res.render('register', {error: errors})
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    req.body.savedFires = []
    users.insert(req.body , function (err, doc) {
      req.session.id = doc._id
      res.redirect('/refresh')
    })
  }
})

router.get('/refresh', function(req, res) {
  res.redirect('/')
});

router.get('/logout', function (req, res, next) {
  req.session = null
  res.redirect('/')
})


module.exports = router;
