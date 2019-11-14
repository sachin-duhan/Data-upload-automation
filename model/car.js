const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const newSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Car', newSchema);