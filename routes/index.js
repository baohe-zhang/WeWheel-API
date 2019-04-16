/*
 * Connect all of your endpoints together here.
 */
module.exports = function(app, router, passport) {
  app.use("/api", require("./home.js")(router));

  // Users route
  const user = require("../controllers/usersController");
  app.route("/api/users/register").post(user.create_a_user);
  app
    .route("/api/users/login")
    .post(passport.authenticate("local"), user.auth_a_user);
  app.route("/api/users/logout").post(user.log_out_user);
  app.route("/api/users/:userId").post(user.update_a_user);
  app.route("/api/users/delete/:userId").delete(user.delete_a_user);

  // Cars route
  const car = require("../controllers/carController");
  app.route("/api/cars").post(car.createCar);
  app.route("/api/cars").get(car.findCars);
  app.route("/api/cars/:id").get(car.findCarById);
  app.route("/api/cars/:id").put(car.updateCarById);
  app.route("/api/cars/:id").delete(car.deleteCarById);
};
