var express     = require('express');
var router      = express.Router();
var User        = require('../models/User');

/* GET data */
router.get('/:user_id', function(req, res, next) {
	var userId = req.params.user_id;
  User.findById(userId)
      .exec(function(err, user){
      	if(user && user.boards){
          res.json(user.boards)
      	}else{
          res.json({'boards': 'empty'})
      	}
  })
});

// Update the tasks to the new ones
router.put('/:user_id', function(req, res, next) {
	var userId = req.params.user_id;
	console.log(req.body)
  User.findById(userId)
      .exec(function(err, user){
      	if(user && user.boards){
      		user.boards =  req.body
          user.save(function(err) {
            if (err) throw err;
	          res.json(user.boards)
          });
      	}else{
          res.json({'boards': 'empty'})
      	}
  })
});

module.exports = router;
