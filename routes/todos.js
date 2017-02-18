var express     = require('express');
var router      = express.Router();
var ToDo        = require('../models/Todo');

/* GET data */
router.get('/', function(req, res, next) {
  ToDo.find({}, function(err, data){
    if(err) throw err;
    res.json(data)
  })
});

module.exports = router;
