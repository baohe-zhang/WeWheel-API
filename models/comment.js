// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var CommentSchema = new mongoose.Schema({
    UserId: {
        type:String,
    },
    CarId: String,
    Content:{
        type: String,
    },

    Date: {
        type: Date,
        default: Date.now        
    }
    
    
 

});

// Export the Mongoose model
module.exports = mongoose.model('Comment', CommentSchema);
