const profiles = require('express').Router();
const profileController = require('../controllers/profile');

profiles.post('/', ...profileController.createNewProfile);
profiles.get('/', profileController.getAllProfile);
profiles.get('/:id', profileController.getProfile);
profiles.patch('/:id', profileController.updateProfile);
profiles.delete('/:id', profileController.hardDeleteProfile);

module.exports = profiles;