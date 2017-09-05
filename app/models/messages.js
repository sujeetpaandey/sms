// var mongoose = require('mongoose');

// module.exports = mongoose.model('Messages', {
//     mobile: String,
//     message: String,
//     date: { type: Date, default: Date.now }
// });


var mongoose = require('mongoose');

module.exports = mongoose.model('reports', {
    mobile: {
        type: String,
    },
    message: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});