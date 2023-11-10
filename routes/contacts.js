const express = require('express');
const router = express.Router();

const usersController = require('../controllers/contacts');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

//router.get('/professional', usersController.professionalData);

//Week2 Newly added. Add other endpoints
router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);


module.exports = router;