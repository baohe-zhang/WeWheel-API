var mongoose = require("mongoose");
User = mongoose.model("User");

var url = require("url");

exports.findUserById = (req, res) => {
  const UserId = req.params.userId;
  User.findById(UserId)
    .exec()
    .then(doc => {
      if (!doc) {
        res.status(404).json({
          message: `Cannot find the  user with id ${UserId}`,
          data: UserId
        });
      } else {
        res.status(200).json({
          messgae: "GET OK",
          data: doc
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Failed to find the car with id ${UserId}`,
        data: []
      });
    });
};

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
  console.log(req.isAuthenticated());
  let newUser = req.body;
  newUser = new User(newUser);

  newUser
    .save()
    .then(doc => {
      console.log(req.isAuthenticated());
      res.status(201).json({
        message: "Create OK",
        data: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to create a User",
        data: []
      });
    });
};

exports.auth_a_user = (req, res) => {
  console.log(req.isAuthenticated());
  User.findOne(
    {
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
        user.comparePassword(req.body.password, function(err, isMatch) {
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
  console.log(req.isAuthenticated());
  req.logOut();
  res.redirect("/");
  console.log(req.isAuthenticated());
};

exports.findUserByuserName = (req, res) => {
  console.log(req.params.userName);
  User.find({
    UserName: req.params.userName
  })
    .exec()
    .then(doc => {
      if (!doc) {
        res.status(404).json({
          message: `Cannot find the  user with id ${UserName}`,
          data: userName
        });
      } else {
        res.status(200).json({
          messgae: "GET OK",
          data: doc
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Failed to find the car with id ${UserId}`,
        data: []
      });
    });
};

exports.update_a_user = (req, res) => {
  User.findByIdAndUpdate(
    {
      _id: req.params.userId
    },
    {
      $set: req.body
    },
    {
      $multi: true
    }
  )
    .exec()
    .then(doc => {
      res.status(200).json({
        message: "PUT OK",
        data: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to update a car",
        data: err
      });
    });
};

exports.delete_a_user = (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId)
    .exec()
    .then(doc => {
      if (!doc) {
        res.status(404).json({
          message: "Cannot find the user with id ${userId}",
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
