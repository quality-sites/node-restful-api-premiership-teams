const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    team: String
});

module.exports = mongoose.model('Team', teamSchema);