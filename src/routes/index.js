const router = require('express').Router();

router.use('/users', require('./user'));
router.use('/transactions', require('./transaction'));
router.use('/profiles', require('./profile'));
router.use('/transactions/type', require('./type_transaction'));

module.exports = router;