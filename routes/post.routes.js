const express = require('express');
const {body} = require('express-validator');
const isAuth = require('../middleware/isAuth');

const router = express.Router();
const PostController = require('../controllers/post.controller');

router.get('/posts', PostController.getAllPosts);

router.get('/post/:id', PostController.getPost);

router.post('/post', isAuth, [
    body('title').trim().not().isEmpty(),
    body('slug').trim().not().isEmpty(),
    body('description').trim().not().isEmpty(),
    body('categoryId').trim().not().isEmpty(),
], PostController.addPost);

router.delete('/post/:id', isAuth, PostController.deletePost);

module.exports = router;