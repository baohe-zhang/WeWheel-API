/*
 * Connect all of your endpoints together here.
 */

module.exports = function (app, router, passport) {
  app.use("/api", require("./home.js")(router));

  var user = require("../controllers/userController");
  var car = require("../controllers/carController");
  var post = require("../controllers/postController");
  //User functions
  app.route("/api/users/register").post(user.create_a_user);
  app
    .route("/api/users/login")
    .post(passport.authenticate("local"), user.auth_a_user);
  app.route("/api/users/logout").post(user.log_out_user);
  app.route("/api/users/:userId").post(user.update_a_user);
  app.route("/api/users/delete/:userId").delete(user.delete_a_user);
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