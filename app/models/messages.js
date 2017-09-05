var mongoose = require('mongoose');

module.exports = mongoose.model('Messages', {
    mobile: String,
    message: String,
    date: { type: Date, default: Date.now }
});