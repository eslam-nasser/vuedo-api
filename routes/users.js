var express         = require('express');
var router          = express.Router();
var passwordHash    = require('password-hash');
var User            = require('../models/User')
var jwt             = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config          = require('config'); // get our config file
var superSecret     = config.secret

/* GET home page. */
router.get('/all', function(req, res, next) {
    User.find({}, function(err, items){
        res.json(items);
    })
});

/* GET home page. */
router.get('/register', function(req, res, next) {
    res.render('createUser')
});

router.post('/register', function(req, res, next) {
    var newHashedPassword = passwordHash.generate(req.body.password)
    // Check if there is a user with the same email
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            // create a user
            var newUser = new User({
                fullname: req.body.fullname,
                username: req.body.username,
                password: newHashedPassword,
                email: req.body.email,
                boards: {
                    todo: [],
                    doing: [],
                    done: [],
                    later: [],
                    other: [],
                },
                createdAt: new Date()
            });
            // save the user

            newUser.save(function(err) {
                if (err) throw err;
                // console.log('\nUser saved successfully\n');
                var token = jwt.sign(newUser, superSecret, {
                  expiresIn: '24h' // expires in 24 hours
                });
                // console.log(newUser)
                res.json({
                    success: true, 
                    message: 'Registration successful.',
                    token: token,
                    user_id: newUser._id,
                    newUser: newUser });
            });
        } else if (user) {
            // This email is already stored in db
            // console.log(user)
            res.json({ message: 'this email is already used!' });
        }
    });
    
});

router.post('/auth', function(req, res, next) {
    // console.log(req.body)
    var inputUsername = req.body.username,
        inputPassword = req.body.password;
    User.findOne({
        username: inputUsername
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if (!passwordHash.verify(inputPassword, user.password)) {
                res.json({ 
                    success: false, 
                    message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, superSecret, {
                  expiresIn: '24h' // expires in 24 hours
                });
                res.json({ 
                    success: true, 
                    message: 'Authentication successful.',
                    token: token,
                    user_id: user._id });
            }
        }
    });
});


module.exports = router;