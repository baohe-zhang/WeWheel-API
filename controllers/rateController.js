const mongoose = require("mongoose");
const url = require("url");

const Rate = mongoose.model("Rate");

exports.findRates = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (!parsedUrl.search) {
    Rate.find()
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
          message: "Failed to get rates",
          data: []
        });
      });
  } else {
    // build query
    let query = Rate.find();
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
        res.status(200).json({
          message: "GET OK",
          data: docs
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Failed to get rates",
          data: []
        });
      });
  }
};

exports.findRateById = (req, res) => {
  const RateId = req.params.id;
  Rate.findById(RateId)
    .exec()
    .then(doc => {
      if (!doc) {
        res.status(404).json({
          message: "Cannot find the rate",
          data: []
        });
      } else {
        res.status(200).json({
          message: "Get OK",
          data: doc
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to find the rate",
        data: []
      });
    });
};

exports.createRate = (req, res) => {
  let rate = req.body;
  rate = new Rate(rate);
  rate
    .save()
    .then(doc => {
      res.status(201).json({
        message: "Rate Ok",
        data: doc
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to create a Rate"
      });
    });
};
