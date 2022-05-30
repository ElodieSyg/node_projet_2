const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, require: true}, 
    description: { type: String, require: true },
    publication_date: { type: Date, require: true },
    author: { type: mongoose.Types.ObjectId, ref: 'authors'},
    publisher: { type: mongoose.Types.ObjectId, ref: 'publishers'},
});

module.exports = mongoose.model('books', BookSchema);