
//STARTS HERE
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


//ORIGINAL WORKING CODE
/*const getAll = async (req, res) => {
    const result = await mongodb.getDb().collection('tests').find();
    result.toArray().then((tests) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tests);
    });
}; */


/*const getAll = async (req, res) => {
    const result = await mongodb.getDb().collection('tests').find();
    result.toArray((err, lists) => {
        if (err) {
            res.status(400).json({ message: err });
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
}; */

//NEWLY GENERATED TO HANDLE ERRORS
const getAll = async (req, res) => {
    try {
        // Data validation logic (if needed) goes here

        const result = await mongodb.getDb().collection('tests').find();
        const tests = await result.toArray();

        // Check if tests array is empty and return 204 if it is
        if (tests.length === 0) {
            return res.status(204).end();
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tests);
    } catch (err) {
        // Determine the nature of the error for appropriate status code
        const statusCode = err.message.startsWith("Client error:") ? 400 : 500;
        res.status(statusCode).json({ message: "Error processing request" });
    }
};

//ORIGINAL WORKING CODE
/*const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('tests').find({ _id: userId });
    result.toArray().then((tests) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tests[0]);
    });
};  */


const getSingle = async (req, res) => {
    try {
        // Check if the provided ID is valid before querying the database
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID or format. A valid ID is required' });
        }

        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('tests').find({ _id: userId });
        const tests = await result.toArray();

        if (!tests || tests.length === 0) {
            // Handle case when the test is not found
            return res.status(404).json({ message: 'Test not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tests[0]);
    } catch (err) {
        // Handle other errors
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};







//chANGE HERE WHEN NEEDED
/*const professionalData = async (req, res) => {
    const result = await mongodb.getDb().collection('profile').find();
    //console.log(result);
    result.toArray().then((profile) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(profile[0]);
    });
}; */

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
    const response = await mongodb.getDb().collection('tests').insertOne({_id: userId}, newUser);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error creating contact');
    }
    
}; 




//Week 3. Validate Id before updating
const updateUser = async (req, res) => {
    // Check if the provided ID is valid before proceeding
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Valid ID Number is required for update' });
    }

    const userId = new ObjectId(req.params.id);
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDb().collection('tests').replaceOne({_id: userId}, newUser);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error updating contact');
    }
};

//Week 3 Validate Id before deleting
const deleteUser = async (req, res) => {
    // Check if the provided ID is valid before proceeding
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Valid ID is required to delete' });
    }

    const userId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().collection('tests').deleteOne({_id: userId});
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('Contact not found');
        }
    } catch (error) {
        res.status(500).json('Error deleting contact ' + error.message);
    }
};


//update user
/*const updateUser = async (req, res) => {

    const userId = new ObjectId(req.params.id);
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().collection('tests').replaceOne({_id: userId}, newUser);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error updating contact');
    }

};*/

//delete user

/*const deleteUser = async (req, res) => {

    const userId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDb().collection('tests').deleteOne({_id: userId});
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json('Contact not found');
        }
    } catch (error) {
        res.status(500).json('Error deleting contact ' + error.message);
    }
};*/





module.exports = {getAll, getSingle, createUser, updateUser, deleteUser};

