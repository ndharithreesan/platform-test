const express = require('express');
const userController = require('../controllers/userController');
const middleware = require('./middleware');
const router = express.Router();


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/logout', middleware.auth, userController.logout)
router.put('/:userId', middleware.auth, userController.updateUser);
router.delete('/:userId', middleware.auth, userController.deleteUser);

module.exports = router;
