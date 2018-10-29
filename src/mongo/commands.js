var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commandSchema = new Schema({
    guild: {
        type: String,
        required: true
    },
    command: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Commands', commandSchema);