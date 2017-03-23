var express = require('express');
var router = express.Router();
var island = require('../service/island');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Island Counter' });
});
module.exports = router;
