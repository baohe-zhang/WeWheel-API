const mongoose = require("mongoose");
const url = require("url");

const Car = mongoose.model("Car");

/* Find all cars that match specific query conditions. */
exports.findCars = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (!parsedUrl.search) {
    // query is empty
    Car.find()
      .limit(100)
      .exec()
      .then(docs => {
        res.status(200).json({
          message: "GET OK",
          data: docs
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Failed to get cars",
          data: []
        });
      });
  } else {
    // build query
    let query = Car.find();
    if (parsedUrl.query.where)
      query = query.where(JSON.parse(parsedUrl.query.where));
    if (parsedUrl.query.sort)
      query = query.sort(JSON.parse(parsedUrl.query.sort));
    if (parsedUrl.query.select)
      query = query.select(JSON.parse(parsedUrl.query.select));
    if (parsedUrl.query.skip)
      query = query.skip(JSON.parse(parsedUrl.query.skip));
    if (parsedUrl.query.count)
      query = query.count(JSON.parse(parsedUrl.query.count));
    if (parsedUrl.query.limit)
      query = query.limit(JSON.parse(parsedUrl.query.limit));
    else query = query.limit(100);

    // execute query
    query
      .exec()
      .then(docs => {
        if (docs == null || docs.length == 0) {
          res.status(404).json({
            message: "Cannot find users under these conditions",
            data: []
          });
        } else {
          res.status(200).json({
            message: "GET OK",
            data: docs
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "Failed to get cars",
          data: []
        });
      });
  }
};

/* Find a car by id. */
exports.findCarById = (req, res) => {
  const carId = req.params.id;
  Car.findById(carId)
    .exec()
    .then(doc => {
      if (!doc) {
        res.status(404).json({
          message: `Cannot find the car with id ${carId}`,
          data: []
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
        message: `Failed to find the car with id ${carId}`,
        data: []
      });
    });
};

/* Create a car from user input. Input will be validated in the front end. */
exports.createCar = (req, res) => {
  let car = req.body;
  car = new Car(car);


  car
    .save()
    .then(doc => {
      res.status(201).json({
        message: "POST OK",
        data: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to create a car",
        data: err
      });
    });
};

/* Update a car from user input. Input will be validated in the front end. */
exports.updateCarById = (req, res) => {
  const car = req.body;
  const carId = req.params.id;
  Car.findByIdAndUpdate(carId, {
      $set: car
    }, {
      new: true
    })
    .exec()
    .then(doc => {
      res.status(200).json({
        message: "Update OK",
        data: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to update a car",
        data: []
      });
    });
};

/* Delete a car by id. */
exports.deleteCarById = (req, res) => {
  const carId = req.params.id;
  Car.findByIdAndDelete(carId)
    .exec()
    .then(doc => {
      if (!doc) {
        res.status(404).json({
          message: `Cannot find the user with id ${carId}`,
          data: []
        });
      } else {
        res.status(200).json({
          message: "DELETE OK",
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