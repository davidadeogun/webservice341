const express = require('express');
const router = express.Router();

const usersController = require('../controllers/tests');
//week3
//----------------------------------------
//added middleware
const validation = require('../middleware/validate');
//---------------------------------------
router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

//router.get('/professional', usersController.professionalData);

//Week2 Newly added. Add other endpoints
//router.post('/', usersController.createUser);

//Week 3
//--------------------------------------------------------
router.post('/', validation.saveContact, usersController.createUser);
router.put('/:id', validation.saveContact, usersController.updateUser);
//--------------------------------------------------------

//router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);


module.exports = router;