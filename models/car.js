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
  description: {
    type: String,
    default: ""
  },
  image_url: {
    type: String,
    default: ""
  },
  capacity: {
    type: Number,
    default: 4
  },
  rating: {
    type: Number,
    default: 0
  },
  rentCount: {
    type: Number,
    default: 0
  }
});

// Export the Mongoose model
module.exports = mongoose.model("Car", CarSchema);