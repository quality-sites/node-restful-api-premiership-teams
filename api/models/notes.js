const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    note: String,
    category: [{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Category'
    }] | Number,
    type: Number
});

module.exports = mongoose.model('Notes', notesSchema);