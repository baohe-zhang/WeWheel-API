// Load required packages
var mongoose = require("mongoose");

// Define our user schema
var CarSchema = new mongoose.Schema({
  vid: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    default: ""
  },
  brand: {
    type: String,
    default: ""
  },
  model: {
    type: String,
    default: ""
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
