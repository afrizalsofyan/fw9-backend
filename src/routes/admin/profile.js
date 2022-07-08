const profiles = require('express').Router();
const profileController = require('../../controllers/profile');
const uploudImage = require('../../middleware/uploudProfile');

profiles.post('/',uploudImage, ...profileController.createNewProfile);
profiles.get('/', profileController.getAllProfile);
profiles.get('/:id', profileController.getProfile);
profiles.patch('/:id', uploudImage, ...profileController.updateProfile);
profiles.delete('/:id', profileController.hardDeleteProfile);

module.exports = profiles;