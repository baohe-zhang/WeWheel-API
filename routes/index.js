/*
 * Connect all of your endpoints together here.
 */

module.exports = function(app, router, passport) {
  app.use("/api", require("./home.js")(router));

  var user = require("../controllers/userController");
  var car = require("../controllers/carController");
  var post = require("../controllers/postController");
  var comment = require("../controllers/commentController");
  var rate = require("../controllers/rateController");
  var favorite = require("../controllers/favoriteController");

  //User functions
  app.route("/api/users/register").post(user.create_a_user);
  app
    .route("/api/users/login")
    .post(passport.authenticate("local"), user.auth_a_user);
  app
    .route("/api/users/logout")
    .post(passport.authenticate("local"), user.log_out_user);
  app
    .route("/api/users/:userId")
    .post(user.update_a_user)
    .get(user.findUserById);
  app.route("/api/users/delete/:userId").delete(user.delete_a_user);
  app.route("/api/users/username/:userName").get(user.findUserByuserName);

  //car function
  app
    .route("/api/cars/createCar")
    //.post(passport.authenticate('local'), car.createCar);
    .post(car.createCar);
  app.route("/api/cars").get(car.findCars);
  app
    .route("/api/car/:carId")
    .get(car.findCarById)
    .put(car.updateCarById)
    .delete(car.deleteCarById);

  //post function
  app.route("/api/posts/createPost").post(post.createPost);
  app.route("/api/posts").get(post.findPostsWithCar);
  app
    .route("/api/post/:postId")
    //    .put(passport.authenticate('local'), post.updatePostById)
    .get(post.getPostById)
    .put(post.updatePostById)
    .delete(post.deletePostById);

  //Rate function
  app.route("/api/rates/createRate").post(rate.createRate);
  app.route("/api/rates").get(rate.findRates);
  app.route("/api/rates/:rateId").get(rate.findRateById);

  // Comment function
  app.route("/api/comments/createComment").post(comment.createComment);
  app.route("/api/comments").get(comment.findComments);
  app
    .route("/api/comments/:commentId")
    .get(comment.findCommentById)
    .put(comment.updateCommentById)
    .delete(comment.deleteCommentById);

  // Favrite function
  app.route("/api/favorite/add").post(favorite.addCarToFavorite);
};
