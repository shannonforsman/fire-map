var express = require('express');
var router = express.Router();
var unirest = require('unirest')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/styleguide', function(req, res, next) {
  res.render('styleguide', { title: 'Style Guide' });
});


module.exports = router;
