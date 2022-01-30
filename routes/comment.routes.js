const express = require('express');
const {body} = require('express-validator');
const isAuth = require('../middleware/isAuth');

const router = express.Router();
const CommentController = require('../controllers/comment.controller');

router.post('/comment', isAuth, [
    body('content').trim().not().isEmpty(),
    body('postId').trim().not().isEmpty()
], CommentController.postComment);

router.delete('/comment/:id', isAuth, CommentController.deleteComment);

module.exports = router;