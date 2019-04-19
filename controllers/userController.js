var mongoose = require("mongoose");
User = mongoose.model("User");

var url = require("url");

exports.create_a_user = (req, res) => {
  /*
  let newUser = new User({
    UserName: req.body.UserName,
    password: req.body.password,
    FirstName: req.body.FirstName || "",
    LastName: req.body.LastName || "",
    Email: req.body.Email
  });
  */
  let newUser = req.body;
  newUser = new User(newUser);
  newUser
    .save()
    .then(doc => {
      res.status(201).json({
        message: "Create OK",
        data: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to create a car",
        data: []
      });
    })
};

exports.auth_a_user = (req, res) => {
  User.findOne({
      UserName: req.body.UserName
    },
    (err, user) => {
      if (err) {
        res.status(404).send({
          message: err
        });
      } else {
        if (user == null) {
          return res.status(404).send({
            message: "can not find",
            data: req.body.UserName
          });
        }
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (err) {
            return res.status(400).json({
              message: err
            });
          }
          if (isMatch) {
            console.log(req.isAuthenticated());
            console.log(req.user);
            res.status(200).send({
              message: "successfully login in",
              data: req.body.UserName
            });
          } else {
            res.status(400).send({
              message: "error password",
              data: req.UserName
            });
          }
        });
      }
    }
  );
};

exports.log_out_user = (req, res) => {
  req.logOut();
  res.redirect("/");
};

exports.update_a_user = (req, res) => {
  User.findByIdAndUpdate({
      _id: req.params.userId
    }, req.body, {
      new: true
    })
    .exec()
    .then(doc => {
      res.status(200).json({
        message: "PUT OK",
        data: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to updat a car",
        data: []
      });
    })


};

exports.delete_a_user = (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId)
    .exec()
    .then(doc => {
      if (!doc) {
        res.status(404).json({
          message: 'Cannot find the user with id ${userId}',
          data: []
        });
      } else {
        res.status(200).json({
          messge: "DELETE OK",
          data: doc
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to delete a car",
        data: []
      });
    });
};