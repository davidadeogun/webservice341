const fs = require('fs');
const path = require('path');

const professionalData = (req, res) => {
    const dataPath = path.join(__dirname, '..', 'json', 'professional.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    res.json(data);
};

const usersContacts = (req, res) => {
    // If temp.json is inside a 'json' folder at the root of your project
    const dataPath = path.join(__dirname, '..', 'json', 'contacts.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    res.json(data);
};



module.exports = {professionalData, usersContacts};