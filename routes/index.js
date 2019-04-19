/*
 * Connect all of your endpoints together here.
 */
<<<<<<< HEAD

module.exports = function (app, router, passport) {
  app.use("/api", require("./home.js")(router));

  var user = require("../controllers/userController");
  var car = require("../controllers/carController");
  var post = require("../controllers/postController");
  //User functions
=======
module.exports = function(app, router, passport) {
  app.use("/api", require("./home.js")(router));

  // Users route
  const user = require("../controllers/usersController");
>>>>>>> a0bdadb3e8de2049b75107b9e3360f2352ca16c5
  app.route("/api/users/register").post(user.create_a_user);
  app
    .route("/api/users/login")
    .post(passport.authenticate("local"), user.auth_a_user);
  app.route("/api/users/logout").post(user.log_out_user);
  app.route("/api/users/:userId").post(user.update_a_user);
  app.route("/api/users/delete/:userId").delete(user.delete_a_user);
<<<<<<< HEAD
  //car function

  app
    .route("/api/cars/createCar")
    //.post(passport.authenticate('local'), car.createCar);
    .post(car.createCar);
  app
    .route("/api/car/:carId")
    .get(car.findCars)
  app
    .route("/api/car/:userId/:carId")
    .put(passport.authenticate('local'), car.updateCarById)
    .delete(passport.authenticate('local'), car.deleteCarById);
  //post function
  app
    .route("/api/posts/createPost")
    .post(post.createPost);
  app
    .route("/api/post/:postId")
    .get(post.findPost)
  app
    .route("/api/post/:userId/:postId")
    .put(passport.authenticate('local'), post.updatePostById)
    .delete(passport.authenticate('local'), post.deletePostById)


};
=======

  // Cars route
  const car = require("../controllers/carController");
  app.route("/api/cars").post(car.createCar);
  app.route("/api/cars").get(car.findCars);
  app.route("/api/cars/:id").get(car.findCarById);
  app.route("/api/cars/:id").put(car.updateCarById);
  app.route("/api/cars/:id").delete(car.deleteCarById);
};
>>>>>>> a0bdadb3e8de2049b75107b9e3360f2352ca16c5
