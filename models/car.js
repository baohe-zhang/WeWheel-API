// Load required packages
var mongoose = require("mongoose");

// Define our user schema
var CarSchema = new mongoose.Schema({
  Vid: {
    type: String,
    unique: true
  },
  UserId: String,
  Brand: String,

  Description: {
    type: String
  },
  Picture: {
    type: String
  },


  Rating: {
    type: Number,
    default: 0
  },
  RentCount: {
    type: Number,
    default: 0
  }
});

// Export the Mongoose model
module.exports = mongoose.model("Car", CarSchema);