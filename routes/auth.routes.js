const express = require('express');
const {body} = require('express-validator');
const isAuth = require('../middleware/isAuth');

const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/users', isAuth, authController.getUsers);

router.post('/signup', [
    body('firstName').trim().not().isEmpty(),
    body('lastName').trim().not().isEmpty(),
    body('email').isEmail().withMessage('Enter a valid email.'),
    body('password').isLength({min: 5})
], authController.signup);

router.post('/signin', [
    body('email').trim().not().isEmpty(),
    body('password').trim().not().isEmpty()
], authController.signin);

module.exports = router;