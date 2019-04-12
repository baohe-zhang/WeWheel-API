// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var PostSchema = new mongoose.Schema({
    CarId: {
        type:String,
    },
    UserId: String,
    Location: String,

    StartDate: {
        type: Date,
        
    },
    EndDate:{
        type: Date,
    },
    PricePerHour:{
        type: Number,
    },
    PricePerDay:{
        type: Number,
    },
    PostDate:{
        type: Date,
        default:Date.now
    }

});

// Export the Mongoose model
module.exports = mongoose.model('Post', PostSchema);
