// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    fullname: String, 
    username: String, 
    password: String, 
    email: String,
    boards: { type: Object, default: {} },
    createdAt: { type: Date, default: Date.now }
}));