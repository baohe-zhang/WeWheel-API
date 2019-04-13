// Load required packages
var mongoose = require("mongoose");

// Define our user schema
var CarSchema = new mongoose.Schema({
  Vid: {
    type: String
  },
  UserId: String,
  Brand: String,
  Model: {
    type: String
  },
  Description: {
    type: String
  },
  Picture_url: {
    type: String
  },
  Capacity: {
    type: Number
  },
  Rating: {
    type: Number
  },
  RentCount: {
    type: Number
  }
});

// Export the Mongoose model
module.exports = mongoose.model("Car", CarSchema);
