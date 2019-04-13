var mongoose = require('mongoose');
User = mongoose.model('User');

var url = require('url')

exports.create_a_user = function (req, res) {
    var newUser = new User({
        UserName: req.body.UserName,
        password: req.body.password,
        FirstName: req.body.FirstName || "",
        LastName: req.body.LastName || "",
        Email: req.body.Email,

    });
    newUser.save((err, user) => {
        if (err) throw err;
        res.status(200).json({
            message: 'OK',
            data: user
        });
    });

};

exports.auth_a_user = function (req, res) {
    User.findOne({
        "UserName": req.body.UserName
    }, function (err, user) {
        if (err) {
            res.status(404).send({
                message: err
            });
        } else {
            if (user == null) {
                return res.status(404).send({
                    message: 'can not find',
                    data: req.body.UserName,
                });
            }

            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) {
                    return res.status(400).json({
                        message: err,

                    });
                }
                if (isMatch) {
                    console.log(req.isAuthenticated());
                    res.status(200).send({
                        message: 'successfully login in',
                        data: req.body.UserName

                    });
                } else {
                    res.status(400).send({
                        message: 'error password',
                        data: req.UserName
                    });
                }
            });
        }
    });

};

exports.log_out_user = function (req, res) {
    req.logOut();
    res.redirect('/');

}

exports.update_a_user = function (req, res) {
    let a = req.isAuthenticated();
    res.status(200).send({
        data: a
    })


}