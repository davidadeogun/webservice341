const express = require('express');
const routes = express.Router();
const lesson1Controller = require('../controllers/baseController');
const Contact = require('../models/Contact');

// Existing routes
routes.get('/professional', lesson1Controller.professionalData);
routes.get('/contacts', lesson1Controller.usersContacts);  // Renamed to avoid conflict


// New routes for contacts

// GET /contacts: Retrieve and return a list of all contacts
routes.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /contacts/:id: Retrieve and return a single contact by ID
routes.get('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = routes; 