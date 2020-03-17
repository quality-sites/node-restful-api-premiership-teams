const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    team: Number,
    firstname: String,
    surname: String,
});

module.exports = mongoose.model('Player', playerSchema);