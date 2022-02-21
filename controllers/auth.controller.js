const {validationResult} = require("express-validator");
const User = require('../services/user.service');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUsers = (req, res, next) => {
    if(req.role !== 'Admin'){
        const error = new Error('Unauthenticated request.');
        error.statusCode = 422;
        throw error;
    }

    User.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation error. Entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    User.getUserWithEmail(req.body.email)
        .then(user => {
            if(user){
                const error = new Error('Email already exists.');
                error.statusCode = 401;
                throw error;
            }else {
                return bcrypt.hash(req.body.password, 12)
            }
        })
        .then(hashedPassword => {
            return User.addUser(req.body.firstName, req.body.lastName, req.body.email, req.body.phone, hashedPassword);
        })
        .then(result => {
            result.password = undefined;
            res.status(201).json(result);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.signin = (req, res, next) => {
    let loadedUser;

    User.getUserWithEmail(req.body.email)
        .then(user => {
            if(!user){
                const error = new Error('Email not registered!');
                error.statusCode = 401;
                throw error;
            }else {
                loadedUser = user;
                return bcrypt.compare(req.body.password, user.password);
            }
        })
        .then(isEqual => {
            if(!isEqual){
                const error = new Error('Incorrect password.');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                userId: loadedUser._id.toString(),
                role: loadedUser.role
            }, process.env.JWT_SECRET, {expiresIn: '24h'});

            loadedUser.password = undefined;

            res.status(200).json({message: 'Sign in successful!', token: token, user: loadedUser, expiresIn: 24*60*60});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}