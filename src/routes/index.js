const router = require('express').Router();

router.use('/admin/users', require('./user'));
router.use('/admin/transactions', require('./transaction'));
router.use('/admin/profiles', require('./profile'));
router.use('/admin/type/transactions', require('./type_transaction'));

module.exports = router;