const CategoryService = require('../services/category.service');
const {validationResult} = require("express-validator");

exports.getAllCategories = (req, res, next) => {
    CategoryService.getAll()
        .then(categories => {
            res.status(200).json(categories);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getCategory = (req, res, next) => {
    CategoryService.getById(req.params.id)
        .then(category => {
            res.status(200).json(category);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.postCategory = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation error. Entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    if(req.role !== 'Admin'){
        const error = new Error('Unauthenticated request.');
        error.statusCode = 422;
        throw error;
    }


    CategoryService.add(req.body.name)
        .then(category => {
            res.status(200).json(category);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteCategory = (req, res, next) => {

    if(req.role !== 'Admin'){
        const error = new Error('Unauthenticated request.');
        error.statusCode = 422;
        throw error;
    }

    CategoryService.delete(req.params.id)
        .then(() => {
            res.status(200).json({message: 'Category deleted successfully!'});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}