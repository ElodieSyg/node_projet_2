const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    age: { type: Number, require: true },
});

module.exports = mongoose.model('authors', AuthorSchema);