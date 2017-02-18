var express         = require('express');
var router          = express.Router();
var passwordHash    = require('password-hash');
var User            = require('../../models/User')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin/login');
    console.log(  passwordHash.verify( '1234', 'sha1$12ce1fbb$1$4b5a62571034061c849651167eb7119d312b2fac')  )
});

router.post('/',function(req, res){
    var inputUsername = req.body.inputUsername,
        inputPassword = req.body.inputPassword;
    User.findOne({
        name: inputUsername
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if (!passwordHash.verify(req.body.inputPassword, user.password)) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                req.session.name = inputUsername;
                req.session.role = user.role;
                req.session.email = user.email;
                req.session.image = user.avatarUrl.filename;
                req.session.userId = user._id
                res.redirect('dashboard');
            }
        }
    });
})

module.exports = router;