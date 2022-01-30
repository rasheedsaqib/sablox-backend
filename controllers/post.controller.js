const PostService = require('../services/post.service');
const {validationResult} = require("express-validator");
require('dotenv').config()

exports.getAllPosts = (req, res, next) => {
    PostService.getAll()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getPost = (req, res, next) => {
    PostService.getById(req.params.id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.addPost = (req, res, next) => {

    if(req.role !== 'Admin'){
        const error = new Error('Unauthenticated request.');
        error.statusCode = 422;
        throw error;
    }

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation error. Entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    if (!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
    }

    const path = process.env.URL + req.file.path.replace("\\", "/");

    PostService.add(req.body.title, req.body.slug, req.body.description, req.userId, req.body.categoryId, path)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deletePost = (req, res, next) => {

    if(req.role !== 'Admin'){
        const error = new Error('Unauthenticated request.');
        error.statusCode = 422;
        throw error;
    }

    PostService.delete(req.params.id)
        .then(() => {
            res.status(200).json({message: 'Post deleted successfully!'});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}