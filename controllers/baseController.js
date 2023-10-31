
/*const ObjectId = require('mongodb').ObjectId;

const getAll =async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then(users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle =async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then(users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
}; */




const fs = require('fs');
const path = require('path');

const professionalData = (req, res) => {
    // If temp.json is inside a 'json' folder at the root of your project
    const dataPath = path.join(__dirname, '..', 'json', 'temp.json');
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