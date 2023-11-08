//const fs = require('fs');
//const path = require('path');

//STARTS HERE
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};


const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};
//chANGE HERE WHEN NEEDED
const professionalData = async (req, res) => {
    const result = await mongodb.getDb().collection('profile').find();
    //console.log(result);
    result.toArray().then((profile) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(profile[0]);
    });
}; 

// Week 2 Newly added. Add other endpoints
//Create User
const createUser = async (req, res) => {
    //#swagger.tags= [' Hello Users']
    const userId = new ObjectId(req.params.id);
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().collection('users').insertOne({_id: userId}, newUser);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error creating user');
    }
    
}; 


//update user
const updateUser = async (req, res) => {
    //#swagger.tags= [' Hello Users']
    const userId = new ObjectId(req.params.id);
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().collection('users').replaceOne({_id: userId}, newUser);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error updating user');
    }

};

//delete user

const deleteUser = async (req, res) => {
    //#swagger.tags= [' Hello Users']
    const userId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().collection('users').deleteOne({_id: userId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('User not found');
        }
    } catch (error) {
        res.status(500).json('Error deleting user: ' + error.message);
    }
};





module.exports = {getAll, getSingle, professionalData, createUser, updateUser, deleteUser};

