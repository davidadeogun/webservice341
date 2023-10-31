// models/Contact.js

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    favoriteColor: String,
    birthday: Date
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

