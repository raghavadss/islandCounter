var express = require('express');
var router = express.Router();
var data = require("../repository");


router.get('/history', function(req, res, next) {
  data.getFieldPatterns(function (err, patterns) {
      if (err) {
          res.send(400, err);
      } else {
          console.log(patterns);
          res.set("Content-Type", "application/json");
          res.send(patterns.patterns);
      }
  });
  //res.send('respond with a resource');
});

router.get('/historyView',function (req,res,next) {
    res.render('history', { title: 'History' });
})

module.exports = router;
