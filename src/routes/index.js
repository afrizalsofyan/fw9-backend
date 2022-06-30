const router = require('express').Router();

router.use('/users', require('./user'));
router.use('/transaction', require('./transaction'));
router.use('/profile', require('./profile'));
router.use('/transaction/type', require('./type_transaction'));

module.exports = router;