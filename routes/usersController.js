var mongoose = require('mongoose'),
User = mongoose.model('User')

var url = require('url')

exports.create_a_user = function(req,res){
    passport.authenticate('local-signup'),
    function(req,res){
        res.status(200).join({user: req.user.email});
    }
};

exports.auth_a_user = 