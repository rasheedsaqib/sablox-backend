const Constants = require('../models/constant.modal');
const constants = require("constants");

exports.getConstant = (req, res, next) => {
    Constants.find()
        .then(constants => {
            res.status(200).json(constants[0]);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateConstant = (req, res, next) => {

    if(req.role !== 'Admin'){
        const error = new Error('Unauthenticated request.');
        error.statusCode = 422;
        throw error;
    }

    Constants.findOne({_id: req.body._id})
        .then(constants => {
            if(!constants){
                const error = new Error('Invalid id.');
                error.statusCode = 422;
                throw error;
            }

            const {news, twitter, instagram, linkedin} = req.body

            return Constants.updateOne({_id: req.body._id}, {news, twitter, instagram, linkedin});
        })
        .then(() => {
            res.status(201).json({message: 'Constants edited successfully!'})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}