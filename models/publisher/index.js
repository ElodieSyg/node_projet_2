const mongoose = require('mongoose');

const PublisherSchema = new mongoose.Schema({
    name: { type: String, require: true },
    creation_date: { type: Date, require: true },
});

module.exports = mongoose.model('publishers', PublisherSchema);