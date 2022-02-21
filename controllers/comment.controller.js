const CommentService = require('../services/comment.service');
const {validationResult} = require("express-validator");

exports.getComments = (req, res, next) => {
    CommentService.getComments()
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.postComment = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation error. Entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    CommentService.addComment(req.body.content, req.userId, req.body.postId)
        .then(comment => {
            res.status(201).json(comment);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteComment = (req, res, next) => {
    CommentService.deleteComment(req.params.id, req.userId)
        .then(response => {
            res.status(200).json({message: response});
        })
        .catch(err => {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}