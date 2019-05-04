const mongoose = require("mongoose");
const User = mongoose.model("User");
const Car = mongoose.model("Car");

/* add car to user's book list and increment car's rent count when user click book button in postinfo page. */
exports.addCarToBook = (req, res) => {
  const { userId, carId } = req.body;
  User.findByIdAndUpdate(
    userId,
    { $push: { RentedCars: carId } },
    { new: true }
  )
    .exec()
    .then(doc => {
      Car.findByIdAndUpdate(carId, { $inc: { RentCount: 1 } }, { new: true })
        .exec()
        .then(
          res.status(200).json({
            message: "Add Book Ok",
            data: doc
          })
        )
        .catch(
          res.status(500).json({
            message: "Failed to increment rent count",
            data: []
          })
        );
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to add the car to book list",
        data: []
      });
    });
};
