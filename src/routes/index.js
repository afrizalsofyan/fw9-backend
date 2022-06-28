const router = require('express').Router();

router.use('/users', require('./user'));
router.use('/transaction', require('./transaction'));

module.exports = router;