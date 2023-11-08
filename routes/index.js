const router = require('express').Router();
router.use('/', require('./swagger'));


router.get('/', (req, res) => {
    //#swagger.tags= [' Hello Users']
    res.send('Welcome to the Users API!');
});

router.use('/users', require('./users'));

module.exports = router;