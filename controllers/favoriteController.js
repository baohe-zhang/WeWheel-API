const mongoose = require("mongoose");
const User = mongoose.model("User");

/* when user click favorite button, call this function to insert the car's id to user's favorite car list */
exports.addCarToFavorite = (req, res) => {
  const { userId, carId } = req.body;
  User.findByIdAndUpdate(userId, { $push: { LikedCars: carId } }, { new: true })
    .exec()
    .then(doc => {
      res.status(201).json({
        message: "Add Favorite OK",
        data: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to add the car to favorite list",
        data: []
      });
    });
};

exports.deleteCarFromFavorite = (req, res) => {
  const { userId, carId } = req.body;
  User.findByIdAndUpdate(userId, { $pull: { LikedCars: carId } }, { new: true })
    .exec()
    .then(doc => {
      res.status(201).json({
        message: "Delete Favorite OK",
        data: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to delete the car from favorite list",
        data: []
      });
    });
};
