const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: String,
    parentCategory: [{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'Category'
    }] | Number,
});

module.exports = mongoose.model('Category', categorySchema);